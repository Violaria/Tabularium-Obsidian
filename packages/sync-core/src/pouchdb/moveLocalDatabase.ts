import type PouchDB from "pouchdb-core";

/**
 * Moves a local database to a new name: every document, with all its leaf revisions (conflicts included), is copied
 * into the database under the new name, then the old one is destroyed. Local documents (replication checkpoints) are
 * not copied; the next replication finds its place again. Returns the number of documents moved.
 */
export async function moveLocalDatabase(
    open: (name: string) => PouchDB.Database,
    from: string,
    to: string
): Promise<number> {
    const source = open(from);
    const { doc_count } = await source.info();
    if (doc_count > 0) {
        const target = open(to);
        await source.replicate.to(target);
        await target.close();
    }
    await source.destroy();
    return doc_count;
}
