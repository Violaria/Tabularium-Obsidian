/**
 * Read-only LiveSync runtime for the web notes page: the upstream core with an OPFS directory as its vault.
 * Settings live in memory only, so the passphrase never reaches browser storage.
 */
import { LiveSyncBaseCore } from "@/LiveSyncBaseCore";
import type { ServiceContext } from "@vrtmrz/livesync-commonlib/context";
import type { LiveSyncAbstractReplicator } from "@vrtmrz/livesync-commonlib/compat/replication/LiveSyncAbstractReplicator";
import type { ObsidianLiveSyncSettings } from "@vrtmrz/livesync-commonlib/compat/common/types";
import { useRemoteConfiguration } from "@vrtmrz/livesync-commonlib/compat/serviceFeatures/remoteConfig";
import { stripAllPrefixes } from "@vrtmrz/livesync-commonlib/compat/string_and_binary/path";
import { createWebStorageValueStore } from "@vrtmrz/value-store/web-storage";
import { decrypt as decryptHKDF } from "octagonal-wheels/encryption/hkdf";
import { createLiveSyncBrowserServiceHub } from "@/apps/browser/createLiveSyncBrowserServiceHub";
import { initialiseServiceModulesFSAPI, type FSAPIServiceModules } from "@/apps/webapp/serviceModules/FSAPIServiceModules";
import { basicAuth } from "./api";

export interface NotesFile {
    path: string;
    size: number;
    mtime: number;
}
export interface NotesConnection {
    userId: string;
    vaultId: string;
    username: string;
    password: string;
    passphrase: string;
}

export class WrongPassphraseError extends Error {
    constructor() {
        super("口令错误。");
    }
}
export class CredentialsRejectedError extends Error {}

const ENCRYPTED_META_PREFIX = "/\\:";
const storagePrefix = (vaultId: string) => `tabularium-notes:${vaultId}:`;
const databaseName = (vaultId: string) => `tabularium-${vaultId}`;
const hidden = (path: string) => path.startsWith(".") || path.includes("/.");

/** The OPFS directory that holds one vault's working copy. */
async function vaultDirectory(userId: string, vaultId: string, create: boolean) {
    let directory = await navigator.storage.getDirectory();
    for (const name of ["tabularium", userId, vaultId]) directory = await directory.getDirectoryHandle(name, { create });
    return directory;
}

/** Removes the working copy, the local databases and device values of a vault. */
export async function clearLocalVault(userId: string, vaultId: string) {
    await vaultDirectory(userId, vaultId, true);
    const tabularium = await (await navigator.storage.getDirectory()).getDirectoryHandle("tabularium");
    await (await tabularium.getDirectoryHandle(userId)).removeEntry(vaultId, { recursive: true });
    for (const { name } of await indexedDB.databases()) {
        if (!name?.includes(databaseName(vaultId))) continue;
        await new Promise<void>((resolve, reject) => {
            const request = indexedDB.deleteDatabase(name);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error ?? new Error(`Cannot delete ${name}`));
            request.onblocked = () => reject(new Error(`${name} is still open`));
        });
    }
    // Device values, and PouchDB's own bookkeeping keys (`_pouch_<database>`).
    for (const key of Object.keys(localStorage)) {
        if (key.startsWith(storagePrefix(vaultId)) || key.includes(databaseName(vaultId))) localStorage.removeItem(key);
    }
}

export class NotesRuntime {
    private core?: LiveSyncBaseCore<ServiceContext, never>;
    private modules?: FSAPIServiceModules;
    private changes?: PouchDB.Core.Changes<object>;
    private settings: ObsidianLiveSyncSettings;

    constructor(
        private readonly connection: NotesConnection,
        private readonly events: { changed(): void; restartRequested(): void }
    ) {
        this.settings = {
            couchDB_URI: `${location.origin}/sync`,
            couchDB_DBNAME: connection.vaultId,
            couchDB_USER: connection.username,
            couchDB_PASSWORD: connection.password,
            passphrase: connection.passphrase,
            encrypt: true,
            E2EEAlgorithm: "v2",
            usePathObfuscation: true,
            isConfigured: true,
            liveSync: false,
            syncOnSave: false,
            syncOnStart: false,
            syncOnFileOpen: false,
            periodicReplication: false,
            syncInternalFiles: false,
            usePluginSync: false,
            autoSweepPlugins: false,
            autoSweepPluginsPeriodic: false,
            gcDelay: 0,
        } as ObsidianLiveSyncSettings;
    }

    private get auth() {
        return basicAuth(this.connection.username, this.connection.password);
    }

    /**
     * Opens the vault: verifies the passphrase, adopts the server's chunk parameters, fetches everything
     * on first use and then keeps a live replication running.
     */
    async start(fetched: boolean) {
        const { vaultId, userId } = this.connection;
        const root = await vaultDirectory(userId, vaultId, true);
        const hub = createLiveSyncBrowserServiceHub<ServiceContext>({
            deviceValues: createWebStorageValueStore(localStorage, { prefix: storagePrefix(vaultId) }),
            getSystemVaultName: () => databaseName(vaultId),
            settings: {
                load: () => Promise.resolve(this.settings),
                save: (settings) => {
                    this.settings = settings;
                    return Promise.resolve();
                },
            },
            restart: { schedule: () => this.events.restartRequested() },
        });
        this.core = new LiveSyncBaseCore<ServiceContext, never>(
            hub,
            (core, serviceHub) => (this.modules = initialiseServiceModulesFSAPI(root, core, serviceHub)),
            () => [],
            () => [] as never[],
            (core) => useRemoteConfiguration(core)
        );
        const { services, serviceModules } = this.core;
        if (!(await services.control.onLoad())) throw new Error("同步核心初始化失败。");
        await services.control.onReady();
        await this.verifyPassphrase();
        const preferred = await this.withReplicator((replicator, settings) => replicator.getRemotePreferredTweakValues(settings));
        if (preferred.status === "available") await services.setting.applyPartial(preferred.values, true);
        if (!fetched) await serviceModules.rebuilder.$fetchLocal(false, true);
        await services.setting.applyPartial({ liveSync: true }, true);
        await services.control.applySettings();
        this.changes = services.database.localDatabase.localDatabase
            .changes({ since: "now", live: true })
            .on("change", () => this.events.changed());
    }

    /** Runs a task on the replicator that is active now; the core replaces it whenever settings change. */
    private async withReplicator<T>(task: (replicator: LiveSyncAbstractReplicator, settings: ObsidianLiveSyncSettings) => Promise<T>) {
        const { services } = this.core;
        const result = await services.replicator.runWithActiveReplicatorContext((context) => task(context.replicator as LiveSyncAbstractReplicator, services.setting.currentSettings()));
        if (result === undefined) throw new Error("同步核心没有可用的连接。");
        return result;
    }

    /** Decrypts the path of one metadata document; an empty vault cannot be checked and is accepted. */
    private async verifyPassphrase() {
        const range = `startkey=${encodeURIComponent('"f:"')}&endkey=${encodeURIComponent('"f:\ufff0"')}`;
        const response = await fetch(`/sync/${this.connection.vaultId}/_all_docs?include_docs=true&limit=1&${range}`, {
            headers: { authorization: this.auth },
        });
        if (response.status === 401 || response.status === 403) throw new CredentialsRejectedError("本浏览器的设备凭据已失效。");
        if (!response.ok) throw new Error(`读取笔记库失败（HTTP ${response.status}）。`);
        const { rows } = (await response.json()) as { rows: { doc: { path: string } }[] };
        const path = rows[0]?.doc.path;
        if (!path?.startsWith(ENCRYPTED_META_PREFIX)) return;
        const salt = await this.withReplicator((replicator, settings) => replicator.getReplicationPBKDF2Salt(settings));
        try {
            await decryptHKDF(path.slice(ENCRYPTED_META_PREFIX.length), this.connection.passphrase, salt);
        } catch {
            throw new WrongPassphraseError();
        }
    }

    async files(): Promise<NotesFile[]> {
        const files: NotesFile[] = [];
        for await (const doc of this.core.services.database.localDatabase.findAllNormalDocs()) {
            if (doc._deleted || doc.deleted) continue;
            const path = stripAllPrefixes(doc.path);
            if (!hidden(path)) files.push({ path, size: doc.size, mtime: doc.mtime });
        }
        return files;
    }

    private async body(path: string) {
        const entry = await this.core.serviceModules.databaseFileAccess.fetch(path as never, undefined, true);
        if (!entry || entry.deleted) throw new Error(`找不到文件：${path}`);
        return entry.body;
    }
    async read(path: string) {
        return (await this.body(path)).text();
    }
    async readBinary(path: string) {
        return new Uint8Array(await (await this.body(path)).arrayBuffer());
    }

    async stop() {
        this.changes?.cancel();
        const core = this.core;
        this.core = undefined;
        if (!core) return;
        await this.modules?.storageEventManager.cleanup();
        await core.services.control.onUnload();
    }
}
