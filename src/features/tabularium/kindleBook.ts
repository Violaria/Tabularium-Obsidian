// Assembles a Send to Kindle book from vault paths. The caller supplies file access and link resolution,
// so the Obsidian plug-in and the web notes page build identical books.
import { buildEpub, type EpubChapter, type EpubImage } from "./epub";
import { isPackableImage, renderNote } from "./render";

export interface BookSource {
    read(path: string): Promise<string>;
    readBinary(path: string): Promise<Uint8Array>;
    /** Vault path of the file a link in note `from` points at. */
    resolve(target: string, from: string): string | undefined;
}

export const MAX_BOOK_BYTES = 50 * 1024 * 1024;
const MEDIA_TYPES: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
};
const extension = (path: string) => path.slice(path.lastIndexOf(".") + 1).toLowerCase();
const folderOf = (path: string) => path.slice(0, Math.max(0, path.lastIndexOf("/")));
export const noteTitle = (path: string) => path.slice(path.lastIndexOf("/") + 1).replace(/\.md$/i, "");

/** Server errors the clients translate for the user. */
export const KINDLE_ERRORS = [
    "Kindle address not set",
    "Mail delivery is not configured",
    "Daily Kindle delivery limit reached",
    "Request body too large",
];

/** Interface texts placed inside the book. */
export interface BookTexts {
    language: string;
    contents: string;
    missingImage: (name: string) => string;
}

/** Markdown notes below `folder` (vault root when empty), sorted by path. */
export function notesIn(folder: string, files: readonly string[]) {
    return files
        .filter((file) => /\.md$/i.test(file) && (!folder || file.startsWith(`${folder}/`)))
        .sort((a, b) => a.localeCompare(b, "zh"));
}

/**
 * Builds the book in memory; images are packed once each, in the order they are first referenced.
 * For a folder book, notes in sub-folders of `folder` are grouped by their relative folder path.
 */
export async function assembleBook(
    source: BookSource,
    notes: readonly string[],
    title: string,
    texts: BookTexts,
    folder?: string
) {
    const images: EpubImage[] = [];
    const packed = new Map<string, string>();
    const chapters: EpubChapter[] = [];
    for (const note of notes) {
        const resolve = (target: string) => {
            const image = source.resolve(target, note);
            if (!image || !isPackableImage(image)) return undefined;
            if (!packed.has(image)) {
                const href = `images/image-${packed.size + 1}.${extension(image)}`;
                packed.set(image, href);
                images.push({ href, mediaType: MEDIA_TYPES[extension(image)], data: new Uint8Array() });
            }
            return packed.get(image);
        };
        const rendered = renderNote(await source.read(note), resolve, texts.missingImage);
        const parent = folderOf(note);
        const group =
            folder !== undefined && parent !== folder ? parent.slice(folder ? folder.length + 1 : 0) : undefined;
        chapters.push({ title: noteTitle(note), ...rendered, group });
    }
    for (const [path, href] of packed)
        images.find((image) => image.href === href)!.data = await source.readBinary(path);
    return buildEpub({
        title,
        language: texts.language,
        contentsTitle: texts.contents,
        identifier: `urn:uuid:${crypto.randomUUID()}`,
        modified: new Date(),
        chapters,
        images,
    });
}
