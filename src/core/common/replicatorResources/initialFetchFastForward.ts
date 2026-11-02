import type { InitialFetchFastForwardResourceFactory } from "@tabularium/sync-core/replication";
import {
    CouchDBReplicator,
    type CouchDBReplicatorEnv,
} from "@tabularium/sync-core/compat/replication/couchdb/CouchDBReplicator";
import { snapshotRemoteSettings } from "./shared";

/** Create a private CouchDB Replicator for a fresh Fast Fetch checkpoint handoff. */
export function createCouchDBInitialFetchFastForwardResourceFactory(
    host: CouchDBReplicatorEnv
): InitialFetchFastForwardResourceFactory {
    return (setting) => {
        const snapshot = snapshotRemoteSettings(setting);
        const replicator = new CouchDBReplicator(host);
        return Promise.resolve(replicator.createInitialFetchFastForwardResource(snapshot));
    };
}
