import { describe, expect, it, vi } from "vitest";
import { LOG_LEVEL_NOTICE } from "@tabularium/sync-core/compat/common/types";

vi.mock("@/core/common/events.ts", () => ({
    EVENT_LAYOUT_READY: "layout-ready",
    EVENT_PLUGIN_LOADED: "plugin-loaded",
    EVENT_REQUEST_RELOAD_SETTING_TAB: "reload-setting-tab",
    EVENT_SETTING_SAVED: "setting-saved",
    eventHub: {
        emitEvent: vi.fn(),
        onEvent: vi.fn(),
    },
}));

vi.mock("@/core/common/translation", () => ({
    $msg: (message: string) => message,
    setLang: vi.fn(),
}));

vi.mock("@tabularium/sync-core/compat/worker/bgWorker", () => ({
    initialiseWorkerModule: vi.fn(),
}));

import { StartupSequence } from "./StartupSequence.ts";

describe("StartupSequence", () => {
    it.each(["unlock", "cancel"] as const)(
        "keeps database and settings lifecycle behind a pending configuration load: %s",
        async (outcome) => {
            let unlock!: () => void;
            let cancel!: (error: Error) => void;
            const loadSettings = vi.fn(
                () =>
                    new Promise<void>((resolve, reject) => {
                        unlock = resolve;
                        cancel = reject;
                    })
            );
            const appLifecycle = {
                onWireUpEvents: vi.fn(async () => true),
                onInitialise: vi.fn(async () => true),
                onSettingLoaded: vi.fn(async () => true),
                onLoaded: vi.fn(async () => true),
            };
            const openDatabase = vi.fn(async () => undefined);
            const services = {
                context: { events: {} },
                setting: { loadSettings, currentSettings: () => ({ displayLanguage: "" }) },
                appLifecycle,
                database: { openDatabase },
                databaseEvents: {},
                replicator: {},
            };
            const host = { services, core: { services, addOns: [] }, _log: vi.fn() };
            const pending = StartupSequence.prototype._onLoad.call(host as never);
            await vi.waitFor(() => expect(loadSettings).toHaveBeenCalledOnce());
            expect(appLifecycle.onSettingLoaded).not.toHaveBeenCalled();
            expect(openDatabase).not.toHaveBeenCalled();
            expect(appLifecycle.onLoaded).not.toHaveBeenCalled();

            if (outcome === "cancel") {
                const rejected = expect(pending).rejects.toThrow("synthetic cancelled configuration load");
                cancel(new Error("synthetic cancelled configuration load"));
                await rejected;
                expect(appLifecycle.onSettingLoaded).not.toHaveBeenCalled();
                expect(openDatabase).not.toHaveBeenCalled();
                expect(appLifecycle.onLoaded).not.toHaveBeenCalled();
            } else {
                unlock();
                await expect(pending).resolves.toBe(true);
                expect(appLifecycle.onSettingLoaded).toHaveBeenCalledOnce();
                expect(openDatabase).toHaveBeenCalledOnce();
                expect(appLifecycle.onSettingLoaded.mock.invocationCallOrder[0]).toBeLessThan(
                    openDatabase.mock.invocationCallOrder[0]
                );
            }
        }
    );

    it("reports a database preparation failure at the application boundary", async () => {
        const initialiseDatabase = vi.fn(async () => false);
        const log = vi.fn();
        const host = {
            core: {
                startupDatabaseOptions: {},
                services: {
                    appLifecycle: {
                        onLayoutReady: vi.fn(async () => true),
                    },
                },
            },
            services: {
                databaseEvents: { initialiseDatabase },
            },
            settings: {
                suspendFileWatching: false,
                suspendParseReplicationResult: false,
            },
            _log: log,
        };

        const result = await StartupSequence.prototype._onReady.call(host as never);

        expect(result).toBe(false);
        expect(initialiseDatabase).toHaveBeenCalledWith(false, false, false, true);
        expect(log).toHaveBeenCalledWith("Ui.Common.LocalDatabaseInitialisationFailed", LOG_LEVEL_NOTICE);
    });

    it("warns when start-up continues with individual file failures", async () => {
        const initialiseDatabase = vi.fn(async () => "completed-with-file-failures");
        const log = vi.fn();
        const appLifecycle = {
            onLayoutReady: vi.fn(async () => true),
            onFirstInitialise: vi.fn(async () => true),
            onScanningStartupIssues: vi.fn(async () => true),
        };
        const host = {
            core: {
                startupDatabaseOptions: {},
                services: { appLifecycle },
            },
            services: {
                appLifecycle,
                control: { applySettings: vi.fn(async () => undefined) },
                databaseEvents: { initialiseDatabase },
            },
            settings: {
                suspendFileWatching: false,
                suspendParseReplicationResult: false,
            },
            _log: log,
        };

        const result = await StartupSequence.prototype._onReady.call(host as never);

        expect(result).toBe(true);
        expect(log).toHaveBeenCalledWith("Ui.Common.SomeFilesCouldNotBeSynchronised", LOG_LEVEL_NOTICE);
    });

    it("passes strict startup database options to initialisation", async () => {
        const initialiseDatabase = vi.fn(async () => false);
        const host = {
            core: {
                startupDatabaseOptions: {
                    ignoreSuspending: true,
                    continueOnFileFailure: false,
                },
                services: {
                    appLifecycle: {
                        onLayoutReady: vi.fn(async () => true),
                    },
                },
            },
            services: {
                databaseEvents: { initialiseDatabase },
            },
            settings: {
                suspendFileWatching: false,
                suspendParseReplicationResult: false,
            },
            _log: vi.fn(),
        };

        await StartupSequence.prototype._onReady.call(host as never);

        expect(initialiseDatabase).toHaveBeenCalledWith(false, false, true, false);
    });
});
