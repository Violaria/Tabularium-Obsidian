import { FORMER_NAMES, PREFIXMD_LOGFILE } from "@tabularium/sync-core/compat/common/types";
// Building the content of a share from vault files. References between notes and to attachments are resolved with
// Obsidian's link rules; those the owner allowed point into the share (`share:<id>`), the others become a placeholder
// that keeps only the kind of reference (`share:denied:<kind>`), so a page never shows the title or path of something
// that was not shared. Both clients (web notes and the plug-in) build identical shares with this module.
import { resolveLinkpath } from "@/features/tabularium/linkpath";
import { outsideCode, stripFrontMatter } from "@/features/tabularium/render";

export type ReferenceKind = "note" | "image" | "file";
export interface Reference {
    path: string;
    kind: ReferenceKind;
    /** Embedded (`![[…]]`, `![](…)`) rather than linked. */
    embed: boolean;
}
export interface ShareTreeNode {
    name: string;
    path: string;
    folder: boolean;
    children: ShareTreeNode[];
}
export interface ShareSource {
    files: readonly string[];
    read(path: string): Promise<string>;
    readBinary(path: string): Promise<Uint8Array>;
    /** The folder's files in display order (the vault's sortspec.md rules). */
    tree(folder: string): ShareTreeNode;
}

const IMAGE = /\.(png|jpe?g|gif|svg|webp|bmp|avif)$/i;
const SCHEME = /^[a-z][a-z0-9+.-]*:/i;
export const kindOf = (path: string): ReferenceKind => (/\.md$/i.test(path) ? "note" : IMAGE.test(path) ? "image" : "file");
const nameOf = (path: string) => path.slice(path.lastIndexOf("/") + 1);
export const titleOf = (path: string) => nameOf(path).replace(/\.md$/i, "");
const TYPES: Record<string, string> = {
    png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", svg: "image/svg+xml", webp: "image/webp",
    bmp: "image/bmp", avif: "image/avif", pdf: "application/pdf", txt: "text/plain", mp3: "audio/mpeg", mp4: "video/mp4",
};
const typeOf = (path: string) => TYPES[path.slice(path.lastIndexOf(".") + 1).toLowerCase()] ?? "application/octet-stream";

/** Files of a share target: the note itself, or every file below the folder ("" for the whole vault). */
/** Operational files at the vault root: the log (which names other notes) and the flag files, this plug-in's and the original's. */
const OPERATIONAL = new RegExp(
    `^((${PREFIXMD_LOGFILE}|${FORMER_NAMES.logFilePrefix}).*\\.md|redflag[23]?\\.md|flag_(fetch|rebuild)\\.md|tabularium-(suspend|fetch|rebuild)\\.md)$`,
    "i"
);

export function included(target: string, folder: boolean, files: readonly string[]) {
    return folder
        ? files.filter((file) => (!target || file.startsWith(`${target}/`)) && !OPERATIONAL.test(file))
        : files.filter((file) => file === target);
}

/**
 * Rewrites the references of a note written at `from`. `decide` receives each resolved reference and returns the
 * address inside the share, or null when the reference is not shared. Unresolved links stay as written: they point
 * at nothing in the vault.
 */
export function rewriteReferences(markdown: string, from: string, files: readonly string[], decide: (reference: Reference) => string | null) {
    const resolve = (written: string, embed: boolean) => {
        const path = resolveLinkpath(written, from, files);
        return path ? { path, kind: kindOf(path), embed } : undefined;
    };
    const denied = (reference: Reference) => `share:denied:${reference.kind}`;
    const decodeHref = (href: string) => {
        const plain = href.startsWith("<") ? href.slice(1, -1) : href;
        try {
            return decodeURI(plain);
        } catch {
            return plain;
        }
    };
    // Raw HTML shows as text on share pages: its comments go, and the files its src and href name are treated like links,
    // so a page never shows the path of something that was not shared.
    const htmlReference = (attribute: string, value: string) => {
        if (SCHEME.test(value) || value.startsWith("#")) return value;
        const reference = resolve(decodeHref(value), attribute.toLowerCase() === "src");
        if (!reference) return value;
        return decide(reference) ?? denied(reference);
    };
    return outsideCode(stripFrontMatter(markdown), (part) =>
        part
            .replace(/%%[\s\S]*?%%/g, "")
            .replace(/<!--[\s\S]*?-->/g, "")
            .replace(/<[a-zA-Z][^>]*>/g, (tag) =>
                tag.replace(/\b(src|href)(\s*=\s*)("([^"]*)"|'([^']*)')/gi, (_all, attribute: string, equals: string, quoted: string, double?: string, single?: string) => {
                    const quote = quoted[0];
                    return `${attribute}${equals}${quote}${htmlReference(attribute, double ?? single ?? "")}${quote}`;
                })
            )
            .replace(/(!?)\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g, (whole, bang: string, target: string, alias: string | undefined) => {
                const reference = resolve(target.trim(), bang === "!");
                if (!reference) return whole;
                const href = decide(reference);
                if (href === null) return `${bang}[](${denied(reference)})`;
                const text = bang ? (alias ?? "").replace(/^\d+(x\d+)?$/, "") : (alias ?? titleOf(target.replace(/[#^].*$/, "").trim()));
                return `${bang}[${text.replace(/[[\]]/g, "")}](${href})`;
            })
            .replace(/(!?)\[([^\]\n]*)\]\(\s*(<[^>\n]+>|[^)\s]+)((?:\s+(?:"[^"\n]*"|'[^'\n]*'))?)\s*\)/g, (whole, bang: string, text: string, href: string, title: string) => {
                if (SCHEME.test(href) || href.startsWith("#")) return whole;
                const reference = resolve(decodeHref(href), bang === "!");
                if (!reference) return whole;
                const target = decide(reference);
                return target === null ? `${bang}[](${denied(reference)})` : `${bang}[${text}](${target}${title})`;
            })
            .replace(/^( {0,3}\[[^\]\n]+\]:[ \t]*)(<[^>\n]+>|\S+)(.*)$/gm, (whole, label: string, href: string, rest: string) => {
                if (SCHEME.test(href) || href.startsWith("#")) return whole;
                const reference = resolve(decodeHref(href), false);
                if (!reference) return whole;
                const target = decide(reference);
                return `${label}${target ?? denied(reference)}${target === null ? "" : rest}`;
            })
    );
}

/** The references a note makes, each resolved path once. */
export function referencesOf(markdown: string, from: string, files: readonly string[]) {
    const found = new Map<string, Reference>();
    rewriteReferences(markdown, from, files, (reference) => {
        const seen = found.get(reference.path);
        // A file both linked and embedded counts as embedded: it is shown on the page.
        if (!seen || (reference.embed && !seen.embed)) found.set(reference.path, reference);
        return "";
    });
    return [...found.values()];
}

/** A reference outside the shared target, as listed for the owner's decision; allowed notes list theirs below. */
export interface ReviewNode extends Reference {
    children: ReviewNode[];
}
/** Embedded images and attachments are shared by default; linked and embedded notes are not. */
export const sharedByDefault = (reference: Reference) => reference.embed && reference.kind !== "note";

/**
 * The references of the target that lie outside it, nested under the allowed notes that make them. `allowed` decides
 * which notes are opened further (the owner's current choice).
 */
export async function reviewTree(source: ShareSource, target: string, folder: boolean, allowed: (path: string) => boolean) {
    const inside = new Set(included(target, folder, source.files));
    const listed = new Set<string>();
    const walk = async (notes: string[]): Promise<ReviewNode[]> => {
        const nodes: ReviewNode[] = [];
        for (const note of notes) {
            for (const reference of referencesOf(await source.read(note), note, source.files)) {
                if (inside.has(reference.path) || listed.has(reference.path)) continue;
                listed.add(reference.path);
                nodes.push({ ...reference, children: [] });
            }
        }
        for (const node of nodes) if (node.kind === "note" && allowed(node.path)) node.children = await walk([node.path]);
        return nodes;
    };
    return walk([...inside].filter((path) => kindOf(path) === "note"));
}

export interface ManifestNode {
    name: string;
    id?: string;
    children?: ManifestNode[];
}
export interface Manifest {
    v: 1;
    title: string;
    kind: "note" | "folder";
    generatedAt: number;
    /** The shared note, or the first note of a folder. */
    start?: string;
    tree?: ManifestNode[];
    notes: Record<string, { title: string }>;
    files: Record<string, { name: string; type: string }>;
}
export interface BuiltShare {
    manifest: Manifest;
    /** File name in the share (the id) to its content: Markdown for notes, bytes for attachments. */
    files: Map<string, Uint8Array>;
    /** References left out because the owner was never asked about them (found after the last review). */
    unreviewed: string[];
}

/**
 * Builds the share. Every file of the target is included; a reference outside it is included when the owner allowed
 * it (`authorised`), recursively for allowed notes. References not in `reviewed` are left out and returned.
 */
export async function buildShare(source: ShareSource, options: { title: string; target: string; folder: boolean; authorised: Set<string>; reviewed: Set<string> }): Promise<BuiltShare> {
    const encoder = new TextEncoder();
    const inside = included(options.target, options.folder, source.files);
    const ids = new Map<string, string>();
    const queue: string[] = [];
    const manifest: Manifest = { v: 1, title: options.title, kind: options.folder ? "folder" : "note", generatedAt: Date.now(), notes: {}, files: {} };
    const files = new Map<string, Uint8Array>();
    const unreviewed = new Set<string>();
    let notes = 0;
    let attachments = 0;
    const idOf = (path: string) => {
        let id = ids.get(path);
        if (id) return id;
        if (kindOf(path) === "note") {
            id = `n${++notes}`;
            manifest.notes[id] = { title: titleOf(path) };
            queue.push(path);
        } else {
            id = `a${++attachments}`;
            manifest.files[id] = { name: nameOf(path), type: typeOf(path) };
        }
        ids.set(path, id);
        return id;
    };
    for (const path of inside) idOf(path);
    const shared = new Set(inside);
    while (queue.length) {
        const path = queue.shift()!;
        const text = rewriteReferences(await source.read(path), path, source.files, (reference) => {
            if (shared.has(reference.path)) return `share:${idOf(reference.path)}`;
            if (!options.reviewed.has(reference.path)) {
                unreviewed.add(reference.path);
                return null;
            }
            if (!options.authorised.has(reference.path)) return null;
            shared.add(reference.path);
            return `share:${idOf(reference.path)}`;
        });
        files.set(ids.get(path)!, encoder.encode(text));
    }
    for (const [path, id] of ids) if (!id.startsWith("n")) files.set(id, await source.readBinary(path));
    if (options.folder) {
        const convert = (node: ShareTreeNode): ManifestNode =>
            node.folder ? { name: node.name, children: node.children.map(convert) } : { name: titleOf(node.name), id: ids.get(node.path) };
        manifest.tree = source.tree(options.target).children.map(convert);
        const first = (nodes: ManifestNode[]): string | undefined => {
            for (const node of nodes) {
                const found = node.children ? first(node.children) : node.id?.startsWith("n") ? node.id : undefined;
                if (found) return found;
            }
        };
        manifest.start = first(manifest.tree);
    } else manifest.start = ids.get(options.target);
    return { manifest, files, unreviewed: [...unreviewed] };
}

/** The upload format the server reads: per file its name length (2 bytes), name, data length (4 bytes) and data. */
export function encodeBundle(files: Map<string, Uint8Array>) {
    const encoder = new TextEncoder();
    let size = 0;
    for (const [name, data] of files) size += 6 + encoder.encode(name).length + data.length;
    const out = new Uint8Array(size);
    const view = new DataView(out.buffer);
    let at = 0;
    for (const [name, data] of files) {
        const label = encoder.encode(name);
        view.setUint16(at, label.length);
        out.set(label, at + 2);
        at += 2 + label.length;
        view.setUint32(at, data.length);
        out.set(data, at + 4);
        at += 4 + data.length;
    }
    return out;
}
