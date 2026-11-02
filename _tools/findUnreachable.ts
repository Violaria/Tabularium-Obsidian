// Source files that nothing built from this repository reaches. The entries are the plug-in, the three entries of the
// web notes app and the CLI; a file is reachable when an entry imports it, directly or through other files (static
// imports, re-exports, dynamic `import()`, the `@/` alias). Tests are judged by what they test: a test or test helper
// is dead when none of the source files it imports, directly or through other test helpers, is reachable. Tests that
// import no source file of this repository test the dependencies and are kept. The Obsidian test harness under
// test/e2e-obsidian is test infrastructure for the parent repository's interop tests; what those tests and the two
// scripts they run reach counts as reachable.
// The sync core in packages/sync-core is followed too: `@tabularium/sync-core[/subpath]` resolves through the package's
// `exports` to its source, and inside the core `@lib/`, `#worker` (every condition) and `?worker&inline` imports are
// followed. Its unit tests are judged like the others.
// Prints the dead files, one per line; `--count` prints only the numbers; `--dynamic` lists files that call `import()`
// with something other than a string literal, whose targets this script cannot see. Build configurations and
// declaration files are not listed.
import ts from "typescript";
const fs = process.getBuiltinModule("node:fs");
const path = process.getBuiltinModule("node:path");

const root = path.resolve(import.meta.dirname, "..");
const ENTRIES = [
    "src/main.ts",
    // The web notes and the CLI, in the server repository beside this one.
    "../server/clients/notes/main.ts",
    "../server/clients/notes/viewer.ts",
    "../server/clients/notes/answer.ts",
    "../server/clients/cli/entrypoint.ts",
];
/** Test infrastructure used from outside: the parent repository's interop tests and the scripts they run. */
const HARNESS = [
    "test/e2e-obsidian/scripts/install-appimage.ts",
    ...fs
        .readdirSync(path.join(root, "../../tests/interop"))
        .filter((f) => /\.(ts|mjs)$/.test(f))
        .map((f) => path.join("../../tests/interop", f)),
];
const CORE = "packages/sync-core";
const CLIENTS = "../server/clients";
const coreManifest = JSON.parse(fs.readFileSync(path.join(root, CORE, "package.json"), "utf8")) as {
    name: string;
    exports: Record<string, string | { import?: string; default?: string }>;
};
const coreSourceImports = JSON.parse(fs.readFileSync(path.join(root, CORE, "src/package.json"), "utf8")) as {
    imports: Record<string, Record<string, string>>;
};
const SOURCE = /\.(ts|svelte)$/;
const TEST = /(\.(unit|integration)\.(spec|test)\.ts|\.test\.ts|\.spec\.ts)$|\/(_test|test-support|testdeno)\//;
const NOT_LISTED = /(\.d\.ts|vite\.config\.ts|vitest\.config\.[a-z-]+\.ts)$/;

function walk(directory: string): string[] {
    return fs.readdirSync(path.join(root, directory), { withFileTypes: true }).flatMap((entry) => {
        const relative = path.join(directory, entry.name);
        if (entry.isDirectory()) return entry.name === "node_modules" || entry.name === "dist" ? [] : walk(relative);
        return SOURCE.test(entry.name) ? [relative] : [];
    });
}

function imports(file: string): string[] {
    let text = fs.readFileSync(path.join(root, file), "utf8");
    if (file.endsWith(".svelte"))
        text = [...text.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("\n");
    return ts.preProcessFile(text, true, true).importedFiles.map((entry) => entry.fileName);
}

/** `./dist/x/y.js` in the core's exports → the source path without extension, `packages/sync-core/src/x/y`. */
function coreExport(subpath: string): string | undefined {
    const target = coreManifest.exports[subpath];
    const file = typeof target === "string" ? target : (target?.import ?? target?.default);
    return file ? path.join(CORE, "src", file.replace(/^\.\/dist\//, "").replace(/\.js$/, "")) : undefined;
}

function resolveAll(from: string, specifier: string): string[] {
    if (specifier === "#worker" && from.startsWith(`${CORE}/`))
        return Object.values(coreSourceImports.imports["#worker"]).flatMap((target) => {
            const found = resolve(from, path.join(CORE, "src", target));
            return found ? [found] : [];
        });
    const found = resolve(from, specifier);
    return found ? [found] : [];
}

function resolve(from: string, specifier: string): string | undefined {
    let base: string;
    specifier = specifier.replace(/\?.*$/, "");
    if (specifier.startsWith(`${CORE}/`)) base = specifier;
    else if (specifier === coreManifest.name || specifier.startsWith(`${coreManifest.name}/`)) {
        const exported = coreExport(`.${specifier.slice(coreManifest.name.length)}`);
        if (!exported) return undefined;
        base = exported;
    } else if (specifier.startsWith("@lib/") && from.startsWith(`${CORE}/`))
        base = path.join(CORE, "src", specifier.slice("@lib/".length));
    else if (specifier.startsWith("@/")) base = path.join("src", specifier.slice(2));
    else if (specifier.startsWith("@clients/")) base = path.join(CLIENTS, specifier.slice("@clients/".length));
    else if (specifier.startsWith(".")) base = path.join(path.dirname(from), specifier);
    else return undefined;
    const candidates = [
        base,
        `${base}.ts`,
        `${base}.svelte`,
        path.join(base, "index.ts"),
        base.replace(/\.js$/, ".ts"),
    ];
    return candidates.find(
        (candidate) => fs.existsSync(path.join(root, candidate)) && fs.statSync(path.join(root, candidate)).isFile()
    );
}

const files = [...walk("src"), ...walk("test"), ...walk(`${CORE}/src`), ...walk(`${CORE}/test`), ...walk(CLIENTS)];
const isLocal = (spec: string) =>
    spec.startsWith(".") ||
    spec.startsWith("@/") ||
    spec.startsWith("@clients/") ||
    spec.startsWith("@lib/") ||
    spec.startsWith(coreManifest.name);
/** Files with a local import that resolves to no file; a test among them tests code that has been removed. */
const broken = new Set<string>();
const edges = new Map(
    [...files, ...HARNESS].map((file) => [
        file,
        imports(file).flatMap((spec) => {
            const targets = resolveAll(file, spec);
            if (targets.length === 0 && isLocal(spec)) broken.add(file);
            return targets;
        }),
    ])
);

const harness = new Set<string>();
const harnessQueue = [...HARNESS];
while (harnessQueue.length) {
    const file = harnessQueue.pop()!;
    if (harness.has(file)) continue;
    harness.add(file);
    harnessQueue.push(...(edges.get(file) ?? []));
}

const reachable = new Set<string>();
const queue = [...ENTRIES];
while (queue.length) {
    const file = queue.pop()!;
    if (reachable.has(file)) continue;
    reachable.add(file);
    for (const next of edges.get(file) ?? []) if (!TEST.test(next)) queue.push(next);
}
for (const file of harness) if (file.startsWith("src/") || file.startsWith(`${CORE}/src/`)) reachable.add(file);

const isTest = (file: string) => TEST.test(file) || file.startsWith("test/") || file.startsWith(`${CORE}/test/`);
const isSource = (file: string) => (file.startsWith("src/") || file.startsWith(`${CORE}/src/`)) && !TEST.test(file);
/** The source files a test reaches, following imports through other test files and helpers. */
function testedSources(file: string, seen = new Set<string>()): string[] {
    if (seen.has(file)) return [];
    seen.add(file);
    return (edges.get(file) ?? []).flatMap((next) => (isTest(next) ? testedSources(next, seen) : [next]));
}
function testsSomethingAlive(file: string): boolean {
    if (harness.has(file)) return true;
    if (broken.has(file)) return false;
    const sources = testedSources(file);
    return sources.length === 0 || sources.some((source) => reachable.has(source));
}

const deadSources = files.filter((f) => isSource(f) && !reachable.has(f) && !NOT_LISTED.test(f));
const deadTests = files.filter((f) => isTest(f) && !NOT_LISTED.test(f) && !testsSomethingAlive(f));

if (process.argv.includes("--dynamic")) {
    for (const file of files.filter((f) => isSource(f) && reachable.has(f)))
        if (/\bimport\(\s*[^"'`\s)]/.test(fs.readFileSync(path.join(root, file), "utf8"))) process.stdout.write(`${file}\n`);
} else if (process.argv.includes("--count")) {
    process.stdout.write(
        `${reachable.size} reachable, ${deadSources.length} dead source files, ${deadTests.length} dead tests\n`
    );
} else {
    for (const file of [...deadSources, ...deadTests].sort()) process.stdout.write(`${file}\n`);
}
