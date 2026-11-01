import { describe, expect, it, vi } from "vitest";

vi.mock("@/deps", () => ({ Menu: class {}, sanitizeHTMLToDom: () => null }));
vi.mock("@/common/translation", () => ({ $msg: (key: string) => ({ "tabularium.editor.linkText": "链接", "tabularium.editor.word.topic": "主题" })[key] ?? "词" }));

const { formatEditor, insertInEditor } = await import("./EditorMenus");

/** Obsidian's Editor over a string: offsets map to {line, ch}; one transaction replaces a range. */
function editorOf(marked: string) {
    const from = marked.indexOf("|");
    const to = marked.lastIndexOf("|") - (marked.indexOf("|") === marked.lastIndexOf("|") ? 0 : 1);
    let text = marked.replace(/\|/g, "");
    let selection = [from, to];
    const offsetToPos = (offset: number) => {
        const before = text.slice(0, offset).split("\n");
        return { line: before.length - 1, ch: before[before.length - 1].length };
    };
    const posToOffset = (pos: { line: number; ch: number }) => text.split("\n").slice(0, pos.line).reduce((sum, line) => sum + line.length + 1, 0) + pos.ch;
    const editor = {
        getValue: () => text,
        getCursor: (which: "from" | "to") => offsetToPos(which === "from" ? selection[0] : selection[1]),
        posToOffset,
        offsetToPos,
        transaction: ({ changes }: { changes: { from: { line: number; ch: number }; to: { line: number; ch: number }; text: string }[] }) => {
            for (const change of changes) text = text.slice(0, posToOffset(change.from)) + change.text + text.slice(posToOffset(change.to));
        },
        setSelection: (anchor: { line: number; ch: number }, head: { line: number; ch: number }) => (selection = [posToOffset(anchor), posToOffset(head)]),
        focus: () => undefined,
    };
    return { editor, result: () => ({ text, selected: text.slice(selection[0], selection[1]) }) };
}

describe("editor menus in Obsidian", () => {
    it("format the selection as web notes does", () => {
        const { editor, result } = editorOf("见 |重点| 吧");
        formatEditor(editor as never, "bold");
        expect(result()).toEqual({ text: "见 **重点** 吧", selected: "重点" });
        formatEditor(editor as never, "bold");
        expect(result()).toEqual({ text: "见 重点 吧", selected: "重点" });
    });
    it("insert the same templates", () => {
        const { editor, result } = editorOf("第一行\n|");
        insertInEditor(editor as never, "mindmap");
        expect(result().text).toBe("第一行\n\n```mermaid\nmindmap\n  root((主题))\n    词\n    词\n      词\n```\n");
        expect(result().selected).toBe("主题");
    });
});
