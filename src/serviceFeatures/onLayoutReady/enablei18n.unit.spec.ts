import { describe, expect, it, vi } from "vitest";

const setLang = vi.hoisted(() => vi.fn());
vi.mock("@/common/translation", () => ({
    __onMissingTranslation: vi.fn(),
    isSupportedLanguage: (lang: string) => ["", "def", "zh", "la"].includes(lang),
    setLang,
}));

import { enableI18nFeature } from "./enablei18n.ts";

function host(displayLanguage: string) {
    const settings = { displayLanguage };
    const applyPartial = vi.fn(async (partial: Partial<typeof settings>) => Object.assign(settings, partial));
    const saveSettingData = vi.fn().mockResolvedValue(undefined);
    return {
        settings,
        saveSettingData,
        host: { services: { setting: { currentSettings: () => settings, applyPartial, saveSettingData } } },
    };
}

describe("display language", () => {
    it("keeps Default so that it follows Obsidian on every start", async () => {
        const { settings, saveSettingData, host: target } = host("");
        await expect(enableI18nFeature(target as never)).resolves.toBe(true);
        expect(settings.displayLanguage).toBe("");
        expect(saveSettingData).not.toHaveBeenCalled();
        expect(setLang).toHaveBeenLastCalledWith("");
    });

    it("applies a chosen language, including Latin", async () => {
        const { host: target } = host("la");
        await enableI18nFeature(target as never);
        expect(setLang).toHaveBeenLastCalledWith("la");
    });

    it("turns a language that is no longer shipped into Default", async () => {
        const { settings, saveSettingData, host: target } = host("ja");
        await enableI18nFeature(target as never);
        expect(settings.displayLanguage).toBe("");
        expect(saveSettingData).toHaveBeenCalledOnce();
        expect(setLang).toHaveBeenLastCalledWith("");
    });
});
