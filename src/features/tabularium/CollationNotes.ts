// In reading view, the notes after " —— " in the list of Collation.md fold into an icon after the name, as the
// explanations on the settings page do: shown on hover, and opened or closed below the name by a tap.
import { setIcon, setTooltip, type Plugin } from "obsidian";
import { isRulesNote, NOTE_SEPARATOR } from "@/core/common/fileOrder";

/** Folds the note of one list item, if it has one: the text after the separator up to the item's nested list. */
export function foldNote(item: HTMLElement) {
    const inline: ChildNode[] = [];
    for (const node of Array.from(item.childNodes)) {
        if (node.instanceOf(HTMLElement) && (node.tagName === "UL" || node.tagName === "OL")) break;
        inline.push(node);
    }
    const at = inline.findIndex((node) => node.nodeType === Node.TEXT_NODE && node.textContent!.includes(NOTE_SEPARATOR));
    if (at < 0) return;
    const separated = inline[at] as Text;
    const cut = separated.data.indexOf(NOTE_SEPARATOR);
    const rest = separated.splitText(cut);
    rest.data = rest.data.slice(NOTE_SEPARATOR.length);
    const note = createSpan({ cls: "tabularium-collation-note-text" });
    note.append(rest, ...inline.slice(at + 1));
    const icon = createSpan({ cls: "tabularium-hint tabularium-collation-note" });
    setIcon(icon, "info");
    setTooltip(icon, note.textContent.trim());
    icon.addEventListener("click", (event) => {
        event.preventDefault();
        note.toggleClass("is-open", !note.hasClass("is-open"));
    });
    separated.after(icon, note);
}

export function installCollationNotes(plugin: Plugin) {
    plugin.registerMarkdownPostProcessor((element, context) => {
        if (!isRulesNote(context.sourcePath)) return;
        for (const item of Array.from(element.querySelectorAll("li"))) foldNote(item);
    });
}
