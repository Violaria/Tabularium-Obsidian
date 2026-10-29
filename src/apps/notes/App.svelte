<script lang="ts">
    import { onDestroy, tick } from "svelte";
    import { issueDevice, listVaults, login, logout, restoreSession, revokeDevice, ApiError, type User, type Vault } from "./api";
    import { deleteRecord, readRecord, recordKey, writeRecord, type VaultRecord } from "./store";
    import { CredentialsRejectedError, NotesRuntime, WrongPassphraseError, clearLocalVault, type NotesFile } from "./runtime";
    import { renderPreview } from "./preview";
    import { sendToKindle, type KindleItem } from "./kindle";
    import { resolveLinkpath } from "@/features/tabularium/linkpath";
    import Tree, { type TreeNode } from "./Tree.svelte";

    type Phase = "loading" | "login" | "vaults" | "unlock" | "opening" | "open";
    let phase = $state<Phase>("loading");
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

    const MIME: Record<string, string> = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", svg: "image/svg+xml", webp: "image/webp", bmp: "image/bmp", avif: "image/avif" };
    const message = (e: unknown) => (e instanceof Error ? e.message : String(e));

    function browserName() {
        const ua = navigator.userAgent;
        const name = /Edg\//.test(ua) ? "Edge" : /Firefox\//.test(ua) ? "Firefox" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : "浏览器";
        return `网页 · ${name} · ${new Date().toLocaleDateString("zh-CN")}`;
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
            error = e instanceof ApiError && e.status === 401 ? "用户名或密码错误。" : message(e);
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
        status = "正在连接…";
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
            record = { key, deviceId: device.id, username: device.username, password: device.password, fetched: false };
            await writeRecord(record);
        }
        runtime = new NotesRuntime(
            { userId: owner.id, vaultId: target.id, username: record.username, password: record.password, passphrase: secret },
            { changed: scheduleRefresh, restartRequested: () => void lock("同步需要重新启动，请重新解锁。") }
        );
        status = record.fetched ? "正在同步…" : "首次打开，正在获取全部笔记…";
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
            throw e instanceof WrongPassphraseError ? e : new Error(`打开笔记库失败：${message(e)}`);
        }
        passphrase = "";
        if (!record.fetched) {
            record.fetched = true;
            await writeRecord({ ...record });
        }
        files = await runtime.files();
        status = "已同步";
        phase = "open";
    }

    function scheduleRefresh() {
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => void refresh(), 300);
    }
    async function refresh() {
        if (!runtime) return;
        files = await runtime.files();
        status = `已同步 ${new Date().toLocaleTimeString("zh-CN")}`;
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
        if (!confirm(`删除本浏览器中「${vault.name}」的全部本地数据，并撤销本浏览器的设备？`)) return;
        await lock();
        const key = recordKey(user.id, vault.id);
        const saved = await readRecord(key);
        if (saved) await revokeDevice(vault.id, saved.deviceId).catch((e) => {
            if (!(e instanceof ApiError && e.status === 404)) throw e;
        });
        await clearLocalVault(user.id, vault.id);
        await deleteRecord(key);
        notice = "本地数据已清除，设备已撤销。";
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
        const authorization = `Basic ${btoa(`${record.username}:${record.password}`)}`;
        try {
            const sent = await sendToKindle(runtime, items, vault.name, authorization, (title) => (notice = `正在推送《${title}》…`));
            notice = `已推送至 Kindle：${sent.map((t) => `《${t}》`).join("、")}`;
            selecting = false;
            selected = [];
        } catch (e) {
            error = `推送失败：${message(e)}`;
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

{#if phase === "loading"}
    <main class="center"><p>正在加载…</p></main>
{:else if phase === "login"}
    <main class="center">
        <form class="card" onsubmit={submitLogin}>
            <h1>云笔记</h1>
            <label>用户名 <input name="username" autocomplete="username" bind:value={username} required /></label>
            <label>密码 <input name="password" type="password" autocomplete="current-password" bind:value={password} required /></label>
            {#if error}<p class="error">{error}</p>{/if}
            <button type="submit">登录</button>
            <p class="hint">与管理控制台使用同一个账户。</p>
        </form>
    </main>
{:else if phase === "vaults"}
    <main class="center">
        <section class="card">
            <h1>选择笔记库</h1>
            {#if notice}<p class="notice">{notice}</p>{/if}
            {#if error}<p class="error">{error}</p>{/if}
            {#each vaults as item (item.id)}
                <button class="vault" onclick={() => chooseVault(item)}>{item.name}</button>
            {:else}
                <p>还没有笔记库。在 Obsidian 插件或管理控制台中创建。</p>
            {/each}
            <p class="links"><a href="/admin/">管理控制台</a> · <button class="link" onclick={signOut}>退出登录</button></p>
        </section>
    </main>
{:else if phase === "unlock" || phase === "opening"}
    <main class="center">
        <form class="card" onsubmit={unlock}>
            <h1>解锁「{vault?.name}」</h1>
            <label>口令 <input name="passphrase" type="password" autocomplete="off" bind:value={passphrase} required disabled={phase === "opening"} /></label>
            {#if error}<p class="error">{error}</p>{/if}
            {#if phase === "opening"}<p class="notice">{status}</p>{/if}
            <button type="submit" disabled={phase === "opening"}>解锁</button>
            <p class="hint">口令只在本页面内存中使用，不会保存，也不会发送给服务器。笔记会在本浏览器中保存一份明文副本，在他人或公共电脑上用完后请「清除本地数据」。</p>
            <p class="links"><button type="button" class="link" onclick={() => (phase = "vaults")} disabled={phase === "opening"}>换一个笔记库</button></p>
        </form>
    </main>
{:else}
    <div class="layout">
        <aside>
            <header>
                <strong>{vault?.name}</strong>
                <input class="filter" placeholder="按文件名查找" bind:value={filter} />
            </header>
            {#if selecting}
                <div class="selection">
                    <button disabled={!selected.length || sending} onclick={() => kindle(selected)}>推送 {selected.length} 项至 Kindle</button>
                    <button class="link" onclick={() => ((selecting = false), (selected = []))}>取消</button>
                </div>
            {/if}
            <nav>
                <Tree node={tree} {current} {selecting} {selected} open={(path) => show(path)} {toggle} send={(item) => kindle([item])} select={(item) => ((selecting = true), (selected = [item]))} expandAll={filter.trim() !== ""} />
            </nav>
        </aside>
        <section class="main">
            <div class="toolbar">
                <span class="status">{status}</span>
                <span class="plain-note" title="本浏览器中保存了笔记的明文副本">本地明文副本</span>
                <button class="link" onclick={() => lock()}>锁定</button>
                <button class="link" onclick={clearLocal}>清除本地数据</button>
                <button class="link" onclick={signOut}>退出登录</button>
            </div>
            {#if notice}<p class="notice">{notice}</p>{/if}
            {#if error}<p class="error">{error}</p>{/if}
            <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -- clicks on note links inside the preview are delegated here -->
            <article bind:this={previewEl} onclick={previewClick}>
                {#if current}
                    <h1 class="title">{current.slice(current.lastIndexOf("/") + 1).replace(/\.md$/i, "")}</h1>
                    {#if html}{@html html}{:else}<p class="hint">此文件不是笔记，无法预览。</p>{/if}
                {:else}
                    <p class="hint">在左侧选择一篇笔记。「锁定」停止同步并清空页面，但不删除本地副本；「清除本地数据」才会删除。</p>
                {/if}
            </article>
        </section>
    </div>
{/if}
