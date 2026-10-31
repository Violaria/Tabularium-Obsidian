import { describe, expect, it } from "vitest";
import { contentKey, decrypt, encrypt, newShareKey, openRecord, sealRecord, vaultShareKey, type ShareRecord } from "./crypto";
import { buildShare, encodeBundle, referencesOf, reviewTree, rewriteReferences, sharedByDefault, type ShareSource, type ShareTreeNode } from "./package";
import { Sharing, type ShareApi, type ShareView } from "./sharing";

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
    it("treats files named in raw HTML like links and drops HTML comments", () => {
        const html = '<img src="chart.png" width="80"> <a href=\'../Secret%20Diary.md\'>x</a> <a href="https://example.com/a">web</a> <!-- see Secret Diary.md --> `<img src="chart.png">`';
        const text = rewriteReferences(html, "Projects/Plan.md", files, (reference) => (reference.kind === "image" ? "share:n1" : null));
        expect(text).toBe('<img src="share:n1" width="80"> <a href=\'share:denied:note\'>x</a> <a href="https://example.com/a">web</a>  `<img src="chart.png">`');
        expect(referencesOf(html, "Projects/Plan.md", files).map((reference) => [reference.path, reference.embed])).toEqual([["Projects/chart.png", true], ["Secret Diary.md", false]]);
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

describe("refreshing shares after changes", () => {
    /** A server holding share views in memory; records are sealed with the vault's share key as the clients do. */
    const setup = async (vaultFiles: string[], records: { target: string; folder: boolean; uploader?: string }[]) => {
        const key = await vaultShareKey("passphrase", "vault-1");
        const views: ShareView[] = [];
        for (const [i, item] of records.entries()) {
            const record: ShareRecord = { v: 1, key: "", password: "", target: item.target, folder: item.folder, authorised: [], reviewed: [], unreviewed: 0, ...(item.uploader ? { uploader: item.uploader } : {}) };
            views.push({ id: `s${i}`, slug: `s${i}`, vaultId: "vault-1", mode: "public", sealed: await sealRecord(key, record), expiresAt: null, password: false, indexable: false, views: 0, size: 0, createdAt: 0, updatedAt: null, state: "active" });
        }
        const uploads: string[] = [];
        const revoked: string[] = [];
        const api: ShareApi = {
            list: async () => ({ base: "", maxBytes: Infinity, shares: views }),
            create: async () => { throw new Error("unused"); },
            update: async (id, body) => { const view = views.find((v) => v.id === id)!; Object.assign(view, body); return view; },
            upload: async (id) => { uploads.push(id); return views.find((v) => v.id === id)!; },
            revoke: async (id) => { revoked.push(id); views.find((v) => v.id === id)!.state = "revoked"; },
        };
        const vaultSource: ShareSource = { files: vaultFiles, read: async () => "text", readBinary: async () => new Uint8Array([1]), tree: (folder) => ({ name: folder, path: folder, folder: true, children: [] }) };
        const target = async (id: string) => (await openRecord(key, views.find((v) => v.id === id)!.sealed)).target;
        return { api, uploads, revoked, target, sharing: (device: string) => new Sharing(api, "vault-1", "passphrase", "Vault", async () => vaultSource, device) };
    };
    it("is refreshed only by the device that last saved it", async () => {
        const { uploads, sharing } = await setup(["a.md"], [{ target: "a.md", folder: false, uploader: "desktop" }]);
        expect((await sharing("phone").refresh({ paths: ["a.md"], renames: [] })).updated).toBe(0);
        expect((await sharing("desktop").refresh({ paths: ["a.md"], renames: [] })).updated).toBe(1);
        expect(uploads).toEqual(["s0"]);
    });
    it("follows a rename made here, of the note or of its folder", async () => {
        const { target, sharing } = await setup(["New/b.md", "Moved/c.md"], [{ target: "Old/b.md", folder: false }, { target: "Old", folder: true }]);
        await sharing("desktop").refresh({ paths: ["Old/b.md", "New/b.md"], renames: [["Old/b.md", "New/b.md"]] });
        expect(await target("s0")).toBe("New/b.md");
        const { target: folderTarget, sharing: folderSharing } = await setup(["Moved/c.md"], [{ target: "Old", folder: true }]);
        await folderSharing("desktop").refresh({ paths: ["Old/c.md", "Moved/c.md"], renames: [["Old", "Moved"], ["Old/c.md", "Moved/c.md"]] });
        expect(await folderTarget("s0")).toBe("Moved");
    });
    it("follows a rename another device made, which arrives as a deletion and a creation", async () => {
        const { target, revoked, sharing } = await setup(["Archive/b.md"], [{ target: "Notes/b.md", folder: false }]);
        await sharing("desktop").refresh({ paths: ["Notes/b.md", "Archive/b.md"], renames: [] });
        expect(await target("s0")).toBe("Archive/b.md");
        expect(revoked).toEqual([]);
    });
    it("is withdrawn when its note is deleted", async () => {
        const { revoked, sharing } = await setup(["other.md"], [{ target: "gone.md", folder: false }]);
        const { withdrawn } = await sharing("desktop").refresh({ paths: ["gone.md"], renames: [] });
        expect(revoked).toEqual(["s0"]);
        expect(withdrawn.map((share) => share.view.slug)).toEqual(["s0"]);
    });
});

