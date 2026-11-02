import type { InitialFetchFastForwardResourceFactory } from "@tabularium/sync-core/replication";
import {
    LiveSyncCouchDBReplicator,
    type LiveSyncCouchDBReplicatorEnv,
} from "@tabularium/sync-core/compat/replication/couchdb/LiveSyncReplicator";
import { snapshotRemoteSettings } from "./shared";

/** Create a private CouchDB Replicator for a fresh Fast Fetch checkpoint handoff. */
export function createCouchDBInitialFetchFastForwardResourceFactory(
    host: LiveSyncCouchDBReplicatorEnv
): InitialFetchFastForwardResourceFactory {
    return (setting) => {
        const snapshot = snapshotRemoteSettings(setting);
        const replicator = new LiveSyncCouchDBReplicator(host);
        return Promise.resolve(replicator.createInitialFetchFastForwardResource(snapshot));
    };
}
