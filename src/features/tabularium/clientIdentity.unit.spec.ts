import { describe, expect, it } from "vitest";
import { clientId, clientName, type PlatformFlags } from "./clientIdentity";

const flags = (set: Partial<PlatformFlags>): PlatformFlags => ({
    isIosApp: false,
    isTablet: false,
    isAndroidApp: false,
    isMacOS: false,
    isWin: false,
    isLinux: false,
    ...set,
});

describe("client identity", () => {
    it("names the client after its platform", () => {
        expect(clientName(flags({ isWin: true }))).toBe("Obsidian · Windows");
        expect(clientName(flags({ isMacOS: true }))).toBe("Obsidian · macOS");
        expect(clientName(flags({ isLinux: true }))).toBe("Obsidian · Linux");
        expect(clientName(flags({ isAndroidApp: true }))).toBe("Obsidian · Android");
        expect(clientName(flags({ isIosApp: true, isMacOS: true }))).toBe("Obsidian · iPhone");
        expect(clientName(flags({ isIosApp: true, isTablet: true }))).toBe("Obsidian · iPad");
        expect(clientName(flags({}))).toBe("Obsidian");
    });
    it("keeps one ID in the storage it is given", () => {
        const values = new Map<string, string>();
        const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => void values.set(key, value) };
        const first = clientId(storage);
        expect(first).toMatch(/^[0-9a-f-]{36}$/);
        expect(clientId(storage)).toBe(first);
        expect([...values.keys()]).toEqual(["tabularium:client-id"]);
    });
});
