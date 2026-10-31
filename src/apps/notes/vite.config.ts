import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const version = (JSON.parse(await import("node:fs").then((fs) => fs.readFileSync(path.resolve(__dirname, "../../../manifest.json"), "utf8"))) as { version: string }).version;

// Built into the server's /notes/ directory as a module of the web application: the shell imports the fixed-name
// entry notes-module.js (with notes-module.css); the other files carry hashes so they can be cached for long.
export default defineConfig({
    plugins: [svelte()],
    // The plug-in's sorting engine is bundled from source; it imports "obsidian" for its file classes, which in the
    // browser come from a small stand-in.
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../../"),
            "@tabularium/custom-sort/engine": path.resolve(__dirname, "../../../../../packages/custom-sort/src/engine.ts"),
            obsidian: path.resolve(__dirname, "obsidian-shim.ts"),
        },
    },
    base: "/notes/",
    publicDir: false,
    build: {
        outDir: path.resolve(__dirname, "../../../../server/notes-dist"),
        emptyOutDir: true,
        chunkSizeWarningLimit: 4096,
        cssCodeSplit: false,
        rollupOptions: {
            external: ["crypto"],
            // The notes module for the shell, and the share viewer page (/s/…), which loads nothing else.
            input: { notes: path.resolve(__dirname, "main.ts"), viewer: path.resolve(__dirname, "viewer.ts") },
            preserveEntrySignatures: "exports-only",
            output: {
                entryFileNames: (chunk) => (chunk.name === "viewer" ? "assets/share-viewer.js" : "assets/notes-module.js"),
                assetFileNames: (asset) => (asset.names?.some((name) => name.endsWith(".css")) ? "assets/notes-module.css" : "assets/[name]-[hash][extname]"),
            },
        },
    },
    define: { MANIFEST_VERSION: JSON.stringify(version), PACKAGE_VERSION: JSON.stringify(version), global: "globalThis" },
});
