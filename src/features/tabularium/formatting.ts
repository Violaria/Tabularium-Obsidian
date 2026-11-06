// Formatting and inserting in Markdown text, shared by the web notes editor (CodeMirror) and the plug-in's editor menus
// (Obsidian's Editor): the same action gives the same text on both sides. Everything here is a plain text transform:
// given the note and a selection, it returns the replacement and the selection afterwards. Nothing is reformatted
// outside the replaced range.

import { toggleMark } from "./sensitive";

export type InlineFormat = "bold" | "italic" | "strike" | "highlight" | "code";
export type LineFormat = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "quote" | "bullet" | "numbered" | "task";
export type Format = InlineFormat | LineFormat | "link" | "clear" | "sensitive";

/** A replacement of `from`–`to` with `insert`, and the selection that follows (offsets in the new text). */
export interface TextEdit {
    from: number;
    to: number;
    insert: string;
    anchor: number;
    head: number;
}

const MARKS: Record<InlineFormat, string> = { bold: "**", italic: "*", strike: "~~", highlight: "==", code: "`" };
const LINE_PREFIX: Record<LineFormat, RegExp> = {
    h1: /^# /, h2: /^## /, h3: /^### /, h4: /^#### /, h5: /^##### /, h6: /^###### /,
    quote: /^> ?/, bullet: /^[-*+] (?!\[[ xX]\] )/, numbered: /^\d+[.)] /, task: /^[-*+] \[[ xX]\] /,
};
/** Any line prefix a line format replaces: a heading, quote, list item or task (after indentation). */
const ANY_PREFIX = /^(#{1,6} |> ?|[-*+] \[[ xX]\] |[-*+] |\d+[.)] )/;
const prefixOf = (format: LineFormat, index: number) =>
    format === "quote" ? "> " : format === "bullet" ? "- " : format === "numbered" ? `${index + 1}. ` : format === "task" ? "- [ ] " : `${"#".repeat(Number(format.slice(1)))} `;

/** Whether `text` around `from`–`to` is wrapped in `mark` (outside the selection or as its own ends). */
function wrapped(text: string, from: number, to: number, mark: string) {
    const inner = text.slice(from, to);
    // "*" must not match the inside of "**": a single star is italic only when the next character is not a star.
    const single = (at: number) => mark !== "*" || (text[at - 1] !== "*" && text[at + 1] !== "*");
    if (inner.length >= mark.length * 2 && inner.startsWith(mark) && inner.endsWith(mark) && (mark !== "*" || !inner.startsWith("**") || inner.startsWith("***")))
        return "inside" as const;
    if (text.slice(from - mark.length, from) === mark && text.slice(to, to + mark.length) === mark && single(from - 1) && single(to)) return "outside" as const;
    return undefined;
}

function inline(text: string, from: number, to: number, format: InlineFormat): TextEdit {
    const mark = MARKS[format];
    const where = wrapped(text, from, to, mark);
    if (where === "inside") {
        const inner = text.slice(from + mark.length, to - mark.length);
        return { from, to, insert: inner, anchor: from, head: from + inner.length };
    }
    if (where === "outside") {
        const inner = text.slice(from, to);
        const start = from - mark.length;
        return { from: start, to: to + mark.length, insert: inner, anchor: start, head: start + inner.length };
    }
    const inner = text.slice(from, to);
    return { from, to, insert: `${mark}${inner}${mark}`, anchor: from + mark.length, head: from + mark.length + inner.length };
}

/** The whole lines the selection touches. */
function lineRange(text: string, from: number, to: number) {
    const start = text.lastIndexOf("\n", from - 1) + 1;
    // A selection ending at the start of a line does not take that line.
    const end0 = to > from && text[to - 1] === "\n" ? to - 1 : to;
    const next = text.indexOf("\n", end0);
    return { start, end: next < 0 ? text.length : next };
}

function lines(text: string, from: number, to: number, format: LineFormat): TextEdit {
    const { start, end } = lineRange(text, from, to);
    const list = text.slice(start, end).split("\n");
    const indent = (line: string) => /^\s*/.exec(line)![0];
    // Applied to every non-empty line; when every one already has it, it is taken off instead.
    const filled = list.filter((line) => line.trim());
    const all = filled.length > 0 && filled.every((line) => LINE_PREFIX[format].test(line.slice(indent(line).length)));
    let counter = 0;
    const result = list.map((line) => {
        if (!line.trim()) return line;
        const space = indent(line);
        const rest = line.slice(space.length);
        const bare = rest.replace(ANY_PREFIX, "");
        return all ? space + bare : space + prefixOf(format, counter++) + bare;
    });
    const insert = result.join("\n");
    return { from: start, to: end, insert, anchor: start, head: start + insert.length };
}

function link(text: string, from: number, to: number, words: { linkText: string }): TextEdit {
    const inner = text.slice(from, to);
    // A selected address becomes the target; other text becomes the label, and the address is selected to be typed.
    if (/^https?:\/\/\S+$/.test(inner)) {
        const insert = `[${words.linkText}](${inner})`;
        return { from, to, insert, anchor: from + 1, head: from + 1 + words.linkText.length };
    }
    const label = inner || words.linkText;
    const insert = `[${label}](https://)`;
    const at = from + label.length + 3;
    return { from, to, insert, anchor: at, head: at + "https://".length };
}

/** Takes inline marks and line prefixes off the selected lines' selected text. */
function clear(text: string, from: number, to: number): TextEdit {
    const { start, end } = from === to ? lineRange(text, from, to) : { start: from, end: to };
    const cleaned = text
        .slice(start, end)
        .split("\n")
        .map((line) => {
            const space = /^\s*/.exec(line)![0];
            return space + line.slice(space.length).replace(ANY_PREFIX, "");
        })
        .join("\n")
        .replace(/(\*\*|__|~~|==)(.+?)\1/g, "$2")
        .replace(/(^|[^*\w])\*(?!\s)([^*\n]+?)\*(?!\w)/g, "$1$2")
        .replace(/`([^`\n]+)`/g, "$1");
    return { from: start, to: end, insert: cleaned, anchor: start, head: start + cleaned.length };
}

/** Applies a format to the selection `from`–`to` of `text`; applied again, the same format is taken off. */
export function format(text: string, from: number, to: number, kind: Format, words: { linkText: string } = { linkText: "link" }): TextEdit {
    if (from > to) [from, to] = [to, from];
    if (kind === "link") return link(text, from, to, words);
    if (kind === "clear") return clear(text, from, to);
    if (kind === "sensitive") return toggleMark(text, from, to);
    if (kind in MARKS) return inline(text, from, to, kind as InlineFormat);
    return lines(text, from, to, kind as LineFormat);
}

export type Template = "table" | "code" | "flowchart" | "sequence" | "mindmap" | "gantt" | "mathInline" | "mathBlock" | "callout" | "divider";
/** Words placed in templates, in the interface language. */
export interface TemplateWords {
    start: string;
    end: string;
    step: string;
    topic: string;
    idea: string;
    task: string;
    heading: string;
    cell: string;
    callout: string;
    formula: string;
}

/** A template's text and the part selected after inserting it (the first thing to type over). */
function template(kind: Template, w: TemplateWords): { text: string; select: string; block: boolean } {
    switch (kind) {
        case "table":
            return { text: `| ${w.heading} | ${w.heading} | ${w.heading} |\n| --- | --- | --- |\n| ${w.cell} | ${w.cell} | ${w.cell} |\n| ${w.cell} | ${w.cell} | ${w.cell} |`, select: w.heading, block: true };
        case "code":
            return { text: "```\n\n```", select: "", block: true };
        case "flowchart":
            return { text: `\`\`\`mermaid\nflowchart LR\n  A[${w.start}] --> B[${w.step}] --> C[${w.end}]\n\`\`\``, select: w.start, block: true };
        case "sequence":
            return { text: `\`\`\`mermaid\nsequenceDiagram\n  A->>B: ${w.step}\n  B-->>A: ${w.end}\n\`\`\``, select: w.step, block: true };
        case "mindmap":
            return { text: `\`\`\`mermaid\nmindmap\n  root((${w.topic}))\n    ${w.idea}\n    ${w.idea}\n      ${w.idea}\n\`\`\``, select: w.topic, block: true };
        case "gantt":
            return { text: `\`\`\`mermaid\ngantt\n  dateFormat YYYY-MM-DD\n  section ${w.heading}\n    ${w.task} :a1, ${new Date().toISOString().slice(0, 10)}, 3d\n    ${w.task} :after a1, 2d\n\`\`\``, select: w.heading, block: true };
        case "mathInline":
            return { text: `$${w.formula}$`, select: w.formula, block: false };
        case "mathBlock":
            return { text: `$$\n${w.formula}\n$$`, select: w.formula, block: true };
        case "callout":
            return { text: `> [!note] ${w.callout}\n> `, select: w.callout, block: true };
        case "divider":
            return { text: "---", select: "", block: true };
    }
}

/**
 * Inserts a template at the selection, replacing it. Block templates stand on their own lines; the template's first
 * placeholder is selected (for a code block, the cursor goes inside it).
 */
export function insertTemplate(text: string, from: number, to: number, kind: Template, words: TemplateWords): TextEdit {
    if (from > to) [from, to] = [to, from];
    const { text: body, select, block } = template(kind, words);
    let before = "";
    let after = "";
    if (block) {
        const lineStart = text.lastIndexOf("\n", from - 1) + 1;
        if (text.slice(lineStart, from).trim()) before = "\n\n";
        else if (lineStart > 0 && text[lineStart - 2] !== "\n" && text.slice(0, lineStart).trim()) before = "\n";
        const rest = text.slice(to);
        after = rest.startsWith("\n\n") || !rest.trim() ? (rest.startsWith("\n") ? "" : "\n") : rest.startsWith("\n") ? "\n" : "\n\n";
    }
    const insert = before + body + after;
    const offset = from + before.length;
    if (kind === "code") return { from, to, insert, anchor: offset + 4, head: offset + 4 };
    if (!select) return { from, to, insert, anchor: offset + body.length, head: offset + body.length };
    const at = offset + body.indexOf(select);
    return { from, to, insert, anchor: at, head: at + select.length };
}
