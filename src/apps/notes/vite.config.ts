import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const version = (JSON.parse(await import("node:fs").then((fs) => fs.readFileSync(path.resolve(__dirname, "../../../manifest.json"), "utf8"))) as { version: string }).version;

// Built into the server's /notes/ directory; asset names carry hashes so they can be cached for long.
export default defineConfig({
    plugins: [svelte()],
    resolve: { alias: { "@": path.resolve(__dirname, "../../") } },
    base: "/notes/",
    build: {
        outDir: path.resolve(__dirname, "../../../../server/notes-dist"),
        emptyOutDir: true,
        chunkSizeWarningLimit: 4096,
        rollupOptions: { external: ["crypto"] },
    },
    define: { MANIFEST_VERSION: JSON.stringify(version), PACKAGE_VERSION: JSON.stringify(version), global: "globalThis" },
});
