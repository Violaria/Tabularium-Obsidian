// Sensitive marks in a CodeMirror editor, for web notes and the plug-in: the marked text is tinted with a red eye at its
// end, the marks themselves take no room and the cursor passes or deletes each as one step, and copying leaves them behind.
import { Decoration, EditorView, MatchDecorator, ViewPlugin, WidgetType, type DecorationSet, type ViewUpdate } from "@codemirror/view";
import { MARK_CLOSE, MARK_OPEN, hasMarks, markedParts, stripMarks } from "./sensitive";

/** This file also runs in web notes, without Obsidian's element helpers. */
const HTML = "http://www.w3.org/1999/xhtml";

class Eye extends WidgetType {
    override eq() {
        return true;
    }
    toDOM(view: EditorView) {
        const eye = view.dom.ownerDocument.createElementNS(HTML, "span");
        eye.className = "tabularium-sensitive-eye";
        eye.setAttribute("aria-hidden", "true");
        return eye;
    }
}

const hidden = Decoration.replace({ sensitiveMark: true });
const eye = Decoration.widget({ widget: new Eye(), side: 1 });
const marked = Decoration.mark({ class: "tabularium-sensitive" });
const decorator = new MatchDecorator({
    regexp: /\u2061\u2062\u2063(.*?)(\u2063\u2062\u2061|$)/g,
    decorate: (add, from, to, match) => {
        const open = from + MARK_OPEN.length;
        const close = to - (match[2] ? MARK_CLOSE.length : 0);
        add(from, open, hidden);
        if (close > open) {
            add(open, close, marked);
            add(close, close, eye);
        }
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

/** Rendered text: the marks go and the marked text gets a span, which only an editor's styles show. */
export function showMarked(root: Node) {
    const nodes: Text[] = [];
    const owner = root.ownerDocument ?? document;
    const walker = owner.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) if (hasMarks(node.nodeValue ?? "")) nodes.push(node as Text);
    for (const node of nodes)
        node.replaceWith(
            ...markedParts(node.data).map((part) => {
                if (!part.marked) return part.text;
                const span = owner.createElementNS(HTML, "span");
                span.className = "tabularium-sensitive-rendered";
                span.textContent = part.text;
                return span;
            })
        );
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
