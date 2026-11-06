import { describe, expect, it } from "vitest";
import { contentKey, decrypt, encrypt, newShareKey, openRecord, sealRecord, vaultShareKey, type ShareRecord } from "./crypto";
import { buildShare, encodeBundle, referencesOf, reviewTree, rewriteReferences, shareId, sharedByDefault, type ShareSource, type ShareTreeNode } from "./package";
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
    it("reads links in tables, whose pipe is escaped", () => {
        const table = "| [[Secret Diary\\|my diary]] | ![[chart.png\\|300]] |\n|---|---|\n";
        expect(referencesOf(table, "Projects/Plan.md", files).map((reference) => reference.path)).toEqual(["Secret Diary.md", "Projects/chart.png"]);
        expect(rewriteReferences(table, "Projects/Plan.md", files, () => null)).toBe("| [](share:denied:note) | ![](share:denied:image) |\n|---|---|\n");
    });
    it("keeps headings of links, and treats unquoted HTML attributes like quoted ones", () => {
        const to = () => "share:n2";
        expect(rewriteReferences("[[Plan#The (first) part]] [[Plan#^block]] [x](Plan.md#Next) [[#Here|there]] [[#Here]]", "Projects/Budget.md", files, to)).toBe("[Plan](share:n2#The%20%28first%29%20part) [Plan](share:n2) [x](share:n2#Next) [there](#Here) [Here](#Here)");
        expect(rewriteReferences("<img src=chart.png>", "Projects/Plan.md", files, () => null)).toBe("<img src=share:denied:image>");
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
        const [plan, budget, chart] = await Promise.all(["Projects/Plan.md", "Projects/Budget.md", "Projects/chart.png"].map((path) => shareId(path)));
        expect(built.manifest.notes).toEqual({ [plan]: { title: "Plan" }, [budget]: { title: "Budget" } });
        expect(built.manifest.files).toEqual({ [chart]: { name: "chart.png", type: "image/png" } });
        expect(built.manifest.start).toBe(plan);
        const planText = decoder.decode(built.files.get(plan));
        expect(planText).toContain(`[Budget](share:${budget})`);
        expect(planText).toContain(`![](share:${chart})`);
        expect(planText).toContain("![](share:denied:file)");
        // Budget's image was never shown to the owner: left out and counted.
        expect(built.unreviewed).toEqual(["Projects/receipt.png"]);
        expect(decoder.decode(built.files.get(budget))).toContain("![](share:denied:image)");
        expect(decoder.decode(built.files.get(budget))).toContain(`[Plan](share:${plan})`);
        const everything = [...built.files.values()].map((data) => decoder.decode(data)).join("\n") + JSON.stringify(built.manifest);
        expect(everything).not.toMatch(/Secret|private|Hidden|scan one|receipt/);
    });
    it("shares a folder with its tree in display order", async () => {
        const built = await buildShare(source, { title: "Projects", target: "Projects", folder: true, authorised: new Set(), reviewed: new Set(["Secret Diary.md", "Archive/scan one.pdf"]) });
        const id = (path: string) => shareId(path);
        expect(built.manifest.tree).toEqual([
            { name: "Plan", id: await id("Projects/Plan.md") },
            { name: "Sub", children: [{ name: "Notes", id: await id("Projects/Sub/Notes.md") }] },
            { name: "Budget", id: await id("Projects/Budget.md") },
            { name: "chart.png", id: await id("Projects/chart.png") },
            { name: "receipt.png", id: await id("Projects/receipt.png") },
        ]);
        expect(built.manifest.start).toBe(await id("Projects/Plan.md"));
        expect(built.unreviewed).toEqual([]);
    });
    it("keeps the name of each note when files are added, and hides it behind the link's key", async () => {
        const before = await buildShare(source, { title: "Projects", target: "Projects", folder: true, authorised: new Set(), reviewed: new Set() });
        const after = await buildShare({ ...source, files: ["Projects/Aardvark.md", ...files], read: async (path) => notes[path] ?? "new" }, { title: "Projects", target: "Projects", folder: true, authorised: new Set(), reviewed: new Set() });
        for (const [id, note] of Object.entries(before.manifest.notes)) expect(after.manifest.notes[id]).toEqual(note);
        const key = newShareKey();
        expect(await shareId("a.md", key)).toBe(await shareId("a.md", key));
        expect(await shareId("a.md", key)).not.toBe(await shareId("a.md"));
        expect(await shareId("a.md", key)).toMatch(/^n[A-Za-z0-9_-]{22}$/);
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
    it("updates the other shares when one fails", async () => {
        const { api, uploads, sharing } = await setup(["a.md", "b.md"], [{ target: "a.md", folder: false }, { target: "b.md", folder: false }]);
        const upload = api.upload;
        api.upload = async (id, bundle) => {
            if (id === "s0") throw new Error("offline");
            return upload(id, bundle);
        };
        const { updated, failed } = await sharing("desktop").refresh({ paths: ["a.md", "b.md"], renames: [] });
        expect(updated).toBe(1);
        expect(uploads).toEqual(["s1"]);
        expect(failed.map(({ share }) => share.view.id)).toEqual(["s0"]);
    });
    it("catches up on what changed while the device was away, and only then", async () => {
        const { api, uploads, revoked } = await setup([], []);
        const revisions: Record<string, string> = { "a.md": "1", "b.md": "1" };
        const key = await vaultShareKey("passphrase", "vault-1");
        const views: ShareView[] = [];
        for (const [i, target] of ["a.md", "b.md", "gone.md"].entries())
            views.push({ id: `s${i}`, slug: `s${i}`, vaultId: "vault-1", mode: "public", sealed: await sealRecord(key, { v: 1, key: "", password: "", target, folder: false, authorised: [], reviewed: [], unreviewed: 0, uploader: "web" }), expiresAt: null, password: false, indexable: false, views: 0, size: 0, createdAt: 0, updatedAt: null, state: "active" });
        api.list = async () => ({ base: "", maxBytes: Infinity, shares: views });
        api.update = async (id, body) => Object.assign(views.find((v) => v.id === id)!, body);
        api.upload = async (id) => (uploads.push(id), views.find((v) => v.id === id)!);
        api.revoke = async (id) => {
            revoked.push(id);
            views.find((v) => v.id === id)!.state = "revoked";
        };
        const web = new Sharing(api, "vault-1", "passphrase", "Vault", async () => ({ files: Object.keys(revisions), revision: (path) => revisions[path], read: async () => "text", readBinary: async () => new Uint8Array(), tree: (folder) => ({ name: folder, path: folder, folder: true, children: [] }) }), "web");
        expect((await web.catchUp()).updated).toBe(2);
        expect(revoked).toEqual(["s2"]);
        uploads.length = 0;
        expect((await web.catchUp()).updated).toBe(0);
        revisions["b.md"] = "2";
        expect((await web.catchUp()).updated).toBe(1);
        expect(uploads).toEqual(["s1"]);
    });
    it("is withdrawn when its note is deleted", async () => {
        const { revoked, sharing } = await setup(["other.md"], [{ target: "gone.md", folder: false }]);
        const { withdrawn } = await sharing("desktop").refresh({ paths: ["gone.md"], renames: [] });
        expect(revoked).toEqual(["s0"]);
        expect(withdrawn.map((share) => share.view.slug)).toEqual(["s0"]);
    });
});

