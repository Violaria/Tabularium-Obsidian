// Values this plug-in keeps on the device, per vault, in Obsidian's vault-scoped storage (App#loadLocalStorage and
// App#saveLocalStorage): the sync core's device values (credentials' key, device name, pause state, ...) and the
// plug-in's own (format toolbar, automatic link repair, same-content pairs). Shaped like Web Storage for the value store.
import type { App } from "obsidian";
import { DEVICE_VALUE_PREFIX } from "@/features/tabularium/ownNames";

export interface VaultStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}

/**
 * Obsidian stores a value as JSON and removes the key when the value is falsy, so an empty string would be lost; each
 * value is kept inside a one-element array.
 */
export function createVaultStorage(app: App): VaultStorage {
    return {
        getItem: (key) => {
            const stored: unknown = app.loadLocalStorage(key);
            return Array.isArray(stored) && typeof stored[0] === "string" ? stored[0] : null;
        },
        setItem: (key, value) => app.saveLocalStorage(key, [value]),
        removeItem: (key) => app.saveLocalStorage(key, null),
    };
}

let current: VaultStorage | undefined;
/** Set once by the service hub, before anything reads a value. */
export function useVaultStorage(storage: VaultStorage) {
    current = storage;
}
export function vaultStorage(): VaultStorage {
    if (!current) throw new Error("Vault storage is not ready yet");
    return current;
}

const ADOPTED = `${DEVICE_VALUE_PREFIX}vault-storage`;
/**
 * Before 1.0.1 the values lived in the localStorage that all vaults share, under the "tabularium:" prefix. At its first
 * start with this version a vault copies them into its own storage; they are left in place for the device's other vaults.
 */
export function adoptSharedValues(shared: Storage, vault: VaultStorage) {
    if (vault.getItem(ADOPTED)) return;
    for (let index = 0; index < shared.length; index++) {
        const key = shared.key(index);
        if (key === null || !key.startsWith(DEVICE_VALUE_PREFIX)) continue;
        const value = shared.getItem(key);
        if (value !== null && vault.getItem(key) === null) vault.setItem(key, value);
    }
    vault.setItem(ADOPTED, "1");
}
