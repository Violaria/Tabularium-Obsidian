import { describe, expect, it } from "vitest";
import PouchDB from "pouchdb-core";
import MemoryAdapter from "pouchdb-adapter-memory";
import Replication from "pouchdb-replication";
import { moveLocalDatabase } from "./moveLocalDatabase";

PouchDB.plugin(MemoryAdapter).plugin(Replication);
const open = (name: string) => new PouchDB(name, { adapter: "memory" });

describe("moving a local database to a new name", () => {
    it("copies every document with its conflicting revisions, then destroys the old database", async () => {
        const from = open("move-from");
        await from.put({ _id: "note", body: "a" });
        // Two leaves for one document: a conflict.
        await from.bulkDocs([{ _id: "clash", _rev: "1-aaa", body: "left" }, { _id: "clash", _rev: "1-bbb", body: "right" }], { new_edits: false });
        expect(await moveLocalDatabase(open, "move-from", "move-to")).toBe(2);

        const to = open("move-to");
        expect(await to.get<{ body: string }>("note")).toMatchObject({ body: "a" });
        const clash = await to.get("clash", { conflicts: true });
        expect(clash._conflicts).toHaveLength(1);
        expect((await open("move-from").info()).doc_count).toBe(0);
    });

    it("only removes an empty old database", async () => {
        expect(await moveLocalDatabase(open, "move-empty", "move-empty-to")).toBe(0);
        expect((await open("move-empty-to").info()).doc_count).toBe(0);
    });
});
