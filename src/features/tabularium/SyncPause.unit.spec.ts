import { describe, expect, it, vi } from "vitest";
import { MemoryValueStore } from "@vrtmrz/value-store";
import type { PluginCore } from "@/main";
import { AUTOMATIC_TRIGGERS, LIVE_SYNC_PAUSE_KEY, SyncPause } from "./SyncPause.ts";

function fakeCore(initial: Record<string, boolean>) {
    const settings: Record<string, unknown> = { ...initial };
    const deviceValues = new MemoryValueStore();
    const replicateUserInitiated = vi.fn(async () => true);
    const applySettings = vi.fn(async () => true);
    const core = {
        services: {
            setting: {
                config: deviceValues,
                currentSettings: () => settings,
                applyPartial: vi.fn(async (partial: Record<string, unknown>) => void Object.assign(settings, partial)),
            },
            control: { applySettings },
            replication: { replicateUserInitiated },
        },
    } as unknown as PluginCore;
    return { core, settings, deviceValues, replicateUserInitiated, applySettings };
}

const live = {
    liveSync: true,
    periodicReplication: false,
    syncOnStart: true,
    syncOnSave: true,
    syncOnEditorSave: false,
    syncOnFileOpen: true,
    syncAfterMerge: false,
};

describe("pausing live sync", () => {
    it("records every automatic trigger and switches all of them off", async () => {
        const { core, settings, deviceValues, applySettings } = fakeCore(live);
        const pause = new SyncPause(core);
        expect(pause.canPause()).toBe(true);

        await pause.pause();

        expect(pause.paused).toBe(true);
        for (const key of AUTOMATIC_TRIGGERS) expect(settings[key]).toBe(false);
        expect(JSON.parse(await deviceValues.getValue(LIVE_SYNC_PAUSE_KEY, ""))).toEqual(live);
        expect(applySettings).toHaveBeenCalled();
        expect(pause.canPause()).toBe(false);
    });

    it("restores the recorded triggers on resume and leaves sending to the restarted live replication", async () => {
        const { core, settings, deviceValues, replicateUserInitiated, applySettings } = fakeCore(live);
        const pause = new SyncPause(core);
        await pause.pause();
        applySettings.mockClear();

        await pause.resume();

        expect(pause.paused).toBe(false);
        for (const key of AUTOMATIC_TRIGGERS) expect(settings[key]).toBe(live[key]);
        expect(await deviceValues.getValue(LIVE_SYNC_PAUSE_KEY, "")).toBe("");
        expect(applySettings).toHaveBeenCalledOnce();
        expect(replicateUserInitiated).not.toHaveBeenCalled();
    });

    it("syncs once on resume when the recorded settings were not live", async () => {
        const { core, deviceValues, replicateUserInitiated } = fakeCore(live);
        const pause = new SyncPause(core);
        await deviceValues.setValue(LIVE_SYNC_PAUSE_KEY, JSON.stringify({ ...live, liveSync: false, syncOnSave: true }));
        await pause.load();

        await pause.resume();

        expect(replicateUserInitiated).toHaveBeenCalledOnce();
    });

    it("stays paused across a restart", async () => {
        const first = fakeCore(live);
        await new SyncPause(first.core).pause();
        const restarted = new SyncPause(first.core);

        await restarted.load();

        expect(restarted.paused).toBe(true);
    });

    it("is not offered when the sync mode is periodic or on events", () => {
        const { core } = fakeCore({ ...live, liveSync: false, periodicReplication: true });
        expect(new SyncPause(core).canPause()).toBe(false);
    });

    it("forgets a recorded pause when cleared", async () => {
        const { core, deviceValues } = fakeCore(live);
        const pause = new SyncPause(core);
        await pause.pause();

        await pause.clear();

        expect(pause.paused).toBe(false);
        expect(await deviceValues.getValue(LIVE_SYNC_PAUSE_KEY, "")).toBe("");
    });
});
