// Fails when the plug-in's sources name the original plug-in (livesync, in any case) outside what has to keep it: the
// sync protocol's document names and ID derivation, the stored setting key liveSync, persisted command ids, and the
// one definition of the former names that migrations read.
const fs = process.getBuiltinModule("node:fs");
const path = process.getBuiltinModule("node:path");

const root = path.resolve(import.meta.dirname, "..");
const ALLOWED = [
    /obsydian_livesync_(milestone|version|nodeinfo)/g,
    /obsidian_livesync_sync_parameters/g,
    /self-hosted-livesync:id-/g,
    /\bliveSync\b/g,
    /InLiveSync\b/g,
    /\bbeforeLiveSync\b/g,
    /(["'`])livesync-[a-z-]+\1/g,
];
/** Where the former names are defined, for migrations: the core's names, the CLI's files, the original plug-in's id. */
const DEFINITIONS = new Set([
    "packages/sync-core/src/common/models/shared.const.ts",
    "src/apps/cli/currentNames.ts",
    "src/features/tabularium/NamespaceMigration.ts",
]);
const SKIP = /(\.spec|\.test)\.ts$|\/testdeno\/|\/messagesJson\/|combinedMessages\./;
const problems: string[] = [];
const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const file = path.join(dir, entry.name);
        const relative = path.relative(root, file);
        if (entry.isDirectory()) {
            if (entry.name !== "node_modules" && entry.name !== "dist") walk(file);
            continue;
        }
        if (!/\.(ts|svelte|yaml)$/.test(entry.name) || SKIP.test(relative) || DEFINITIONS.has(relative)) continue;
        fs.readFileSync(file, "utf8")
            .split("\n")
            .forEach((line, index) => {
                const rest = ALLOWED.reduce((text, pattern) => text.replace(pattern, ""), line);
                if (/livesync/i.test(rest)) problems.push(`${relative}:${index + 1}: ${line.trim().slice(0, 120)}`);
            });
    }
};
walk(path.join(root, "src"));
walk(path.join(root, "packages/sync-core/src"));
if (problems.length) {
    process.stderr.write(`The original plug-in's name in the sources:\n${problems.join("\n")}\n`);
    process.exit(1);
}
process.stdout.write("No original plug-in name in the sources beyond the protocol, stored keys and former names.\n");
