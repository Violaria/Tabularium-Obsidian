// EPUB 3 packaging with an NCX fallback, written for Send to Kindle: unique playOrder values,
// at most two navigation levels and well-formed XHTML. Independent of Obsidian so it can be tested alone.

export interface EpubImage {
    href: string;
    mediaType: string;
    data: Uint8Array;
}
export interface EpubChapter {
    title: string;
    /** XHTML fragment placed after the chapter heading. */
    body: string;
    /** Second-level entries for a single-note book, pointing at ids inside the body. */
    headings: { id: string; title: string }[];
    /** Sub-folder the note belongs to inside a folder book; consecutive chapters share one group entry. */
    group?: string;
}
export interface EpubBook {
    title: string;
    language: string;
    /** Heading of the table of contents in the interface language. */
    contentsTitle: string;
    identifier: string;
    modified: Date;
    chapters: EpubChapter[];
    images: EpubImage[];
}

const encoder = new TextEncoder();
export const escapeXml = (value: string) =>
    value.replace(
        /[&<>"']/g,
        (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!
    );

let crcTable: Uint32Array | undefined;
function crc32(data: Uint8Array) {
    crcTable ??= Uint32Array.from({ length: 256 }, (_, n) => {
        let c = n;
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        return c >>> 0;
    });
    let crc = 0xffffffff;
    for (const byte of data) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
}

/** Stored (uncompressed) ZIP. The first entry must be `mimetype` without an extra field (OCF). */
export function zip(entries: { name: string; data: Uint8Array }[], modified: Date) {
    const time = (modified.getHours() << 11) | (modified.getMinutes() << 5) | (modified.getSeconds() >> 1);
    const date = ((modified.getFullYear() - 1980) << 9) | ((modified.getMonth() + 1) << 5) | modified.getDate();
    const chunks: Uint8Array[] = [];
    const central: Uint8Array[] = [];
    let offset = 0;
    for (const entry of entries) {
        const name = encoder.encode(entry.name);
        const crc = crc32(entry.data);
        const local = new DataView(new ArrayBuffer(30));
        local.setUint32(0, 0x04034b50, true);
        local.setUint16(4, 10, true);
        local.setUint16(6, 0x0800, true);
        local.setUint16(8, 0, true);
        local.setUint16(10, time, true);
        local.setUint16(12, date, true);
        local.setUint32(14, crc, true);
        local.setUint32(18, entry.data.length, true);
        local.setUint32(22, entry.data.length, true);
        local.setUint16(26, name.length, true);
        local.setUint16(28, 0, true);
        const header = new DataView(new ArrayBuffer(46));
        header.setUint32(0, 0x02014b50, true);
        header.setUint16(4, 20, true);
        header.setUint16(6, 10, true);
        header.setUint16(8, 0x0800, true);
        header.setUint16(10, 0, true);
        header.setUint16(12, time, true);
        header.setUint16(14, date, true);
        header.setUint32(16, crc, true);
        header.setUint32(20, entry.data.length, true);
        header.setUint32(24, entry.data.length, true);
        header.setUint16(28, name.length, true);
        header.setUint32(42, offset, true);
        chunks.push(new Uint8Array(local.buffer), name, entry.data);
        central.push(new Uint8Array(header.buffer), name);
        offset += 30 + name.length + entry.data.length;
    }
    const centralSize = central.reduce((sum, part) => sum + part.length, 0);
    const end = new DataView(new ArrayBuffer(22));
    end.setUint32(0, 0x06054b50, true);
    end.setUint16(8, entries.length, true);
    end.setUint16(10, entries.length, true);
    end.setUint32(12, centralSize, true);
    end.setUint32(16, offset, true);
    const parts = [...chunks, ...central, new Uint8Array(end.buffer)];
    const result = new Uint8Array(parts.reduce((sum, part) => sum + part.length, 0));
    let position = 0;
    for (const part of parts) {
        result.set(part, position);
        position += part.length;
    }
    return result;
}

interface NavEntry {
    title: string;
    href: string;
    children: { title: string; href: string }[];
}

const page = (language: string, title: string, body: string, head = "") => `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${language}" lang="${language}">
<head>
<meta charset="UTF-8"/>
<title>${escapeXml(title)}</title>
${head}</head>
<body>
${body}
</body>
</html>
`;

const style = `body { margin: 0 4%; line-height: 1.6; }
h1 { font-size: 1.5em; margin: 0.5em 0 1em; }
h2 { font-size: 1.3em; } h3 { font-size: 1.15em; }
section { page-break-before: always; }
pre { white-space: pre-wrap; word-wrap: break-word; font-family: monospace; font-size: 0.85em; padding: 0.5em; border: 1px solid #999; }
code { font-family: monospace; }
img { max-width: 100%; }
table { border-collapse: collapse; } th, td { border: 1px solid #999; padding: 0.2em 0.4em; }
blockquote { margin-left: 1em; padding-left: 0.8em; border-left: 3px solid #999; }
.missing { font-style: italic; }
.part { text-align: center; margin-top: 30%; }
`;

export function buildEpub(book: EpubBook): Uint8Array {
    const lang = book.language;
    const files: { name: string; data: Uint8Array }[] = [];
    const add = (name: string, text: string) => files.push({ name, data: encoder.encode(text) });
    const items: string[] = [];
    const spine: string[] = [];
    const nav: NavEntry[] = [];
    const link = '<link rel="stylesheet" type="text/css" href="style.css"/>\n';

    let parts = 0;
    let current: NavEntry | undefined;
    book.chapters.forEach((chapter, index) => {
        if (chapter.group && chapter.group !== current?.title) {
            // A divider page gives the group entry a target of its own, so no two navigation points share one.
            const href = `part-${++parts}.xhtml`;
            add(
                `OEBPS/${href}`,
                page(
                    lang,
                    chapter.group,
                    `<section epub:type="part"><h1 class="part">${escapeXml(chapter.group)}</h1></section>`,
                    link
                )
            );
            items.push(`<item id="part-${parts}" href="${href}" media-type="application/xhtml+xml"/>`);
            spine.push(`<itemref idref="part-${parts}"/>`);
            current = { title: chapter.group, href, children: [] };
            nav.push(current);
        } else if (!chapter.group) current = undefined;
        const href = `chapter-${index + 1}.xhtml`;
        add(
            `OEBPS/${href}`,
            page(
                lang,
                chapter.title,
                `<section epub:type="chapter">\n<h1>${escapeXml(chapter.title)}</h1>\n${chapter.body}\n</section>`,
                link
            )
        );
        items.push(`<item id="chapter-${index + 1}" href="${href}" media-type="application/xhtml+xml"/>`);
        spine.push(`<itemref idref="chapter-${index + 1}"/>`);
        const entry = { title: chapter.title, href };
        if (current) current.children.push(entry);
        else
            nav.push({
                ...entry,
                children:
                    book.chapters.length === 1
                        ? chapter.headings.map((h) => ({ title: h.title, href: `${href}#${h.id}` }))
                        : [],
            });
    });
    for (const [index, image] of book.images.entries()) {
        files.push({ name: `OEBPS/${image.href}`, data: image.data });
        items.push(`<item id="image-${index + 1}" href="${escapeXml(image.href)}" media-type="${image.mediaType}"/>`);
    }

    const list = (entries: { title: string; href: string; children?: { title: string; href: string }[] }[]): string =>
        `<ol>\n${entries.map((e) => `<li><a href="${escapeXml(e.href)}">${escapeXml(e.title)}</a>${e.children?.length ? list(e.children) : ""}</li>`).join("\n")}\n</ol>`;
    add(
        "OEBPS/nav.xhtml",
        page(
            lang,
            book.contentsTitle,
            `<nav epub:type="toc" id="toc">\n<h1>${escapeXml(book.contentsTitle)}</h1>\n${list(nav)}\n</nav>`
        )
    );
    let order = 0;
    const point = (entry: { title: string; href: string; children?: { title: string; href: string }[] }): string => {
        order++;
        return `<navPoint id="nav-${order}" playOrder="${order}"><navLabel><text>${escapeXml(entry.title)}</text></navLabel><content src="${escapeXml(entry.href)}"/>${(entry.children ?? []).map(point).join("")}</navPoint>`;
    };
    const navMap = nav.map(point).join("\n");
    add(
        "OEBPS/toc.ncx",
        `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1" xml:lang="${lang}">
<head>
<meta name="dtb:uid" content="${escapeXml(book.identifier)}"/>
<meta name="dtb:depth" content="${nav.some((e) => e.children.length) ? 2 : 1}"/>
<meta name="dtb:totalPageCount" content="0"/>
<meta name="dtb:maxPageNumber" content="0"/>
</head>
<docTitle><text>${escapeXml(book.title)}</text></docTitle>
<navMap>
${navMap}
</navMap>
</ncx>
`
    );
    add("OEBPS/style.css", style);
    add(
        "OEBPS/content.opf",
        `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="book-id" xml:lang="${lang}">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
<dc:identifier id="book-id">${escapeXml(book.identifier)}</dc:identifier>
<dc:title>${escapeXml(book.title)}</dc:title>
<dc:language>${lang}</dc:language>
<meta property="dcterms:modified">${book.modified.toISOString().replace(/\.\d{3}Z$/, "Z")}</meta>
</metadata>
<manifest>
<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
<item id="style" href="style.css" media-type="text/css"/>
${items.join("\n")}
</manifest>
<spine toc="ncx">
${spine.join("\n")}
</spine>
</package>
`
    );
    add(
        "META-INF/container.xml",
        `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
<rootfiles>
<rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
</rootfiles>
</container>
`
    );
    return zip([{ name: "mimetype", data: encoder.encode("application/epub+zip") }, ...files], book.modified);
}
