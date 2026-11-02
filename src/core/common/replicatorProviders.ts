import { REMOTE_COUCHDB, type RemoteDBSettings } from "@tabularium/sync-core/compat/common/types";
import {
    CENTRAL_REMOTE_REPLICATION_READINESS,
    NO_INTERACTION,
    REPLICATION_PROGRESS_PRESENTATIONS,
    REMOTE_RESOURCE_KINDS,
    defineReplicatorProviderDefinitions,
    supportedOpenReplicationContinuous,
    replicationBlocked,
    replicationFailed,
    supportedStopActiveTransfer,
    supportedCapability,
    type ReplicatorProviderDefinitionMap,
    type ReplicationOutcome,
    type ReplicatorInstance,
    type UserInitiatedOneShotRunner,
    type UnattendedOneShotRunner,
} from "@tabularium/sync-core/replication";
import {
    CouchDBReplicator,
    type CouchDBReplicatorEnv,
} from "@tabularium/sync-core/compat/replication/couchdb/CouchDBReplicator";
import { getCouchDBReplicatorConfigurationIdentity } from "./replicatorConfigurationIdentity";
import {
    createCouchDBJoinedDevicesResourceFactory,
    createCouchDBConnectionProbeFactory,
    createCouchDBInitialFetchFastForwardResourceFactory,
    createCouchDBPreferredTweakProbeFactory,
    createCouchDBSecuritySeedResourceFactory,
    createCouchDBSynchronisationInformationResourceFactory,
} from "./replicatorResources";
import { COUCHDB_CENTRAL_REMOTE_ADMINISTRATION_CAPABILITY } from "./centralRemoteAdministration";

/** Host environment sufficient to construct every current central provider. */
export type CentralReplicatorProviderHost = CouchDBReplicatorEnv;

/** Minimal operation required by the central one-shot adapters. */
interface OneShotOutcomeReplicator extends ReplicatorInstance {
    openOneShotReplicationWithOutcome(setting: RemoteDBSettings, showResult: boolean): Promise<ReplicationOutcome>;
}

/** Narrow structurally so the adapter does not depend on the concrete provider class. */
function isOneShotOutcomeReplicator(instance: ReplicatorInstance): instance is OneShotOutcomeReplicator {
    return (
        "openOneShotReplicationWithOutcome" in instance &&
        typeof instance.openOneShotReplicationWithOutcome === "function"
    );
}

async function runOneShotWithOutcome(
    instance: ReplicatorInstance,
    setting: RemoteDBSettings,
    showResult: boolean
): Promise<ReplicationOutcome> {
    if (!isOneShotOutcomeReplicator(instance)) {
        return replicationFailed(new Error("The configured provider does not implement one-shot replication."));
    }
    return await instance.openOneShotReplicationWithOutcome(setting, showResult);
}

// Manual and unattended wrappers share the provider transfer operation, but
// keep interaction authority and result presentation explicit at this boundary.
const couchDBUserInitiatedOneShot: UserInitiatedOneShotRunner = async (instance, setting, request) => {
    return await runOneShotWithOutcome(
        instance,
        setting,
        request.progressPresentation === REPLICATION_PROGRESS_PRESENTATIONS.NOTICE
    );
};

const couchDBUnattendedOneShot: UnattendedOneShotRunner = async (instance, setting, request) => {
    if (request.interaction.kind !== NO_INTERACTION.kind) return replicationBlocked("interaction-required");
    return await runOneShotWithOutcome(instance, setting, false);
};

/**
 * Build the complete, deliberately concrete central-provider definitions (CouchDB only) for one
 * Tabularium host. This closed composition is not a runtime provider registry.
 */
export function createCentralReplicatorProviderDefinitions(
    host: CentralReplicatorProviderHost
): ReplicatorProviderDefinitionMap {
    return defineReplicatorProviderDefinitions([REMOTE_COUCHDB] as const, {
        [REMOTE_COUCHDB]: {
            kind: REMOTE_COUCHDB,
            diagnosticName: "CouchDB",
            readiness: CENTRAL_REMOTE_REPLICATION_READINESS,
            isConfigured: (settings) =>
                settings.remoteType === REMOTE_COUCHDB &&
                !!settings.couchDB_URI?.trim() &&
                !!settings.couchDB_DBNAME?.trim(),
            configurationIdentity: getCouchDBReplicatorConfigurationIdentity,
            create: () => Promise.resolve(new CouchDBReplicator(host)),
            remoteResources: {
                [REMOTE_RESOURCE_KINDS.JOINED_DEVICES]: supportedCapability(
                    createCouchDBJoinedDevicesResourceFactory(host)
                ),
                [REMOTE_RESOURCE_KINDS.CONNECTION]: supportedCapability(createCouchDBConnectionProbeFactory(host)),
                [REMOTE_RESOURCE_KINDS.PREFERRED_TWEAK]: supportedCapability(
                    createCouchDBPreferredTweakProbeFactory(host)
                ),
                [REMOTE_RESOURCE_KINDS.SECURITY_SEED]: supportedCapability(
                    createCouchDBSecuritySeedResourceFactory(host)
                ),
                [REMOTE_RESOURCE_KINDS.SYNCHRONISATION_INFORMATION]: supportedCapability(
                    createCouchDBSynchronisationInformationResourceFactory(host)
                ),
                [REMOTE_RESOURCE_KINDS.INITIAL_FETCH_FAST_FORWARD]: supportedCapability(
                    createCouchDBInitialFetchFastForwardResourceFactory(host)
                ),
            },
            centralRemoteAdministration: COUCHDB_CENTRAL_REMOTE_ADMINISTRATION_CAPABILITY,
            userInitiatedOneShot: supportedCapability(couchDBUserInitiatedOneShot),
            unattendedOneShot: supportedCapability(couchDBUnattendedOneShot),
            continuous: supportedOpenReplicationContinuous(),
            stopActiveTransfer: supportedStopActiveTransfer(),
        },
    });
}
