import type { RemoteDBSettings, RemotePreferredTweakResult } from "@tabularium/sync-core/compat/common/types";
import type { PreferredTweakProbe, PreferredTweakProbeFactory } from "@tabularium/sync-core/replication";
import {
    CouchDBReplicator,
    type CouchDBReplicatorEnv,
} from "@tabularium/sync-core/compat/replication/couchdb/CouchDBReplicator";
import { createReplicatorDisposer, snapshotRemoteSettings, type ResourceReplicator } from "./shared";

/** Host environment sufficient to construct the preferred-tweak probe. */
export type PreferredTweakResourceHost = CouchDBReplicatorEnv;

interface PreferredTweakReplicator extends ResourceReplicator {
    getRemotePreferredTweakValues(setting: RemoteDBSettings): Promise<RemotePreferredTweakResult>;
}

function createPreferredTweakProbe(
    replicator: PreferredTweakReplicator,
    snapshot: RemoteDBSettings
): PreferredTweakProbe {
    return {
        read: () => replicator.getRemotePreferredTweakValues(snapshot),
        dispose: createReplicatorDisposer(replicator),
    };
}

/** Build an unpublished, independently disposed CouchDB preferred-tweak probe. */
export function createCouchDBPreferredTweakProbeFactory(host: PreferredTweakResourceHost): PreferredTweakProbeFactory {
    return (setting) => {
        const snapshot = snapshotRemoteSettings(setting);
        return Promise.resolve(createPreferredTweakProbe(new CouchDBReplicator(host), snapshot));
    };
}

