// Sensitive marks in a CodeMirror editor, for web notes and the plug-in: the marked text has a thin dotted underline, the
// marks themselves take no room and the cursor passes or deletes each as one step, and copying leaves them behind.
import { Decoration, EditorView, MatchDecorator, ViewPlugin, type DecorationSet, type ViewUpdate } from "@codemirror/view";
import { MARK_CLOSE, MARK_OPEN, hasMarks, stripMarks } from "./sensitive";

const hidden = Decoration.replace({ sensitiveMark: true });
const marked = Decoration.mark({ class: "tabularium-sensitive" });
const decorator = new MatchDecorator({
    regexp: /\u2061\u2062\u2063(.*?)(\u2063\u2062\u2061|$)/g,
    decorate: (add, from, to, match) => {
        const open = from + MARK_OPEN.length;
        const close = to - (match[2] ? MARK_CLOSE.length : 0);
        add(from, open, hidden);
        if (close > open) add(open, close, marked);
        if (match[2]) add(close, to, hidden);
    },
});

const marks = ViewPlugin.fromClass(
    class {
        decorations: DecorationSet;
        constructor(view: EditorView) {
            this.decorations = decorator.createDeco(view);
        }
        update(update: ViewUpdate) {
            this.decorations = decorator.updateDeco(update, this.decorations);
        }
    },
    { decorations: (plugin) => plugin.decorations }
);

function toClipboard(event: ClipboardEvent, view: EditorView, cut: boolean) {
    const { state } = view;
    const ranges = state.selection.ranges.filter((range) => !range.empty);
    const text = ranges.map((range) => state.sliceDoc(range.from, range.to)).join("\n");
    if (!hasMarks(text) || !event.clipboardData) return false;
    event.clipboardData.setData("text/plain", stripMarks(text));
    event.preventDefault();
    if (cut) view.dispatch(state.replaceSelection(""));
    return true;
}

export const sensitiveMarks = [
    marks,
    EditorView.atomicRanges.of(
        (view) => view.plugin(marks)?.decorations.update({ filter: (_from, _to, value) => (value.spec as { sensitiveMark?: boolean }).sensitiveMark === true }) ?? Decoration.none
    ),
    EditorView.domEventHandlers({
        copy: (event, view) => toClipboard(event, view, false),
        cut: (event, view) => toClipboard(event, view, true),
    }),
];
