#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { chmod, cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { basename, dirname, relative, resolve, sep } from "node:path";

import { build } from "esbuild";
import { extractImportSpecifiers } from "./package-boundary.mjs";

const root = resolve(new URL("..", import.meta.url).pathname);
// Tabularium: the package is built in place; the committed package.json is the published manifest.
const packageDirectory = root;
const outputDirectory = resolve(packageDirectory, "dist");
const sourceDirectory = resolve(root, "src");
const sourceManifest = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
const committedManifest = sourceManifest;

async function collectFiles(directory, predicate = () => true) {
    const files = [];
    for (const entry of await readdir(directory, { withFileTypes: true })) {
        const path = resolve(directory, entry.name);
        if (entry.isDirectory()) files.push(...(await collectFiles(path, predicate)));
        else if (entry.isFile() && predicate(path)) files.push(path);
    }
    return files;
}

async function compileTypeScriptModules() {
    const modulePaths = await collectFiles(sourceDirectory, (path) => {
        const relativePath = relative(sourceDirectory, path).split(sep).join("/");
        return (
            path.endsWith(".ts") &&
            !path.endsWith(".d.ts") &&
            !/(?:\.unit)?\.(?:spec|test)\.ts$/u.test(path) &&
            !relativePath.startsWith("cli/")
        );
    });
    await build({
        bundle: false,
        entryPoints: modulePaths,
        format: "esm",
        outbase: sourceDirectory,
        outdir: outputDirectory,
        platform: "node",
        target: "es2022",
        tsconfig: resolve(root, "tsconfig.json"),
    });
}

async function bundleInlineWorker() {
    const workerResult = await build({
        bundle: true,
        entryPoints: [resolve(sourceDirectory, "worker/bg.worker.ts")],
        external: ["crypto"],
        format: "iife",
        platform: "browser",
        target: "es2022",
        write: false,
    });
    const workerCode = workerResult.outputFiles[0].text;
    const inlineWorkerPlugin = {
        name: "commonlib-inline-worker",
        setup(buildContext) {
            buildContext.onResolve({ filter: /bg\.worker\.ts\?worker&inline$/ }, () => ({
                namespace: "commonlib-inline-worker",
                path: "bg.worker.ts",
            }));
            buildContext.onLoad({ filter: /.*/, namespace: "commonlib-inline-worker" }, () => ({
                contents: `const workerSource = ${JSON.stringify(workerCode)};
export default function createWorker() {
    const blob = new Blob([workerSource], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    URL.revokeObjectURL(url);
    return worker;
}`,
                loader: "js",
            }));
        },
    };

    await build({
        bundle: true,
        entryPoints: [resolve(sourceDirectory, "worker/bgWorker.ts")],
        external: ["crypto"],
        format: "esm",
        outfile: resolve(outputDirectory, "worker/bgWorker.js"),
        packages: "external",
        platform: "browser",
        plugins: [inlineWorkerPlugin],
        target: "es2022",
        tsconfig: resolve(root, "tsconfig.json"),
    });
}

async function sourceTargetForAlias(specifier) {
    const sourcePathWithExtension = specifier.slice("@lib/".length);
    if (sourcePathWithExtension.endsWith(".json")) return sourcePathWithExtension;
    const sourcePath = sourcePathWithExtension.replace(/\.(?:ts|js)$/u, "");
    if (sourcePath.endsWith(".svelte")) return `${sourcePath}.js`;
    const directTarget = `${sourcePath}.js`;
    if (await pathExists(resolve(outputDirectory, directTarget))) return directTarget;
    const indexTarget = `${sourcePath}/index.js`;
    if (await pathExists(resolve(outputDirectory, indexTarget))) return indexTarget;
    return directTarget;
}

function relativeModuleSpecifier(fromPath, targetRelativePath) {
    let path = relative(dirname(fromPath), resolve(outputDirectory, targetRelativePath)).split(sep).join("/");
    if (!path.startsWith(".")) path = `./${path}`;
    return path;
}

async function pathExists(path) {
    try {
        await readFile(path);
        return true;
    } catch {
        return false;
    }
}

async function rewriteSpecifier(fromPath, specifier) {
    if (specifier.startsWith("@lib/")) {
        return relativeModuleSpecifier(fromPath, await sourceTargetForAlias(specifier));
    }
    if (!specifier.startsWith("./") && !specifier.startsWith("../")) return specifier;
    if (specifier.includes("?")) return specifier;
    if (/\.(?:ts|tsx|mts|cts)$/u.test(specifier)) return specifier.replace(/\.(?:ts|tsx|mts|cts)$/u, ".js");

    const existingTarget = resolve(dirname(fromPath), specifier);
    if (await pathExists(existingTarget)) return specifier;
    const directTarget = resolve(dirname(fromPath), `${specifier}.js`);
    if (await pathExists(directTarget)) return `${specifier}.js`;
    const indexTarget = resolve(dirname(fromPath), specifier, "index.js");
    if (await pathExists(indexTarget)) return `${specifier.replace(/\/$/u, "")}/index.js`;
    return specifier;
}

async function rewriteModuleSpecifiers() {
    const modulePaths = await collectFiles(outputDirectory, (path) => path.endsWith(".js") || path.endsWith(".d.ts"));
    const patterns = [
        /(\bfrom\s+)(["'])([^"']+)(\2)/gu,
        /(\bimport\s*)(["'])([^"']+)(\2)/gu,
        /(\bimport\s*\(\s*)(["'])([^"']+)(\2)(\s*\))/gu,
    ];
    for (const path of modulePaths) {
        let source = await readFile(path, "utf8");
        for (const pattern of patterns) {
            const matches = [...source.matchAll(pattern)];
            for (const match of matches.reverse()) {
                const rewritten = await rewriteSpecifier(path, match[3]);
                if (rewritten === match[3]) continue;
                const start = match.index + match[1].length + 1;
                source = `${source.slice(0, start)}${rewritten}${source.slice(start + match[3].length)}`;
            }
        }
        await writeFile(path, source);
    }
}

function createTypesVersions(exports) {
    const mappings = {};
    for (const [exportPath, target] of Object.entries(exports)) {
        if (exportPath === "." || exportPath === "./package.json") continue;
        if (typeof target !== "object" || typeof target.types !== "string") {
            throw new Error(`Public export '${exportPath}' has no declaration target.`);
        }
        mappings[exportPath.slice(2)] = [target.types.replace(/^\.\//u, "")];
    }
    // The exports map remains canonical; this mirrors it for legacy TypeScript resolvers.
    return { "*": mappings };
}

// Tabularium: package.json is the source of truth for the public surface (upstream generated it from an inventory
// of downstream imports). The build only checks that typesVersions mirrors exports; validateOutput checks that every
// target exists.
async function verifyPackageManifest() {
    const expected = JSON.stringify(createTypesVersions(committedManifest.exports));
    if (JSON.stringify(committedManifest.typesVersions) !== expected) {
        throw new Error("package.json: typesVersions does not mirror exports.");
    }
}

async function copyStaticFiles() {
    // src/package.json stands in for upstream's source manifest (no sideEffects field), so that bundling the worker
    // from source keeps every module the way upstream's build did; it is not part of the output.
    const jsonPaths = await collectFiles(
        sourceDirectory,
        (path) => path.endsWith(".json") && path !== resolve(sourceDirectory, "package.json")
    );
    for (const path of jsonPaths) {
        const target = resolve(outputDirectory, relative(sourceDirectory, path));
        await mkdir(dirname(target), { recursive: true });
        await cp(path, target);
    }
}

async function normalisePackagePermissions() {
    const manifest = JSON.parse(await readFile(resolve(packageDirectory, "package.json"), "utf8"));
    const executablePaths = new Set(
        (typeof manifest.bin === "string" ? [manifest.bin] : Object.values(manifest.bin ?? {})).map((path) =>
            path.replace(/^\.\//u, "")
        )
    );

    const visit = async (directory) => {
        await chmod(directory, 0o755);
        for (const entry of await readdir(directory, { withFileTypes: true })) {
            const path = resolve(directory, entry.name);
            if (entry.isDirectory()) {
                await visit(path);
                continue;
            }
            if (!entry.isFile()) continue;
            const packagePath = relative(packageDirectory, path).split(sep).join("/");
            await chmod(path, executablePaths.has(packagePath) ? 0o755 : 0o644);
        }
    };

    await visit(outputDirectory);
}

async function validateOutput() {
    const manifest = JSON.parse(await readFile(resolve(packageDirectory, "package.json"), "utf8"));
    const missingTargets = [];
    const visitTarget = async (key, value) => {
        if (typeof value === "string") {
            if (value.startsWith("./") && !(await pathExists(resolve(packageDirectory, value)))) {
                missingTargets.push(`${key}: ${value}`);
            }
            return;
        }
        for (const [condition, target] of Object.entries(value)) await visitTarget(`${key}.${condition}`, target);
    };
    for (const [key, value] of Object.entries(manifest.exports)) await visitTarget(key, value);
    for (const [key, value] of Object.entries(manifest.imports)) await visitTarget(key, value);
    for (const value of manifest.sideEffects) await visitTarget("sideEffects", value);
    if (missingTargets.length > 0) throw new Error(`Missing package targets:\n${missingTargets.join("\n")}`);

    const modulePaths = await collectFiles(outputDirectory, (path) => path.endsWith(".js") || path.endsWith(".d.ts"));
    const forbidden = [];
    const missingRelativeImports = [];
    for (const path of modulePaths) {
        const source = await readFile(path, "utf8");
        if (source.includes("@lib/") || source.includes('from "@/') || source.includes("?worker")) {
            forbidden.push(relative(packageDirectory, path).split(sep).join("/"));
        }
        for (const specifier of extractImportSpecifiers(source)) {
            if (!specifier.startsWith(".") || specifier.includes("?")) continue;
            if (!(await pathExists(resolve(dirname(path), specifier)))) {
                missingRelativeImports.push(`${relative(packageDirectory, path).split(sep).join("/")}: ${specifier}`);
            }
        }
    }
    if (forbidden.length > 0) throw new Error(`Unresolved source-only imports:\n${forbidden.join("\n")}`);
    if (missingRelativeImports.length > 0) {
        throw new Error(`Missing relative package imports:\n${missingRelativeImports.join("\n")}`);
    }
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
execFileSync(process.execPath, [resolve(root, "node_modules/typescript/bin/tsc"), "-p", "tsconfig.build.json"], {
    cwd: root,
    stdio: "inherit",
});
await compileTypeScriptModules();
await bundleInlineWorker();
await copyStaticFiles();
await rewriteModuleSpecifiers();
await verifyPackageManifest();
await normalisePackagePermissions();
await validateOutput();

console.log(
    `Built ${sourceManifest.name}@${sourceManifest.version} with ${Object.keys(sourceManifest.exports).length} exports.`
);
