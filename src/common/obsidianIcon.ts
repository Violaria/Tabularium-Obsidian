import { setIcon } from "@/deps.ts";
import type { Action } from "svelte/action";

/** Svelte action that renders a Lucide icon into the element and follows changes of the icon name. */
export const lucideIcon: Action<HTMLElement, string> = (node, name) => {
    setIcon(node, name);
    return { update: (next) => setIcon(node, next) };
};
