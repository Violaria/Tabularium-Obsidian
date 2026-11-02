import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
    // The core takes its global object from window or, outside a document, self; in Node that is the global object.
    define: { self: "globalThis" },
    resolve: {
        alias: {
            "@lib": resolve(root, "src"),
        },
    },
    test: {
        environment: "node",
        exclude: ["**/*.integration.spec.ts", "**/*.integration.test.ts"],
        include: ["src/**/*.unit.spec.ts", "src/**/*.unit.test.ts"],
    },
});
