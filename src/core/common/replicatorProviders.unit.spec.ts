import { describe, expect, it, vi } from "vitest";
import { REMOTE_COUCHDB, REMOTE_MINIO, REMOTE_P2P } from "@tabularium/sync-core/compat/common/types";
import { createNewVaultSettings } from "@tabularium/sync-core/settings";
import {
    CAPABILITY_SUPPORT_KINDS,
    NO_INTERACTION,
    REPLICATION_COMPLETED,
    REPLICATION_PROGRESS_PRESENTATIONS,
    REMOTE_RESOURCE_KINDS,
    USER_INITIATED_REPLICATION_AUTHORITY,
} from "@tabularium/sync-core/replication";

const constructorMocks = vi.hoisted(() => ({
    couchDB: vi.fn(),
    couchDBOneShot: vi.fn(async (..._args: unknown[]) => REPLICATION_COMPLETED),
}));

vi.mock("@tabularium/sync-core/compat/replication/couchdb/CouchDBReplicator", () => ({
    CouchDBReplicator: class {
        constructor(host: unknown) {
            constructorMocks.couchDB(host);
        }
        openOneShotReplicationWithOutcome(...args: unknown[]) {
            return constructorMocks.couchDBOneShot(...args);
        }
    },
}));

import { createCentralReplicatorProviderDefinitions } from "./replicatorProviders";

describe("central Replicator provider definitions", () => {
    it("keeps the retained remote-resource catalogue bounded", () => {
        expect
            .soft(Object.values(REMOTE_RESOURCE_KINDS).sort())
            .toEqual(
                [
                    "connection",
                    "initial-fetch-fast-forward",
                    "joined-devices",
                    "preferred-tweak",
                    "security-seed",
                    "synchronisation-information",
                ].sort()
            );
    });

    it("lets CouchDB use central preparation", () => {
        const definitions = createCentralReplicatorProviderDefinitions({} as never);
        expect(definitions.get(REMOTE_COUCHDB)?.readiness.centralRemotePreparation).toBe("required");
    });

    it("defines CouchDB as the only central provider; object storage and P2P have none", () => {
        const definitions = createCentralReplicatorProviderDefinitions({} as never);
        expect([...definitions.keys()]).toEqual([REMOTE_COUCHDB]);
        expect(definitions.get(REMOTE_MINIO)).toBeUndefined();
        expect(definitions.get(REMOTE_P2P)).toBeUndefined();
    });

    it("composes the CouchDB policy outside SyncCore", async () => {
        const host = {} as Parameters<typeof createCentralReplicatorProviderDefinitions>[0];
        const definitions = createCentralReplicatorProviderDefinitions(host);
        const couchDB = definitions.get(REMOTE_COUCHDB)!;

        expect("sameKindReconciliation" in couchDB).toBe(false);

        expect(
            couchDB.isConfigured(
                Object.assign(createNewVaultSettings(), {
                    remoteType: REMOTE_COUCHDB,
                    couchDB_URI: "https://couch.example.test",
                    couchDB_DBNAME: "vault",
                })
            )
        ).toBe(true);

        await couchDB.create(createNewVaultSettings());
        expect(constructorMocks.couchDB).toHaveBeenCalledWith(host);
    });

    it("rejects incomplete and wrong-kind settings before construction", () => {
        const definitions = createCentralReplicatorProviderDefinitions({} as never);
        const couchDB = definitions.get(REMOTE_COUCHDB)!;

        expect(couchDB.isConfigured(Object.assign(createNewVaultSettings(), { remoteType: REMOTE_MINIO }))).toBe(false);
        expect(couchDB.isConfigured(Object.assign(createNewVaultSettings(), { remoteType: REMOTE_P2P }))).toBe(false);
        expect(couchDB.isConfigured(Object.assign(createNewVaultSettings(), { remoteType: REMOTE_COUCHDB }))).toBe(
            false
        );
    });

    it("declares the retained owned resources and cohesive optional administration", () => {
        const definitions = createCentralReplicatorProviderDefinitions({} as never);
        const couchResources = definitions.get(REMOTE_COUCHDB)?.remoteResources;
        const couchAdministration = definitions.get(REMOTE_COUCHDB)?.centralRemoteAdministration;

        const resources = Object.values(REMOTE_RESOURCE_KINDS).sort();
        expect(Object.keys(couchResources ?? {}).sort()).toEqual(resources);
        expect(couchResources?.[REMOTE_RESOURCE_KINDS.JOINED_DEVICES]?.kind).toBe(CAPABILITY_SUPPORT_KINDS.SUPPORTED);
        expect(couchResources?.[REMOTE_RESOURCE_KINDS.CONNECTION].kind).toBe(CAPABILITY_SUPPORT_KINDS.SUPPORTED);
        expect(couchResources?.[REMOTE_RESOURCE_KINDS.PREFERRED_TWEAK].kind).toBe(CAPABILITY_SUPPORT_KINDS.SUPPORTED);
        expect(couchResources?.[REMOTE_RESOURCE_KINDS.SECURITY_SEED].kind).toBe(CAPABILITY_SUPPORT_KINDS.SUPPORTED);
        expect(couchResources?.[REMOTE_RESOURCE_KINDS.SYNCHRONISATION_INFORMATION].kind).toBe(
            CAPABILITY_SUPPORT_KINDS.SUPPORTED
        );
        expect(couchResources?.[REMOTE_RESOURCE_KINDS.INITIAL_FETCH_FAST_FORWARD]?.kind).toBe(
            CAPABILITY_SUPPORT_KINDS.SUPPORTED
        );
        expect(couchAdministration?.kind).toBe(CAPABILITY_SUPPORT_KINDS.SUPPORTED);
        expect("activeRemoteReads" in definitions.get(REMOTE_COUCHDB)!).toBe(false);
        expect("fullTransfers" in definitions.get(REMOTE_COUCHDB)!).toBe(false);
    });

    it("dispatches central finite work through provider-local attempt results", async () => {
        const definitions = createCentralReplicatorProviderDefinitions({} as never);
        const couchDB = definitions.get(REMOTE_COUCHDB)!;
        const setting = createNewVaultSettings();
        const couchInstance = await couchDB.create(setting);
        if (!couchInstance) throw new Error("Provider construction failed");
        if (couchDB.userInitiatedOneShot.kind !== CAPABILITY_SUPPORT_KINDS.SUPPORTED) {
            throw new Error("CouchDB OneShot is unavailable");
        }
        if (couchDB.unattendedOneShot.kind !== CAPABILITY_SUPPORT_KINDS.SUPPORTED) {
            throw new Error("CouchDB unattended OneShot is unavailable");
        }

        await expect(
            couchDB.userInitiatedOneShot.run(couchInstance, setting, {
                trigger: "manual",
                progressPresentation: REPLICATION_PROGRESS_PRESENTATIONS.NOTICE,
                interaction: USER_INITIATED_REPLICATION_AUTHORITY,
            })
        ).resolves.toBe(REPLICATION_COMPLETED);
        await expect(
            couchDB.unattendedOneShot.run(couchInstance, setting, {
                trigger: "resume",
                interaction: NO_INTERACTION,
            })
        ).resolves.toBe(REPLICATION_COMPLETED);

        expect(constructorMocks.couchDBOneShot).toHaveBeenNthCalledWith(1, setting, true);
        expect(constructorMocks.couchDBOneShot).toHaveBeenNthCalledWith(2, setting, false);
    });

    it.each([
        ["CouchDB", REMOTE_COUCHDB],
    ] as const)("maps %s progress presentation independently of recovery authority", async (label, remoteType) => {
        const definitions = createCentralReplicatorProviderDefinitions({} as never);
        const definition = definitions.get(remoteType)!;
        if (definition.userInitiatedOneShot.kind !== CAPABILITY_SUPPORT_KINDS.SUPPORTED) {
            throw new Error(`${label} OneShot is unavailable`);
        }
        const setting = Object.assign(createNewVaultSettings(), { remoteType });
        const openOneShotReplicationWithOutcome = vi.fn(async () => REPLICATION_COMPLETED);
        const instance = {
            initializeDatabaseForReplication: vi.fn(async () => true),
            openReplication: vi.fn(async () => true),
            terminateSync: vi.fn(),
            closeReplication: vi.fn(),
            openOneShotReplicationWithOutcome,
        };

        await definition.userInitiatedOneShot.run(instance, setting, {
            trigger: "manual",
            progressPresentation: REPLICATION_PROGRESS_PRESENTATIONS.QUIET,
            interaction: USER_INITIATED_REPLICATION_AUTHORITY,
        });
        await definition.userInitiatedOneShot.run(instance, setting, {
            trigger: "manual",
            progressPresentation: REPLICATION_PROGRESS_PRESENTATIONS.NOTICE,
            interaction: USER_INITIATED_REPLICATION_AUTHORITY,
        });

        expect(openOneShotReplicationWithOutcome).toHaveBeenNthCalledWith(1, setting, false);
        expect(openOneShotReplicationWithOutcome).toHaveBeenNthCalledWith(2, setting, true);
    });

    it("dispatches central finite work through the declared operation rather than constructor identity", async () => {
        const definitions = createCentralReplicatorProviderDefinitions({} as never);
        const couchDB = definitions.get(REMOTE_COUCHDB)!;
        const setting = createNewVaultSettings();
        const createStructuralOneShotReplicator = () => ({
            initializeDatabaseForReplication: vi.fn(async () => true),
            openReplication: vi.fn(async () => true),
            terminateSync: vi.fn(),
            closeReplication: vi.fn(),
            openOneShotReplicationWithOutcome: vi.fn(async () => REPLICATION_COMPLETED),
        });
        const couchInstance = createStructuralOneShotReplicator();
        const unattendedInstance = createStructuralOneShotReplicator();
        if (couchDB.userInitiatedOneShot.kind !== CAPABILITY_SUPPORT_KINDS.SUPPORTED) {
            throw new Error("CouchDB OneShot is unavailable");
        }
        if (couchDB.unattendedOneShot.kind !== CAPABILITY_SUPPORT_KINDS.SUPPORTED) {
            throw new Error("CouchDB unattended OneShot is unavailable");
        }

        const couchOutcome = await couchDB.userInitiatedOneShot.run(couchInstance, setting, {
            trigger: "manual",
            progressPresentation: REPLICATION_PROGRESS_PRESENTATIONS.NOTICE,
            interaction: USER_INITIATED_REPLICATION_AUTHORITY,
        });
        const unattendedOutcome = await couchDB.unattendedOneShot.run(unattendedInstance, setting, {
            trigger: "resume",
            interaction: NO_INTERACTION,
        });

        expect.soft(couchOutcome).toBe(REPLICATION_COMPLETED);
        expect.soft(unattendedOutcome).toBe(REPLICATION_COMPLETED);
        expect(couchInstance.openOneShotReplicationWithOutcome).toHaveBeenCalledWith(setting, true);
        expect(unattendedInstance.openOneShotReplicationWithOutcome).toHaveBeenCalledWith(setting, false);
    });

    it("rejects a one-shot adapter whose Replicator does not declare the required operation", async () => {
        const definitions = createCentralReplicatorProviderDefinitions({} as never);
        const couchDB = definitions.get(REMOTE_COUCHDB)!;
        const setting = createNewVaultSettings();
        const incompleteInstance = {
            initializeDatabaseForReplication: vi.fn(async () => true),
            openReplication: vi.fn(async () => true),
            terminateSync: vi.fn(),
            closeReplication: vi.fn(),
        };
        if (couchDB.userInitiatedOneShot.kind !== CAPABILITY_SUPPORT_KINDS.SUPPORTED) {
            throw new Error("CouchDB OneShot is unavailable");
        }

        const outcome = await couchDB.userInitiatedOneShot.run(incompleteInstance, setting, {
            trigger: "manual",
            progressPresentation: REPLICATION_PROGRESS_PRESENTATIONS.NOTICE,
            interaction: USER_INITIATED_REPLICATION_AUTHORITY,
        });

        expect(outcome.status).toBe("failed");
        expect(incompleteInstance.openReplication).not.toHaveBeenCalled();
    });
});
