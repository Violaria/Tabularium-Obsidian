import { TabulariumSettingTab } from "@/features/tabularium/SettingTab.ts";
import { AbstractObsidianModule } from "@/modules/AbstractObsidianModule.ts";
// import { PouchDB } from "../../lib/src/pouchdb/pouchdb-browser";
import { EVENT_REQUEST_OPEN_SETTINGS, eventHub } from "@/common/events.ts";
import type { LiveSyncCore } from "@/main.ts";
import { openObsidianSettings } from "@/common/obsidianSettings.ts";

export class ModuleObsidianSettingDialogue extends AbstractObsidianModule {
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
    override onBindFunction(core: LiveSyncCore, services: typeof core.services): void {
        services.appLifecycle.onSettingLoaded.addHandler(this._everyOnloadAfterLoadSettings.bind(this));
    }
}
