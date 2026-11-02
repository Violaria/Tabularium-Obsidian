import { describe, expect, it } from "vitest";
import { adoptSharedValues, type VaultStorage } from "./vaultStorage";

function sharedStorage(entries: Record<string, string>): Storage {
    const map = new Map(Object.entries(entries));
    return {
        get length() {
            return map.size;
        },
        key: (index: number) => [...map.keys()][index] ?? null,
        getItem: (key: string) => map.get(key) ?? null,
        setItem: (key: string, value: string) => void map.set(key, value),
        removeItem: (key: string) => void map.delete(key),
        clear: () => map.clear(),
    };
}
function vaultStorage(): VaultStorage & { map: Map<string, string> } {
    const map = new Map<string, string>();
    return { map, getItem: (key) => map.get(key) ?? null, setItem: (key, value) => void map.set(key, value), removeItem: (key) => void map.delete(key) };
}

describe("moving device values into the vault's own storage", () => {
    it("copies Tabularium's values once, leaves the shared ones and keeps values the vault already has", () => {
        const shared = sharedStorage({ "tabularium:ls-setting-passphrase": "key", "tabularium:device-name-V-tabularium": "Laptop", other: "x" });
        const vault = vaultStorage();
        vault.setItem("tabularium:device-name-V-tabularium", "Desk");
        adoptSharedValues(shared, vault);
        expect(vault.getItem("tabularium:ls-setting-passphrase")).toBe("key");
        expect(vault.getItem("tabularium:device-name-V-tabularium")).toBe("Desk");
        expect(vault.getItem("other")).toBeNull();
        expect(shared.getItem("tabularium:ls-setting-passphrase")).toBe("key");
        // Once adopted, later shared values are not read again.
        shared.setItem("tabularium:late", "y");
        adoptSharedValues(shared, vault);
        expect(vault.getItem("tabularium:late")).toBeNull();
    });
});
