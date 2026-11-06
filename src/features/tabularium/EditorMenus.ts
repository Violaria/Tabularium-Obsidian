// The format and insert menus of web notes, in Obsidian: a toolbar over the selected text, an Insert submenu in the
// editor's context menu, and a command for each action (bindable in Obsidian's hotkeys). The text transforms are the ones
// web notes uses (formatting.ts), so the same action gives the same Markdown on both sides. Obsidian's own editor and its
// live preview stay as they are; only the selected range changes.
import { Menu, sanitizeHTMLToDom, type Editor, type Plugin } from "@/deps";
import type { PluginCore } from "@/main";
import { StateField, type EditorState } from "@codemirror/state";
import { EditorView, showTooltip, type Tooltip, type ViewUpdate } from "@codemirror/view";
import { $msg } from "@/core/common/translation";
import { ownStorageKeys } from "./ownNames";
import { format, insertTemplate, type Format, type Template, type TextEdit } from "./formatting";
import { FORMAT_ACTIONS, HEADINGS, INSERT_ACTIONS, LINE_ACTIONS } from "./editorActions";
import { sensitiveMarks, showMarked } from "./sensitiveEditor";

/** Turned off per device and vault, like automatic link repair: plug-in settings are synced, habits are not. */

const words = () => ({
    start: $msg("tabularium.editor.word.start"), end: $msg("tabularium.editor.word.end"), step: $msg("tabularium.editor.word.step"),
    topic: $msg("tabularium.editor.word.topic"), idea: $msg("tabularium.editor.word.idea"), task: $msg("tabularium.editor.word.task"),
    heading: $msg("tabularium.editor.word.heading"), cell: $msg("tabularium.editor.word.cell"), callout: $msg("tabularium.editor.word.callout"), formula: "E=mc^2",
});
const name = (id: string) => $msg(`tabularium.editor.${id}` as never);

/** Applies a text edit through Obsidian's editor: one undo step, the selection as the transform left it. */
function applyToEditor(editor: Editor, edit: TextEdit) {
    const from = editor.offsetToPos(edit.from);
    const to = editor.offsetToPos(edit.to);
    editor.transaction({ changes: [{ from, to, text: edit.insert }] });
    editor.setSelection(editor.offsetToPos(edit.anchor), editor.offsetToPos(edit.head));
    editor.focus();
}
export function formatEditor(editor: Editor, kind: Format) {
    const from = editor.posToOffset(editor.getCursor("from"));
    const to = editor.posToOffset(editor.getCursor("to"));
    applyToEditor(editor, format(editor.getValue(), from, to, kind, { linkText: $msg("tabularium.editor.linkText") }));
}
export function insertInEditor(editor: Editor, kind: Template) {
    const from = editor.posToOffset(editor.getCursor("from"));
    const to = editor.posToOffset(editor.getCursor("to"));
    applyToEditor(editor, insertTemplate(editor.getValue(), from, to, kind, words()));
}
/** The same, inside the toolbar, where CodeMirror's view is at hand. */
function formatView(view: EditorView, kind: Format) {
    const { from, to } = view.state.selection.main;
    const edit = format(view.state.doc.toString(), from, to, kind, { linkText: $msg("tabularium.editor.linkText") });
    view.dispatch({ changes: { from: edit.from, to: edit.to, insert: edit.insert }, selection: { anchor: edit.anchor, head: edit.head } });
    view.focus();
}

export class TabulariumEditorMenus {
    constructor(
        private readonly plugin: Plugin,
        private readonly core: PluginCore
    ) {}

    private get menuKey() {
        return ownStorageKeys.editorMenu(this.plugin.app.vault.getName());
    }
    /** Whether the toolbar over a selection shows on this device. */
    get toolbar() {
        return this.plugin.app.loadLocalStorage(this.menuKey) !== "off";
    }
    set toolbar(on: boolean) {
        if (on) this.plugin.app.saveLocalStorage(this.menuKey, null);
        else this.plugin.app.saveLocalStorage(this.menuKey, "off");
    }

    install() {
        const { plugin } = this;
        // Commands are registered once the display language is known, so their names follow it.
        this.core.services.appLifecycle.onSettingLoaded.addHandler(() => {
            this.commands();
            return Promise.resolve(true);
        });
        // Right-click in a note: Insert, with the same templates as web notes.
        plugin.registerEvent(
            plugin.app.workspace.on("editor-menu", (menu, editor) => {
                menu.addItem((entry) => {
                    entry.setTitle($msg("tabularium.editor.insert")).setIcon("plus").setSection("insert");
                    const sub = (entry as unknown as { setSubmenu(): Menu }).setSubmenu();
                    for (const item of INSERT_ACTIONS) {
                        if (item === "-") sub.addSeparator();
                        else sub.addItem((inner) => inner.setTitle(name(`insert.${item.id}`)).onClick(() => insertInEditor(editor, item.id)));
                    }
                });
            })
        );
        plugin.registerEditorExtension(this.toolbarExtension());
        plugin.registerEditorExtension(sensitiveMarks);
        // Rendered text loses its marks, so copying leaves them behind. Reading view shows it plain; the tables live preview
        // draws with the same renderer show the span.
        plugin.registerMarkdownPostProcessor((element) => showMarked(element));
    }

    private commands() {
        const { plugin } = this;
        for (const action of [...FORMAT_ACTIONS, ...LINE_ACTIONS.filter((item) => item.id !== "h2"), ...HEADINGS.map((id) => ({ id }))])
            plugin.addCommand({ id: `format-${action.id}`, name: name(action.id), editorCallback: (editor) => formatEditor(editor, action.id) });
        for (const item of INSERT_ACTIONS)
            if (item !== "-") plugin.addCommand({ id: `insert-${item.id}`, name: `${$msg("tabularium.editor.insert")}: ${name(`insert.${item.id}`)}`, editorCallback: (editor) => insertInEditor(editor, item.id) });
    }

    /** A tooltip over a non-empty selection, while the toolbar is on and the note can be edited. */
    private toolbarExtension() {
        const tooltipOf = (state: EditorState): readonly Tooltip[] => {
            const range = state.selection.main;
            if (range.empty || state.readOnly || !this.toolbar) return [];
            return [{ pos: range.from, end: range.to, above: true, strictSide: false, arrow: false, create: (view) => this.toolbarView(view) }];
        };
        return StateField.define<readonly Tooltip[]>({
            create: tooltipOf,
            update: (value, transaction) => (transaction.docChanged || transaction.selection ? tooltipOf(transaction.state) : value),
            provide: (field) => showTooltip.computeN([field], (state) => state.field(field)),
        });
    }

    /** Live preview edits a table cell in an editor of its own while the note's editor keeps a selection: the focused one shows. */
    private toolbarView(view: EditorView) {
        const dom = this.toolbarDom(view);
        const follow = () => dom.toggleClass("is-unfocused", !view.hasFocus);
        follow();
        return {
            dom,
            mount: follow,
            update: (update: ViewUpdate) => {
                if (!update.focusChanged) return;
                follow();
                view.requestMeasure();
            },
        };
    }

    private toolbarDom(view: EditorView) {
        const bar = createDiv({ cls: "tabularium-format-menu" });
        bar.setAttribute("role", "toolbar");
        // Clicking the bar keeps the editor's focus and selection.
        bar.addEventListener("mousedown", (event) => event.preventDefault());
        const button = (id: string, icon: string, run: (event: MouseEvent) => void) => {
            const item = bar.createEl("button", { attr: { type: "button", "aria-label": name(id), title: name(id) } });
            item.append(sanitizeHTMLToDom(icon));
            item.addEventListener("click", run);
        };
        for (const action of FORMAT_ACTIONS) button(action.id, action.icon, () => formatView(view, action.id));
        bar.createSpan({ cls: "sep" });
        for (const action of LINE_ACTIONS) {
            if (action.id === "h2")
                button("heading", action.icon, (event) => {
                    const menu = new Menu();
                    for (const level of HEADINGS) menu.addItem((item) => item.setTitle(name(level)).onClick(() => formatView(view, level)));
                    menu.showAtMouseEvent(event);
                });
            else button(action.id, action.icon, () => formatView(view, action.id));
        }
        return bar;
    }
}

export function installEditorMenus(plugin: Plugin, core: PluginCore) {
    const menus = new TabulariumEditorMenus(plugin, core);
    menus.install();
    return menus;
}
