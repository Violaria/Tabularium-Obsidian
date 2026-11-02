import type ObsidianLiveSyncPlugin from "@/main";
import { TabulariumSettingTab } from "@/features/tabularium/SettingTab.ts";
// import { PouchDB } from "../../lib/src/pouchdb/pouchdb-browser";
import { EVENT_REQUEST_OPEN_SETTINGS, eventHub } from "@/common/events.ts";
import type { LiveSyncCore } from "@/main.ts";
import { openObsidianSettings } from "@/common/obsidianSettings.ts";

export class ModuleObsidianSettingDialogue {
    readonly plugin: ObsidianLiveSyncPlugin;
    readonly core: LiveSyncCore;
    constructor(plugin: ObsidianLiveSyncPlugin, core: LiveSyncCore) {
        this.plugin = plugin;
        this.core = core;
    }
    get app() {
        return this.plugin.app;
    }
    get services() {
        return this.core.services;
    }

    settingTab!: TabulariumSettingTab;

    _everyOnloadAfterLoadSettings(): Promise<boolean> {
        // Tabularium's settings page replaces upstream's; upstream's panes stay in the source but are not registered.
        this.settingTab = new TabulariumSettingTab(this.plugin);
        this.plugin.addSettingTab(this.settingTab);
        eventHub.onEvent(EVENT_REQUEST_OPEN_SETTINGS, () => this.openSetting());
        return Promise.resolve(true);
    }

    openSetting() {
        openObsidianSettings(this.app, "tabularium");
    }

    get appId() {
        return `${"appId" in this.app ? this.app.appId : ""}`;
    }
    install(): void {
        const core = this.core;
        const services = core.services;
        services.appLifecycle.onSettingLoaded.addHandler(this._everyOnloadAfterLoadSettings.bind(this));
    }
}

export function installSettingTab(plugin: ObsidianLiveSyncPlugin, core: LiveSyncCore) {
    const component = new ModuleObsidianSettingDialogue(plugin, core);
    component.install();
    return component;
}
