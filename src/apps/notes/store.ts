// Per-browser state for each account and vault, kept in IndexedDB. Never holds the passphrase.

export interface VaultRecord {
    key: string;
    deviceId: string;
    username: string;
    password: string;
    expiresAt: number;
    /** The vault has been fetched completely at least once. */
    fetched: boolean;
}

const DB = "tabularium-notes";
const STORE = "vaults";
export const recordKey = (userId: string, vaultId: string) => `${userId}:${vaultId}`;

function open() {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(DB, 1);
        request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath: "key" });
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error ?? new Error("IndexedDB unavailable"));
    });
}
async function run<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>) {
    const db = await open();
    try {
        return await new Promise<T>((resolve, reject) => {
            const request = action(db.transaction(STORE, mode).objectStore(STORE));
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error ?? new Error("IndexedDB request failed"));
        });
    } finally {
        db.close();
    }
}

export const readRecord = (key: string) => run<VaultRecord | undefined>("readonly", (store) => store.get(key) as IDBRequest<VaultRecord | undefined>);
export const writeRecord = (record: VaultRecord) => run("readwrite", (store) => store.put(record));
export const deleteRecord = (key: string) => run("readwrite", (store) => store.delete(key));
