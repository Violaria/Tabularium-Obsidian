// Declarations for the untyped PouchDB modules the sync core and the CLI use, and for the purgeMulti method that
// pouchdb/pouchdb-browser.ts (and the CLI's pouchdb-node.ts) add to every database.
declare namespace PouchDB {
    /** Per document id: the purge result, or the error that prevented it. */
    type PurgeMultiResultMap = Record<string, unknown>;
    /** What pouchdb-browser.ts (and the CLI's pouchdb-node.ts) add to every database. */
    type PurgeMulti = {
        purgeMulti(documents: [docId: string, rev: string][]): Promise<PurgeMultiResultMap>;
    };
}

declare module "pouchdb-utils" {
    export function uuid(): string;
    export function adapterFun<TThis, TArguments extends unknown[], TResult>(
        name: string,
        callback: (this: TThis, ...args: [...TArguments, callback: (error?: Error, result?: TResult) => void]) => void
    ): (this: TThis, ...args: TArguments) => Promise<TResult>;
}

declare module "pouchdb-merge" {
    export interface RevisionTreeNode {
        pos: number;
        ids: [revision: string, metadata: Record<string, unknown>, branches: RevisionTreeNode["ids"][]];
    }

    export function findPathToLeaf(revisions: RevisionTreeNode[], targetRevision: string): string[];
}

declare module "pouchdb-errors" {
    export const MISSING_DOC: unknown;
    export const UNKNOWN_ERROR: unknown;
    export function createError(error: unknown, reason?: string): Error;
}

declare module "pouchdb-generate-replication-id" {
    export default function generateReplicationId(
        source: { id(): Promise<string> },
        target: { id(): Promise<string> },
        options: PouchDB.Replication.ReplicateOptions
    ): Promise<string>;
}

declare module "pouchdb-checkpointer" {
    interface CheckpointEndpoint {
        adapter?: string;
        get(id: string): Promise<unknown>;
        put(document: unknown): Promise<unknown>;
    }
    export default class Checkpointer {
        constructor(
            source: CheckpointEndpoint,
            target: CheckpointEndpoint,
            id: string,
            state: { cancelled: boolean }
        );
        writeCheckpoint(sequence: number | string, session: string): Promise<void>;
        getCheckpoint(): Promise<number | string>;
    }
}
