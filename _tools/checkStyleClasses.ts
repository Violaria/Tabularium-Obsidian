// Fails when the plug-in's style sheet or interface code uses a class name from the original Tabularium's style
// sheet (upstreamStyleClasses.ts): in one vault the two plug-ins' styles would apply to each other's elements.
import { upstreamStyleClasses } from "./upstreamStyleClasses.ts";

const fs = process.getBuiltinModule("node:fs");
const path = process.getBuiltinModule("node:path");

const upstream = new Set(upstreamStyleClasses);
const problems: string[] = [];

// The style sheet: every class in a selector.
const css = fs.readFileSync("styles.css", "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
for (const [, name] of css.matchAll(/\.(-?[A-Za-z_][A-Za-z0-9_-]*)/g))
    if (upstream.has(name)) problems.push(`styles.css: .${name}`);

// Interface code inside Obsidian. The web notes, the CLI and the other apps run elsewhere; texts and tests are not interface.
const files: string[] = [];
const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const file = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (!["apps", "messages", "messagesJson", "messagesYAML"].includes(entry.name)) walk(file);
        } else if (/\.(ts|svelte)$/.test(entry.name) && !/\.(spec|test)\.ts$/.test(entry.name)) files.push(file);
    }
};
walk("src");

const quoted = /(["'`])((?:(?!\1)[^\\\n]|\\.)*)\1/g;
// Where a string is a class list or a selector.
const classContext =
    /(?:\bcls\s*:|\bclass(?:Name)?\s*=|\b(?:addClass|removeClass|toggleClass|setClass|createDiv|createSpan|querySelector|querySelectorAll|closest|matches)\(|\bclassList\.\w+\()\s*$/;
for (const file of files) {
    const lines = fs.readFileSync(file, "utf8").split("\n");
    lines.forEach((line, index) => {
        for (const match of line.matchAll(quoted)) {
            const inContext = classContext.test(line.slice(0, match.index));
            for (const token of match[2].split(/[\s,>+~()[\]]+|(?=\.)/)) {
                const name = token.replace(/^\./, "").replace(/:.*$/, "");
                // Hyphenated names are distinctive in any string; single words only where a class is expected.
                if (upstream.has(name) && (inContext || name.includes("-")))
                    problems.push(`${file}:${index + 1}: ${name}`);
            }
        }
    });
}

if (problems.length) {
    process.stderr.write(`Class names of the original Tabularium's style sheet:\n  ${problems.join("\n  ")}\n`);
    process.exit(1);
}
process.stdout.write(`No class names of the original plug-in's style sheet in styles.css or ${files.length} interface files.\n`);
