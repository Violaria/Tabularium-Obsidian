import type { ObsidianLiveSyncSettings } from "@tabularium/sync-core/compat/common/types";
import { createNewVaultSettings } from "@tabularium/sync-core/settings";

export function createDefaultCliSettings(): ObsidianLiveSyncSettings {
    return {
        ...createNewVaultSettings(),
        useIndexedDBAdapter: false,
        isConfigured: false,
    };
}
