import { WorkspaceLeaf } from "@/deps.ts";
import GlobalHistoryComponent from "./GlobalHistory.svelte";
import type TabulariumPlugin from "@/main.ts";
import { SvelteItemView } from "@/ui/SvelteItemView.ts";
import { mount } from "svelte";

export const VIEW_TYPE_GLOBAL_HISTORY = "tabularium-global-history";
export class GlobalHistoryView extends SvelteItemView {
    instantiateComponent(target: HTMLElement) {
        return mount(GlobalHistoryComponent, {
            target: target,
            props: {
                plugin: this.plugin,
                core: this.plugin.core,
            },
        });
    }

    plugin: TabulariumPlugin;
    override icon = "clock";
    title: string = "";
    override navigation = true;

    override getIcon(): string {
        return "clock";
    }

    constructor(leaf: WorkspaceLeaf, plugin: TabulariumPlugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType() {
        return VIEW_TYPE_GLOBAL_HISTORY;
    }

    getDisplayText() {
        return "Vault history";
    }
}
