import { describe, expect, it, vi } from "vitest";
import { buildEpub, zip } from "./epub";
import { renderNote } from "./render";

const decode = (data: Uint8Array) => new TextDecoder().decode(data);
// Reads the stored entries back from a ZIP produced by zip().
function entries(archive: Uint8Array) {
    const view = new DataView(archive.buffer, archive.byteOffset);
    const result: { name: string; data: Uint8Array; crc: number; method: number; extra: number }[] = [];
    let offset = 0;
    while (view.getUint32(offset, true) === 0x04034b50) {
        const size = view.getUint32(offset + 18, true);
        const nameLength = view.getUint16(offset + 26, true);
        const extra = view.getUint16(offset + 28, true);
        const start = offset + 30 + nameLength + extra;
        result.push({ name: decode(archive.subarray(offset + 30, offset + 30 + nameLength)), data: archive.subarray(start, start + size),
            crc: view.getUint32(offset + 14, true), method: view.getUint16(offset + 8, true), extra });
        offset = start + size;
    }
    return result;
}

describe("zip", () => {
    it("stores entries uncompressed with correct CRC-32", () => {
        const [entry] = entries(zip([{ name: "hello.txt", data: new TextEncoder().encode("hello") }], new Date(2026, 9, 29)));
        expect(entry).toMatchObject({ name: "hello.txt", method: 0, extra: 0, crc: 0x3610a686 });
        expect(decode(entry.data)).toBe("hello");
    });
});

describe("buildEpub", () => {
    const base = { language: "zh", identifier: "urn:uuid:00000000-0000-4000-8000-000000000000", modified: new Date("2026-10-29T08:00:00.123Z"), images: [] };
    it("starts with the mimetype entry and lists headings for a single note", () => {
        const book = buildEpub({ ...base, title: "笔记 & <测试>", chapters: [{ title: "笔记", body: "<h2 id=\"h-1\">一</h2>", headings: [{ id: "h-1", title: "一" }] }] });
        const files = entries(book);
        expect(files[0]).toMatchObject({ name: "mimetype", method: 0, extra: 0 });
        expect(decode(files[0].data)).toBe("application/epub+zip");
        const opf = decode(files.find((f) => f.name === "OEBPS/content.opf")!.data);
        expect(opf).toContain("<dc:title>笔记 &amp; &lt;测试&gt;</dc:title>");
        expect(opf).toContain('<meta property="dcterms:modified">2026-10-29T08:00:00Z</meta>');
        const ncx = decode(files.find((f) => f.name === "OEBPS/toc.ncx")!.data);
        expect([...ncx.matchAll(/playOrder="(\d+)"/g)].map((m) => m[1])).toEqual(["1", "2"]);
        expect(ncx).toContain('src="chapter-1.xhtml#h-1"');
    });
    it("groups folder chapters under divider pages without sharing navigation targets", () => {
        const chapter = (title: string, group?: string) => ({ title, body: "<p>x</p>", headings: [], group });
        const files = entries(buildEpub({ ...base, title: "文件夹", chapters: [chapter("根"), chapter("甲", "子"), chapter("乙", "子"), chapter("丙", "另")] }));
        const ncx = decode(files.find((f) => f.name === "OEBPS/toc.ncx")!.data);
        const targets = [...ncx.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
        expect(targets).toEqual(["chapter-1.xhtml", "part-1.xhtml", "chapter-2.xhtml", "chapter-3.xhtml", "part-2.xhtml", "chapter-4.xhtml"]);
        expect(new Set(targets).size).toBe(targets.length);
        expect(ncx).toContain('name="dtb:depth" content="2"');
    });
});

describe("renderNote", () => {
    it("rewrites Obsidian syntax outside code and escapes raw HTML", () => {
        const resolve = vi.fn((target: string) => (target.endsWith(".png") ? "images/image-1.png" : undefined));
        const { body, headings } = renderNote(
            [
                "---", "tags: [a]", "---",
                "## 第一节", "见 [[文件夹/目标笔记#标题|别名]] 与 [[另一篇]]。%%隐藏%%",
                "![[配图.png|300]] ![[图.svg]] ![远程](https://example.com/a.png) ![本地](附件/截图%201.png)",
                "<script>alert(1)</script>", "[网页](https://example.com) [笔记](其他笔记.md)",
                "```bash", "echo [[不改]] %%也不改%%", "```", "`[[行内]]`",
            ].join("\n"),
            resolve,
        );
        expect(body).not.toContain("tags:");
        expect(body).toContain("别名");
        expect(body).toContain("另一篇");
        expect(body).not.toContain("隐藏");
        expect(body).toContain('<img src="images/image-1.png" alt=""/>');
        expect(body).toContain('<span class="missing">[图片：图.svg]</span>');
        expect(body).toContain('<span class="missing">[图片：远程]</span>');
        expect(resolve).toHaveBeenCalledWith("附件/截图 1.png");
        expect(body).toContain("&lt;script&gt;");
        expect(body).toContain('<a href="https://example.com">网页</a>');
        expect(body).not.toContain("其他笔记.md");
        expect(body).toContain("echo [[不改]] %%也不改%%");
        expect(body).toContain("<code>[[行内]]</code>");
        expect(headings).toEqual([{ id: "h-1", title: "第一节" }]);
        expect(body).toContain('<h2 id="h-1">第一节</h2>');
    });
});
