<script lang="ts">
    import { onDestroy, tick } from "svelte";
    import { basicAuth, issueDevice, listVaults, login, logout, renewDevice, restoreSession, revokeDevice, ApiError, type User, type Vault } from "./api";
    import { deleteRecord, readRecord, recordKey, writeRecord, type VaultRecord } from "./store";
    import { CredentialsRejectedError, NotesRuntime, WrongPassphraseError, clearLocalVault, type NotesFile } from "./runtime";
    import { renderPreview } from "./preview";
    import { sendToKindle, type KindleItem } from "./kindle";
    import { resolveLinkpath } from "@/features/tabularium/linkpath";
    import Tree, { type TreeNode } from "./Tree.svelte";
    import { LANGUAGES, catalogues, formatDate, language, setLanguage, t, titles, type Language } from "../../../../server/ui/i18n";

    type Phase = "loading" | "login" | "vaults" | "unlock" | "opening" | "open";
    let phase = $state<Phase>("loading");
    let lang = $state<Language>(language());
    document.title = t("notes.title");
    function changeLanguage(next: Language) {
        setLanguage(next);
        lang = next;
        document.title = t("notes.title");
    }
    let user = $state<User>();
    let vaults = $state<Vault[]>([]);
    let vault = $state<Vault>();
    let error = $state("");
    let notice = $state("");
    let status = $state("");
    let files = $state<NotesFile[]>([]);
    let current = $state<string>();
    let html = $state("");
    let filter = $state("");
    let selecting = $state(false);
    let selected = $state<KindleItem[]>([]);
    let sending = $state(false);
    let username = $state("");
    let password = $state("");
    let passphrase = $state("");
    let previewEl = $state<HTMLElement>();
    let runtime: NotesRuntime | undefined;
    let record: VaultRecord | undefined;
    let objectUrls: string[] = [];
    let refreshTimer: number | undefined;

    /** Device credentials are renewed once less than half of their 30-day life is left. */
    const RENEW_BEFORE_MS = 15 * 86_400_000;
    const MIME: Record<string, string> = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", svg: "image/svg+xml", webp: "image/webp", bmp: "image/bmp", avif: "image/avif" };
    const message = (e: unknown) => (e instanceof Error ? e.message : String(e));

    function browserName() {
        const ua = navigator.userAgent;
        const name = /Edg\//.test(ua) ? "Edge" : /Firefox\//.test(ua) ? "Firefox" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : t("notes.browser");
        return t("notes.deviceName", { browser: name, date: new Date().toISOString().slice(0, 10) });
    }

    async function start() {
        try {
            user = await restoreSession();
            if (!user) phase = "login";
            else await showVaults();
        } catch (e) {
            error = message(e);
            phase = "login";
        }
    }
    void start();

    async function submitLogin(event: SubmitEvent) {
        event.preventDefault();
        error = "";
        try {
            user = await login(username, password);
            password = "";
            await showVaults();
        } catch (e) {
            error = e instanceof ApiError && e.status === 401 ? t("notes.wrongCredentials") : message(e);
        }
    }

    async function showVaults() {
        if (user?.mustChangePassword) {
            location.href = "/admin/";
            return;
        }
        vaults = await listVaults();
        phase = "vaults";
    }

    function chooseVault(chosen: Vault) {
        vault = chosen;
        passphrase = "";
        error = "";
        phase = "unlock";
    }

    async function unlock(event: SubmitEvent) {
        event.preventDefault();
        if (!user || !vault) return;
        error = "";
        phase = "opening";
        status = t("notes.connecting");
        try {
            await open(user, vault, passphrase, true);
        } catch (e) {
            error = message(e);
            phase = "unlock";
        }
    }

    async function open(owner: User, target: Vault, secret: string, retry: boolean) {
        const key = recordKey(owner.id, target.id);
        record = await readRecord(key);
        if (!record) {
            const device = await issueDevice(target.id, browserName());
            record = { key, deviceId: device.id, username: device.username, password: device.password, expiresAt: device.expiresAt, fetched: false };
            await writeRecord(record);
        }
        runtime = new NotesRuntime(
            { userId: owner.id, vaultId: target.id, username: record.username, password: record.password, passphrase: secret },
            { changed: scheduleRefresh, restartRequested: () => void lock(t("notes.restart")) }
        );
        status = record.fetched ? t("notes.syncing") : t("notes.firstFetch");
        try {
            await runtime.start(record.fetched);
        } catch (e) {
            await runtime.stop();
            runtime = undefined;
            if (!record.fetched) await clearLocalVault(owner.id, target.id);
            if (e instanceof CredentialsRejectedError && retry) {
                // The device expired or was revoked: issue a new one.
                await deleteRecord(key);
                return open(owner, target, secret, false);
            }
            throw e instanceof WrongPassphraseError ? e : new Error(t("notes.openFailed", { error: message(e) }));
        }
        passphrase = "";
        // Records written before renewal existed have no expiry and are renewed too.
        const renew = !(record.expiresAt > Date.now() + RENEW_BEFORE_MS);
        if (renew) record.expiresAt = await renewDevice(basicAuth(record.username, record.password));
        if (!record.fetched || renew) {
            record.fetched = true;
            await writeRecord({ ...record });
        }
        files = await runtime.files();
        status = t("notes.synced");
        phase = "open";
    }

    function scheduleRefresh() {
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => void refresh(), 300);
    }
    async function refresh() {
        if (!runtime) return;
        files = await runtime.files();
        status = t("notes.syncedAt", { time: formatDate(Date.now()) });
        if (current && files.some((f) => f.path === current)) await show(current, false);
    }

    function releaseImages() {
        objectUrls.forEach((url) => URL.revokeObjectURL(url));
        objectUrls = [];
    }

    async function show(path: string, scroll = true) {
        if (!runtime) return;
        current = path;
        releaseImages();
        if (!path.toLowerCase().endsWith(".md")) {
            html = "";
            return;
        }
        const paths = files.map((f) => f.path);
        html = renderPreview(await runtime.read(path), (target) => resolveLinkpath(target, path, paths));
        await tick();
        if (scroll) previewEl?.scrollTo(0, 0);
        for (const img of previewEl?.querySelectorAll<HTMLImageElement>("img[data-vault-src]") ?? []) {
            const source = img.dataset.vaultSrc!;
            const data = await runtime.readBinary(source);
            const url = URL.createObjectURL(new Blob([data as BlobPart], { type: MIME[source.slice(source.lastIndexOf(".") + 1).toLowerCase()] }));
            objectUrls.push(url);
            img.src = url;
        }
    }

    function previewClick(event: MouseEvent) {
        const link = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[data-note]");
        if (!link) return;
        event.preventDefault();
        void show(link.dataset.note!);
    }

    async function lock(reason = "") {
        const active = runtime;
        runtime = undefined;
        window.clearTimeout(refreshTimer);
        releaseImages();
        files = [];
        html = "";
        current = undefined;
        selecting = false;
        selected = [];
        await active?.stop();
        error = reason;
        phase = vault ? "unlock" : "vaults";
    }

    async function clearLocal() {
        if (!user || !vault) return;
        if (!confirm(t("notes.confirmClear", { vault: vault.name }))) return;
        await lock();
        const key = recordKey(user.id, vault.id);
        const saved = await readRecord(key);
        if (saved) await revokeDevice(vault.id, saved.deviceId).catch((e) => {
            if (!(e instanceof ApiError && e.status === 404)) throw e;
        });
        await clearLocalVault(user.id, vault.id);
        await deleteRecord(key);
        notice = t("notes.cleared");
        phase = "vaults";
    }

    async function signOut() {
        await lock();
        await logout();
        user = undefined;
        vault = undefined;
        phase = "login";
    }

    function toggle(item: KindleItem) {
        selected = selected.some((s) => s.path === item.path) ? selected.filter((s) => s.path !== item.path) : [...selected, item];
    }

    async function kindle(items: KindleItem[]) {
        if (!runtime || !record || !vault) return;
        sending = true;
        notice = "";
        error = "";
        const authorization = basicAuth(record.username, record.password);
        try {
            const sent = await sendToKindle(runtime, items, vault.name, authorization, (title) => (notice = t("notes.sending", { title: titles([title]) })));
            notice = t("notes.sent", { titles: titles(sent) });
            selecting = false;
            selected = [];
        } catch (e) {
            error = t("notes.sendFailed", { error: message(e) });
        } finally {
            sending = false;
        }
    }

    const tree = $derived.by(() => {
        const root: TreeNode = { name: vault?.name ?? "", path: "", folder: true, children: [] };
        const query = filter.trim().toLowerCase();
        for (const file of files) {
            if (query && !file.path.toLowerCase().includes(query)) continue;
            let node = root;
            const parts = file.path.split("/");
            parts.forEach((part, index) => {
                const path = parts.slice(0, index + 1).join("/");
                const folder = index < parts.length - 1;
                let child = node.children.find((c) => c.name === part && c.folder === folder);
                if (!child) {
                    child = { name: part, path, folder, children: [] };
                    node.children.push(child);
                }
                node = child;
            });
        }
        const sort = (node: TreeNode) => {
            node.children.sort((a, b) => Number(b.folder) - Number(a.folder) || a.name.localeCompare(b.name, "zh"));
            node.children.forEach(sort);
        };
        sort(root);
        return root;
    });

    onDestroy(() => void lock());
</script>

{#snippet languages()}
    <select class="language-select" aria-label={t("language.label")} value={lang} onchange={(event) => changeLanguage(event.currentTarget.value as Language)}>
        {#each LANGUAGES as code (code)}<option value={code}>{catalogues[code][`language.${code}`]}</option>{/each}
    </select>
{/snippet}

{#key lang}
{#if phase === "loading"}
    <main class="center"><p>{t("common.loading")}</p></main>
{:else if phase === "login"}
    <main class="center">
        <form class="card" onsubmit={submitLogin}>
            <h1>{t("notes.heading")}</h1>
            <label>{t("common.username")} <input name="username" autocomplete="username" bind:value={username} required /></label>
            <label>{t("common.password")} <input name="password" type="password" autocomplete="current-password" bind:value={password} required /></label>
            {#if error}<p class="error">{error}</p>{/if}
            <button type="submit">{t("common.signIn")}</button>
            <p class="hint">{t("notes.sameAccount")}</p>
            {@render languages()}
        </form>
    </main>
{:else if phase === "vaults"}
    <main class="center">
        <section class="card">
            <h1>{t("notes.chooseVault")}</h1>
            {#if notice}<p class="notice">{notice}</p>{/if}
            {#if error}<p class="error">{error}</p>{/if}
            {#each vaults as item (item.id)}
                <button class="vault" onclick={() => chooseVault(item)}>{item.name}</button>
            {:else}
                <p>{t("notes.noVaults")}</p>
            {/each}
            <p class="links"><a href="/admin/">{t("notes.console")}</a> · <button class="link" onclick={signOut}>{t("common.signOut")}</button></p>
            {@render languages()}
        </section>
    </main>
{:else if phase === "unlock" || phase === "opening"}
    <main class="center">
        <form class="card" onsubmit={unlock}>
            <h1>{t("notes.unlockTitle", { vault: vault?.name ?? "" })}</h1>
            <label>{t("notes.passphrase")} <input name="passphrase" type="password" autocomplete="off" bind:value={passphrase} required disabled={phase === "opening"} /></label>
            {#if error}<p class="error">{error}</p>{/if}
            {#if phase === "opening"}<p class="notice">{status}</p>{/if}
            <button type="submit" disabled={phase === "opening"}>{t("notes.unlock")}</button>
            <p class="hint">{t("notes.unlockHint")}</p>
            <p class="links"><button type="button" class="link" onclick={() => (phase = "vaults")} disabled={phase === "opening"}>{t("notes.otherVault")}</button></p>
            {@render languages()}
        </form>
    </main>
{:else}
    <div class="layout">
        <aside>
            <header>
                <strong>{vault?.name}</strong>
                <input class="filter" placeholder={t("notes.filter")} bind:value={filter} />
            </header>
            {#if selecting}
                <div class="selection">
                    <button disabled={!selected.length || sending} onclick={() => kindle(selected)}>{t("notes.sendSelected", { count: selected.length })}</button>
                    <button class="link" onclick={() => ((selecting = false), (selected = []))}>{t("notes.cancel")}</button>
                </div>
            {/if}
            <nav>
                <Tree node={tree} {current} {selecting} {selected} open={(path) => show(path)} {toggle} send={(item) => kindle([item])} select={(item) => ((selecting = true), (selected = [item]))} expandAll={filter.trim() !== ""} />
            </nav>
        </aside>
        <section class="main">
            <div class="toolbar">
                <span class="status">{status}</span>
                <span class="plain-note" title={t("notes.plainCopyTitle")}>{t("notes.plainCopy")}</span>
                {@render languages()}
                <button class="link" onclick={() => lock()}>{t("notes.lock")}</button>
                <button class="link" onclick={clearLocal}>{t("notes.clear")}</button>
                <button class="link" onclick={signOut}>{t("common.signOut")}</button>
            </div>
            {#if notice}<p class="notice">{notice}</p>{/if}
            {#if error}<p class="error">{error}</p>{/if}
            <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -- clicks on note links inside the preview are delegated here -->
            <article bind:this={previewEl} onclick={previewClick}>
                {#if current}
                    <h1 class="title">{current.slice(current.lastIndexOf("/") + 1).replace(/\.md$/i, "")}</h1>
                    {#if html}{@html html}{:else}<p class="hint">{t("notes.notNote")}</p>{/if}
                {:else}
                    <p class="hint">{t("notes.pickNote")}</p>
                {/if}
            </article>
        </section>
    </div>
{/if}
{/key}
