// Setting keys
export const SETTING_KEY_P2P_DEVICE_NAME = "p2p_device_name";

// Database
export const SuffixDatabaseName = "-localdb";
export const SuffixKeyValueDatabase = "-kv";
/** Device value holding this device's name for a vault (followed by the vault's database name). */
export const DeviceNameKeyPrefix = "device-name-";
/**
 * The names used before 1.0, which are also the original plug-in's: read only to move a device's data to the current
 * names (local and key-value databases, the device name, log files).
 */
export const FORMER_NAMES = {
    databaseSuffix: "-livesync-v2",
    keyValueSuffix: "-livesync-kv",
    deviceNameKeyPrefix: "obsidian-live-sync-vaultanddevicename-",
    logFilePrefix: "livesync_log_",
} as const;
export const ExtraSuffixIndexedDB = "-indexeddb";
