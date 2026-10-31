// Web notes as a module of the Tabularium web application: the shell loads this file when the notes module opens.
import { mount as mountComponent, unmount as unmountComponent } from "svelte";
import App from "./App.svelte";
import type { Language } from "../../../../server/ui/i18n";
import "./notes.css";

type Notes = { changeLanguage(next: Language): void; close(): Promise<void> };
let app: Notes | undefined;

/** Draws web notes into `target` (the shell's content area). */
export function mount(target: HTMLElement) {
    app = mountComponent(App, { target }) as unknown as Notes;
}
/** The shell changed the language in its sidebar. */
export function changeLanguage(next: Language) {
    app?.changeLanguage(next);
}
/** Leaving the module: the component stops replication and closes the local database before it goes. */
export async function unmount() {
    if (!app) return;
    const leaving = app;
    app = undefined;
    await leaving.close();
    await unmountComponent(leaving as never);
}
