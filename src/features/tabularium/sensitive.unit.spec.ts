import { describe, expect, it } from "vitest";
import { format } from "./formatting";
import { renderNote } from "./render";
import { MARK_CLOSE as C, MARK_OPEN as O, MASKED, countMarked, markedParts, maskMarked, stripMarks, toggleMark } from "./sensitive";
import { buildShare, reviewTree, type ShareSource } from "./share/package";

describe("markedParts", () => {
    it("splits text at marked spans, without the marks", () => {
        expect(markedParts(`a ${O}b${C} c ${O}d`)).toEqual([
            { text: "a ", marked: false },
            { text: "b", marked: true },
            { text: " c ", marked: false },
            { text: "d", marked: true },
        ]);
        expect(markedParts(`e${C}f`)).toEqual([{ text: "ef", marked: false }]);
    });
});

const applied = (text: string, from: number, to: number) => {
    const edit = toggleMark(text, from, to);
    return text.slice(0, edit.from) + edit.insert + text.slice(edit.to);
};

describe("marking", () => {
    it("wraps a selection and takes the marks off again", () => {
        const marked = applied("pass hunter2 end", 5, 12);
        expect(marked).toBe(`pass ${O}hunter2${C} end`);
        expect(applied(marked, 8, 10)).toBe("pass hunter2 end");
        const edit = toggleMark("pass hunter2 end", 5, 12);
        expect(edit.insert.slice(edit.anchor - edit.from, edit.head - edit.from)).toBe("hunter2");
    });
    it("leaves a neighbouring mark alone when the selection only touches it", () => {
        const text = `${O}a${C}b`;
        expect(applied(text, text.length - 1, text.length)).toBe(`${O}a${C}${O}b${C}`);
    });
    it("marks each line of a longer selection and keeps the structure of the note", () => {
        const text = "- one\n- [ ] two\n\n> three\n```\ncode\n```\n| a | b |\n|---|---|\n# title";
        expect(applied(text, 0, text.length)).toBe(
            `- ${O}one${C}\n- [ ] ${O}two${C}\n\n> ${O}three${C}\n\`\`\`\n${O}code${C}\n\`\`\`\n| ${O}a | b${C} |\n|---|---|\n# ${O}title${C}`
        );
        const marked = applied(text, 0, text.length);
        expect(applied(marked, 0, marked.length)).toBe(text);
    });
    it("is a format of the shared menu", () => {
        const edit = format("a secret", 2, 8, "sensitive");
        expect(edit.insert).toBe(`${O}secret${C}`);
    });
});

describe("reading marks", () => {
    it("masks marked text at a fixed length, and a mark without an end to the end of its line", () => {
        expect(maskMarked(`a ${O}x${C} b ${O}${"y".repeat(50)}${C}`)).toBe(`a ${MASKED} b ${MASKED}`);
        expect(maskMarked(`a ${O}lost end\nnext ${C}line`)).toBe(`a ${MASKED}\nnext line`);
        expect(countMarked(`${O}a${C} ${O}b${C}`)).toBe(2);
        expect(stripMarks(`a ${O}b${C}`)).toBe("a b");
    });
    it("leaves no marks in what goes to the Kindle", () => {
        const { body } = renderNote(`pass ${O}hunter2${C}`, () => undefined, (name) => name);
        expect(body).toContain("hunter2");
        expect(body).not.toMatch(/[\u2061-\u2063]/);
    });
});

describe("sharing marked notes", () => {
    const notes: Record<string, string> = {
        "a.md": `Token ${O}hunter2${C} and ${O}see [[secret]]${C}.\n\n\`\`\`ini\nkey = ${O}in-code${C}\n\`\`\`\n`,
        "secret.md": "Private.",
    };
    const source: ShareSource = { files: Object.keys(notes), read: async (path) => notes[path], readBinary: async () => new Uint8Array(), tree: () => ({ name: "", path: "", folder: true, children: [] }) };
    const body = async (desensitize?: boolean) => {
        const built = await buildShare(source, { title: "a", target: "a.md", folder: false, authorised: new Set(), reviewed: new Set(["secret.md"]), desensitize });
        return new TextDecoder().decode([...built.files.values()][0]);
    };
    it("replaces marked text by default, also in code, with no reference from inside a mark", async () => {
        const text = await body();
        expect(text).not.toMatch(/hunter2|in-code|secret|denied|[\u2061-\u2063]/);
        expect(text).toContain(`Token ${MASKED} and ${MASKED}.`);
        expect(text).toContain(`key = ${MASKED}`);
        expect(await reviewTree(source, "a.md", false, () => false)).toEqual([]);
    });
    it("shares the text as written when turned off, without its marks", async () => {
        const text = await body(false);
        expect(text).toContain("Token hunter2 and");
        expect(text).toContain("key = in-code");
        expect(text).not.toMatch(/[\u2061-\u2063]/);
        expect((await reviewTree(source, "a.md", false, () => false, false)).map((node) => node.path)).toEqual(["secret.md"]);
    });
});
