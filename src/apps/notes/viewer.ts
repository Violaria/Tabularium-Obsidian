// The page of a shared note or folder (/s/<address>). It needs no account and loads neither the shell nor the sync
// core. An encrypted share is decrypted here with the key from the link's fragment (never sent to the server); the
// content is Markdown rendered with raw HTML disabled, and references the owner did not share show as "no access".
import MarkdownIt from "markdown-it";
import { contentKey, decrypt, fromBase64Url } from "@/features/tabularium/share/crypto";
import type { Manifest, ManifestNode } from "@/features/tabularium/share/package";
import { escapeXml } from "@/features/tabularium/epub";
import { formatDate, serverError, t } from "../../../../server/ui/i18n";
import { copyCode, enhance } from "./markdown";

const root = document.getElementById("viewer")!;
/** The address as typed; a malformed escape is kept as it is, and the server answers that it does not exist. */
const slug = (() => {
    const written = location.pathname.replace(/^\/s\//, "");
    try {
        return decodeURIComponent(written);
    } catch {
        return written;
    }
})();
const fragment = location.hash.slice(1);
const api = `/api/v1/public/shares/${encodeURIComponent(slug)}`;
const decoder = new TextDecoder();
const EXTERNAL = /^(https?|mailto):/i;

let key: CryptoKey | undefined;
let access: string | undefined;
// Set once the share is opened; the page is drawn only then.
let manifest = undefined as unknown as Manifest;
const blobs = new Map<string, string>();

class Stop extends Error {}
/**
 * The only place markup enters the page. Callers pass escaped text (escapeXml) or the Markdown renderer's output, which
 * has raw HTML disabled, so nothing from a share can add elements or scripts of its own.
 */
function setMarkup(element: Element, markup: string) {
    element.replaceChildren(...new DOMParser().parseFromString(`<body>${markup}</body>`, "text/html").body.childNodes);
}
function notice(title: string, text = "", form?: HTMLFormElement) {
    root.className = "notes share-viewer";
    setMarkup(root, `<div class="share-gate"><section class="card"><h1>${escapeXml(title)}</h1>${text ? `<p>${escapeXml(text)}</p>` : ""}</section></div>`);
    if (form) root.querySelector(".card")!.append(form);
}
/** Shows why the share cannot be opened and stops. */
async function refused(response: Response, path = ""): Promise<never> {
    const reason = ((await response.json().catch(() => ({}))) as { error?: string }).error ?? `HTTP ${response.status}`;
    if (response.status === 404 && !path) notice(t("viewer.notFound"));
    else if (response.status === 410) notice(t("viewer.gone"));
    else if (response.status === 403 && reason === "Sharing is turned off") notice(t("viewer.off"));
    else throw new Error(serverError(reason));
    throw new Stop();
}
async function request(path = "", headers: Record<string, string> = {}) {
    const response = await fetch(api + path, { headers: { ...headers, ...(access ? { "x-share-access": access } : {}) }, referrerPolicy: "no-referrer" });
    return response.ok ? response : refused(response, path);
}
async function bytes(name: string) {
    const data = new Uint8Array(await (await request(`/files/${encodeURIComponent(name)}`)).arrayBuffer());
    return key ? decrypt(key, data) : data;
}

/** Asks for the share's password; resolves with what was typed. */
function askPassword(error = "") {
    return new Promise<string>((resolve) => {
        const form = document.createElement("form");
        form.className = "stack";
        setMarkup(form, `${error ? `<p class="notice error" role="alert">${escapeXml(error)}</p>` : ""}<label><span>${escapeXml(t("viewer.password"))}</span><input type="password" name="password" required autocomplete="off"></label><button class="primary" type="submit">${escapeXml(t("viewer.open"))}</button>`);
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            resolve(String(new FormData(form).get("password")));
        });
        notice(t("viewer.passwordTitle"), "", form);
        form.querySelector("input")!.focus();
    });
}

interface Meta {
    mode: "encrypted" | "public";
    password: boolean;
    access?: string;
}
async function open(meta: Meta) {
    if (meta.mode === "public") {
        access = meta.access;
        manifest = JSON.parse(decoder.decode(await bytes("manifest"))) as Manifest;
        return;
    }
    if (!fragment) return notice(t("viewer.incomplete"));
    let shareKey: Uint8Array;
    try {
        shareKey = fromBase64Url(fragment);
    } catch {
        return notice(t("viewer.badKey"));
    }
    const encrypted = new Uint8Array(await (await request("/files/manifest")).arrayBuffer());
    let error = "";
    for (;;) {
        const password = meta.password ? await askPassword(error) : undefined;
        if (password !== undefined) notice(t("viewer.loading"));
        try {
            key = await contentKey(shareKey, password);
            manifest = JSON.parse(decoder.decode(await decrypt(key, encrypted))) as Manifest;
            return;
        } catch {
            if (!meta.password) return notice(t("viewer.badKey"));
            error = t("viewer.wrongPassword");
        }
    }
}
/** A public page with a password: the server checks it and then hands out an access token for the files. */
async function openPublicWithPassword() {
    let error = "";
    for (;;) {
        const password = await askPassword(error);
        notice(t("viewer.loading"));
        const response = await fetch(api, { headers: { "x-share-password": encodeURIComponent(password) }, referrerPolicy: "no-referrer" });
        if (response.status === 403) {
            error = t("viewer.wrongPassword");
            continue;
        }
        if (!response.ok) await refused(response);
        return open((await response.json()) as Meta);
    }
}

const placeholder = (kind: string) =>
    `<span class="no-access" title="${escapeXml(t("viewer.noAccessTitle"))}"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 2l12 12M6.6 6.7a2 2 0 0 0 2.8 2.8M4.3 4.4C2.9 5.3 2 6.6 1.5 8c1.2 3 3.8 5 6.5 5 1.3 0 2.5-.4 3.6-1.2M7 3.1c.3 0 .7-.1 1-.1 2.7 0 5.3 2 6.5 5-.4 1-1 1.9-1.7 2.6"/></svg>${escapeXml(t("viewer.noAccess"))}<span class="sr-only"> (${escapeXml(kind)})</span></span>`;

function render(markdown: string) {
    const md = new MarkdownIt({ html: false, linkify: true, breaks: true });
    enhance(md, { copy: t("notes.copyCode") });
    const opened = new WeakMap<object, "denied" | "plain" | "link">();
    md.renderer.rules.image = (tokens, index) => {
        const src = tokens[index].attrGet("src") ?? "";
        const alt = tokens[index].content;
        if (src.startsWith("share:denied:")) return placeholder(src.slice(13));
        if (src.startsWith("share:")) {
            const id = src.slice(6);
            const file = manifest.files[id];
            if (!file) return placeholder("file");
            if (file.type.startsWith("image/")) return `<img data-file="${escapeXml(id)}" alt="${escapeXml(alt || file.name)}">`;
            return `<a href="#" class="share-file" data-file="${escapeXml(id)}">${escapeXml(t("viewer.download", { name: file.name }))}</a>`;
        }
        if (EXTERNAL.test(src)) return `<a class="remote-image" href="${escapeXml(src)}" target="_blank" rel="noopener noreferrer">${escapeXml(t("notes.remoteImage", { name: alt || src }))}</a>`;
        return `<span class="unresolved">${escapeXml(alt)}</span>`;
    };
    md.renderer.rules.link_open = (tokens, index, options, _env, self) => {
        const token = tokens[index];
        const href = token.attrGet("href") ?? "";
        if (EXTERNAL.test(href)) {
            token.attrSet("target", "_blank");
            token.attrSet("rel", "noopener noreferrer");
            opened.set(token, "link");
            return self.renderToken(tokens, index, options);
        }
        if (href.startsWith("share:denied:")) {
            opened.set(token, "denied");
            return placeholder(href.slice(13));
        }
        const id = href.startsWith("share:") ? href.slice(6) : undefined;
        if (id && manifest.notes[id]) {
            opened.set(token, "link");
            return `<a href="?note=${escapeXml(id)}" class="internal" data-note="${escapeXml(id)}">`;
        }
        if (id && manifest.files[id]) {
            opened.set(token, "link");
            return `<a href="#" class="share-file" data-file="${escapeXml(id)}">`;
        }
        if (href.startsWith("#")) {
            opened.set(token, "link");
            return self.renderToken(tokens, index, options);
        }
        opened.set(token, "plain");
        return `<span class="unresolved">`;
    };
    md.renderer.rules.link_close = (tokens, index, options, _env, self) => {
        let open = index;
        while (open > 0 && tokens[open].type !== "link_open") open--;
        const kind = opened.get(tokens[open]);
        return kind === "denied" ? "" : kind === "plain" ? "</span>" : self.renderToken(tokens, index, options);
    };
    return md.render(markdown);
}

async function blobUrl(id: string) {
    let url = blobs.get(id);
    if (!url) {
        url = URL.createObjectURL(new Blob([(await bytes(id)) as BlobPart], { type: manifest.files[id].type }));
        blobs.set(id, url);
    }
    return url;
}

async function show(id: string, push: boolean) {
    const note = manifest.notes[id];
    if (!note) return;
    if (push) history.pushState(null, "", `?note=${encodeURIComponent(id)}${location.hash}`);
    const main = root.querySelector<HTMLElement>(".main")!;
    setMarkup(main, `<div class="note-head"><h1 class="title">${escapeXml(note.title)}</h1></div><article></article><footer class="share-foot">${escapeXml(t("viewer.generated", { time: formatDate(manifest.generatedAt) }))}</footer>`);
    const article = main.querySelector("article")!;
    setMarkup(article, render(decoder.decode(await bytes(id))));
    // A note that starts with its own title as a heading does not show the title twice.
    const first = article.firstElementChild;
    if (first?.tagName === "H1" && first.textContent?.trim() === note.title) main.querySelector(".note-head")?.remove();
    for (const image of article.querySelectorAll<HTMLImageElement>("img[data-file]")) void blobUrl(image.dataset.file!).then((url) => (image.src = url));
    main.scrollTop = 0;
    window.scrollTo(0, 0);
    document.title = `${note.title} · ${manifest.title}`;
    for (const row of root.querySelectorAll<HTMLElement>(".row")) row.classList.toggle("current", row.dataset.note === id);
    expandTo(id);
}

function tree(nodes: ManifestNode[]): string {
    return `<ul>${nodes
        .map((node) =>
            node.children
                ? `<li><div class="row"><button class="name folder" aria-expanded="false"><svg class="chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 4l4 4-4 4" /></svg>${escapeXml(node.name)}</button></div><div class="children" hidden>${tree(node.children)}</div></li>`
                : `<li><div class="row" data-note="${escapeXml(node.id?.startsWith("n") ? node.id : "")}"><button class="name${node.id?.startsWith("n") ? "" : " other"}" data-${node.id?.startsWith("n") ? "note" : "file"}="${escapeXml(node.id ?? "")}">${escapeXml(node.name)}</button></div></li>`
        )
        .join("")}</ul>`;
}
function expandTo(id: string) {
    const row = root.querySelector<HTMLElement>(`.row[data-note="${CSS.escape(id)}"]`);
    for (let parent = row?.parentElement; parent && parent !== root; parent = parent.parentElement) {
        if (parent.classList.contains("children")) {
            parent.hidden = false;
            parent.previousElementSibling?.querySelector(".folder")?.setAttribute("aria-expanded", "true");
        }
    }
}

function layout() {
    const folder = manifest.kind === "folder";
    root.className = `notes share-viewer ${folder ? "share-folder" : "share-note"}`;
    setMarkup(root, folder
        ? `<div class="layout"><aside><header><strong class="share-title">${escapeXml(manifest.title)}</strong><small class="hint">${escapeXml(t("viewer.sharedFolder"))}</small></header><nav>${tree(manifest.tree ?? [])}</nav></aside><div class="main"></div></div>`
        : `<div class="main"></div>`);
    root.addEventListener("click", (event) => {
        if (copyCode(event, t("notes.codeCopied"))) return;
        const target = (event.target as HTMLElement).closest<HTMLElement>("[data-note], [data-file], .folder");
        if (!target || target.classList.contains("row")) return;
        event.preventDefault();
        if (target.classList.contains("folder")) {
            const children = target.closest("li")!.querySelector<HTMLElement>(":scope > .children")!;
            children.hidden = !children.hidden;
            target.setAttribute("aria-expanded", String(!children.hidden));
        } else if (target.dataset.note) void show(target.dataset.note, true).catch(failed);
        else if (target.dataset.file) {
            const id = target.dataset.file;
            void blobUrl(id).then((url) => {
                const link = document.createElement("a");
                link.href = url;
                link.download = manifest.files[id].name;
                link.click();
            }, failed);
        }
    });
    window.addEventListener("popstate", () => void show(new URLSearchParams(location.search).get("note") ?? manifest.start ?? "", false).catch(failed));
    const start = new URLSearchParams(location.search).get("note") ?? manifest.start;
    if (start && manifest.notes[start]) return show(start, false);
    setMarkup(root.querySelector(".main")!, `<p class="hint share-empty">${escapeXml(t("viewer.empty"))}</p>`);
}

function failed(error: unknown) {
    if (error instanceof Stop) return;
    notice(t("viewer.failed"), error instanceof Error ? error.message : String(error));
}

void (async () => {
    try {
        notice(t("viewer.loading"));
        const first = await fetch(api, { referrerPolicy: "no-referrer" });
        if (first.status === 401) await openPublicWithPassword();
        else if (!first.ok) await refused(first);
        else await open((await first.json()) as Meta);
        if (manifest) await layout();
    } catch (error) {
        failed(error);
    }
})();
