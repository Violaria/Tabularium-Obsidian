// The part of the plug-in's sorting engine (packages/custom-sort/src/engine.ts) that web notes use. Vite bundles the
// engine from source; type checks read this declaration instead of compiling the engine under the notes settings.
import type { TAbstractFile, TFolder } from "./obsidian-shim";

export type CustomSortSpec = object;
export interface SortSpecsCollection {
    sortSpecByPath?: Record<string, CustomSortSpec | undefined>;
    sortSpecByName?: Record<string, CustomSortSpec | undefined>;
    sortSpecByWildcard?: { folderMatch(path: string, name?: string): CustomSortSpec | null };
}
export interface ProcessingContext {
    _mCache?: { getCache(path: string): { frontmatter?: Record<string, unknown> } | undefined };
}
export class SortingSpecProcessor {
    recentErrorMessage: string | null;
    parseSortSpecFromText(text: string[], folderPath: string, sortingSpecFileName: string, collection?: SortSpecsCollection | null): SortSpecsCollection | null | undefined;
}
export function sortFolderItems(folder: TFolder, items: TAbstractFile[], spec: CustomSortSpec | null | undefined, ctx: ProcessingContext, uiSortOrder: string): TAbstractFile[];
