import { beforeEach, describe, expect, it, vi } from "vitest";

const settingTabState = vi.hoisted(() => ({ created: [] as unknown[] }));

const eventHubState = vi.hoisted(() => ({
    onEvent: vi.fn(),
}));

vi.mock("@/features/tabularium/SettingTab.ts", () => ({
    TabulariumSettingTab: class TabulariumSettingTab {
        constructor(plugin: unknown) {
            settingTabState.created.push(plugin);
        }
    },
}));

vi.mock("@/common/events.ts", () => ({
    EVENT_REQUEST_OPEN_SETTINGS: "request-open-settings",
    eventHub: eventHubState,
}));

import { ModuleObsidianSettingDialogue } from "./ModuleObsidianSettingTab.ts";

function createModuleHarness() {
    let initialisationHandler: (() => Promise<boolean>) | undefined;
    let settingsLoadedHandler: (() => Promise<boolean>) | undefined;
    const plugin = {
        app: {},
        addSettingTab: vi.fn(),
    };
    const services = {
        appLifecycle: {
            onInitialise: {
                addHandler: vi.fn((handler: () => Promise<boolean>) => {
                    initialisationHandler = handler;
                }),
            },
            onSettingLoaded: {
                addHandler: vi.fn((handler: () => Promise<boolean>) => {
                    settingsLoadedHandler = handler;
                }),
            },
        },
    };
    const module = Object.assign(Object.create(ModuleObsidianSettingDialogue.prototype), {
        plugin,
        core: { services },
    }) as ModuleObsidianSettingDialogue;

    module.install();

    return {
        initialisationHandler: () => initialisationHandler,
        module,
        plugin,
        services,
        settingsLoadedHandler: () => settingsLoadedHandler,
    };
}

describe("ModuleObsidianSettingDialogue startup lifecycle", () => {
    beforeEach(() => {
        settingTabState.created.length = 0;
        eventHubState.onEvent.mockClear();
    });

    it("registers the setting tab after persisted settings have loaded", () => {
        const { initialisationHandler, services, settingsLoadedHandler } = createModuleHarness();

        expect(services.appLifecycle.onInitialise.addHandler).not.toHaveBeenCalled();
        expect(services.appLifecycle.onSettingLoaded.addHandler).toHaveBeenCalledOnce();
        expect(initialisationHandler()).toBeUndefined();
        expect(settingsLoadedHandler()).toBeTypeOf("function");
    });

    it("registers Tabularium's settings page as the only one", async () => {
        const { settingsLoadedHandler, plugin } = createModuleHarness();
        await settingsLoadedHandler()!();

        expect(settingTabState.created).toEqual([plugin]);
        expect(plugin.addSettingTab).toHaveBeenCalledOnce();
        expect(eventHubState.onEvent).toHaveBeenCalledWith("request-open-settings", expect.any(Function));
    });
});
