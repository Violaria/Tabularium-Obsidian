import { describe, expect, it, vi } from "vitest";

vi.mock("@/deps", () => ({
    Modal: class {},
    Notice: class {},
    Setting: class {},
    debounce: (callback: () => void) => callback,
    parseLinktext: (link: string) => {
        const at = link.search(/[#^]/);
        return at < 0 ? { path: link, subpath: "" } : { path: link.slice(0, at), subpath: link.slice(at) };
    },
}));

const { TabulariumLinkRepair } = await import("./LinkRepair");

interface FakeFile { path: string; name: string; basename: string; extension: string }
const fileOf = (path: string): FakeFile => {
    const name = path.slice(path.lastIndexOf("/") + 1);
    const dot = name.lastIndexOf(".");
    return { path, name, basename: dot < 0 ? name : name.slice(0, dot), extension: dot < 0 ? "" : name.slice(dot + 1) };
};

/** A vault in memory, with the link index Obsidian keeps: each link's text, position and target. */
function vaultOf(contents: Record<string, string>, attachments: string[] = []) {
    const files = [...Object.keys(contents), ...attachments].map(fileOf);
    const text = { ...contents };
    const resolves = (path: string, from: string) => {
        const folder = from.slice(0, Math.max(0, from.lastIndexOf("/")));
        const wanted = /\.[^/.]+$/.test(path) ? path : `${path}.md`;
        return files.find((file) => file.path === wanted || file.path === `${folder}/${wanted}` || (!wanted.includes("/") && file.name === wanted));
    };
    const app = {
        vault: {
            getFiles: () => files,
            getMarkdownFiles: () => files.filter((file) => file.extension === "md"),
            process: async (file: FakeFile, change: (data: string) => string) => {
                text[file.path] = change(text[file.path]);
            },
        },
        metadataCache: {
            getFileCache: (file: FakeFile) => {
                const links = [...(text[file.path] ?? "").matchAll(/!?\[\[([^\]|]+)(?:\|([^\]]*))?\]\]|!?\[([^\]]*)\]\(([^)]+)\)/g)].map((match) => ({
                    link: match[1] ?? decodeURI(match[4]),
                    original: match[0],
                    displayText: match[2] ?? match[3] ?? match[1],
                    position: { start: { offset: match.index }, end: { offset: match.index + match[0].length } },
                }));
                return { links: links.filter((l) => !l.original.startsWith("!")), embeds: links.filter((l) => l.original.startsWith("!")) };
            },
            getFirstLinkpathDest: (path: string, from: string) => resolves(path, from) ?? null,
        },
        fileManager: {
            generateMarkdownLink: (target: FakeFile, _from: string, subpath = "", alias?: string) => `[[${target.basename}${subpath}${alias ? `|${alias}` : ""}]]`,
        },
    };
    const repairer = new TabulariumLinkRepair({ app } as never, {} as never);
    return { repairer, text };
}

describe("broken links", () => {
    it("lists links that reach no file, with the files of the same name", () => {
        const { repairer } = vaultOf(
            {
                "Index.md": "[[Old/Plan#Goals|the plan]] [[Plan]] [[Gone]] ![[Old/chart.png]] [web](https://example.com) [[Old/README]]",
                "Archive/Plan.md": "",
                "a/README.md": "",
                "b/README.md": "",
            },
            ["Archive/chart.png"]
        );
        const found = repairer.find();
        expect(found.map((link) => [link.original, link.candidates.map((c) => c.path)])).toEqual([
            ["[[Old/Plan#Goals|the plan]]", ["Archive/Plan.md"]],
            ["[[Gone]]", []],
            ["[[Old/README]]", ["a/README.md", "b/README.md"]],
            ["![[Old/chart.png]]", ["Archive/chart.png"]],
        ]);
    });
    it("repairs with Obsidian's link format, keeping the heading, alias and embed", async () => {
        const { repairer, text } = vaultOf({ "Index.md": "See [[Old/Plan#Goals|the plan]] and ![[Old/chart.png]].", "Archive/Plan.md": "" }, ["Archive/chart.png"]);
        const found = repairer.find();
        const result = await repairer.repair(found.map((link) => ({ link, target: link.candidates[0] })));
        expect(result).toEqual({ fixed: 2, skipped: 0 });
        expect(text["Index.md"]).toBe("See [[Plan#Goals|the plan]] and ![[chart]].");
    });
    it("leaves a link alone when the note changed since it was found", async () => {
        const { repairer, text } = vaultOf({ "Index.md": "[[Old/Plan]]", "Archive/Plan.md": "" });
        const [link] = repairer.find();
        text["Index.md"] = "Edited: [[Old/Plan]]";
        expect(await repairer.repair([{ link, target: link.candidates[0] }])).toEqual({ fixed: 0, skipped: 1 });
        expect(text["Index.md"]).toBe("Edited: [[Old/Plan]]");
    });
    it("repairs automatically only the links with one candidate", async () => {
        const { repairer, text } = vaultOf({ "Index.md": "[[Old/Plan]] [[Old/README]]", "Archive/Plan.md": "", "a/README.md": "", "b/README.md": "" });
        (repairer as unknown as { core: unknown }).core = { services: { API: { addLog: () => undefined } } };
        await repairer.repairUnambiguous();
        expect(text["Index.md"]).toBe("[[Plan]] [[Old/README]]");
    });
});
