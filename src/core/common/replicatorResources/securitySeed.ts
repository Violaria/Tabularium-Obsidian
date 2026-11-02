import type { RemoteDBSettings } from "@tabularium/sync-core/compat/common/types";
import type { SecuritySeedResourceFactory } from "@tabularium/sync-core/replication";
import {
    LiveSyncCouchDBReplicator,
    type LiveSyncCouchDBReplicatorEnv,
} from "@tabularium/sync-core/compat/replication/couchdb/LiveSyncReplicator";
import { createReplicatorDisposer, snapshotRemoteSettings, type ResourceReplicator } from "./shared";

/** Host environment sufficient to construct the Security Seed resource. */
export type SecuritySeedResourceHost = LiveSyncCouchDBReplicatorEnv;

/** Minimal private Replicator surface required by a Security Seed resource. */
interface SecuritySeedReplicator extends ResourceReplicator {
    getReplicationPBKDF2Salt(setting: RemoteDBSettings, refresh?: boolean): Promise<Uint8Array<ArrayBuffer>>;
}

function createSecuritySeedResourceFactory(
    createReplicator: () => SecuritySeedReplicator
): SecuritySeedResourceFactory {
    return (setting) => {
        const snapshot = snapshotRemoteSettings(setting);
        const replicator = createReplicator();
        let readPromise: Promise<Uint8Array<ArrayBuffer>> | undefined;
        const read = () => {
            if (readPromise) return readPromise;
            const pending = Promise.resolve().then(() => replicator.getReplicationPBKDF2Salt(snapshot, true));
            readPromise = pending;
            // A failed read must not poison a later retry within the same resource.
            void pending.catch(() => {
                if (readPromise === pending) readPromise = undefined;
            });
            return pending;
        };
        return Promise.resolve({
            read,
            dispose: createReplicatorDisposer(replicator),
        });
    };
}

/** Build an unpublished, independently disposed CouchDB Security Seed resource. */
export function createCouchDBSecuritySeedResourceFactory(host: SecuritySeedResourceHost): SecuritySeedResourceFactory {
    return createSecuritySeedResourceFactory(() => new LiveSyncCouchDBReplicator(host));
}

