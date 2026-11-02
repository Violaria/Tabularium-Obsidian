import PouchDB from "pouchdb-core";

import IDBPouch from "pouchdb-adapter-idb";
//@ts-ignore
import INDEXEDDBPouch from "pouchdb-adapter-indexeddb";
import HttpPouch from "pouchdb-adapter-http";
import mapreduce from "pouchdb-mapreduce";
import replication from "pouchdb-replication";

import find from "pouchdb-find";
import transform from "transform-pouch";
//@ts-ignore
import { findPathToLeaf } from "pouchdb-merge";
//@ts-ignore
import { adapterFun } from "pouchdb-utils";
//@ts-ignore
import { createError, MISSING_DOC, UNKNOWN_ERROR } from "pouchdb-errors";
import { mapAllTasksWithConcurrencyLimit, unwrapTaskResult } from "octagonal-wheels/concurrency/task";

PouchDB.plugin(IDBPouch)
    .plugin(INDEXEDDBPouch)
    .plugin(HttpPouch)
    .plugin(mapreduce)
    .plugin(replication)
    .plugin(find)
    .plugin(transform);

type PurgeMultiResult = {
    ok: true;
    deletedRevs: string[];
    documentWasRemovedCompletely: boolean;
};
type PurgeMultiParam = [docId: string, rev$$1: string];
/** PouchDB's record of purged revisions, kept in a local document. */
type PurgesDocument = {
    _id: string;
    _rev?: string;
    purgeSeq: number;
    purges: { docId: string; rev: string; purgeSeq: number }[];
};
/** The adapter internals the purge plug-in uses; PouchDB's typings do not describe them. */
type PurgeCapableDatabase = PouchDB.Database & {
    adapter: string;
    purged_infos_limit: number;
    _purge?: (docId: string, path: unknown, callback: (error: Error, result: PurgeMultiResult) => void) => void;
    _getRevisionTree: (docId: string, callback: (error: Error, revs: string[]) => void) => void;
};
function appendPurgeSeqs(db: PurgeCapableDatabase, docs: PurgeMultiParam[]) {
    return (
        db
            .get<PurgesDocument>("_local/purges")
            .then(function (doc) {
                for (const [docId, rev$$1] of docs) {
                    const purgeSeq = doc.purgeSeq + 1;
                    doc.purges.push({
                        docId,
                        rev: rev$$1,
                        purgeSeq,
                    });
                    if (doc.purges.length > db.purged_infos_limit) {
                        doc.purges.splice(0, doc.purges.length - db.purged_infos_limit);
                    }
                    doc.purgeSeq = purgeSeq;
                }
                return doc;
            })
            .catch(function (err) {
                if (err.status !== 404) {
                    throw err;
                }
                return {
                    _id: "_local/purges",
                    purges: docs.map(([docId, rev$$1], idx) => ({
                        docId,
                        rev: rev$$1,
                        purgeSeq: idx,
                    })),
                    purgeSeq: docs.length,
                };
            })
            .then(function (doc) {
                return db.put(doc);
            })
    );
}

/**
 * purge multiple documents at once.
 */
PouchDB.prototype.purgeMulti = adapterFun(
    "_purgeMulti",
    function (
        this: PurgeCapableDatabase,
        docs: PurgeMultiParam[],
        callback: (
            error: Error,
            result?: {
                [x: string]: PurgeMultiResult | Error;
            }
        ) => void
    ) {
        const purge = this._purge;
        if (purge === undefined) {
            return callback(
                createError(UNKNOWN_ERROR, "Purge is not implemented in the " + this.adapter + " adapter.")
            );
        }
        const tasks = docs.map(
            (param) => () =>
                new Promise<[PurgeMultiParam, PurgeMultiResult | Error]>((res, rej) => {
                    const [docId, rev$$1] = param;
                    this._getRevisionTree(docId, (error: Error, revs: string[]) => {
                        if (error) {
                            return res([param, error]);
                        }
                        if (!revs) {
                            return res([param, createError(MISSING_DOC)]);
                        }
                        let path;
                        try {
                            path = findPathToLeaf(revs, rev$$1);
                        } catch (error) {
                            //@ts-ignore
                            return res([param, error.message || error]);
                        }
                        purge.call(this, docId, path, (error: Error, result: PurgeMultiResult) => {
                            if (error) {
                                return res([param, error]);
                            } else {
                                return res([param, result]);
                            }
                        });
                    });
                })
        );
        (async () => {
            const ret = await mapAllTasksWithConcurrencyLimit(1, tasks);
            const retAll = ret.map((e) => unwrapTaskResult(e)) as [PurgeMultiParam, PurgeMultiResult | Error][];
            await appendPurgeSeqs(
                this,
                retAll.filter((e) => "ok" in e[1]).map((e) => e[0])
            );
            const result = Object.fromEntries(retAll.map((e) => [e[0][0], e[1]]));
            return result;
        })()
            //@ts-ignore
            .then((result) => callback(undefined, result))
            .catch((error) => callback(error));
    }
);

export { PouchDB };
