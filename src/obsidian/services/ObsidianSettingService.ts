import { type SyncSettings } from "@tabularium/sync-core/compat/common/types";
import {
    EVENT_REQUEST_RELOAD_SETTING_TAB,
    EVENT_SETTING_SAVED,
} from "@tabularium/sync-core/compat/events/coreEvents";
import {
    SettingService,
    type SettingServiceDependencies,
} from "@tabularium/sync-core/compat/services/base/SettingService";
import type { ObsidianServiceContext } from "@/obsidian/services/ObsidianServiceContext";
import { compatGlobal } from "@tabularium/sync-core/compat/common/coreEnvFunctions";
import { adoptOwnNames } from "@/features/tabularium/ownNames";

export function normaliseObsidianSettingsData(data: unknown): SyncSettings | undefined {
    if (typeof data !== "object" || data === null || Array.isArray(data)) return undefined;
    return data as SyncSettings;
}

export class ObsidianSettingService<T extends ObsidianServiceContext> extends SettingService<T> {
    constructor(context: T, dependencies: SettingServiceDependencies) {
        super(context, dependencies);
        this.onSettingSaved.addHandler((settings) => {
            this.context.events.emitEvent(EVENT_SETTING_SAVED, settings);
            return Promise.resolve(true);
        });
        this.onSettingLoaded.addHandler((settings) => {
            this.context.events.emitEvent(EVENT_REQUEST_RELOAD_SETTING_TAB);
            return Promise.resolve(true);
        });
    }
    protected override async saveData(data: SyncSettings): Promise<void> {
        return await this.context.tabulariumPlugin.saveData(data);
    }
    protected override async loadData(): Promise<SyncSettings | undefined> {
        const data = normaliseObsidianSettingsData(await this.context.tabulariumPlugin.loadData());
        if (data) adoptOwnNames(compatGlobal.localStorage, this.APIService.getSystemVaultName(), data);
        return data;
    }
}
