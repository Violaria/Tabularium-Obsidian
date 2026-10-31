import { describe, expect, it } from "vitest";

import { isSpecSource, needsMetadata, parseSpecs, sortedTree } from "./sorting";

const spec = `---
sorting-spec: |-
  target-folder: /
  Zeta
  Alpha
  sortspec
  target-folder: Zeta
  < a-z by-metadata: order
---
`;
const file = (path: string) => ({ path, mtime: 0, size: 1 });
const names = (node: { children: { name: string }[] }) => node.children.map((child) => child.name);

describe("web notes sorting", () => {
    it("finds the rule files the plug-in reads", () => {
        expect(isSpecSource("sortspec.md")).toBe(true);
        expect(isSpecSource("a/b/sortspec.md")).toBe(true);
        expect(isSpecSource("Zeta/Zeta.md")).toBe(true);
        expect(isSpecSource("Tabularius.md")).toBe(false);
    });
    it("orders folders as listed, then the rest by name, and by front matter where asked", () => {
        const sources = [{ path: "sortspec.md", text: spec }];
        const parsed = parseSpecs(sources);
        expect(parsed.error).toBeUndefined();
        expect(needsMetadata(sources)).toBe(true);
        const files = ["Alpha/a.md", "Beta.md", "Zeta/one.md", "Zeta/two.md", "Zeta/three.md", "sortspec.md", "Gamma/g.md"].map(file);
        const metadata = new Map([
            ["Zeta/one.md", { order: 2 }],
            ["Zeta/two.md", { order: 3 }],
            ["Zeta/three.md", { order: 1 }],
        ]);
        const tree = sortedTree(files, "Vault", parsed.collection, metadata);
        expect(tree.name).toBe("Vault");
        expect(names(tree)).toEqual(["Zeta", "Alpha", "sortspec.md", "Beta.md", "Gamma"]);
        expect(names(tree.children[0])).toEqual(["three.md", "one.md", "two.md"]);
    });
    it("falls back to names when there are no rules or they are invalid", () => {
        const files = ["b.md", "A/x.md", "c.md"].map(file);
        expect(names(sortedTree(files, "", undefined, new Map()))).toEqual(["A", "b.md", "c.md"]);
        const broken = parseSpecs([{ path: "sortspec.md", text: "---\nsorting-spec: |-\n  target-folder: /\n  < by-nothing-real\n---\n" }]);
        expect(broken.collection).toBeUndefined();
        expect(broken.error).toBeTruthy();
    });
});
