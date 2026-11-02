import { describe, expect, it } from "vitest";

import { isSpecSource, parseSpecs, sortedTree } from "./sorting";

const file = (path: string) => ({ path });
const names = (node: { children: { name: string }[] }) => node.children.map((child) => child.name);

describe("web notes sorting", () => {
    it("reads the rules notes", () => {
        expect(isSpecSource("sortspec.md")).toBe(true);
        expect(isSpecSource("a/b/sortspec.md")).toBe(true);
        expect(isSpecSource("Zeta/Zeta.md")).toBe(false);
        expect(isSpecSource("Tabularius.md")).toBe(false);
    });

    it("orders as the list says, the rest by name with folders first, as in Obsidian", () => {
        const parsed = parseSpecs([{ path: "sortspec.md", text: "规则\n\n- Zeta —— 先放\n  - two\n  - ...\n  - one\n- Alpha\n- sortspec\n" }]);
        expect(parsed.unconverted).toBe(false);
        const files = ["Alpha/a.md", "Beta.md", "Zeta/one.md", "Zeta/two.md", "Zeta/three.md", "sortspec.md", "Gamma/g.md"].map(file);
        const tree = sortedTree(files, "Vault", parsed.rules);
        expect(tree.name).toBe("Vault");
        expect(names(tree)).toEqual(["Zeta", "Alpha", "sortspec.md", "Gamma", "Beta.md"]);
        expect(names(tree.children[0])).toEqual(["two.md", "three.md", "one.md"]);
    });

    it("sorts by name without rules, and says when the rules are still in front matter", () => {
        const files = ["b.md", "A/x.md", "c.md", "a10.md", "a9.md"].map(file);
        expect(names(sortedTree(files, ""))).toEqual(["A", "a9.md", "a10.md", "b.md", "c.md"]);
        const former = parseSpecs([{ path: "sortspec.md", text: "---\nsorting-spec: |-\n  target-folder: /\n  c\n---\n" }]);
        expect(former.unconverted).toBe(true);
        expect(names(sortedTree(files, "", former.rules))).toEqual(["A", "a9.md", "a10.md", "b.md", "c.md"]);
    });
});
