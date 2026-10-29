import { createServiceFeature } from "@vrtmrz/livesync-commonlib/compat/interfaces/ServiceModule";
import { __onMissingTranslation, isSupportedLanguage, setLang } from "@/common/translation";

/**
 * The display language is Default (follow Obsidian), English, Chinese or Latin. Default stays Default: it is
 * resolved from Obsidian's language on every start instead of being replaced by the language found once.
 * A saved language that Tabularium no longer ships becomes Default.
 */
export const enableI18nFeature = createServiceFeature(async ({ services: { setting } }) => {
    // Clear missing translation handler to avoid unnecessary warnings.
    __onMissingTranslation(() => {});
    if (!isSupportedLanguage(setting.currentSettings().displayLanguage)) {
        await setting.applyPartial({ displayLanguage: "" });
        await setting.saveSettingData();
    }
    setLang(setting.currentSettings().displayLanguage);
    return true;
});
