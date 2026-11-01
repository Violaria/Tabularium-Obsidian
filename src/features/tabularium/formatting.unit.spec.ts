import { describe, expect, it } from "vitest";
import { format, insertTemplate, type Format, type Template, type TextEdit } from "./formatting";

const apply = (text: string, edit: TextEdit) => {
    const result = text.slice(0, edit.from) + edit.insert + text.slice(edit.to);
    return { result, selected: result.slice(Math.min(edit.anchor, edit.head), Math.max(edit.anchor, edit.head)) };
};
/** Formats the part of `text` between the two "|" marks. */
const run = (marked: string, kind: Format) => {
    const from = marked.indexOf("|");
    const to = marked.indexOf("|", from + 1) - 1;
    const text = marked.replace(/\|/g, "");
    return apply(text, format(text, from, to, kind, { linkText: "链接" }));
};
const WORDS = { start: "开始", end: "结束", step: "步骤", topic: "主题", idea: "想法", task: "任务", heading: "标题", cell: "内容", callout: "提示", formula: "E=mc^2" };

describe("inline formats", () => {
    it("wraps, and takes off again", () => {
        expect(run("说 |重点| 吧", "bold")).toEqual({ result: "说 **重点** 吧", selected: "重点" });
        expect(run("说 **|重点|** 吧", "bold")).toEqual({ result: "说 重点 吧", selected: "重点" });
        expect(run("说 |**重点**| 吧", "bold")).toEqual({ result: "说 重点 吧", selected: "重点" });
        expect(run("|a|", "strike").result).toBe("~~a~~");
        expect(run("|a|", "highlight").result).toBe("==a==");
        expect(run("|a|", "code").result).toBe("`a`");
    });
    it("tells italic from bold", () => {
        expect(run("**|a|**", "italic").result).toBe("***a***");
        expect(run("*|a|*", "italic").result).toBe("a");
    });
    it("leaves an empty pair with the cursor inside", () => {
        const text = "ab";
        const edit = format(text, 1, 1, "bold");
        expect(apply(text, edit).result).toBe("a****b");
        expect([edit.anchor, edit.head]).toEqual([3, 3]);
    });
});

describe("line formats", () => {
    it("sets a heading level, and the same level takes it off", () => {
        expect(run("|标题|", "h2").result).toBe("## 标题");
        expect(run("## |标题|", "h3").result).toBe("### 标题");
        expect(run("### |标题|", "h3").result).toBe("标题");
    });
    it("turns every selected line into a list, keeping indentation and empty lines", () => {
        expect(run("|甲\n\n  乙|", "bullet").result).toBe("- 甲\n\n  - 乙");
        expect(run("|甲\n乙|", "numbered").result).toBe("1. 甲\n2. 乙");
        expect(run("|- 甲\n- 乙|", "task").result).toBe("- [ ] 甲\n- [ ] 乙");
        expect(run("|- [ ] 甲\n- [x] 乙|", "task").result).toBe("甲\n乙");
        expect(run("|甲|", "quote").result).toBe("> 甲");
    });
    it("does not take the line after a selection that ends at its start", () => {
        expect(run("|甲\n|乙", "bullet").result).toBe("- 甲\n乙");
    });
});

describe("links and clearing", () => {
    it("links the selection and selects the address to type", () => {
        expect(run("|文档|", "link")).toEqual({ result: "[文档](https://)", selected: "https://" });
        expect(run("|https://example.com|", "link")).toEqual({ result: "[链接](https://example.com)", selected: "链接" });
    });
    it("clears marks and prefixes", () => {
        expect(run("|## **粗** 和 *斜* 和 `码` 和 ==亮==|", "clear").result).toBe("粗 和 斜 和 码 和 亮");
    });
    it("touches nothing outside the selection's lines", () => {
        const text = "---\ntags: [a]\n---\n[[链接|别名]]\n甲\n> [!note] 提示";
        const edit = format(text, text.indexOf("甲"), text.indexOf("甲") + 1, "bold");
        expect(apply(text, edit).result).toBe("---\ntags: [a]\n---\n[[链接|别名]]\n**甲**\n> [!note] 提示");
    });
});

describe("templates", () => {
    const insert = (marked: string, kind: Template) => {
        const at = marked.indexOf("|");
        const text = marked.replace("|", "");
        return apply(text, insertTemplate(text, at, at, kind, WORDS));
    };
    it("puts block templates on their own lines and selects the first placeholder", () => {
        expect(insert("前文|", "mindmap")).toEqual({ result: "前文\n\n```mermaid\nmindmap\n  root((主题))\n    想法\n    想法\n      想法\n```\n", selected: "主题" });
        expect(insert("|", "flowchart").selected).toBe("开始");
        expect(insert("甲\n\n|\n\n乙", "divider").result).toBe("甲\n\n---\n\n乙");
    });
    it("inserts inline formulas where the cursor is", () => {
        expect(insert("能量 | 守恒", "mathInline")).toEqual({ result: "能量 $E=mc^2$ 守恒", selected: "E=mc^2" });
    });
    it("leaves the cursor inside a new code block", () => {
        const text = "";
        const edit = insertTemplate(text, 0, 0, "code", WORDS);
        expect(apply(text, edit).result).toBe("```\n\n```\n");
        expect(edit.anchor).toBe(4);
    });
});
