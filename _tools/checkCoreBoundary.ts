// src/core/ is shared by the plug-in, web notes and the CLI: it must not import Obsidian, its adaptation or the interface.
const fs = process.getBuiltinModule("node:fs");
const path = process.getBuiltinModule("node:path");

const root = path.resolve(import.meta.dirname, "..");
const core = path.join(root, "src/core");
const IMPORT = /(?:import|export)\s+(?:type\s+)?(?:[^'"]*?\s+from\s+)?["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)/g;
const forbidden = (from: string, spec: string) => {
    if (spec === "obsidian" || spec.startsWith("obsidian/") || /^@\/deps(\.ts)?$/.test(spec)) return true;
    const target = spec.startsWith("@/") ? path.join(root, "src", spec.slice(2)) : spec.startsWith(".") ? path.resolve(path.dirname(from), spec) : "";
    return ["src/obsidian", "src/ui", "src/main", "src/deps"].some((dir) => target === path.join(root, dir) || target.startsWith(path.join(root, dir) + path.sep) || target.startsWith(path.join(root, dir) + "."));
};
const problems: string[] = [];
const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const file = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(file);
        else if (/\.(ts|svelte)$/.test(entry.name) && !/\.(spec|test)\.ts$/.test(entry.name))
            for (const match of fs.readFileSync(file, "utf8").matchAll(IMPORT)) {
                const spec = match[1] ?? match[2];
                if (forbidden(file, spec)) problems.push(`${path.relative(root, file)}: ${spec}`);
            }
    }
};
walk(core);
if (problems.length) {
    process.stderr.write(`src/core/ imports Obsidian, its adaptation or the interface:\n${problems.join("\n")}\n`);
    process.exit(1);
}
process.stdout.write("src/core/ imports neither Obsidian nor src/obsidian/ or src/ui/.\n");
