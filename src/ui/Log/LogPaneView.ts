import { WorkspaceLeaf } from "@/deps.ts";
import LogPaneComponent from "./LogPane.svelte";
import type TabulariumPlugin from "@/main.ts";
import { SvelteItemView } from "@/ui/SvelteItemView.ts";
import { $msg } from "@/core/common/translation";
import { mount } from "svelte";
export const VIEW_TYPE_LOG = "tabularium-log";
//Log view
export class LogPaneView extends SvelteItemView {
    instantiateComponent(target: HTMLElement) {
        return mount(LogPaneComponent, {
            target: target,
            props: {
                close: () => {
                    this.leaf.detach();
                },
            },
        });
    }

    plugin: TabulariumPlugin;
    override icon = "view-log";
    title: string = "";
    override navigation = false;

    override getIcon(): string {
        return "view-log";
    }

    constructor(leaf: WorkspaceLeaf, plugin: TabulariumPlugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType() {
        return VIEW_TYPE_LOG;
    }

    getDisplayText() {
        // TODO: This function is not reactive and does not update the title based on the current language
        return $msg("logPane.title");
    }
}
