// The format and insert menus of the editors: web notes (CodeMirror) and the plug-in (Obsidian). One list, so both show
// the same actions with the same symbols; each side names them from its own message catalogue under `editor.<id>`.
import type { Format, Template } from "./formatting";

export interface FormatAction {
    id: Format;
    /** Inner SVG on a 24 grid, drawn with the current colour; or a letter in the book face. */
    icon: string;
    /** Obsidian-style key, also bound in the web editor. */
    key?: string;
}
const svg = (inner: string) => `<svg viewBox="0 0 24 24" aria-hidden="true">${inner}</svg>`;
const letter = (text: string, variant = "") => `<span class="letter${variant ? ` ${variant}` : ""}">${text}</span>`;

export const FORMAT_ACTIONS: FormatAction[] = [
    { id: "bold", icon: letter("B"), key: "Mod-b" },
    { id: "italic", icon: letter("I", "italic"), key: "Mod-i" },
    { id: "strike", icon: letter("S", "struck") },
    { id: "highlight", icon: svg('<path d="m9 15 6.5-6.5a2.1 2.1 0 0 0-3-3L6 12l-1 4z"/><path d="M4 20h16"/>') },
    { id: "code", icon: svg('<path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4"/>') },
    { id: "link", icon: svg('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'), key: "Mod-k" },
    { id: "sensitive", icon: svg('<path d="M10.7 5.1A10 10 0 0 1 12 5c4.6 0 8.4 3.2 9.6 7a10.6 10.6 0 0 1-2.4 3.8M6.6 6.6A10.7 10.7 0 0 0 2.4 12c1.2 3.8 5 7 9.6 7a9.8 9.8 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18"/>') },
];
/** Line formats, after a separator; headings open a small list of levels. */
export const LINE_ACTIONS: FormatAction[] = [
    { id: "h2", icon: letter("H") },
    { id: "quote", icon: svg('<path d="M7 7h4v5c0 3-1.5 4.5-4 5M14 7h4v5c0 3-1.5 4.5-4 5"/>') },
    { id: "bullet", icon: svg('<circle cx="5.5" cy="7" r="1"/><circle cx="5.5" cy="12" r="1"/><circle cx="5.5" cy="17" r="1"/><path d="M10 7h9M10 12h9M10 17h9"/>') },
    { id: "numbered", icon: svg('<path d="M10 7h9M10 12h9M10 17h9M4.5 5.5h1.5v4M4.5 14.5h2l-2 3h2"/>') },
    { id: "task", icon: svg('<rect x="4" y="4.5" width="15" height="15" rx="3"/><path d="m8 12 3 3 5-6"/>') },
    { id: "clear", icon: svg('<path d="M5 6h11M10.5 6l-3 12M15 14l5 5M20 14l-5 5"/>') },
];
export const HEADINGS: Format[] = ["h1", "h2", "h3", "h4", "h5", "h6"];

export interface InsertAction {
    id: Template;
    icon: string;
}
export const INSERT_ACTIONS: (InsertAction | "-")[] = [
    { id: "table", icon: svg('<rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M3.5 10h17M3.5 14.5h17M9.5 5v14M15 5v14"/>') },
    { id: "code", icon: svg('<path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.5 5.5l-3 13"/>') },
    "-",
    { id: "flowchart", icon: svg('<rect x="3.5" y="9.5" width="5" height="5" rx="1"/><rect x="15.5" y="4" width="5" height="5" rx="1"/><rect x="15.5" y="15" width="5" height="5" rx="1"/><path d="M8.5 12H12m0-5.5V17.5M12 6.5h3.5M12 17.5h3.5"/>') },
    { id: "sequence", icon: svg('<path d="M6 4v16M18 4v16M6 9h12m-2.5-2.5L18 9l-2.5 2.5M18 15H6m2.5 2.5L6 15l2.5-2.5"/>') },
    { id: "mindmap", icon: svg('<circle cx="12" cy="12" r="2.5"/><circle cx="5" cy="6" r="1.8"/><circle cx="19" cy="6" r="1.8"/><circle cx="5" cy="18" r="1.8"/><circle cx="19" cy="18" r="1.8"/><path d="m6.5 7.2 3.5 3M17.5 7.2l-3.5 3M6.5 16.8l3.5-3M17.5 16.8l-3.5-3"/>') },
    { id: "gantt", icon: svg('<path d="M4 4v16h16"/><path d="M7 7.5h6M10 11.5h7M8 15.5h5"/>') },
    "-",
    { id: "mathInline", icon: letter("∑") },
    { id: "mathBlock", icon: svg('<rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M15 9H9l3 3-3 3h6"/>') },
    { id: "callout", icon: svg('<rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M12 9v3.5M12 15.5v.1"/>') },
    { id: "divider", icon: svg('<path d="M4 12h16"/>') },
];
