export {
    AllSettingDefault,
    OnDialogSettingsDefault,
    SettingInformation,
} from "@tabularium/sync-core/compat/common/settingConstants";
export type {
    AllSettings,
    AllSettingItemKey,
    AllStringItemKey,
    AllNumericItemKey,
    AllBooleanItemKey,
    OnDialogSettings,
    ValueOf,
} from "@tabularium/sync-core/compat/common/settingConstants";

import {
    getConfig as getCommonlibConfig,
    getConfName as getCommonlibConfName,
    type AllSettingItemKey,
} from "@tabularium/sync-core/compat/common/settingConstants";
import type { MessageTranslator } from "@tabularium/sync-core/context";
import { translateLiveSyncMessage } from "@/core/common/translation";

// Commonlib defaults `translate` to its English-only translator, so every caller which omits
// it silently renders English regardless of `displayLanguage`. Default it to the LiveSync
// catalogue instead, and re-export these wrappers under the original names so that no call
// site has to remember the second argument.

/** `getConfig` with the LiveSync catalogue applied by default. */
export function getConfig(key: AllSettingItemKey, translate: MessageTranslator = translateLiveSyncMessage) {
    return getCommonlibConfig(key, translate);
}

/** `getConfName` with the LiveSync catalogue applied by default. See `getConfig`. */
export function getConfName(key: AllSettingItemKey, translate: MessageTranslator = translateLiveSyncMessage) {
    return getCommonlibConfName(key, translate);
}
