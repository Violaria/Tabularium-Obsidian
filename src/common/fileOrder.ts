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

/** A list item of a rules note, as read: where it is and which file or folder it stands for. */
export interface ListItem {
    /** Line index in the whole text, front matter included. */
    line: number;
    /** The indentation as written, and its width (a tab counts four). */
    indentText: string;
    indent: number;
    /** The folder the item orders, and the item's own path in it (`REST` items get a path no file has). */
    parent: string;
    name: string;
    path: string;
    /** Set on the first item after text at the margin: a list of its own begins there. */
    listStart: boolean;
}

/** The list items of a rules note in `folder`, in the order written. */
export function listItems(text: string, folder = ""): ListItem[] {
    const items: ListItem[] = [];
    const lines = text.split(/\r?\n/);
    const offset = lines.length - bodyOf(text).split(/\r?\n/).length;
    let stack: { indent: number; path: string }[] = [];
    let fenced = false;
    let listStart = true;
    for (let index = offset; index < lines.length; index++) {
        const line = lines[index];
        if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
        if (fenced) continue;
        const item = LIST_ITEM.exec(line);
        if (!item) {
            // Text at the margin ends a list; indented text continues an item, and blank lines separate nothing.
            if (/^\S/.test(line)) {
                stack = [];
                listStart = true;
            }
            continue;
        }
        const indent = width(item[1]);
        while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
        const parent = stack.length ? stack[stack.length - 1].path : folder;
        const name = itemName(item[2]);
        if (!name) continue;
        const path = name === REST ? `${parent}/\0` : join(parent, name);
        items.push({ line: index, indentText: item[1], indent, parent, name, path, listStart });
        listStart = false;
        stack.push({ indent, path });
    }
    return items;
}

/** The order a rules note gives, relative to `folder`, the folder it is in. */
export function parseOrder(text: string, folder = ""): FileOrder {
    const order: FileOrder = new Map();
    for (const item of listItems(text, folder)) {
        const names = order.get(item.parent) ?? [];
        if (!names.includes(item.name)) names.push(item.name);
        order.set(item.parent, names);
    }
    return order;
}

/** The first item standing for `path` (one of its `names` in its folder). */
const findItem = (items: ListItem[], parent: string, names: string[]) =>
    items.find((item) => item.parent === parent && names.includes(item.name));

/**
 * The line to show for an item: its own, else that of the nearest folder above it that is listed, else the first item
 * of the list. Undefined when the note has no list. `names` are the names the item answers to (see namesOf).
 */
export function locateItem(text: string, folder: string, path: string, names: string[]): number | undefined {
    const items = listItems(text, folder);
    const own = findItem(items, folderOf(path), names);
    if (own) return own.line;
    for (let at = folderOf(path); at !== folder && at !== ""; at = folderOf(at)) {
        const listed = findItem(items, folderOf(at), [at.slice(at.lastIndexOf("/") + 1)]);
        if (listed) return listed.line;
    }
    return items[0]?.line;
}

/** The lines an item takes: its own, its nested items and text continuing them. */
function extent(lines: string[], items: ListItem[], item: ListItem): [number, number] {
    const index = items.indexOf(item);
    let last = item.line;
    for (const next of items.slice(index + 1)) {
        if (next.listStart || next.indent <= item.indent) break;
        last = next.line;
    }
    // Indented text after the last line still belongs to it.
    while (last + 1 < lines.length && /^[ \t]+\S/.test(lines[last + 1]) && !LIST_ITEM.exec(lines[last + 1])) last++;
    return [item.line, last + 1];
}

/** The indentation of items one level below `item`: as its children have it, else one step more than the list uses. */
function childIndent(items: ListItem[], item: ListItem | undefined): string {
    if (!item) return "";
    const child = items.find((other) => other.parent === item.path);
    if (child) return child.indentText;
    const step = items.map((other) => other.indent).filter((indent) => indent > 0).sort((a, b) => a - b)[0];
    return item.indentText + (item.indentText.includes("\t") ? "\t" : " ".repeat(step ?? 2));
}

/**
 * Moves an item to the first or the last place of its folder's list, writing it in if it is not listed (folders above
 * it that are not listed are written in where the unlisted items stand, so the order shown does not jump). Last means
 * after the unlisted items too: a `...` is added before it when the folder's list has none. `name` is the name to write
 * for the item, `names` the names it answers to. Returns the new text.
 */
export function moveItem(text: string, folder: string, path: string, name: string, names: string[], place: "first" | "last"): string {
    const newline = text.includes("\r\n") ? "\r\n" : "\n";
    let lines = text.split(/\r?\n/);
    const parent = folderOf(path);
    // The chain of folders between the note's folder and the item, outermost first.
    const chain: string[] = [];
    for (let at = parent; at !== folder && at !== ""; at = folderOf(at)) chain.unshift(at);
    if (folder !== "" && !(parent === folder || parent.startsWith(`${folder}/`))) throw new Error(`${path} is not under ${folder}`);
    /** Inserts lines at `index` and returns the new text's items. A first list gets a paragraph of its own. */
    const insert = (index: number, added: string[]) => {
        if (!listItems(lines.join(newline), folder).length && index > 0 && lines[index - 1].trim()) added = ["", ...added];
        lines = [...lines.slice(0, index), ...added, ...lines.slice(index)];
        return listItems(lines.join(newline), folder);
    };
    /** Where an item goes among its siblings: before the first, before `...`, or after the last. */
    const slot = (items: ListItem[], at: string, where: "first" | "rest" | "last") => {
        const siblings = items.filter((item) => item.parent === at);
        if (!siblings.length) {
            const owner = at === folder ? undefined : items.find((item) => item.path === at);
            if (owner) return extent(lines, items, owner)[1];
            // No list yet: after the text, before the final line break.
            return items[0]?.line ?? (lines[lines.length - 1] === "" ? lines.length - 1 : lines.length);
        }
        if (where === "first") return siblings[0].line;
        const rest = siblings.find((item) => item.name === REST);
        if (where === "rest" && rest) return rest.line;
        return extent(lines, items, siblings[siblings.length - 1])[1];
    };
    const indentFor = (items: ListItem[], at: string) =>
        at === folder ? (items.find((item) => item.parent === folder)?.indentText ?? "") : childIndent(items, items.find((item) => item.path === at));
    let items = listItems(text, folder);
    // Folders on the way that are not listed yet.
    for (const at of chain) {
        if (items.some((item) => item.path === at)) continue;
        const owner = folderOf(at);
        items = insert(slot(items, owner, "rest"), [`${indentFor(items, owner)}- ${at.slice(at.lastIndexOf("/") + 1)}`]);
    }
    // The item itself, cut out with what it holds, or written new.
    const found = findItem(items, parent, names);
    let block = [`${indentFor(items, parent)}- ${name}`];
    if (found) {
        const [from, to] = extent(lines, items, found);
        block = lines.slice(from, to);
        lines = [...lines.slice(0, from), ...lines.slice(to)];
        items = listItems(lines.join(newline), folder);
    }
    const siblingIndent = indentFor(items, parent);
    if (place === "last" && !items.some((item) => item.parent === parent && item.name === REST))
        items = insert(slot(items, parent, "last"), [`${siblingIndent}- ${REST}`]);
    insert(slot(items, parent, place), block);
    return lines.join(newline);
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
