import { describe, expect, it, vi } from "vitest";
import { createWebStorageValueStore } from "@vrtmrz/value-store/web-storage";

vi.mock("@/deps", () => ({
    Notice: class {
        constructor(readonly message: string) {
            notices.push(message);
        }
    },
    normalizePath: (path: string) => path,
}));
const deleted = vi.hoisted(() => [] as string[]);
vi.mock("idb", () => ({ deleteDB: (name: string) => Promise.resolve(void deleted.push(name)) }));
/** The old key-value database of the upgraded device: which revision each file was last reflected from. */
const oldKeyValues = vi.hoisted(() => new Map<string, unknown>());
vi.mock("@/obsidian/common/KeyValueDB", () => ({
    OpenKeyValueDatabase: () =>
        Promise.resolve({
            keys: (range: { lower: string; upper: string }) =>
                Promise.resolve([...oldKeyValues.keys()].filter((key) => key >= range.lower && key <= range.upper)),
            get: (key: string) => Promise.resolve(oldKeyValues.get(key)),
            close: () => Promise.resolve(),
        }),
}));
const notices: string[] = [];

const { adoptOwnNames, DATABASE_SUFFIX, DEVICE_VALUE_PREFIX, namesFor, NAMESPACE_MIGRATION_KEY } = await import("./ownNames");
const { installNamespaceMigration } = await import("./NamespaceMigration");
const { FlagFiles } = await import("@tabularium/sync-core/compat/common/models/redflag.const");

/** localStorage as Obsidian shares it between vaults and plug-ins. */
class MemoryStorage implements Storage {
    private readonly values = new Map<string, string>();
    get length() {
        return this.values.size;
    }
    key(index: number) {
        return [...this.values.keys()][index] ?? null;
    }
    getItem(key: string) {
        return this.values.get(key) ?? null;
    }
    setItem(key: string, value: string) {
        this.values.set(key, value);
    }
    removeItem(key: string) {
        this.values.delete(key);
    }
    clear() {
        this.values.clear();
    }
    keys() {
        return [...this.values.keys()];
    }
}

const VAULT = "Commentarii";
const APP_ID = "0123456789abcdef";

/** A device that synchronised with an earlier Tabularium, whose suffix was Obsidian's app id like the original's. */
function upgradedDevice() {
    const storage = new MemoryStorage();
    storage.setItem("ls-setting-passphrase", "device-key");
    storage.setItem(`obsidian-live-sync-vaultanddevicename-${VAULT}-${APP_ID}`, "Laptop");
    storage.setItem(`${VAULT}-${APP_ID}-database-compatibility-version`, "12");
    storage.setItem(`${VAULT}-${APP_ID}-fast-fetch-checkpoint`, "{}");
    storage.setItem(`Other-${APP_ID}-database-compatibility-version`, "12");
    storage.setItem(`ls-persist-same-changes-${VAULT}-${APP_ID}`, "[[1,2]]");
    storage.setItem(`tabularium-editor-menu:${VAULT}`, "off");
    storage.setItem(`tabularium-auto-link-repair:${VAULT}`, "on");
    return storage;
}

describe("Tabularium's own names", () => {
    it("forms the local database names from the suffix", () => {
        expect(namesFor(VAULT, DATABASE_SUFFIX)).toEqual({
            database: `${VAULT}-tabularium`,
            keyPrefix: `${VAULT}-tabularium-`,
            deviceName: `device-name-${VAULT}-tabularium`,
            localDatabase: `${VAULT}-tabularium-v2`,
            keyValueDatabase: `${VAULT}-tabularium-kv`,
        });
        expect(namesFor(VAULT, DATABASE_SUFFIX, "former")).toMatchObject({
            deviceName: `obsidian-live-sync-vaultanddevicename-${VAULT}-tabularium`,
            localDatabase: `${VAULT}-tabularium-livesync-v2`,
            keyValueDatabase: `${VAULT}-tabularium-livesync-kv`,
        });
        expect(namesFor(VAULT, "", "former").localDatabase).toBe(`${VAULT}-livesync-v2`);
    });

    it("leaves a new vault and settings already under its names alone", () => {
        const storage = upgradedDevice();
        const before = storage.keys();
        expect(adoptOwnNames(storage, VAULT, {})).toBeUndefined();
        expect(adoptOwnNames(storage, VAULT, { additionalSuffixOfDatabaseName: DATABASE_SUFFIX })).toBeUndefined();
        expect(storage.keys()).toEqual(before);
    });

    it("moves the device name of a 0.26 device to its current key", () => {
        const storage = upgradedDevice();
        storage.setItem(`tabularium:obsidian-live-sync-vaultanddevicename-${VAULT}-tabularium`, "Desk");
        expect(adoptOwnNames(storage, VAULT, { additionalSuffixOfDatabaseName: DATABASE_SUFFIX })).toBeUndefined();
        expect(storage.getItem(`tabularium:device-name-${VAULT}-tabularium`)).toBe("Desk");
        expect(storage.getItem(`tabularium:obsidian-live-sync-vaultanddevicename-${VAULT}-tabularium`)).toBeNull();
    });

    it("copies the vault's device values to the new names and leaves a migration pending", () => {
        const storage = upgradedDevice();
        const settings = { isConfigured: true, additionalSuffixOfDatabaseName: APP_ID };

        expect(adoptOwnNames(storage, VAULT, settings)).toBe(APP_ID);

        expect(settings.additionalSuffixOfDatabaseName).toBe(DATABASE_SUFFIX);
        expect(storage.getItem("tabularium:ls-setting-passphrase")).toBe("device-key");
        expect(storage.getItem(`tabularium:device-name-${VAULT}-tabularium`)).toBe("Laptop");
        expect(storage.getItem(`tabularium:${VAULT}-tabularium-database-compatibility-version`)).toBe("12");
        expect(storage.getItem(`tabularium:${VAULT}-tabularium-fast-fetch-checkpoint`)).toBeNull();
        expect(storage.getItem(`tabularium:${VAULT}-tabularium-${NAMESPACE_MIGRATION_KEY}`)).toBe(JSON.stringify({ from: APP_ID }));
        expect(storage.getItem(`tabularium:same-changes:${VAULT}-tabularium`)).toBe("[[1,2]]");
        expect(storage.getItem(`tabularium:editor-menu:${VAULT}`)).toBe("off");
        expect(storage.getItem(`tabularium:auto-link-repair:${VAULT}`)).toBe("on");
        // The old values stay: the original plug-in may use them. Another vault's are not touched.
        expect(storage.getItem(`obsidian-live-sync-vaultanddevicename-${VAULT}-${APP_ID}`)).toBe("Laptop");
        expect(storage.keys().filter((key) => key.includes("Other"))).toEqual([`Other-${APP_ID}-database-compatibility-version`]);
    });

    it("does not overwrite a value the new names already hold", () => {
        const storage = upgradedDevice();
        storage.setItem("tabularium:ls-setting-passphrase", "own-key");
        adoptOwnNames(storage, VAULT, { isConfigured: true, additionalSuffixOfDatabaseName: APP_ID });
        expect(storage.getItem("tabularium:ls-setting-passphrase")).toBe("own-key");
    });

    it("needs no fetch for a vault that is not configured", () => {
        const storage = upgradedDevice();
        adoptOwnNames(storage, VAULT, { isConfigured: false, additionalSuffixOfDatabaseName: APP_ID });
        expect(storage.getItem(`tabularium:${VAULT}-tabularium-${NAMESPACE_MIGRATION_KEY}`)).toBeNull();
    });

    it("reads device values only under its prefix", async () => {
        const storage = upgradedDevice();
        const values = createWebStorageValueStore(storage, { prefix: DEVICE_VALUE_PREFIX });
        expect(await values.getValue("ls-setting-passphrase", "")).toBe("");
        await values.setValue("ls-setting-passphrase", "own-key");
        expect(storage.getItem("ls-setting-passphrase")).toBe("device-key");
    });
});

type Handler = () => Promise<boolean>;

/** A started plug-in with a pending migration: its start-up handlers, server, vault files and old databases. */
function startingDevice(options: { upstreamInstalled?: boolean; online?: boolean } = {}) {
    const storage = upgradedDevice();
    adoptOwnNames(storage, VAULT, { isConfigured: true, additionalSuffixOfDatabaseName: APP_ID });
    const config = createWebStorageValueStore(storage, { prefix: `${DEVICE_VALUE_PREFIX}${VAULT}-tabularium-` });
    const files = new Set<string>(["redflag.md", "notes/a.md"]);
    const handlers: { handler: Handler; priority: number }[] = [];
    const resetHandlers: Handler[] = [];
    const newKeyValues = new Map<string, unknown>();
    const destroyed: string[] = [];
    const online: (() => void)[] = [];
    const state = { online: options.online ?? true };
    const core = {
        services: {
            API: {
                addLog: vi.fn(),
                getSystemVaultName: () => VAULT,
                nativeFetch: vi.fn(() =>
                    state.online ? Promise.resolve(new Response("{}")) : Promise.reject(new Error("net::ERR_INTERNET_DISCONNECTED"))
                ),
            },
            setting: {
                config,
                currentSettings: () => ({ couchDB_URI: "https://notes.example/sync", couchDB_DBNAME: "v1" }),
            },
            appLifecycle: {
                onSettingLoaded: { addHandler: vi.fn() },
                onLayoutReady: { addHandler: (handler: Handler, priority: number) => handlers.push({ handler, priority }) },
                performRestart: vi.fn(),
            },
            databaseEvents: { onResetDatabase: { addHandler: (handler: Handler) => resetHandlers.push(handler) } },
            keyValueDB: {
                openSimpleStore: (kind: string) => ({
                    set: (key: string, value: unknown) => Promise.resolve(void newKeyValues.set(`${kind}-${key}`, value)),
                }),
            },
            database: {
                createPouchDBInstance: (name: string) => ({ destroy: () => Promise.resolve(void destroyed.push(name)) }),
            },
        },
        serviceModules: {
            storageAccess: {
                isExists: (path: string) => Promise.resolve(files.has(path)),
                writeFileAuto: (path: string) => Promise.resolve(!!files.add(path)),
                delete: (path: string) => Promise.resolve(void files.delete(path)),
            },
        },
    };
    const plugin = {
        app: {
            vault: {
                configDir: ".obsidian",
                adapter: { exists: (path: string) => Promise.resolve(!!options.upstreamInstalled && path === ".obsidian/plugins/obsidian-livesync") },
            },
        },
        registerDomEvent: (_target: unknown, _event: string, callback: () => void) => online.push(callback),
    };
    const server = { deviceAuthorization: () => "Basic device" };
    installNamespaceMigration(plugin as never, core as never, server as never, storage);
    handlers.sort((a, b) => a.priority - b.priority);
    /** Runs start-up as the layout-ready chain does, with the fetch handler (priority 10) in between. */
    const start = async (fetch: () => Promise<boolean>) => {
        const chain = [...handlers, { handler: fetch, priority: 10 }].sort((a, b) => a.priority - b.priority);
        for (const { handler } of chain) if (!(await handler())) return false;
        return true;
    };
    /** The fetch handler: with the flag raised, a fetch that removes it on success and leaves it on failure. */
    const fetchSucceeds = () => Promise.resolve(void files.delete(FlagFiles.FETCH_ALL)).then(() => true);
    const fetchFails = () => Promise.resolve(!files.has(FlagFiles.FETCH_ALL));
    return { storage, config, files, destroyed, online, state, core, start, fetchSucceeds, fetchFails, handlers, resetHandlers, newKeyValues };
}

describe("migrating a device to Tabularium's names", () => {
    it("carries each file's base revision over when the fetch resets the key-value database", async () => {
        vi.stubGlobal("indexedDB", { databases: () => Promise.resolve([{ name: `${VAULT}-${APP_ID}-livesync-kv` }]) });
        vi.stubGlobal("IDBKeyRange", { bound: (lower: string, upper: string) => ({ lower, upper }) });
        oldKeyValues.clear();
        oldKeyValues.set("file-reflection-provenance-v1-notes/a.md", { revision: "3-abc" });
        oldKeyValues.set("storage-event-manager-snapshot", []);
        const device = startingDevice();

        for (const handler of device.resetHandlers) await handler();

        expect([...device.newKeyValues]).toEqual([["file-reflection-provenance-v1-notes/a.md", { revision: "3-abc" }]]);
    });

    it("leaves the key-value database alone on a reset with nothing to migrate", async () => {
        const device = startingDevice();
        await device.config.delete(NAMESPACE_MIGRATION_KEY);
        for (const handler of device.resetHandlers) await handler();
        expect(device.newKeyValues.size).toBe(0);
    });

    it("runs before the fetch flag is handled and finishes before the compatibility review", () => {
        const device = startingDevice();
        expect(device.handlers.map((h) => h.priority)).toEqual([8, 25]);
    });

    it("fetches with newer files winning and local files kept, then removes the old names", async () => {
        notices.length = 0;
        const device = startingDevice();
        const seen: string[] = [];
        expect(
            await device.start(async () => {
                seen.push(...device.files);
                seen.push(await device.config.getValue("simple-fetch-mode", ""));
                return device.fetchSucceeds();
            })
        ).toBe(true);

        expect(seen).toContain(FlagFiles.FETCH_ALL);
        expect(JSON.parse(seen[seen.length - 1])).toMatchObject({
            stage1: "Compare time and take newer",
            stage2: "Keep local files even if deleted on remote",
        });
        expect(await device.config.getValue(NAMESPACE_MIGRATION_KEY, "")).toBe("");
        expect(device.destroyed).toEqual([`${VAULT}-${APP_ID}-livesync-v2`]);
        expect(deleted).toContain(`${VAULT}-${APP_ID}-livesync-kv`);
        expect(device.storage.keys().filter((key) => !key.startsWith("tabularium:"))).toEqual([
            "ls-setting-passphrase",
            `Other-${APP_ID}-database-compatibility-version`,
        ]);
        expect([...device.files]).toEqual(["notes/a.md"]);
        expect(notices).toHaveLength(2);
    });

    it("keeps the old names when the original plug-in is installed in the vault", async () => {
        const device = startingDevice({ upstreamInstalled: true });
        await device.start(device.fetchSucceeds);

        expect(await device.config.getValue(NAMESPACE_MIGRATION_KEY, "")).toBe("");
        expect(device.destroyed).toEqual([]);
        expect(device.storage.getItem(`obsidian-live-sync-vaultanddevicename-${VAULT}-${APP_ID}`)).toBe("Laptop");
        expect(device.files.has("redflag.md")).toBe(true);
    });

    it("stays pending when the fetch fails, and tries again at the next start", async () => {
        const device = startingDevice();
        expect(await device.start(device.fetchFails)).toBe(false);
        expect(await device.config.getValue(NAMESPACE_MIGRATION_KEY, "")).not.toBe("");
        expect(device.destroyed).toEqual([]);

        expect(await device.start(device.fetchSucceeds)).toBe(true);
        expect(await device.config.getValue(NAMESPACE_MIGRATION_KEY, "")).toBe("");
    });

    it("starts nothing while the server cannot be reached and restarts once the device is online", async () => {
        notices.length = 0;
        // The plug-in listens for the device coming back online on Obsidian's window.
        vi.stubGlobal("window", {});
        const device = startingDevice({ online: false });
        const fetch = vi.fn(device.fetchSucceeds);

        expect(await device.start(fetch)).toBe(false);
        expect(fetch).not.toHaveBeenCalled();
        expect(device.files.has(FlagFiles.FETCH_ALL)).toBe(false);
        expect(notices[0]).toContain("net::ERR_INTERNET_DISCONNECTED");
        expect(device.online).toHaveLength(1);

        device.online[0]();
        await vi.waitFor(() => expect(device.core.services.API.nativeFetch).toHaveBeenCalledTimes(2));
        expect(device.core.services.appLifecycle.performRestart).not.toHaveBeenCalled();

        device.state.online = true;
        device.online[0]();
        await vi.waitFor(() => expect(device.core.services.appLifecycle.performRestart).toHaveBeenCalledOnce());
    });

    it("does nothing on a device with nothing to migrate", async () => {
        const device = startingDevice();
        await device.config.delete(NAMESPACE_MIGRATION_KEY);
        expect(await device.start(device.fetchSucceeds)).toBe(true);
        expect(device.files.has(FlagFiles.FETCH_ALL)).toBe(false);
        expect(device.core.services.API.nativeFetch).not.toHaveBeenCalled();
    });
});
