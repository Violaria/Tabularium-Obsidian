import type TabulariumPlugin from "@/main";
import { TabulariumSettingTab } from "@/features/tabularium/SettingTab.ts";
import { EVENT_REQUEST_OPEN_SETTINGS, eventHub } from "@/core/common/events.ts";
import type { PluginCore } from "@/main.ts";
import { openObsidianSettings } from "@/obsidian/common/obsidianSettings.ts";

export class ModuleObsidianSettingDialogue {
    readonly plugin: TabulariumPlugin;
    readonly core: PluginCore;
    constructor(plugin: TabulariumPlugin, core: PluginCore) {
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

export function installSettingTab(plugin: TabulariumPlugin, core: PluginCore) {
    const component = new ModuleObsidianSettingDialogue(plugin, core);
    component.install();
    return component;
}
