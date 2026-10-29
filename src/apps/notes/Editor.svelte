<script lang="ts">
    // Markdown editor (CodeMirror 6). The parent owns the text; `changed` reports each edit.
    import { onDestroy, onMount } from "svelte";
    import { EditorState } from "@codemirror/state";
    import { EditorView, keymap, drawSelection, highlightActiveLine } from "@codemirror/view";
    import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
    import { defaultHighlightStyle, syntaxHighlighting } from "@codemirror/language";
    import { markdown } from "@codemirror/lang-markdown";

    interface Props {
        text: string;
        changed(text: string): void;
        save(): void;
        dropped(files: File[]): void;
    }
    let { text, changed, save, dropped }: Props = $props();
    let host: HTMLDivElement;
    let view: EditorView | undefined;
    /** Set while the text is replaced from outside, so that the replacement is not reported as an edit. */
    let replacing = false;

    onMount(() => {
        view = new EditorView({
            parent: host,
            state: EditorState.create({
                doc: text,
                extensions: [
                    history(),
                    drawSelection(),
                    highlightActiveLine(),
                    EditorView.lineWrapping,
                    markdown(),
                    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
                    keymap.of([
                        { key: "Mod-s", preventDefault: true, run: () => (save(), true) },
                        indentWithTab,
                        ...defaultKeymap,
                        ...historyKeymap,
                    ]),
                    EditorView.updateListener.of((update) => {
                        if (update.docChanged && !replacing) changed(update.state.doc.toString());
                    }),
                    EditorView.domEventHandlers({
                        drop: (event) => {
                            const files = [...(event.dataTransfer?.files ?? [])];
                            if (!files.length) return false;
                            event.preventDefault();
                            dropped(files);
                            return true;
                        },
                    }),
                ],
            }),
        });
        view.focus();
    });
    onDestroy(() => view?.destroy());

    /** Replaces the whole text, for example after another device changed the note. */
    export function replace(next: string) {
        if (!view || view.state.doc.toString() === next) return;
        replacing = true;
        view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: next } });
        replacing = false;
    }
    /** Inserts at the cursor. */
    export function insert(snippet: string) {
        if (!view) return;
        const { from, to } = view.state.selection.main;
        view.dispatch({ changes: { from, to, insert: snippet }, selection: { anchor: from + snippet.length } });
        view.focus();
    }
</script>

<div class="editor" bind:this={host}></div>
