// File tree order for web notes: the vault's sortspec.md rules applied with the plug-in's own sorting engine.
import { parse as parseYaml } from "yaml";
import { TAbstractFile, TFile, TFolder } from "./obsidian-shim";
import { SortingSpecProcessor, sortFolderItems, type CustomSortSpec, type ProcessingContext, type SortSpecsCollection } from "@tabularium/custom-sort/engine";

const SPEC_KEY = "sorting-spec";

export interface SortedNode {
    name: string;
    path: string;
    folder: boolean;
    children: SortedNode[];
}
/** Front matter of a note, or undefined when it has none or it does not parse. */
export function frontMatter(text: string): Record<string, unknown> | undefined {
    const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text);
    if (!match) return undefined;
    try {
        const value: unknown = parseYaml(match[1]);
        return value && typeof value === "object" ? (value as Record<string, unknown>) : undefined;
    } catch {
        return undefined;
    }
}
const folderOf = (path: string) => (path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : "");
const nameOf = (path: string) => path.slice(path.lastIndexOf("/") + 1);
/**
 * Files that may hold sorting rules, as the plug-in reads them with its default settings: sortspec.md (or
 * sortspec.md.md) and folder notes named after their folder.
 */
export function isSpecSource(path: string) {
    const name = nameOf(path);
    const folder = nameOf(folderOf(path));
    return name === "sortspec.md" || name === "sortspec.md.md" || (folder !== "" && name === `${folder}.md`);
}
/** Parses the rules found in the spec sources; an invalid rule disables the custom order with its message. */
export function parseSpecs(sources: { path: string; text: string }[]): { collection?: SortSpecsCollection; error?: string } {
    const processor = new SortingSpecProcessor();
    let collection: SortSpecsCollection | null | undefined;
    for (const source of sources) {
        const spec = frontMatter(source.text)?.[SPEC_KEY];
        if (typeof spec !== "string") continue;
        const folder = folderOf(source.path) || "/";
        collection = processor.parseSortSpecFromText(spec.split("\n"), folder, nameOf(source.path), collection);
        if (collection === null) return { collection: undefined, error: processor.recentErrorMessage ?? "" };
    }
    return { collection: collection ?? undefined, error: undefined };
}
/** Whether any rule sorts or groups by front matter, so the notes' front matter must be read first. */
export const needsMetadata = (sources: { text: string }[]) => sources.some((source) => /metadata/i.test(frontMatter(source.text)?.[SPEC_KEY] as string ?? ""));

function specFor(collection: SortSpecsCollection | undefined, folder: TFolder): CustomSortSpec | null | undefined {
    if (!collection) return undefined;
    return collection.sortSpecByPath?.[folder.path] ?? collection.sortSpecByName?.[folder.name] ?? collection.sortSpecByWildcard?.folderMatch(folder.path, folder.name);
}
/**
 * The tree of `files`, each folder ordered by its rules; folders without rules, and rules that depend on bookmarks
 * (not synchronised), fall back to Obsidian's default order by name.
 */
export function sortedTree(
    files: { path: string; mtime: number; size: number }[],
    rootName: string,
    collection: SortSpecsCollection | undefined,
    metadata: Map<string, Record<string, unknown>>
): SortedNode {
    const root = new TFolder("/", "");
    const folders = new Map<string, TFolder>([["", root]]);
    const folderAt = (path: string): TFolder => {
        let folder = folders.get(path);
        if (folder) return folder;
        const parent = folderAt(folderOf(path));
        folder = new TFolder(path, nameOf(path));
        folder.parent = parent;
        parent.children.push(folder);
        folders.set(path, folder);
        return folder;
    };
    for (const file of files) {
        const parent = folderAt(folderOf(file.path));
        const entry = new TFile(file.path, nameOf(file.path), { ctime: file.mtime, mtime: file.mtime, size: file.size });
        entry.parent = parent;
        parent.children.push(entry);
    }
    const context: ProcessingContext = { _mCache: { getCache: (path: string) => ({ frontmatter: metadata.get(path) }) } };
    const convert = (entry: TAbstractFile): SortedNode => {
        if (!(entry instanceof TFolder)) return { name: entry.name, path: entry.path, folder: false, children: [] };
        const ordered = sortFolderItems(entry, entry.children, specFor(collection, entry), context, "alphabetical");
        return { name: entry === root ? rootName : entry.name, path: entry === root ? "" : entry.path, folder: true, children: ordered.map(convert) };
    };
    return convert(root);
}
