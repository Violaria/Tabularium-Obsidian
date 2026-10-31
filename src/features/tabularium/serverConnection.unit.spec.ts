import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { setLang } from "@/common/translation";

// The messages are checked in Chinese.
beforeAll(() => setLang("zh"));
afterAll(() => setLang("def"));
import type { ObsidianLiveSyncSettings } from "@vrtmrz/livesync-commonlib/compat/common/types";
import {
    connectionSettings,
    enforcedOverrides,
    normaliseServer,
    TabulariumApi,
    TabulariumApiError,
} from "./serverConnection";

const reply = (status: number, body: unknown) =>
    new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

describe("normaliseServer", () => {
    it("keeps origin and path without trailing slashes", () => {
        expect(normaliseServer(" https://notes.example.test/ ")).toBe("https://notes.example.test");
        expect(normaliseServer("https://example.test/tabularium//")).toBe("https://example.test/tabularium");
    });
    it("rejects other schemes and invalid input", () => {
        expect(() => normaliseServer("ftp://example.test")).toThrow(TabulariumApiError);
        expect(() => normaliseServer("not a url")).toThrow("服务器地址无效");
    });
});

describe("TabulariumApi", () => {
    it("sends the session token after login and forgets it after logout", async () => {
        const fetcher = vi.fn(async (url: string, _init: RequestInit) => {
            if (url.endsWith("/sessions"))
                return reply(201, {
                    token: "secret-token",
                    user: { id: "u", username: "alice", mustChangePassword: false },
                });
            return reply(200, url.endsWith("/vaults") ? [{ id: "v", name: "notes", state: "ready" }] : { ok: true });
        });
        const api = new TabulariumApi("https://server.test/", fetcher);
        await api.login("alice", "password");
        expect(await api.vaults()).toEqual([{ id: "v", name: "notes", state: "ready" }]);
        expect(fetcher.mock.calls[1]![0]).toBe("https://server.test/api/v1/vaults");
        expect((fetcher.mock.calls[1]![1].headers as Record<string, string>).authorization).toBe("Bearer secret-token");
        await api.logout();
        await api.logout();
        expect(fetcher.mock.calls.filter(([url]) => url.endsWith("/sessions/current"))).toHaveLength(1);
    });
    it("maps server errors and network failures to readable messages", async () => {
        const api = new TabulariumApi("https://server.test", async () =>
            reply(401, { error: "Invalid username or password" })
        );
        await expect(api.login("a", "b")).rejects.toMatchObject({ status: 401, message: "用户名或密码不正确。" });
        const offline = new TabulariumApi("https://server.test", async () => {
            throw new TypeError("network");
        });
        await expect(offline.vaults()).rejects.toThrow("无法连接服务器");
    });
    it("checks the new password length before calling the server", async () => {
        const fetcher = vi.fn();
        await expect(new TabulariumApi("https://server.test", fetcher).changePassword("old", "short")).rejects.toThrow(
            "12"
        );
        expect(fetcher).not.toHaveBeenCalled();
    });
});

describe("connection settings", () => {
    const device = { id: "d", username: "d", password: "device-secret", expiresAt: 1 };
    it("points LiveSync at the gateway with enforced encryption", () => {
        expect(connectionSettings("https://server.test/", "vault-id", device, "passphrase")).toMatchObject({
            couchDB_URI: "https://server.test/sync",
            couchDB_DBNAME: "vault-id",
            couchDB_USER: "d",
            couchDB_PASSWORD: "device-secret",
            encrypt: true,
            E2EEAlgorithm: "v2",
            usePathObfuscation: true,
            syncInternalFiles: false,
            usePluginSync: false,
            isConfigured: true,
        });
    });
    it("requires a passphrase", () => {
        expect(() => connectionSettings("https://server.test", "v", device, "")).toThrow("E2EE 密码短语");
    });
    it("restores weakened values", () => {
        const previous = {
            encrypt: true,
            E2EEAlgorithm: "v2",
            usePathObfuscation: true,
            syncInternalFiles: false,
            usePluginSync: false,
            passphrase: "kept",
        } as ObsidianLiveSyncSettings;
        expect(enforcedOverrides(previous, previous)).toEqual({});
        const weakened = {
            ...previous,
            encrypt: false,
            usePathObfuscation: false,
            syncInternalFiles: true,
            passphrase: "",
        } as ObsidianLiveSyncSettings;
        expect(enforcedOverrides(weakened, previous)).toEqual({
            encrypt: true,
            usePathObfuscation: true,
            syncInternalFiles: false,
            passphrase: "kept",
        });
    });
});
