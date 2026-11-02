// File order from Collation.md: the body holds a Markdown list, one item per file or folder, nesting for folders.
//
//     - 网络工程
//       - 路由服务器 —— notes after the separator are for the reader
//         - 基本WAN_LAN
//       - ...
//       - 网络技巧
//
// Listed items come first in the listed order; the others keep the default order, at `...` if there is one, else
// after the listed ones. Only list items count: headings and paragraphs around the list are free text. The plug-in,
// web notes and shares all order with this module, so the three agree.

/** Separates a name from its note. */
export const NOTE_SEPARATOR = " —— ";
/** Stands for the items not listed. */
export const REST = "...";
/** The rules note in a folder; the one at the vault root covers the whole vault. */
export const RULES_FILE = "Collation.md";
/** The name it had before 0.26.3, Custom File Explorer sorting's: no longer read, only offered for conversion. */
export const FORMER_RULES_FILE = "sortspec.md";

/** Whether `path` is a rules note (`name` the current or the former name). */
export const isRulesNote = (path: string, name = RULES_FILE) => path === name || path.endsWith(`/${name}`);

/** The order of one folder: names, with `REST` at most once. */
export type FolderOrder = string[];
/** Folder path ("" for the vault root) to its order. */
export type FileOrder = Map<string, FolderOrder>;

const folderOf = (path: string) => (path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : "");
const join = (folder: string, name: string) => (folder ? `${folder}/${name}` : name);

/** The text after the front matter, if the note has any. */
export function bodyOf(text: string) {
    const match = /^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/.exec(text);
    return match ? text.slice(match[0].length) : text;
}

/** The name an item stands for: before the separator, a wiki link's target name, without `.md`. */
export function itemName(text: string) {
    let name = text.trim();
    const at = name.indexOf(NOTE_SEPARATOR);
    if (at >= 0) name = name.slice(0, at).trim();
    const link = /^\[\[([^\]|#]+)(?:[#|][^\]]*)?\]\]$/.exec(name);
    if (link) name = link[1].slice(link[1].lastIndexOf("/") + 1).trim();
    return name;
}

const LIST_ITEM = /^([ \t]*)(?:[-*+]|\d+[.)])[ \t]+(.*)$/;
const width = (indent: string) => [...indent].reduce((n, c) => n + (c === "\t" ? 4 : 1), 0);

/** The order a rules note gives, relative to `folder`, the folder it is in. */
export function parseOrder(text: string, folder = ""): FileOrder {
    const order: FileOrder = new Map();
    let stack: { indent: number; path: string }[] = [];
    let fenced = false;
    for (const line of bodyOf(text).split(/\r?\n/)) {
        if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
        if (fenced) continue;
        const item = LIST_ITEM.exec(line);
        if (!item) {
            // Text at the margin ends a list; indented text continues an item, and blank lines separate nothing.
            if (/^\S/.test(line)) stack = [];
            continue;
        }
        const indent = width(item[1]);
        while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
        const parent = stack.length ? stack[stack.length - 1].path : folder;
        const name = itemName(item[2]);
        if (!name) continue;
        const names = order.get(parent) ?? [];
        if (!names.includes(name)) names.push(name);
        order.set(parent, names);
        stack.push({ indent, path: name === REST ? `${parent}/\0` : join(parent, name) });
    }
    return order;
}

/** The order for a folder from the rules notes found in the vault: the nearest one at or above the folder decides. */
export function orderFor(sources: { folder: string; order: FileOrder }[], folder: string): FolderOrder | undefined {
    const covering = sources
        .filter((source) => source.folder === "" || folder === source.folder || folder.startsWith(`${source.folder}/`))
        .sort((a, b) => b.folder.length - a.folder.length)[0];
    return covering?.order.get(folder);
}

/** Parses the rules notes among `files` (path and text); the result answers `orderFor`. */
export function readOrders(files: { path: string; text: string }[]) {
    return files
        .filter((file) => isRulesNote(file.path))
        .map((file) => ({ folder: folderOf(file.path), order: parseOrder(file.text, folderOf(file.path)) }));
}

/** The names an item answers to: a folder by its name, a note by its name with or without `.md`, other files by name. */
export function namesOf(name: string, folder: boolean): string[] {
    return !folder && name.toLowerCase().endsWith(".md") ? [name.slice(0, -3), name] : [name];
}

/**
 * Arranges items already in their default order: listed ones in the listed order, the rest where `...` stands or after
 * the listed ones. Names that match nothing are ignored; an item is placed once.
 */
export function arrange<T>(items: T[], order: FolderOrder | undefined, names: (item: T) => string[]): T[] {
    if (!order?.length) return items;
    const placed = new Set<T>();
    const before: T[] = [];
    const after: T[] = [];
    let target = before;
    for (const name of order) {
        if (name === REST) {
            target = after;
            continue;
        }
        const item = items.find((candidate) => !placed.has(candidate) && names(candidate).includes(name));
        if (item === undefined) continue;
        placed.add(item);
        target.push(item);
    }
    return [...before, ...items.filter((item) => !placed.has(item)), ...after];
}

/** Obsidian's default order by name: folders first, then files, each by name as people read numbers. */
export function defaultOrder<T>(items: T[], name: (item: T) => string, folder: (item: T) => boolean): T[] {
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
    return [...items].sort((a, b) => Number(folder(b)) - Number(folder(a)) || collator.compare(name(a), name(b)));
}

/** The result of converting front-matter rules of Custom File Explorer sorting. */
export interface Conversion {
    /** The new text of the rules note: the list, then the former body. */
    text: string;
    /** Lines of the former rules that the list cannot express; they are dropped. */
    unsupported: string[];
    /** Folders that had rules but were not listed in their parent's rules: now listed after the unlisted items. */
    moved: string[];
}

/**
 * Converts the `sorting-spec` front matter (as Custom File Explorer sorting reads it) into the body list. Only folder
 * blocks (`target-folder: <path>`) and the names under them, with `...` or `%`, are kept. `childrenOf` gives a folder's
 * items in their current order; it fills in the list of a folder that had no rules of its own but holds a folder that
 * had, so that nesting does not change the order shown.
 */
export function convertFrontMatter(text: string, folder: string, childrenOf: (path: string) => string[]): Conversion {
    const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text);
    if (!match) return { text, unsupported: [], moved: [] };
    const lines = match[1].split(/\r?\n/);
    const start = lines.findIndex((line) => /^sorting-spec:/.test(line));
    if (start < 0) return { text, unsupported: [], moved: [] };
    const block: string[] = [];
    const inline = lines[start].replace(/^sorting-spec:\s*/, "");
    if (inline && !/^[|>][-+]?$/.test(inline)) block.push(inline);
    let end = start + 1;
    while (end < lines.length && (/^\s/.test(lines[end]) || lines[end] === "")) block.push(lines[end++]);

    const order: FileOrder = new Map();
    const unsupported: string[] = [];
    const moved: string[] = [];
    let current: string | undefined;
    for (const raw of block) {
        const line = raw.trim();
        if (!line || line.startsWith("//")) continue;
        const target = /^target-folder:\s*(.*)$/.exec(line);
        if (target) {
            const path = target[1].trim().replace(/^\.\//, "").replace(/\/$/, "");
            current = path === "/" || path === "" || path === "." ? folder : path.startsWith("/") ? path.slice(1) : join(folder, path);
            if (!order.has(current)) order.set(current, []);
            continue;
        }
        const plain = current !== undefined && !/^(order-|sorting:|with-|<|>|\/[:!.]|\/(files|folders)\b|\\|::)/.test(line) && !line.includes("...");
        if (current !== undefined && (line === "..." || line === "%")) order.get(current)!.push(REST);
        else if (plain) order.get(current!)!.push(line);
        else unsupported.push(line);
    }

    // A folder with rules must be reachable from the list: each folder above it without rules gets its current order.
    for (const path of [...order.keys()]) {
        let child = path;
        while (child !== folder && child.startsWith(folder ? `${folder}/` : "")) {
            const parent = folderOf(child);
            const name = child.slice(child.lastIndexOf("/") + 1);
            const names = order.get(parent);
            if (!names) order.set(parent, childrenOf(parent));
            else if (!names.includes(name)) {
                if (!names.includes(REST)) names.push(REST);
                names.push(name);
                moved.push(child);
            }
            child = parent;
        }
    }

    const out: string[] = [];
    const write = (path: string, depth: number) => {
        for (const name of order.get(path) ?? []) {
            out.push(`${"  ".repeat(depth)}- ${name}`);
            if (name !== REST) write(join(path, name), depth + 1);
        }
    };
    write(folder, 0);

    const front = lines.filter((_, index) => index < start || index >= end);
    const head = front.some((line) => line.trim()) ? `---\n${front.join("\n")}\n---\n` : "";
    const rest = text.slice(match[0].length).replace(/^\s*\n/, "");
    return { text: `${head}${out.join("\n")}\n${rest ? `\n${rest}` : ""}`, unsupported, moved };
}
