// Every notice the plug-in can show (a log at notice level or above, or `new Notice(...)`) must be in the catalogue in
// English, Chinese and Latin. Notices are translated when shown (translateNotice): a literal is looked up as it is, a
// template literal by its source text with `${…}` standing for the values. Code of features that Tabularium does not
// load is not scanned. `--list` prints the missing texts as JSON instead of failing.
import ts from "typescript";
const fs = process.getBuiltinModule("node:fs");
const path = process.getBuiltinModule("node:path");

const root = path.resolve(import.meta.dirname, "..");
const commonlib = path.join(root, "node_modules/@tabularium/sync-core/dist");

/** Code whose notices Tabularium never shows: the parts of Commonlib it does not load. */
const NOT_LOADED = [
    "dist/replication/trystero/",
    "dist/replication/journal/",
    "dist/serviceFeatures/setupObsidian/",
    "dist/serviceFeatures/remoteConfig.js",
    "dist/serviceFeatures/checkRemoteSize.js",
    "dist/storage/MinioStorageAdapter.js",
    "dist/p2p",
];

function files(dir: string, extensions: string[]): string[] {
    return fs.readdirSync(dir).flatMap((name) => {
        const full = path.join(dir, name);
        if (fs.statSync(full).isDirectory()) return name === "node_modules" ? [] : files(full, extensions);
        return extensions.some((ext) => name.endsWith(ext)) && !/\.(spec|test)\.|\.d\.ts$/.test(name) ? [full] : [];
    });
}
const scanned = [...files(path.join(root, "src"), [".ts"]), ...files(commonlib, [".js"])].filter((file) => {
    const rel = file.startsWith(commonlib) ? `dist/${path.relative(commonlib, file)}` : path.relative(root, file);
    return !NOT_LOADED.some((prefix) => rel.startsWith(prefix));
});

const isNoticeLevel = (node: ts.Node) =>
    (ts.isIdentifier(node) && /^LOG_LEVEL_(NOTICE|URGENT)$/.test(node.text)) ||
    (ts.isPropertyAccessExpression(node) && /^LOG_LEVEL_(NOTICE|URGENT)$/.test(node.name.text));
/** The text a notice argument shows: a literal, or a template with `${source}` for each value; undefined otherwise. */
function textOf(node: ts.Expression, source: ts.SourceFile): string | undefined {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isTemplateExpression(node))
        return (
            node.head.text +
            node.templateSpans.map((span) => `\${${span.expression.getText(source)}}` + span.literal.text).join("")
        );
    return undefined;
}

const found = new Map<string, string>();
for (const file of scanned) {
    const source = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
    const visit = (node: ts.Node) => {
        let argument: ts.Expression | undefined;
        const level = (arg: ts.Expression) =>
            isNoticeLevel(arg) ||
            (ts.isConditionalExpression(arg) && (isNoticeLevel(arg.whenTrue) || isNoticeLevel(arg.whenFalse)));
        if (ts.isCallExpression(node) && node.arguments.length > 1 && node.arguments.slice(1).some(level))
            argument = node.arguments[0];
        if (ts.isNewExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "Notice")
            argument = node.arguments?.[0];
        const text = argument && textOf(argument, source);
        if (text !== undefined && text.trim() && !found.has(text))
            found.set(
                text,
                `${path.relative(root, file)}:${source.getLineAndCharacterOfPosition(node.getStart()).line + 1}`
            );
        ts.forEachChild(node, visit);
    };
    visit(source);
}

const catalogue = Object.fromEntries(
    ["en", "zh", "la"].map((lang) => [
        lang,
        JSON.parse(fs.readFileSync(path.join(root, `src/core/common/messagesJson/${lang}.json`), "utf8")) as Record<
            string,
            string
        >,
    ])
);
const missing = [...found].filter(([text]) => !catalogue.zh[text] || !catalogue.la[text] || !catalogue.en[text]);

if (process.argv.includes("--list")) {
    process.stdout.write(
        JSON.stringify(Object.fromEntries(missing.map(([text, where]) => [text, where])), null, 2) + "\n"
    );
} else if (missing.length) {
    process.stderr.write(`${missing.length} notices are not in the catalogue in all three languages:\n`);
    for (const [text, where] of missing) process.stderr.write(`  ${where}: ${JSON.stringify(text).slice(0, 120)}\n`);
    process.exit(1);
} else {
    process.stdout.write(`${found.size} notices in English, Chinese and Latin.\n`);
}
