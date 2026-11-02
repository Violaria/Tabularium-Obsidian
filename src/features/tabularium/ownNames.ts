// Tabularium's own names for what it keeps on a device. Obsidian gives every vault and every plug-in the same localStorage
// and IndexedDB, and the original sync plug-in names its local databases, device values and flag files exactly as
// this plug-in did; in one vault the two would open the same local database. Here the database suffix is always
// "tabularium" (which names the local database, the key-value database and the per-vault device values) and every device
// value starts with "tabularium:". A device that synchronised under the old names fetches once into the new ones
// (NamespaceMigration.ts). This module is loaded by the services, before the features.
import {
    DeviceNameKeyPrefix,
    FORMER_NAMES,
    SuffixDatabaseName,
    SuffixKeyValueDatabase,
    type SyncSettings,
} from "@tabularium/sync-core/compat/common/types";
import { legacyDatabaseCompatibilityVersionKey } from "@/obsidian/common/databaseCompatibility";

export const DATABASE_SUFFIX = "tabularium";
export const DEVICE_VALUE_PREFIX = "tabularium:";
/** A per-vault device value, present until the fetch into the new local database completed; holds the old suffix. */
export const NAMESPACE_MIGRATION_KEY = "namespace-migration";

const PASSPHRASE_KEY = "ls-setting-passphrase";
/** Where an interrupted fetch would resume in the old local database; meaningless for the new one. */
const FAST_FETCH_CHECKPOINT_KEY = "fast-fetch-checkpoint";

/**
 * The names the sync core forms from a vault name and a database suffix: as they are now, or as they were before 1.0
 * (which were also the original plug-in's).
 */
export function namesFor(vaultName: string, suffix: string, era: "current" | "former" = "current") {
    const database = vaultName + (suffix ? `-${suffix}` : "");
    const former = era === "former";
    return {
        /** The vault name with the suffix, as the local database and its stores are named. */
        database,
        /** Per-vault device values (`setting.config`). */
        keyPrefix: `${vaultName}-${suffix}-`,
        deviceName: `${former ? FORMER_NAMES.deviceNameKeyPrefix : DeviceNameKeyPrefix}${vaultName}-${suffix}`,
        localDatabase: database + (former ? FORMER_NAMES.databaseSuffix : SuffixDatabaseName),
        keyValueDatabase: database + (former ? FORMER_NAMES.keyValueSuffix : SuffixKeyValueDatabase),
    };
}

/** Values this plug-in keeps in localStorage by itself, outside the sync core's device values. */
export const ownStorageKeys = {
    /** Pairs of revisions found to have the same content, for conflict checks; per local database. */
    sameChanges: (database: string) => `${DEVICE_VALUE_PREFIX}same-changes:${database}`,
    editorMenu: (vaultName: string) => `${DEVICE_VALUE_PREFIX}editor-menu:${vaultName}`,
    autoLinkRepair: (vaultName: string) => `${DEVICE_VALUE_PREFIX}auto-link-repair:${vaultName}`,
};

/** The same values under the names of 0.25 and earlier; the first was the original plug-in's name too. */
export const formerStorageKeys = {
    sameChanges: (database: string) => `ls-persist-same-changes-${database}`,
    editorMenu: (vaultName: string) => `tabularium-editor-menu:${vaultName}`,
    autoLinkRepair: (vaultName: string) => `tabularium-auto-link-repair:${vaultName}`,
};

/**
 * Called while the settings load, before anything reads a device value: gives settings stored under another suffix
 * Tabularium's suffix, and copies this vault's device values from the old unprefixed names, and the plug-in's own values
 * from their former names. They are copied, not moved, since the original plug-in may use them too. A configured vault is left with a pending migration. Returns the old suffix,
 * or undefined when there was nothing to adopt.
 */
export function adoptOwnNames(
    storage: Storage,
    vaultName: string,
    settings: Partial<SyncSettings>
): string | undefined {
    if (Object.keys(settings).length === 0) return undefined;
    if (settings.additionalSuffixOfDatabaseName === DATABASE_SUFFIX) {
        // A device of 0.26: its device name moves to the current key (the databases move in moveToCurrentNames).
        const former = namesFor(vaultName, DATABASE_SUFFIX, "former").deviceName;
        const current = namesFor(vaultName, DATABASE_SUFFIX).deviceName;
        const value = storage.getItem(DEVICE_VALUE_PREFIX + former);
        if (value !== null && storage.getItem(DEVICE_VALUE_PREFIX + current) === null)
            storage.setItem(DEVICE_VALUE_PREFIX + current, value);
        storage.removeItem(DEVICE_VALUE_PREFIX + former);
        return undefined;
    }
    const from = settings.additionalSuffixOfDatabaseName ?? "";
    const old = namesFor(vaultName, from, "former");
    const own = namesFor(vaultName, DATABASE_SUFFIX);
    const copies: [string, string][] = [
        [PASSPHRASE_KEY, PASSPHRASE_KEY],
        [old.deviceName, own.deviceName],
        [legacyDatabaseCompatibilityVersionKey(vaultName), legacyDatabaseCompatibilityVersionKey(vaultName)],
    ];
    for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i)!;
        if (key.startsWith(old.keyPrefix) && key !== old.keyPrefix + FAST_FETCH_CHECKPOINT_KEY)
            copies.push([key, own.keyPrefix + key.slice(old.keyPrefix.length)]);
    }
    for (const [source, target] of copies) {
        const value = storage.getItem(source);
        if (value !== null && storage.getItem(DEVICE_VALUE_PREFIX + target) === null)
            storage.setItem(DEVICE_VALUE_PREFIX + target, value);
    }
    const ownCopies: [string, string][] = [
        [formerStorageKeys.sameChanges(old.database), ownStorageKeys.sameChanges(own.database)],
        [formerStorageKeys.editorMenu(vaultName), ownStorageKeys.editorMenu(vaultName)],
        [formerStorageKeys.autoLinkRepair(vaultName), ownStorageKeys.autoLinkRepair(vaultName)],
    ];
    for (const [source, target] of ownCopies) {
        const value = storage.getItem(source);
        if (value !== null && storage.getItem(target) === null) storage.setItem(target, value);
    }
    if (settings.isConfigured !== false)
        storage.setItem(DEVICE_VALUE_PREFIX + own.keyPrefix + NAMESPACE_MIGRATION_KEY, JSON.stringify({ from }));
    settings.additionalSuffixOfDatabaseName = DATABASE_SUFFIX;
    return from;
}
