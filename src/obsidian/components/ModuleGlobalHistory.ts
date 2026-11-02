import type ObsidianLiveSyncPlugin from "@/main";
import type { LiveSyncCore } from "@/main";
import { VIEW_TYPE_GLOBAL_HISTORY, GlobalHistoryView } from "@/ui/GlobalHistory/GlobalHistoryView.ts";
import type { WorkspaceLeaf } from "@/deps.ts";
import { $msg } from "@/core/common/translation";

export class ModuleObsidianGlobalHistory {
    readonly plugin: ObsidianLiveSyncPlugin;
    readonly core: LiveSyncCore;
    constructor(plugin: ObsidianLiveSyncPlugin, core: LiveSyncCore) {
        this.plugin = plugin;
        this.core = core;
    }
    get services() {
        return this.core.services;
    }

    _everyOnloadStart(): Promise<boolean> {
        this.services.API.addCommand({
            id: "livesync-global-history",
            name: $msg("Show vault history"),
            callback: () => {
                this.showGlobalHistory();
            },
        });

        this.services.API.registerWindow(VIEW_TYPE_GLOBAL_HISTORY, (leaf: WorkspaceLeaf) => new GlobalHistoryView(leaf, this.plugin));

        return Promise.resolve(true);
    }

    showGlobalHistory() {
        void this.services.API.showWindow(VIEW_TYPE_GLOBAL_HISTORY);
    }
    install(): void {
        const core = this.core;
        const services = core.services;
        services.appLifecycle.onInitialise.addHandler(this._everyOnloadStart.bind(this));
    }
}

export function installGlobalHistory(plugin: ObsidianLiveSyncPlugin, core: LiveSyncCore) {
    const component = new ModuleObsidianGlobalHistory(plugin, core);
    component.install();
    return component;
}
