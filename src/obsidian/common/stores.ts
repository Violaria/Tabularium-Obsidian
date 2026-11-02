import { ownStorageKeys } from "@/features/tabularium/ownNames";
import { vaultStorage, type VaultStorage } from "./vaultStorage";

/** A small map kept as one JSON value in the vault's storage, written on every change. */
class VaultMap<T> {
    private readonly map: Map<string, T>;
    constructor(
        private readonly storage: VaultStorage,
        private readonly key: string
    ) {
        this.map = new Map(JSON.parse(storage.getItem(key) ?? "[]") as [string, T][]);
    }
    get(key: string, fallback?: T) {
        return this.map.get(key) ?? fallback;
    }
    set(key: string, value: T) {
        this.map.set(key, value);
        this.save();
        return this;
    }
    delete(key: string) {
        const deleted = this.map.delete(key);
        if (deleted) this.save();
        return deleted;
    }
    private save() {
        this.storage.setItem(this.key, JSON.stringify([...this.map]));
    }
}

export let sameChangePairs: VaultMap<number[]>;

export function initializeStores(vaultName: string) {
    sameChangePairs = new VaultMap<number[]>(vaultStorage(), ownStorageKeys.sameChanges(vaultName));
}
