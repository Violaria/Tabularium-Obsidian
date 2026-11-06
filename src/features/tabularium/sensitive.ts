// Sensitive text in notes: a run of invisible characters before and after it, inside one line. Reading is unchanged, and
// the marks tell the clients what to leave out of a share. These three characters are default-ignorable (nothing is drawn
// even without a glyph) and, unlike U+200B or U+FEFF, are not shown as special characters by CodeMirror. The server keeps
// its own copy of the pattern for Tabularius (`SENSITIVE` in tabularius/filter.ts).
import type { TextEdit } from "./formatting";

export const MARK_OPEN = "\u2061\u2062\u2063";
export const MARK_CLOSE = "\u2063\u2062\u2061";
/** What a share shows instead of marked text; the same whatever the length. */
export const MASKED = "\u2022\u2022\u2022\u2022\u2022\u2022";
/** A marked span; without a closing mark it runs to the end of its line, so a damaged mark hides more rather than less. */
const SPAN = () => /\u2061\u2062\u2063.*?(?:\u2063\u2062\u2061|$)/gm;

export const stripMarks = (text: string) => text.replaceAll(MARK_OPEN, "").replaceAll(MARK_CLOSE, "");
export const hasMarks = (text: string) => text.includes(MARK_OPEN) || text.includes(MARK_CLOSE);
export const maskMarked = (text: string) => text.replace(SPAN(), MASKED).replaceAll(MARK_CLOSE, "");
export const countMarked = (text: string) => [...text.matchAll(SPAN())].length;
/** Text split at its marked spans, without the marks. */
export function markedParts(text: string) {
    const parts: { text: string; marked: boolean }[] = [];
    let at = 0;
    for (const match of text.matchAll(SPAN())) {
        if (match.index > at) parts.push({ text: stripMarks(text.slice(at, match.index)), marked: false });
        parts.push({ text: stripMarks(match[0]), marked: true });
        at = match.index + match[0].length;
    }
    if (at < text.length) parts.push({ text: stripMarks(text.slice(at)), marked: false });
    return parts;
}

/** What stays outside a mark at the start of a line: indentation and list, quote, heading and table prefixes. */
const LINE_PREFIX = /^\s*(?:(?:#{1,6} |> ?|[-*+] \[[ xX]\] |[-*+] |\d+[.)] |\| ?)\s*)*/;
/** Lines a mark would break: code fences, table delimiters and dividers. */
const STRUCTURAL = /^\s*(?:```|~~~|\|?[\s:|-]*-[\s:|-]*$)/;

function wrapLine(line: string) {
    const bare = stripMarks(line);
    if (!bare.trim() || STRUCTURAL.test(bare)) return line;
    const prefix = LINE_PREFIX.exec(bare)![0];
    // A table row keeps its closing pipe, like its opening one.
    const suffix = (prefix.includes("|") ? /\s*\|?\s*$/ : /\s*$/).exec(bare.slice(prefix.length))![0];
    return prefix + MARK_OPEN + bare.slice(prefix.length, bare.length - suffix.length) + MARK_CLOSE + suffix;
}
const isMarked = (line: string) => line.includes(MARK_OPEN);
const isWrappable = (line: string) => line.trim() !== "" && !STRUCTURAL.test(stripMarks(line));

/** The marked span of `text` that touches the range, in offsets of the whole text. */
function spanAt(text: string, from: number, to: number) {
    for (const match of text.matchAll(SPAN())) {
        const end = match.index + match[0].length;
        // A selection must overlap the span; a cursor may also stand at its edge.
        if (from === to ? match.index <= to && from <= end : match.index < to && from < end) return { start: match.index, end, closed: match[0].endsWith(MARK_CLOSE) };
    }
    return undefined;
}

/**
 * Marks the selection or, when it already is, takes the marks off. A selection within a line is marked as it stands;
 * one that spans lines takes each line whole. An empty selection outside a mark starts an empty one with the cursor in it.
 */
export function toggleMark(text: string, from: number, to: number): TextEdit {
    const selected = text.slice(from, to);
    if (!selected.includes("\n")) {
        const span = spanAt(text, from, to);
        if (span) {
            const inner = stripMarks(text.slice(span.start, span.end));
            return { from: span.start, to: span.end, insert: inner, anchor: span.start, head: span.start + inner.length };
        }
        const insert = MARK_OPEN + selected + MARK_CLOSE;
        return { from, to, insert, anchor: from + MARK_OPEN.length, head: from + MARK_OPEN.length + selected.length };
    }
    const start = text.lastIndexOf("\n", from - 1) + 1;
    const stop = to > from && text[to - 1] === "\n" ? to - 1 : to;
    const next = text.indexOf("\n", stop);
    const end = next < 0 ? text.length : next;
    const lines = text.slice(start, end).split("\n");
    const targets = lines.filter(isWrappable);
    const off = targets.length > 0 && targets.every(isMarked);
    const insert = lines.map((line) => (off ? stripMarks(line) : wrapLine(line))).join("\n");
    return { from: start, to: end, insert, anchor: start, head: start + insert.length };
}
