// Migration of a device that synchronised under the old names (see ownNames.ts): it fetches once from the server into the
// new local database, then the old names are removed unless the original plug-in is installed in the vault.
import type { Plugin } from "obsidian";
import { normalizePath, Notice } from "@/deps";
import { deleteDB } from "idb";
import { LOG_LEVEL_INFO } from "octagonal-wheels/common/logger";
import { FlagFiles, UpstreamFlagFiles } from "@tabularium/sync-core/compat/common/models/redflag.const";
import { legacyDatabaseCompatibilityVersionKey } from "@/obsidian/common/databaseCompatibility";
import { rememberFetchChoice } from "@/obsidian/serviceFeatures/redFlag.simpleFetch";
import { $msg } from "@/core/common/translation";
import type { LiveSyncCore } from "@/main";
import type { TabulariumServer } from "./ServerLogin";
import { OpenKeyValueDatabase } from "@/obsidian/common/KeyValueDB";
import { FILE_REFLECTION_PROVENANCE_STORE } from "@/core/serviceModules/FileReflectionProvenance";
import { formerStorageKeys, namesFor, NAMESPACE_MIGRATION_KEY } from "./ownNames";

/** The original plug-in's folder in a vault: while it is there, the old names may be its own and are kept. */
export const UPSTREAM_PLUGIN_ID = "obsidian-livesync";

/** Removes what the old names held on this device: the local databases, the vault's device values and flag files. */
export async function removeOldNames(core: LiveSyncCore, storage: Storage, from: string) {
    const vaultName = core.services.API.getSystemVaultName();
    const old = namesFor(vaultName, from);
    await core.services.database.createPouchDBInstance(old.localDatabase).destroy();
    await deleteDB(old.keyValueDatabase);
    const keys = Array.from({ length: storage.length }, (_, i) => storage.key(i)!);
    for (const key of keys) if (key.startsWith(old.keyPrefix)) storage.removeItem(key);
    storage.removeItem(old.deviceName);
    storage.removeItem(legacyDatabaseCompatibilityVersionKey(vaultName));
    for (const key of [
        formerStorageKeys.sameChanges(old.database),
        formerStorageKeys.editorMenu(vaultName),
        formerStorageKeys.autoLinkRepair(vaultName),
    ])
        storage.removeItem(key);
    for (const flag of UpstreamFlagFiles) if (await core.serviceModules.storageAccess.isExists(flag)) await core.serviceModules.storageAccess.delete(flag, true);
}

/**
 * Copies, from the old key-value database, which database revision each vault file was last reflected from. A fetch
 * starts the key-value database afresh, and a file whose base revision is unknown is stored as a separate branch, so an
 * edit made before the upgrade and not yet sent would come back as a conflict. With the records, it is stored on top of
 * the revision it was edited from. The old database is only read; it is left for removeOldNames.
 */
export async function carryOverProvenance(core: LiveSyncCore, oldKeyValueDatabase: string) {
    const existing = await indexedDB.databases();
    if (!existing.some((database) => database.name === oldKeyValueDatabase)) {
        core.services.API.addLog(`No ${oldKeyValueDatabase} to carry base revisions over from`, LOG_LEVEL_INFO);
        return;
    }
    const old = await OpenKeyValueDatabase(oldKeyValueDatabase);
    try {
        const prefix = `${FILE_REFLECTION_PROVENANCE_STORE}-`;
        const store = core.services.keyValueDB.openSimpleStore<unknown>(FILE_REFLECTION_PROVENANCE_STORE);
        const keys = (await old.keys(IDBKeyRange.bound(prefix, `${prefix}\uffff`))).filter((key) => typeof key === "string");
        for (const key of keys) await store.set(key.slice(prefix.length), await old.get(key));
        core.services.API.addLog(`Carried over the base revisions of ${keys.length} files from ${oldKeyValueDatabase}`, LOG_LEVEL_INFO);
    } finally {
        await old.close();
    }
}

/** Why the server cannot be used for the fetch right now, or undefined when it can. */
async function unavailable(core: LiveSyncCore, server: TabulariumServer) {
    const settings = core.services.setting.currentSettings();
    try {
        const response = await core.services.API.nativeFetch(`${settings.couchDB_URI}/${settings.couchDB_DBNAME}`, {
            headers: { authorization: server.deviceAuthorization() },
        });
        return response.ok ? undefined : `HTTP ${response.status}`;
    } catch (error) {
        return error instanceof Error ? error.message : String(error);
    }
}

/**
 * Finishes a pending migration at start-up: the fetch flag is raised (with "newer wins, keep local files", so nothing is
 * asked) before the fetch handler looks for it, and once the fetch has removed the flag the migration is complete. While
 * the server cannot be reached nothing starts, and the device restarts as soon as it is back online.
 */
export function installNamespaceMigration(
    plugin: Plugin,
    core: LiveSyncCore,
    server: TabulariumServer,
    storage: Storage = window.localStorage
) {
    const pending = async () =>
        JSON.parse((await core.services.setting.config.getValue(NAMESPACE_MIGRATION_KEY, "")) || "null") as {
            from: string;
        } | null;
    let waitingForNetwork = false;
    const waitForNetwork = () => {
        if (waitingForNetwork) return;
        waitingForNetwork = true;
        plugin.registerDomEvent(window, "online", () => {
            void unavailable(core, server).then((reason) => {
                if (!reason) core.services.appLifecycle.performRestart();
            });
        });
    };

    // Before the fetch flag is handled (priority 10).
    core.services.appLifecycle.onLayoutReady.addHandler(async () => {
        if (!(await pending())) return true;
        const reason = await unavailable(core, server);
        if (reason) {
            new Notice($msg("tabularium.migration.waiting", { reason }), 0);
            waitForNetwork();
            return false;
        }
        // The answer is remembered for a short while only, so it is given again on every attempt.
        await rememberFetchChoice(core, "newer-keep");
        if (!(await core.serviceModules.storageAccess.isExists(FlagFiles.FETCH_ALL)))
            await core.serviceModules.storageAccess.writeFileAuto(FlagFiles.FETCH_ALL, "");
        new Notice($msg("tabularium.migration.fetching"));
        return true;
    }, 8);

    // The fetch resets the local databases before it reconciles the vault's files with what it fetched.
    core.services.databaseEvents.onResetDatabase.addHandler(async () => {
        const migration = await pending();
        if (migration) await carryOverProvenance(core, namesFor(core.services.API.getSystemVaultName(), migration.from).keyValueDatabase);
        return true;
    });

    // After the fetch (10) and a rebuild (20), before the compatibility review (30).
    core.services.appLifecycle.onLayoutReady.addHandler(async () => {
        const migration = await pending();
        if (!migration || (await core.serviceModules.storageAccess.isExists(FlagFiles.FETCH_ALL))) return true;
        const upstream = normalizePath(`${plugin.app.vault.configDir}/plugins/${UPSTREAM_PLUGIN_ID}`);
        if (!(await plugin.app.vault.adapter.exists(upstream))) await removeOldNames(core, storage, migration.from);
        await core.services.setting.config.delete(NAMESPACE_MIGRATION_KEY);
        new Notice($msg("tabularium.migration.done"));
        return true;
    }, 25);
}
