import { describe, expect, it } from "vitest";
import { arrange, convertFrontMatter, defaultOrder, itemName, locateItem, moveItem, namesOf, orderFor, parseOrder, readOrders, REST } from "./fileOrder";

const order = (text: string, folder = "") => Object.fromEntries(parseOrder(text, folder));
const names = (items: string[]) => (item: string) => namesOf(item, !item.includes("."));

describe("reading the order from the list in the body", () => {
    it("takes nesting as folders, cuts notes after the separator and reads wiki links", () => {
        const text = [
            "排序规则。",
            "",
            "- 文稿札记",
            "- 网络工程",
            "  - 路由服务器 —— 先确认接入方式，再理解 PPPoE",
            "    - 基本WAN_LAN",
            "    - [[Accel PPP PPPoE服务端]]",
            "  - ...",
            "  - 网络技巧 —— 放在最后",
            "- [[服务运维/基础设施|基础设施]]",
        ].join("\n");
        expect(order(text)).toEqual({
            "": ["文稿札记", "网络工程", "基础设施"],
            网络工程: ["路由服务器", REST, "网络技巧"],
            "网络工程/路由服务器": ["基本WAN_LAN", "Accel PPP PPPoE服务端"],
        });
    });

    it("ignores the front matter, text around the list and code blocks; text at the margin ends a list", () => {
        const text = ["---", "sorting-spec: |", "  target-folder: /", "  Z", "---", "# 顺序", "- A", "  - a1", "说明", "  - not nested", "```", "- code", "```", "- B"].join("\n");
        expect(order(text)).toEqual({ "": ["A", "not nested", "B"], A: ["a1"] });
    });

    it("accepts tabs, other bullets and numbered items, and keeps the first of repeated names", () => {
        expect(order("* A\n\t+ a1\n1. B\n2. A")).toEqual({ "": ["A", "B"], A: ["a1"] });
    });

    it("is relative to the folder of the rules note", () => {
        expect(order("- x\n  - y", "网络工程")).toEqual({ 网络工程: ["x"], "网络工程/x": ["y"] });
    });

    it("lets the nearest rules note decide for its folders", () => {
        const sources = readOrders([
            { path: "Collation.md", text: "- A\n  - one\n- B" },
            { path: "A/Collation.md", text: "- two\n- one" },
            { path: "B/sortspec.md", text: "- not read" },
            { path: "A/notes.md", text: "- ignored" },
        ]);
        expect(orderFor(sources, "")).toEqual(["A", "B"]);
        expect(orderFor(sources, "A")).toEqual(["two", "one"]);
        expect(orderFor(sources, "C")).toBeUndefined();
    });

    it("reads names the way they are written", () => {
        expect(itemName("  名称 —— 注释 —— 还有 ")).toBe("名称");
        expect(itemName("[[a/b/笔记#标题|显示]]")).toBe("笔记");
        expect(itemName("—— 只有注释")).toBe("—— 只有注释");
    });
});

describe("arranging a folder", () => {
    const items = ["Gamma", "Alpha", "b.md", "a.md", "img.png"];
    it("puts listed items first in the listed order and keeps the default order of the rest", () => {
        expect(arrange(items, ["a", "Gamma", "img.png", "missing"], names(items))).toEqual(["a.md", "Gamma", "img.png", "Alpha", "b.md"]);
    });
    it("places the rest where the ellipsis stands", () => {
        expect(arrange(items, ["Alpha", REST, "a.md"], names(items))).toEqual(["Alpha", "Gamma", "b.md", "img.png", "a.md"]);
    });
    it("leaves a folder without rules in its default order", () => {
        expect(arrange(items, undefined, names(items))).toBe(items);
    });
    it("orders by name with folders first, numbers as numbers", () => {
        const all = ["b10.md", "Z", "b2.md", "a"];
        expect(defaultOrder(all, (x) => x, (x) => !x.includes("."))).toEqual(["a", "Z", "b2.md", "b10.md"]);
    });
});

describe("converting front-matter rules", () => {
    const children: Record<string, string[]> = { 代码开发: ["Python", "Git", "Rust"] };
    const childrenOf = (path: string) => children[path] ?? [];
    const before = [
        "---",
        "sorting-spec: |-",
        "  target-folder: /",
        "  文稿札记",
        "  代码开发",
        "  服务运维",
        "  target-folder: 服务运维",
        "  基础设施",
        "  ...",
        "  小工具",
        "  target-folder: 代码开发/Git",
        "  Git 基础",
        "  GitHub CLI",
        "---",
        "",
        "说明段落。",
        "",
    ].join("\n");

    it("turns folder blocks into a nested list before the former body, without the front matter", () => {
        const result = convertFrontMatter(before, "", childrenOf);
        expect(result.unsupported).toEqual([]);
        expect(result.moved).toEqual([]);
        expect(result.text).toBe(
            [
                "- 文稿札记",
                "- 代码开发",
                "  - Python",
                "  - Git",
                "    - Git 基础",
                "    - GitHub CLI",
                "  - Rust",
                "- 服务运维",
                "  - 基础设施",
                "  - ...",
                "  - 小工具",
                "",
                "说明段落。",
                "",
            ].join("\n")
        );
    });

    it("gives the same order as before for every folder", () => {
        const converted = parseOrder(convertFrontMatter(before, "", childrenOf).text);
        expect(converted.get("")).toEqual(["文稿札记", "代码开发", "服务运维"]);
        expect(converted.get("服务运维")).toEqual(["基础设施", REST, "小工具"]);
        expect(converted.get("代码开发/Git")).toEqual(["Git 基础", "GitHub CLI"]);
        // The folder without rules of its own keeps its order shown, now written out.
        expect(converted.get("代码开发")).toEqual(["Python", "Git", "Rust"]);
    });

    it("lists what cannot be expressed and keeps other front matter", () => {
        const text = "---\ntags: x\nsorting-spec: |\n  target-folder: /\n  order-desc: a-z\n  A\n  /:files\n---\nbody\n";
        const result = convertFrontMatter(text, "", childrenOf);
        expect(result.unsupported).toEqual(["order-desc: a-z", "/:files"]);
        expect(result.text).toBe("---\ntags: x\n---\n- A\n\nbody\n");
    });

    it("reports a folder with rules that its parent's rules did not list", () => {
        const text = "---\nsorting-spec: |\n  target-folder: /\n  A\n  target-folder: B\n  b1\n---\n";
        const result = convertFrontMatter(text, "", childrenOf);
        expect(result.moved).toEqual(["B"]);
        expect(parseOrder(result.text).get("")).toEqual(["A", REST, "B"]);
    });

    it("leaves a note without front-matter rules unchanged", () => {
        expect(convertFrontMatter("- A\n", "", childrenOf)).toEqual({ text: "- A\n", unsupported: [], moved: [] });
    });
});

describe("finding and moving an item in the list", () => {
    const note = ["---", "tags: x", "---", "说明。", "", "- A —— 甲", "  - a1", "  - ...", "  - a2", "- B", "  - b1", "    - deep", "- C", ""].join("\n");
    const lines = note.split("\n");
    const line = (text: string) => lines.indexOf(text);

    it("finds an item, else the nearest listed folder above it, else the start of the list", () => {
        expect(locateItem(note, "", "A/a2.md", namesOf("a2.md", false))).toBe(line("  - a2"));
        expect(locateItem(note, "", "B/b1/other.md", namesOf("other.md", false))).toBe(line("  - b1"));
        expect(locateItem(note, "", "Z/z.md", namesOf("z.md", false))).toBe(line("- A —— 甲"));
        expect(locateItem("no list", "", "x.md", ["x"])).toBeUndefined();
    });

    it("moves an item with what it holds to the first place, keeping its note", () => {
        const moved = moveItem(note, "", "C", "C", ["C"], "first");
        expect(parseOrder(moved).get("")).toEqual(["C", "A", "B"]);
        const again = moveItem(moved, "", "B", "B", ["B"], "first");
        expect(parseOrder(again).get("")).toEqual(["B", "C", "A"]);
        expect(parseOrder(again).get("B/b1")).toEqual(["deep"]);
        expect(again).toContain("- A —— 甲");
        expect(again.startsWith("---\ntags: x\n---\n说明。\n")).toBe(true);
    });

    it("moves to the last place after the unlisted items, adding ... where the folder has none", () => {
        expect(parseOrder(moveItem(note, "", "A/a1.md", "a1", namesOf("a1.md", false), "last")).get("A")).toEqual([REST, "a2", "a1"]);
        expect(parseOrder(moveItem(note, "", "A", "A", ["A"], "last")).get("")).toEqual(["B", "C", REST, "A"]);
    });

    it("writes in an item not listed, and the folders above it where the unlisted items stand", () => {
        const added = moveItem(note, "", "C/new/x.md", "x", namesOf("x.md", false), "first");
        expect(parseOrder(added).get("C")).toEqual(["new"]);
        expect(parseOrder(added).get("C/new")).toEqual(["x"]);
        expect(added).toContain("- C\n  - new\n    - x\n");
        const inA = moveItem(note, "", "A/new/y.md", "y", namesOf("y.md", false), "first");
        expect(parseOrder(inA).get("A")).toEqual(["a1", "new", REST, "a2"]);
    });

    it("works in a rules note of a folder and in an empty note", () => {
        expect(parseOrder(moveItem("- x\n- y\n", "F", "F/y.md", "y", ["y", "y.md"], "first"), "F").get("F")).toEqual(["y", "x"]);
        expect(moveItem("说明。\n", "", "n.md", "n", ["n", "n.md"], "first")).toBe("说明。\n\n- n\n");
        expect(moveItem("", "", "n.md", "n", ["n", "n.md"], "last")).toBe("- ...\n- n\n");
    });
});
