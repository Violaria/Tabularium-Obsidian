<script lang="ts">
    import { onDestroy, tick } from "svelte";
    import { basicAuth, issueDevice, listVaults, login, logout, renewDevice, restoreSession, revokeDevice, ApiError, type User, type Vault } from "./api";
    import { deleteRecord, readRecord, recordKey, recordsOf, writeRecord, type VaultRecord } from "./store";
    import { CredentialsRejectedError, NetworkError, NotesRuntime, WrongPassphraseError, clearLocalVault, type NotesFile } from "./runtime";
    import { renderPreview } from "./preview";
    import { sendToKindle, type KindleItem } from "./kindle";
    import { folderOf, freePath, nameOf, normalisePath } from "./paths";
    import { resolveLinkpath } from "@/features/tabularium/linkpath";
    import Tree, { type TreeNode } from "./Tree.svelte";
    import Editor from "./Editor.svelte";
    import Conflict, { type Version } from "./Conflict.svelte";
    import { LANGUAGES, catalogues, formatDate, language, setLanguage, t, titles, type Language } from "../../../../server/ui/i18n";

    type Phase = "loading" | "login" | "vaults" | "unlock" | "opening" | "open";
    type Mode = "view" | "edit" | "conflict";
    type SaveState = "unsaved" | "saved" | "pending" | "synced" | "conflict";
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
    let offline = $state(false);
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
    let mode = $state<Mode>("view");
    let saveState = $state<SaveState>("synced");
    let editorText = $state("");
    let editor = $state<Editor>();
    let versions = $state<Version[]>([]);
    let attachmentInput = $state<HTMLInputElement>();
    let runtime: NotesRuntime | undefined;
    let record: VaultRecord | undefined;
    let objectUrls: string[] = [];
    let refreshTimer: number | undefined;
    let saveTimer: number | undefined;
    let stateTimer: number | undefined;
    /** The open note as last saved or loaded: path, revision and text. */
    let base: { path: string; rev: string; text: string } | undefined;
    let draft = "";
    let savedSeq = 0;
    let saving: Promise<void> = Promise.resolve();

    /** Device credentials are renewed once less than half of their 30-day life is left. */
    const RENEW_BEFORE_MS = 15 * 86_400_000;
    const SAVE_DELAY_MS = 2000;
    const MAX_ATTACHMENT_BYTES = 50 * 1024 * 1024;
    const LAST_USER = "tabularium-notes:last-user";
    const MIME: Record<string, string> = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", svg: "image/svg+xml", webp: "image/webp", bmp: "image/bmp", avif: "image/avif" };
    const IMAGE = /\.(png|jpe?g|gif|svg|webp|bmp|avif)$/i;
    const message = (e: unknown) => (e instanceof Error ? e.message : String(e));
    const isNote = (path: string) => /\.md$/i.test(path);

    function browserName() {
        const ua = navigator.userAgent;
        const name = /Edg\//.test(ua) ? "Edge" : /Firefox\//.test(ua) ? "Firefox" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : t("notes.browser");
        return t("notes.deviceName", { browser: name, date: new Date().toISOString().slice(0, 10) });
    }

    function rememberUser(signedIn: User) {
        try {
            localStorage.setItem(LAST_USER, JSON.stringify({ id: signedIn.id, username: signedIn.username }));
        } catch {
            /* without storage there is no offline list */
        }
    }

    async function start() {
        try {
            user = await restoreSession();
            if (!user) phase = "login";
            else await showVaults();
        } catch (e) {
            if (e instanceof TypeError) await showOfflineVaults();
            else {
                error = message(e);
                phase = "login";
            }
        }
    }
    void start();

    /** Without a network: the vaults this browser has fetched before, for the account that used it last. */
    async function showOfflineVaults() {
        let last: User | undefined;
        try {
            last = JSON.parse(localStorage.getItem(LAST_USER) ?? "null") ?? undefined;
        } catch {
            last = undefined;
        }
        if (!last) {
            error = t("notes.offlineNoVaults");
            phase = "login";
            return;
        }
        user = { ...last, role: "user", mustChangePassword: false };
        offline = true;
        vaults = (await recordsOf(last.id)).filter((r) => r.fetched).map((r) => ({ id: r.key.slice(r.key.indexOf(":") + 1), name: r.vaultName, state: "ready" }));
        phase = "vaults";
    }

    async function submitLogin(event: SubmitEvent) {
        event.preventDefault();
        error = "";
        try {
            user = await login(username, password);
            password = "";
            offline = false;
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
        rememberUser(user!);
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
            record = { key, deviceId: device.id, username: device.username, password: device.password, expiresAt: device.expiresAt, fetched: false, vaultName: target.name };
            await writeRecord(record);
        }
        runtime = new NotesRuntime(
            { userId: owner.id, vaultId: target.id, username: record.username, password: record.password, passphrase: secret },
            { changed: scheduleRefresh, restartRequested: () => void lock(t("notes.restart")) }
        );
        status = record.fetched ? t("notes.syncing") : t("notes.firstFetch");
        let started;
        try {
            started = await runtime.start(record);
        } catch (e) {
            await runtime.stop();
            runtime = undefined;
            if (!record.fetched) await clearLocalVault(owner.id, target.id);
            if (e instanceof CredentialsRejectedError && retry) {
                // The device expired or was revoked: issue a new one.
                await deleteRecord(key);
                return open(owner, target, secret, false);
            }
            throw e instanceof WrongPassphraseError || e instanceof NetworkError ? e : new Error(t("notes.openFailed", { error: message(e) }));
        }
        passphrase = "";
        offline = started.offline;
        record = { ...record, fetched: true, vaultName: target.name, verifier: started.verifier, tweaks: started.tweaks };
        // Records written before renewal existed have no expiry and are renewed too.
        if (!offline && !(record.expiresAt > Date.now() + RENEW_BEFORE_MS)) record.expiresAt = await renewDevice(basicAuth(record.username, record.password));
        await writeRecord({ ...record });
        files = await runtime.files();
        status = offline ? t("notes.offlineStatus") : t("notes.synced");
        stateTimer = window.setInterval(() => void watchState(), 1000);
        phase = "open";
    }

    /** Save state from the replication progress, and reconnection once the network is back. */
    async function watchState() {
        if (!runtime) return;
        const connected = runtime.connected();
        if (offline && connected) {
            offline = false;
            status = t("notes.synced");
        } else if (!offline && !connected && !navigator.onLine) {
            offline = true;
            status = t("notes.offlineStatus");
        }
        if (saveState === "saved" || saveState === "pending") saveState = runtime.pushedSeq() >= savedSeq ? "synced" : "pending";
    }
    function online() {
        if (runtime) void runtime.reconnect();
    }
    window.addEventListener("online", online);

    function scheduleRefresh() {
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => void refresh(), 300);
    }
    async function refresh() {
        if (!runtime) return;
        files = await runtime.files();
        if (!offline) status = t("notes.syncedAt", { time: formatDate(Date.now()) });
        const file = current ? files.find((f) => f.path === current) : undefined;
        if (!current || !file) return;
        if (file.conflicted && mode !== "conflict") {
            await openConflict(current);
            return;
        }
        if (mode === "view") await show(current, false);
        // Another device changed the note being edited: take its text when nothing here is unsaved.
        if (mode === "edit" && base && file.rev !== base.rev && draft === base.text) {
            const loaded = await runtime.open(current);
            base = { path: current, rev: loaded.rev, text: loaded.text };
            draft = loaded.text;
            editor?.replace(loaded.text);
        }
    }

    function releaseImages() {
        objectUrls.forEach((url) => URL.revokeObjectURL(url));
        objectUrls = [];
    }

    async function leave() {
        await flush();
        mode = "view";
        base = undefined;
        versions = [];
    }

    async function show(path: string, scroll = true) {
        if (!runtime) return;
        if (path !== current) await leave();
        current = path;
        releaseImages();
        const file = files.find((f) => f.path === path);
        if (file?.conflicted) {
            await openConflict(path);
            return;
        }
        saveState = "synced";
        if (!isNote(path)) {
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

    // Editing

    async function edit() {
        if (!runtime || !current) return;
        const loaded = await runtime.open(current);
        base = { path: current, rev: loaded.rev, text: loaded.text };
        draft = editorText = loaded.text;
        saveState = "synced";
        mode = "edit";
    }

    function changed(text: string) {
        draft = text;
        saveState = "unsaved";
        window.clearTimeout(saveTimer);
        saveTimer = window.setTimeout(() => void save(), SAVE_DELAY_MS);
    }

    /** Saves the draft once; saves are queued so that each one starts from the revision the previous one created. */
    function save() {
        window.clearTimeout(saveTimer);
        saving = saving.then(async () => {
            if (!runtime || !base || draft === base.text) return;
            const text = draft;
            try {
                const result = await runtime.save(base.path, text, base.rev);
                base = { ...base, rev: result.rev, text };
                savedSeq = await runtime.localSeq();
                saveState = result.conflicted ? "conflict" : "saved";
                if (result.conflicted) notice = t("notes.savedAsConflict");
            } catch (e) {
                saveState = "unsaved";
                error = t("notes.saveError", { error: message(e) });
            }
        });
        return saving;
    }
    /** Saves now if anything is unsaved; used before leaving a note or the page. */
    async function flush() {
        if (mode === "edit" && base && draft !== base.text) await save();
        await saving;
    }
    function pagehide() {
        void flush();
    }
    window.addEventListener("pagehide", pagehide);
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") void flush();
    });

    async function done() {
        const path = current;
        await leave();
        if (path) await show(path, false);
    }

    // Managing notes

    async function newNote() {
        if (!runtime) return;
        const typed = prompt(t("notes.newNotePrompt"), current ? `${folderOf(current) ? `${folderOf(current)}/` : ""}` : "");
        if (typed === null) return;
        const path = normalisePath(typed, true);
        if (!path) {
            error = t("notes.invalidPath");
            return;
        }
        try {
            await runtime.save(path, "");
            files = await runtime.files();
            await show(path);
            await edit();
        } catch (e) {
            error = message(e);
        }
    }

    async function rename(item: KindleItem) {
        if (!runtime) return;
        const typed = prompt(t("notes.renamePrompt"), item.path);
        if (typed === null || typed.trim() === item.path) return;
        const target = normalisePath(typed);
        if (!target) {
            error = t("notes.invalidPath");
            return;
        }
        await flush();
        const moves = item.folder
            ? files.filter((f) => f.path.startsWith(`${item.path}/`)).map((f) => [f.path, `${target}${f.path.slice(item.path.length)}`] as const)
            : [[item.path, target] as const];
        try {
            for (const [from, to] of moves) {
                const content = isNote(from) ? await runtime.read(from) : await runtime.readBinary(from);
                await runtime.save(to, content);
                await runtime.remove(from);
            }
            notice = t("notes.renamed", { name: nameOf(target) });
            files = await runtime.files();
            if (current && moves.some(([from]) => from === current)) await show(moves.find(([from]) => from === current)![1]);
        } catch (e) {
            error = message(e);
            files = await runtime.files();
        }
    }

    async function remove(item: KindleItem) {
        if (!runtime) return;
        const targets = item.folder ? files.filter((f) => f.path.startsWith(`${item.path}/`)).map((f) => f.path) : [item.path];
        if (!confirm(item.folder ? t("notes.confirmDeleteFolder", { name: item.path, count: targets.length }) : t("notes.confirmDelete", { name: item.path }))) return;
        try {
            for (const path of targets) await runtime.remove(path);
            if (current && targets.includes(current)) {
                mode = "view";
                base = undefined;
                current = undefined;
                html = "";
            }
            notice = t("notes.deleted", { name: nameOf(item.path) });
            files = await runtime.files();
        } catch (e) {
            error = message(e);
        }
    }

    async function attach(list: File[]) {
        if (!runtime || !current || !list.length) return;
        const folder = folderOf(current);
        const taken = new Set(files.map((f) => f.path));
        for (const file of list) {
            if (file.size > MAX_ATTACHMENT_BYTES) {
                error = t("notes.attachmentTooLarge", { name: file.name });
                continue;
            }
            const name = normalisePath(file.name);
            if (!name || name.includes("/")) {
                error = t("notes.invalidPath");
                continue;
            }
            const path = freePath(folder, name, (candidate) => taken.has(candidate));
            try {
                await runtime.save(path, new Uint8Array(await file.arrayBuffer()));
                taken.add(path);
                editor?.insert(`${IMAGE.test(path) ? "!" : ""}[[${nameOf(path)}]]`);
                notice = t("notes.attached", { name: nameOf(path) });
            } catch (e) {
                error = message(e);
            }
        }
        files = await runtime.files();
    }

    // Conflicts

    async function openConflict(path: string) {
        if (!runtime) return;
        current = path;
        const { current: rev, conflicts } = await runtime.revisions(path);
        const binary = !isNote(path);
        const load = async (r: string, isCurrent: boolean): Promise<Version> => {
            const opened = binary ? { text: "", mtime: 0 } : await runtime!.open(path, r);
            return { rev: r, text: opened.text, mtime: opened.mtime, current: isCurrent };
        };
        versions = [await load(rev, true), ...(await Promise.all(conflicts.map((r) => load(r, false))))];
        mode = "conflict";
        saveState = "conflict";
    }

    /** Settles a conflict: the chosen or merged content becomes the current revision, the other leaves are deleted. */
    async function settle(content: string | Uint8Array<ArrayBuffer> | undefined) {
        if (!runtime || !current) return;
        const path = current;
        try {
            const { current: rev, conflicts } = await runtime.revisions(path);
            if (content !== undefined) {
                const result = await runtime.save(path, content, rev);
                if (result.conflicted) throw new Error(t("notes.conflictChanged"));
            }
            for (const leaf of conflicts) await runtime.remove(path, leaf);
            savedSeq = await runtime.localSeq();
            notice = t("notes.conflictResolved");
            mode = "view";
            versions = [];
            files = await runtime.files();
            await show(path, false);
            saveState = "saved";
        } catch (e) {
            error = message(e);
            await openConflict(path);
        }
    }
    async function keep(version: Version) {
        if (!runtime || !current) return;
        if (version.current) await settle(undefined);
        else if (isNote(current)) await settle(version.text);
        else {
            const entry = await runtime.readRevisionBinary(current, version.rev);
            await settle(entry);
        }
    }

    // Session

    async function lock(reason = "") {
        await flush().catch(() => undefined);
        const active = runtime;
        runtime = undefined;
        window.clearTimeout(refreshTimer);
        window.clearInterval(stateTimer);
        releaseImages();
        files = [];
        html = "";
        current = undefined;
        mode = "view";
        base = undefined;
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
        if (!offline) await logout();
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

    const conflicted = $derived(new Set(files.filter((f) => f.conflicted).map((f) => f.path)));
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
    const stateLabel = $derived(
        ({ unsaved: t("notes.stateUnsaved"), saved: t("notes.stateSaved"), pending: t("notes.statePending"), synced: t("notes.stateSynced"), conflict: t("notes.stateConflict") }) as Record<SaveState, string>
    );

    onDestroy(() => {
        window.removeEventListener("online", online);
        window.removeEventListener("pagehide", pagehide);
        void lock();
    });
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
            {#if offline}<p class="notice">{t("notes.offlineVaults")}</p>{/if}
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
                <div class="aside-head">
                    <strong>{vault?.name}</strong>
                    <button class="link" onclick={newNote}>{t("notes.newNote")}</button>
                </div>
                <input class="filter" placeholder={t("notes.filter")} bind:value={filter} />
            </header>
            {#if selecting}
                <div class="selection">
                    <button disabled={!selected.length || sending} onclick={() => kindle(selected)}>{t("notes.sendSelected", { count: selected.length })}</button>
                    <button class="link" onclick={() => ((selecting = false), (selected = []))}>{t("notes.cancel")}</button>
                </div>
            {/if}
            <nav>
                <Tree node={tree} {current} {selecting} {selected} {conflicted} open={(path) => show(path)} {toggle} send={(item) => kindle([item])} select={(item) => ((selecting = true), (selected = [item]))} {rename} {remove} expandAll={filter.trim() !== ""} />
            </nav>
        </aside>
        <section class="main">
            <div class="toolbar">
                <span class="status" class:offline>{status}</span>
                <span class="plain-note" title={t("notes.plainCopyTitle")}>{t("notes.plainCopy")}</span>
                {@render languages()}
                <button class="link" onclick={() => lock()}>{t("notes.lock")}</button>
                <button class="link" onclick={clearLocal}>{t("notes.clear")}</button>
                <button class="link" onclick={signOut}>{t("common.signOut")}</button>
            </div>
            {#if notice}<p class="notice">{notice}</p>{/if}
            {#if error}<p class="error">{error}</p>{/if}
            {#if current}
                <div class="note-head">
                    <h1 class="title">{nameOf(current).replace(/\.md$/i, "")}</h1>
                    <span class="save-state" data-state={saveState}>{stateLabel[saveState]}</span>
                    {#if mode === "view" && isNote(current)}
                        <button onclick={edit}>{t("notes.edit")}</button>
                    {:else if mode === "edit"}
                        <button onclick={() => attachmentInput?.click()}>{t("notes.attach")}</button>
                        <input type="file" multiple hidden bind:this={attachmentInput} onchange={(event) => {
                            const input = event.currentTarget;
                            void attach([...(input.files ?? [])]).then(() => (input.value = ""));
                        }} />
                        <button onclick={() => void save()}>{t("common.save")}</button>
                        <button class="primary" onclick={done}>{t("notes.done")}</button>
                    {/if}
                </div>
            {/if}
            {#if mode === "edit" && current}
                <Editor bind:this={editor} text={editorText} {changed} save={() => void save()} dropped={(list) => void attach(list)} />
                <p class="hint">{t("notes.editHint")}</p>
            {:else if mode === "conflict" && current}
                <Conflict {versions} binary={!isNote(current)} {keep} merge={(text) => void settle(text)} />
            {:else}
                <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -- clicks on note links inside the preview are delegated here -->
                <article bind:this={previewEl} onclick={previewClick}>
                    {#if current}
                        {#if html}{@html html}{:else}<p class="hint">{t("notes.notNote")}</p>{/if}
                    {:else}
                        <p class="hint">{t("notes.pickNote")}</p>
                    {/if}
                </article>
            {/if}
        </section>
    </div>
{/if}
{/key}
