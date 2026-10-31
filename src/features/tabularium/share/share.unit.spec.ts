import { describe, expect, it } from "vitest";
import { contentKey, decrypt, encrypt, newShareKey, openRecord, sealRecord, vaultShareKey, type ShareRecord } from "./crypto";
import { buildShare, encodeBundle, referencesOf, reviewTree, rewriteReferences, sharedByDefault, type ShareSource, type ShareTreeNode } from "./package";

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const notes: Record<string, string> = {
    "Projects/Plan.md": "# Plan\n\nSee [[Secret Diary|my diary]] and [[Projects/Budget]].\n\n![[chart.png]]\n\n![scan](../Archive/scan%20one.pdf)\n\n`[[Code Sample]]` stays in code.\n\n[[Nowhere]] is not a file.\n",
    "Projects/Budget.md": "Budget body ![[receipt.png]] and [[Plan]].\n",
    "Projects/Sub/Notes.md": "Folder note, links [[Secret Diary]].\n",
    "Secret Diary.md": "Very private text, links [[Hidden Friend]].\n",
    "Hidden Friend.md": "Name of a friend.\n",
};
const binary: Record<string, Uint8Array> = {
    "Projects/chart.png": new Uint8Array([1, 2, 3]),
    "Projects/receipt.png": new Uint8Array([4]),
    "Archive/scan one.pdf": new Uint8Array([5, 6]),
};
const files = [...Object.keys(notes), ...Object.keys(binary)];
const tree = (folder: string): ShareTreeNode => {
    const root: ShareTreeNode = { name: folder, path: folder, folder: true, children: [] };
    const sub: ShareTreeNode = { name: "Sub", path: "Projects/Sub", folder: true, children: [{ name: "Notes.md", path: "Projects/Sub/Notes.md", folder: false, children: [] }] };
    root.children = [
        { name: "Plan.md", path: "Projects/Plan.md", folder: false, children: [] },
        sub,
        { name: "Budget.md", path: "Projects/Budget.md", folder: false, children: [] },
        { name: "chart.png", path: "Projects/chart.png", folder: false, children: [] },
        { name: "receipt.png", path: "Projects/receipt.png", folder: false, children: [] },
    ];
    return root;
};
const source: ShareSource = { files, read: async (path) => notes[path], readBinary: async (path) => binary[path], tree };

describe("share keys", () => {
    it("seals the record for the vault's passphrase only", async () => {
        const record: ShareRecord = { v: 1, key: "k", password: "", target: "a.md", folder: false, authorised: [], reviewed: [], unreviewed: 0 };
        const sealed = await sealRecord(await vaultShareKey("right passphrase", "vault-1"), record);
        expect(await openRecord(await vaultShareKey("right passphrase", "vault-1"), sealed)).toEqual(record);
        await expect(openRecord(await vaultShareKey("wrong passphrase", "vault-1"), sealed)).rejects.toThrow();
        await expect(openRecord(await vaultShareKey("right passphrase", "vault-2"), sealed)).rejects.toThrow();
    });
    it("needs the link key, and the password when there is one", async () => {
        const key = newShareKey();
        const data = encoder.encode("note text");
        const plain = await encrypt(await contentKey(key), data);
        expect(decoder.decode(await decrypt(await contentKey(key), plain))).toBe("note text");
        await expect(decrypt(await contentKey(newShareKey()), plain)).rejects.toThrow();
        const locked = await encrypt(await contentKey(key, "pass word"), data);
        expect(decoder.decode(await decrypt(await contentKey(key, "pass word"), locked))).toBe("note text");
        await expect(decrypt(await contentKey(key, "other"), locked)).rejects.toThrow();
        await expect(decrypt(await contentKey(key), locked)).rejects.toThrow();
    });
});

describe("references", () => {
    it("finds embeds and links with Obsidian's rules, outside code", () => {
        const found = referencesOf(notes["Projects/Plan.md"], "Projects/Plan.md", files);
        expect(found).toEqual([
            { path: "Secret Diary.md", kind: "note", embed: false },
            { path: "Projects/Budget.md", kind: "note", embed: false },
            { path: "Projects/chart.png", kind: "image", embed: true },
            { path: "Archive/scan one.pdf", kind: "file", embed: true },
        ]);
        expect(found.map(sharedByDefault)).toEqual([false, false, true, true]);
    });
    it("keeps only the kind of a reference that is not shared", () => {
        const text = rewriteReferences(notes["Projects/Plan.md"], "Projects/Plan.md", files, () => null);
        expect(text).not.toMatch(/Secret|diary|Budget|chart|scan/);
        expect(text).toContain("[](share:denied:note)");
        expect(text).toContain("![](share:denied:image)");
        expect(text).toContain("![](share:denied:file)");
        expect(text).toContain("[[Nowhere]]");
        expect(text).toContain("`[[Code Sample]]`");
    });
    it("lists references outside the target, opening the allowed notes", async () => {
        const closed = await reviewTree(source, "Projects/Plan.md", false, () => false);
        expect(closed.map((node) => [node.path, node.children.length])).toEqual([
            ["Secret Diary.md", 0], ["Projects/Budget.md", 0], ["Projects/chart.png", 0], ["Archive/scan one.pdf", 0],
        ]);
        const open = await reviewTree(source, "Projects/Plan.md", false, (path) => path === "Projects/Budget.md");
        expect(open[1].children.map((node) => node.path)).toEqual(["Projects/receipt.png"]);
        const folder = await reviewTree(source, "Projects", true, () => true);
        expect(folder.map((node) => node.path)).toEqual(["Secret Diary.md", "Archive/scan one.pdf"]);
        expect(folder[0].children.map((node) => node.path)).toEqual(["Hidden Friend.md"]);
    });
});

describe("building a share", () => {
    it("includes allowed references, leaves out the rest and counts references found after the review", async () => {
        const reviewed = new Set(["Secret Diary.md", "Projects/Budget.md", "Projects/chart.png", "Archive/scan one.pdf"]);
        const built = await buildShare(source, { title: "Plan", target: "Projects/Plan.md", folder: false, authorised: new Set(["Projects/Budget.md", "Projects/chart.png"]), reviewed });
        expect(built.manifest.notes).toEqual({ n1: { title: "Plan" }, n2: { title: "Budget" } });
        expect(built.manifest.files).toEqual({ a1: { name: "chart.png", type: "image/png" } });
        expect(built.manifest.start).toBe("n1");
        const plan = decoder.decode(built.files.get("n1"));
        expect(plan).toContain("[Budget](share:n2)");
        expect(plan).toContain("![](share:a1)");
        expect(plan).toContain("![](share:denied:file)");
        // Budget's image was never shown to the owner: left out and counted.
        expect(built.unreviewed).toEqual(["Projects/receipt.png"]);
        expect(decoder.decode(built.files.get("n2"))).toContain("![](share:denied:image)");
        expect(decoder.decode(built.files.get("n2"))).toContain("[Plan](share:n1)");
        const everything = [...built.files.values()].map((data) => decoder.decode(data)).join("\n") + JSON.stringify(built.manifest);
        expect(everything).not.toMatch(/Secret|private|Hidden|scan one|receipt/);
    });
    it("shares a folder with its tree in display order", async () => {
        const built = await buildShare(source, { title: "Projects", target: "Projects", folder: true, authorised: new Set(), reviewed: new Set(["Secret Diary.md", "Archive/scan one.pdf"]) });
        expect(built.manifest.tree).toEqual([
            { name: "Plan", id: "n1" },
            { name: "Sub", children: [{ name: "Notes", id: "n3" }] },
            { name: "Budget", id: "n2" },
            { name: "chart.png", id: "a1" },
            { name: "receipt.png", id: "a2" },
        ]);
        expect(built.manifest.start).toBe("n1");
        expect(built.unreviewed).toEqual([]);
    });
    it("frames files for upload", () => {
        const bundle = encodeBundle(new Map([["manifest", new Uint8Array([7, 8])], ["n1", new Uint8Array([9])]]));
        expect([...bundle]).toEqual([0, 8, ...encoder.encode("manifest"), 0, 0, 0, 2, 7, 8, 0, 2, ...encoder.encode("n1"), 0, 0, 0, 1, 9]);
    });
});
