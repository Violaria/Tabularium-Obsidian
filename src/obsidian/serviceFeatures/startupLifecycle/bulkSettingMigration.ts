import { LOG_LEVEL_NOTICE } from "@tabularium/sync-core/compat/common/logger";
import type { LogFunction } from "@tabularium/sync-core/compat/services/lib/logUtils";
import { $msg } from "@/core/common/translation";
import { disableLegacyBulkChunkPreSend } from "@/core/common/compatibilitySettings";
import type { LegacyBulkSendSettings } from "./types";

/** Collaborators required to persist the obsolete bulk-send setting migration. */
export interface BulkSettingMigrationDependencies {
    readonly settings: LegacyBulkSendSettings;
    readonly log: LogFunction;
    readonly saveSettings: () => Promise<void>;
}

/**
 * Disable the removed automatic bulk chunk pre-send setting, retaining the
 * former notice text and persistence boundary.
 */
export async function migrateBulkSendSetting(dependencies: BulkSettingMigrationDependencies): Promise<void> {
    if (disableLegacyBulkChunkPreSend(dependencies.settings)) {
        dependencies.log($msg("moduleMigration.logBulkSendCorrupted"), LOG_LEVEL_NOTICE);
        await dependencies.saveSettings();
    }
}
