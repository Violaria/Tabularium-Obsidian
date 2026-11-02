<script lang="ts">
    // The dialog for sharing a note or folder, used by web notes and the Obsidian plug-in. It lists the references
    // that lie outside what is shared so the owner decides each one; colours come from the web pages' tokens or,
    // inside Obsidian, from its own variables.
    import { untrack } from "svelte";
    import { reviewTree, sharedByDefault, type ReviewNode, type ShareSource } from "./package";
    import { ShareError, Sharing, type OwnShare, type ShareMode } from "./sharing";

    type Texts = (key: string, params?: Record<string, string | number>) => string;
    interface Props {
        sharing: Sharing;
        source: ShareSource;
        target: string;
        folder: boolean;
        name: string;
        base: string;
        existing?: OwnShare;
        t: Texts;
        serverError: (code: string) => string;
        formatDate: (time: number) => string;
        /** Asks before the share is withdrawn, in the client's own confirmation dialog. */
        confirmRevoke: () => Promise<boolean>;
        close: () => void;
    }
    let { sharing, source, target, folder, name, base, existing, t, serverError, formatDate, confirmRevoke, close }: Props = $props();

    const DAY = 86_400_000;
    // The dialog starts from the share as it was when opened; later changes come from saving here.
    const initial = untrack(() => existing);
    const record = initial?.record;
    let share = $state(initial);
    let mode = $state<ShareMode>(initial?.view.mode ?? "encrypted");
    let slug = $state("");
    let expiry = $state(initial ? (initial.view.expiresAt === null ? "forever" : "custom") : "30");
    let until = $state(initial?.view.expiresAt ? new Date(initial.view.expiresAt).toISOString().slice(0, 10) : "");
    let password = $state(record?.password ?? "");
    let indexable = $state(initial?.view.indexable ?? false);
    let authorised = $state(new Set<string>(record?.authorised ?? []));
    // References the owner has seen: those from the share's record and those shown in this dialog.
    const known = new Set<string>(record?.reviewed ?? []);
    const firstSeen = new Set<string>();
    let nodes = $state<ReviewNode[]>([]);
    let loading = $state(true);
    let busy = $state(false);
    let error = $state("");
    let copied = $state(false);

    const link = $derived(share ? Sharing.link(base, share) : "");
    const shownPaths = (list: ReviewNode[]): string[] => list.flatMap((node) => [node.path, ...shownPaths(node.children)]);

    /** Lists the references again; references seen for the first time get their default choice. */
    async function load() {
        const next = await reviewTree(source, target, folder, (path) => authorised.has(path));
        const added = shownPaths(next).filter((path) => !known.has(path));
        if (added.length) {
            const defaults = new Set(authorised);
            const visit = (list: ReviewNode[]) => {
                for (const node of list) {
                    if (!known.has(node.path)) {
                        known.add(node.path);
                        // References found after the share was created start unshared, like automatic updates leave them.
                        if (initial) firstSeen.add(node.path);
                        else if (sharedByDefault(node)) defaults.add(node.path);
                    }
                    visit(node.children);
                }
            };
            visit(next);
            if (defaults.size !== authorised.size) {
                authorised = defaults;
                return load();
            }
        }
        nodes = next;
        loading = false;
    }
    void load().catch((e) => (error = message(e)));

    function toggle(node: ReviewNode) {
        const next = new Set(authorised);
        if (next.has(node.path)) next.delete(node.path);
        else next.add(node.path);
        authorised = next;
        if (node.kind === "note") void load().catch((e) => (error = message(e)));
    }
    function message(e: unknown) {
        if (e instanceof ShareError) return e.code === "tooLarge" ? t("share.tooLarge", { size: size(e.size) }) : t("share.empty");
        const text = e instanceof Error ? e.message : String(e);
        return serverError(text);
    }
    const size = (value: number) => (value < 1024 * 1024 ? `${Math.ceil(value / 1024)} KB` : `${(value / 1024 / 1024).toFixed(1)} MB`);
    function expiresAt() {
        if (expiry === "forever") return null;
        if (expiry === "custom") return until ? new Date(`${until}T23:59:59`).getTime() : null;
        return Date.now() + Number(expiry) * DAY;
    }

    async function save() {
        busy = true;
        error = "";
        copied = false;
        try {
            const shown = new Set(shownPaths(nodes));
            share = await sharing.save(target, folder, {
                mode,
                slug: slug.trim(),
                expiresAt: expiresAt(),
                password,
                indexable: mode === "public" && indexable,
                authorised: [...authorised].filter((path) => shown.has(path)),
                reviewed: [...shown],
            }, share);
            firstSeen.clear();
        } catch (e) {
            error = message(e);
        } finally {
            busy = false;
        }
    }
    async function revoke() {
        if (!share || !(await confirmRevoke())) return;
        busy = true;
        try {
            await sharing.revoke(share);
            close();
        } catch (e) {
            error = message(e);
            busy = false;
        }
    }
    async function copy() {
        await navigator.clipboard.writeText(link);
        copied = true;
    }
    const kind = (node: ReviewNode) => t(node.kind === "note" ? "share.kindNote" : node.kind === "image" ? "share.kindImage" : "share.kindFile");
</script>

{#snippet tip(text: string)}
    <!-- Focusable so keyboard users can read the explanation; not a button, which would take the clicks of its label. -->
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <span class="tip" tabindex="0" data-tip={text}><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" /><path d="M8 7.2v4M8 4.9v.1" /></svg></span>
{/snippet}

{#snippet references(list: ReviewNode[])}
    <ul>
        {#each list as node (node.path)}
            <li>
                <label class="reference">
                    <input type="checkbox" checked={authorised.has(node.path)} onchange={() => toggle(node)} disabled={busy} />
                    <span class="kind">{kind(node)}{node.embed ? ` · ${t("share.embedded")}` : ""}</span>
                    <span class="path">{node.path}</span>
                    {#if firstSeen.has(node.path)}<span class="new">{t("share.new")}</span>{/if}
                </label>
                {#if node.children.length}{@render references(node.children)}{/if}
            </li>
        {/each}
    </ul>
{/snippet}

<div class="share">
    <h2>{t("share.title", { name })}</h2>
    {#if initial && !record}
        <p class="error" role="alert">{t("share.otherPassphrase")}</p>
        <div class="buttons"><span class="spacer"></span><button onclick={close}>{t("share.close")}</button></div>
    {:else}
        {#if error}<p class="error" role="alert">{error}</p>{/if}
        {#if share}
            <div class="result">
                <label for="share-link">{t("share.link")}{@render tip(share.view.mode === "encrypted" ? t("share.linkKeyHint") : t("share.publicWarning"))}</label>
                <div class="row">
                    <input id="share-link" readonly value={link} onfocus={(event) => event.currentTarget.select()} />
                    <button class="primary mod-cta" onclick={copy}>{copied ? t("share.copied") : t("share.copy")}</button>
                </div>
                <small>
                    {t("share.views", { count: share.view.views })}{share.view.updatedAt ? ` · ${t("share.updated", { time: formatDate(share.view.updatedAt) })}` : ""}
                </small>
            </div>
        {/if}
        {#if record && record.unreviewed > 0}
            <p class="warn">{t("share.unreviewed", { count: record.unreviewed })}</p>
        {/if}

        <fieldset disabled={busy}>
            <legend>{t("share.mode")}{#if share}{@render tip(t("share.modeFixed"))}{/if}</legend>
            <label class="choice">
                <input type="radio" name="share-mode" value="encrypted" bind:group={mode} disabled={!!share} />
                <span><strong>{t("share.encrypted")}</strong>{@render tip(t("share.encryptedHint"))}</span>
            </label>
            <label class="choice">
                <input type="radio" name="share-mode" value="public" bind:group={mode} disabled={!!share} />
                <span><strong>{t("share.public")}</strong>{@render tip(t("share.publicHint"))}</span>
            </label>
        </fieldset>

        <div class="grid">
            {#if !share}
                <label>
                    <span>{t("share.address")}{@render tip(t("share.addressHint"))}</span>
                    <span class="address"><span class="prefix">/s/</span><input bind:value={slug} placeholder={t("share.addressRandom")} disabled={busy} autocomplete="off" /></span>
                </label>
            {/if}
            <label>
                <span>{t("share.expiry")}</span>
                <select bind:value={expiry} disabled={busy}>
                    <option value="1">{t("share.day1")}</option>
                    <option value="7">{t("share.day7")}</option>
                    <option value="30">{t("share.day30")}</option>
                    <option value="forever">{t("share.forever")}</option>
                    <option value="custom">{t("share.custom")}</option>
                </select>
                {#if expiry === "custom"}<input type="date" bind:value={until} min={new Date(Date.now() + DAY).toISOString().slice(0, 10)} disabled={busy} />{/if}
            </label>
            <label>
                <span>{t("share.password")}{@render tip(t("share.passwordHint"))}</span>
                <input type="text" bind:value={password} autocomplete="off" disabled={busy} />
            </label>
            {#if mode === "public"}
                <label class="check"><input type="checkbox" bind:checked={indexable} disabled={busy} />{t("share.indexable")}</label>
            {/if}
        </div>

        <section class="references">
            <h3>{t("share.references")}{@render tip(t("share.referencesHint"))}</h3>
            {#if loading}
                <p class="muted">{t("share.loading")}</p>
            {:else if nodes.length}
                {@render references(nodes)}
            {:else}
                <p class="muted">{t("share.noReferences")}</p>
            {/if}
        </section>

        <div class="buttons">
            {#if share}<button class="danger mod-destructive" onclick={revoke} disabled={busy}>{t("share.revoke")}</button>{/if}
            <span class="spacer"></span>
            <button onclick={close} disabled={busy}>{share ? t("share.close") : t("share.cancel")}</button>
            <button class="primary mod-cta" onclick={save} disabled={busy || loading || (expiry === "custom" && !until)}>
                {busy ? t("share.saving") : share ? t("share.save") : t("share.create")}
            </button>
        </div>
    {/if}
</div>

<style>
    .share {
        --s-line: var(--line, var(--background-modifier-border));
        --s-muted: var(--muted, var(--text-muted));
        --s-soft: var(--panel-soft, var(--background-secondary));
        --s-accent: var(--accent, var(--interactive-accent));
        --s-danger: var(--danger, var(--text-error));
        --s-warn: var(--warn, var(--text-warning));
        display: grid;
        gap: 16px;
        width: min(640px, 100%);
    }
    h2 {
        margin: 0;
        font-size: 18px;
    }
    h3 {
        margin: 0 0 2px;
        font-size: 14px;
    }
    small,
    .muted {
        color: var(--s-muted);
        font-size: 12px;
    }
    .error {
        color: var(--s-danger);
        margin: 0;
    }
    .warn {
        color: var(--s-warn);
        margin: 0;
    }
    fieldset {
        border: 0;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 8px;
    }
    legend {
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 6px;
    }
    .choice {
        display: flex;
        gap: 10px;
        align-items: flex-start;
        padding: 10px 12px;
        border: 1px solid var(--s-line);
        border-radius: 8px;
        font-weight: 400;
    }
    .choice:has(input:checked) {
        border-color: var(--s-accent);
    }
    .choice input,
    .check input,
    .reference input {
        width: auto;
        margin-top: 3px;
    }
    .choice span {
        display: flex;
        align-items: center;
    }
    .tip {
        position: relative;
        display: inline-flex;
        margin-left: 6px;
        color: var(--s-muted);
        cursor: help;
        font-weight: 400;
    }
    .tip svg {
        width: 15px;
        height: 15px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.4;
        stroke-linecap: round;
    }
    .tip:hover,
    .tip:focus {
        color: var(--s-accent);
        outline: none;
    }
    .tip::after {
        content: attr(data-tip);
        position: absolute;
        left: -10px;
        bottom: calc(100% + 8px);
        z-index: 40;
        width: max-content;
        max-width: min(320px, 70vw);
        padding: 8px 11px;
        border-radius: 8px;
        background: var(--text, var(--text-normal));
        color: var(--panel, var(--background-primary));
        font-size: 12.5px;
        line-height: 1.55;
        font-weight: 400;
        white-space: normal;
        text-align: left;
        display: none;
        pointer-events: none;
    }
    .tip:hover::after,
    .tip:focus::after {
        display: block;
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 14px;
    }
    .grid label {
        display: grid;
        gap: 6px;
        align-content: start;
        font-size: 13px;
        font-weight: 600;
    }
    .address {
        display: flex;
        align-items: center;
        gap: 4px;
    }
    .prefix {
        color: var(--s-muted);
        font-weight: 400;
    }
    .check {
        display: flex !important;
        align-items: center;
        gap: 8px;
    }
    .references ul {
        list-style: none;
        margin: 8px 0 0;
        padding: 0;
        display: grid;
        gap: 4px;
    }
    .references ul ul {
        margin: 4px 0 0 24px;
    }
    .reference {
        display: flex;
        align-items: baseline;
        gap: 8px;
        font-weight: 400;
        font-size: 14px;
    }
    .kind {
        flex: none;
        color: var(--s-muted);
        font-size: 12px;
        min-width: 6.5em;
    }
    .path {
        overflow-wrap: anywhere;
    }
    .new {
        flex: none;
        font-size: 11px;
        padding: 0 6px;
        border-radius: 10px;
        background: var(--s-soft);
        color: var(--s-warn);
    }
    .result {
        display: grid;
        gap: 6px;
        padding: 12px;
        border-radius: 8px;
        background: var(--s-soft);
    }
    .result label {
        font-size: 13px;
        font-weight: 600;
    }
    .row {
        display: flex;
        gap: 8px;
    }
    .row input {
        flex: 1;
        font-family: var(--mono, var(--font-monospace));
        font-size: 12px;
    }
    .buttons {
        display: flex;
        gap: 10px;
        align-items: center;
    }
    .spacer {
        flex: 1;
    }
    .danger {
        color: var(--s-danger);
    }
</style>
