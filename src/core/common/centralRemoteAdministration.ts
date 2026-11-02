import {
    MILESTONE_DOCID,
    type EntryMilestoneInfo,
    type RemoteDBSettings,
} from "@tabularium/sync-core/compat/common/types";
import type { CouchDBReplicator } from "@tabularium/sync-core/compat/replication/couchdb/CouchDBReplicator";
import {
    CENTRAL_REMOTE_ADMINISTRATION_FAILURE_REASONS,
    CENTRAL_REMOTE_ADMINISTRATION_OBSERVATION_KINDS,
    applyCentralRemoteAdministrationMutation,
    milestoneSatisfiesCentralRemoteAdministration,
    centralRemoteAdministrationVerificationFailed,
    centralRemoteAdministrationVerified,
    supportedCapability,
    type MilestoneCentralRemoteAdministrationObservation,
    type CentralRemoteAdministrationFailureReason,
    type CentralRemoteAdministrationRequest,
    type CentralRemoteAdministrationReplicator,
    type CentralRemoteAdministrationResult,
    type CentralRemoteAdministrationRunner,
    type ReplicatorInstance,
    type SupportedCapability,
} from "@tabularium/sync-core/replication";

/**
 * Central milestone administration for the CouchDB provider.
 *
 * The provider definition selects a reader before mutation; CouchDB owns a
 * fresh verification connection. Local node identity is established before the
 * mutation.
 */

/** A provider read result, including failures which settled without a throw. */
type CentralMilestoneReadResult =
    | { readonly milestone: EntryMilestoneInfo | false | undefined }
    | { readonly failureReason: CentralRemoteAdministrationFailureReason; readonly detail?: unknown };

/** A settings-bound postcondition reader prepared before remote mutation. */
type PreparedCentralMilestoneReader = () => Promise<CentralMilestoneReadResult>;

/** Select and validate the provider-specific reader without performing I/O. */
type CentralMilestoneReaderPreparer = (
    replicator: CentralRemoteAdministrationReplicator,
    setting: RemoteDBSettings
) => PreparedCentralMilestoneReader;

type CouchDBAdministrationReplicator = CentralRemoteAdministrationReplicator &
    Pick<CouchDBReplicator, "connectRemoteCouchDBWithSetting" | "isMobile">;

function isCentralRemoteAdministrationReplicator(
    replicator: ReplicatorInstance
): replicator is CentralRemoteAdministrationReplicator {
    return (
        "nodeid" in replicator &&
        typeof replicator.nodeid === "string" &&
        "markRemoteResolved" in replicator &&
        typeof replicator.markRemoteResolved === "function" &&
        "markRemoteLocked" in replicator &&
        typeof replicator.markRemoteLocked === "function"
    );
}

async function ensureLocalNodeIdentity(
    replicator: CentralRemoteAdministrationReplicator
): Promise<CentralRemoteAdministrationResult | undefined> {
    if (replicator.nodeid) {
        return undefined;
    }
    if ((await replicator.initializeDatabaseForReplication()) && replicator.nodeid) {
        return undefined;
    }
    return centralRemoteAdministrationVerificationFailed(
        CENTRAL_REMOTE_ADMINISTRATION_FAILURE_REASONS.LOCAL_IDENTITY_UNAVAILABLE
    );
}

function observeMilestone(
    replicator: CentralRemoteAdministrationReplicator,
    milestone: EntryMilestoneInfo
): MilestoneCentralRemoteAdministrationObservation {
    return {
        kind: CENTRAL_REMOTE_ADMINISTRATION_OBSERVATION_KINDS.MILESTONE,
        locked: !!milestone.locked,
        accepted: !!milestone.accepted_nodes?.includes(replicator.nodeid),
        nodeId: replicator.nodeid,
    };
}

function resultFromMilestone(
    replicator: CentralRemoteAdministrationReplicator,
    request: CentralRemoteAdministrationRequest,
    milestone: EntryMilestoneInfo | false | undefined
): CentralRemoteAdministrationResult {
    if (!milestone) {
        return centralRemoteAdministrationVerificationFailed(
            CENTRAL_REMOTE_ADMINISTRATION_FAILURE_REASONS.MILESTONE_NOT_FOUND
        );
    }
    const observation = observeMilestone(replicator, milestone);
    return milestoneSatisfiesCentralRemoteAdministration(request.action, observation)
        ? centralRemoteAdministrationVerified(observation)
        : centralRemoteAdministrationVerificationFailed(
              CENTRAL_REMOTE_ADMINISTRATION_FAILURE_REASONS.POSTCONDITION_MISMATCH,
              {
                  observation,
              }
          );
}

/**
 * Apply and verify the central milestone protocol without selecting a provider.
 *
 * The provider definition has already selected the reader preparer. Preparing
 * it before mutation rejects incomplete composition before a remote write and
 * binds any provider-owned client which must be used for postcondition reading.
 */
async function runCentralRemoteAdministration(
    replicator: CentralRemoteAdministrationReplicator,
    setting: RemoteDBSettings,
    request: CentralRemoteAdministrationRequest,
    prepareMilestoneReader: CentralMilestoneReaderPreparer
): Promise<CentralRemoteAdministrationResult> {
    const identityFailure = await ensureLocalNodeIdentity(replicator);
    if (identityFailure) return identityFailure;

    const readMilestone = prepareMilestoneReader(replicator, setting);
    await applyCentralRemoteAdministrationMutation(replicator, setting, request.action);

    const readResult = await readMilestone();
    if ("failureReason" in readResult) {
        return centralRemoteAdministrationVerificationFailed(readResult.failureReason, { detail: readResult.detail });
    }
    return resultFromMilestone(replicator, request, readResult.milestone);
}

function requireCouchDBAdministrationOperations(
    replicator: CentralRemoteAdministrationReplicator
): asserts replicator is CouchDBAdministrationReplicator {
    if (
        !("connectRemoteCouchDBWithSetting" in replicator) ||
        typeof replicator.connectRemoteCouchDBWithSetting !== "function" ||
        !("isMobile" in replicator) ||
        typeof replicator.isMobile !== "function"
    ) {
        throw new Error("The configured CouchDB administration adapter does not provide milestone access.");
    }
}

function prepareCouchDBMilestoneReader(
    replicator: CentralRemoteAdministrationReplicator,
    setting: RemoteDBSettings
): PreparedCentralMilestoneReader {
    requireCouchDBAdministrationOperations(replicator);

    return async () => {
        // This verification connection is fresh and owned by this read. It is
        // always closed here rather than retained by the active Replicator.
        let connection: Awaited<ReturnType<CouchDBAdministrationReplicator["connectRemoteCouchDBWithSetting"]>>;
        try {
            connection = await replicator.connectRemoteCouchDBWithSetting(setting, replicator.isMobile(), true);
        } catch (error) {
            return { failureReason: CENTRAL_REMOTE_ADMINISTRATION_FAILURE_REASONS.CONNECTION_FAILED, detail: error };
        }
        if (typeof connection === "string") {
            return {
                failureReason: CENTRAL_REMOTE_ADMINISTRATION_FAILURE_REASONS.CONNECTION_FAILED,
                detail: connection,
            };
        }

        let milestone: EntryMilestoneInfo | undefined;
        let observationError: unknown;
        try {
            milestone = await connection.db.get<EntryMilestoneInfo>(MILESTONE_DOCID);
        } catch (error) {
            observationError = error;
        }
        try {
            await connection.close();
        } catch (error) {
            observationError ??= error;
        }
        if (observationError !== undefined) {
            return {
                failureReason: CENTRAL_REMOTE_ADMINISTRATION_FAILURE_REASONS.MILESTONE_READ_FAILED,
                detail: observationError,
            };
        }
        return { milestone };
    };
}

const runCouchDBCentralRemoteAdministration: CentralRemoteAdministrationRunner = async (
    replicator,
    setting,
    request
) => {
    if (!isCentralRemoteAdministrationReplicator(replicator)) {
        return centralRemoteAdministrationVerificationFailed(
            CENTRAL_REMOTE_ADMINISTRATION_FAILURE_REASONS.CAPABILITY_NOT_APPLICABLE
        );
    }
    return await runCentralRemoteAdministration(replicator, setting, request, prepareCouchDBMilestoneReader);
};

/** CouchDB mutation and milestone postcondition verification capability. */
export const COUCHDB_CENTRAL_REMOTE_ADMINISTRATION_CAPABILITY: SupportedCapability<CentralRemoteAdministrationRunner> =
    supportedCapability(runCouchDBCentralRemoteAdministration);

