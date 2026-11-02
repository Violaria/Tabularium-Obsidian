// Pausing live sync on this device. Every automatic trigger is recorded and switched off, so edits stay in the local
// database until the user syncs now or resumes; switching off live sync alone would let the save and start-up triggers
// upload instead. The record is a per-vault device value: it belongs to this device and vault, survives a restart and is
// not synchronised.
import type { Plugin } from "obsidian";
import type { SyncSettings } from "@tabularium/sync-core/compat/common/types";
import {
    REPLICATION_PROGRESS_PRESENTATIONS,
    USER_INITIATED_REPLICATION_AUTHORITY,
} from "@tabularium/sync-core/replication";
import { $msg } from "@/core/common/translation";
import type { PluginCore } from "@/main";

export const LIVE_SYNC_PAUSE_KEY = "live-sync-paused";
export const AUTOMATIC_TRIGGERS = [
    "liveSync",
    "periodicReplication",
    "syncOnStart",
    "syncOnSave",
    "syncOnEditorSave",
    "syncOnFileOpen",
    "syncAfterMerge",
] as const satisfies readonly (keyof SyncSettings)[];
type Triggers = Pick<SyncSettings, (typeof AUTOMATIC_TRIGGERS)[number]>;

export class SyncPause {
    /** Read when the settings load, so menus that are built synchronously can ask. */
    paused = false;

    constructor(private readonly core: PluginCore) {}

    private get values() {
        return this.core.services.setting.config;
    }

    async load() {
        this.paused = !!(await this.values.getValue(LIVE_SYNC_PAUSE_KEY, ""));
    }

    canPause() {
        return !this.paused && this.core.services.setting.currentSettings().liveSync;
    }

    async pause() {
        const settings = this.core.services.setting.currentSettings();
        const recorded = Object.fromEntries(AUTOMATIC_TRIGGERS.map((key) => [key, settings[key]])) as Triggers;
        await this.values.setValue(LIVE_SYNC_PAUSE_KEY, JSON.stringify(recorded));
        this.paused = true;
        await this.core.services.setting.applyPartial(Object.fromEntries(AUTOMATIC_TRIGGERS.map((key) => [key, false])), true);
        await this.core.services.control.applySettings();
    }

    async resume() {
        const recorded = JSON.parse((await this.values.getValue(LIVE_SYNC_PAUSE_KEY, "")) || "{}") as Partial<Triggers>;
        await this.core.services.setting.applyPartial(recorded, true);
        await this.values.delete(LIVE_SYNC_PAUSE_KEY);
        this.paused = false;
        await this.core.services.control.applySettings();
        // Live replication, restarted by applying the settings, sends what waited by itself; a one-shot run on top of it
        // would stop the continuous replication it shares the replicator with.
        if (recorded.liveSync) return;
        await this.core.services.replication.replicateUserInitiated({
            trigger: "manual",
            progressPresentation: REPLICATION_PROGRESS_PRESENTATIONS.QUIET,
            interaction: USER_INITIATED_REPLICATION_AUTHORITY,
        });
    }

    /** A login writes new sync settings and a disconnect removes them; a recorded pause no longer applies. */
    async clear() {
        await this.values.delete(LIVE_SYNC_PAUSE_KEY);
        this.paused = false;
    }
}

/** The commands appear only when they apply; `connected` is asked each time. */
export function installSyncPause(plugin: Plugin, core: PluginCore, connected: () => boolean) {
    const pause = new SyncPause(core);
    core.services.appLifecycle.onSettingLoaded.addHandler(async () => {
        await pause.load();
        plugin.addCommand({
            id: "pause-live-sync",
            name: $msg("tabularium.syncMenu.pause"),
            checkCallback: (checking) => {
                if (!connected() || !pause.canPause()) return false;
                if (!checking) void pause.pause();
                return true;
            },
        });
        plugin.addCommand({
            id: "resume-live-sync",
            name: $msg("tabularium.syncMenu.resume"),
            checkCallback: (checking) => {
                if (!connected() || !pause.paused) return false;
                if (!checking) void pause.resume();
                return true;
            },
        });
        return true;
    });
    return pause;
}
