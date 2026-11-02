import obsidianmd from "eslint-plugin-obsidianmd";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig(
    globalIgnores([
        "node_modules",
        "**/dist",
        "build",
        "coverage",
        "main.js",
        "main_org.js",
        "pouchdb-browser.js",
        "package.json",
        "package-lock.json",
        "versions.json",
        // Svelte is covered by the project lint and svelte-check; the directory report currently analyses TypeScript.
        "**/*.svelte",
        "**/svelte.config.js",
        "**/*.unit.spec.ts",
        "**/*.test.ts",
        "**/*.spec.ts",
        "**/test/**",
        "packages/sync-core/_tools/**",
        "packages/sync-core/vitest.config.ts",
    ]),
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                MANIFEST_VERSION: "readonly",
                PACKAGE_VERSION: "readonly",
                UPDATE_INFO: "readonly",
                hostPlatform: "readonly",
            },
            parserOptions: {
                project: ["./tsconfig.json", "./packages/sync-core/tsconfig.json"],
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    ...obsidianmd.configs.recommended,
    {
        rules: {
            // The directory review reports console usage as guidance rather than a release blocker.
            "obsidianmd/rule-custom-message": "off",
            "no-console": "warn",
            "obsidianmd/no-unsupported-api": "error",
            // Treat direct globalThis access as an error so the CI gate rejects it.
            "obsidianmd/no-global-this": "error",
            // Keep legacy type-safety debt visible while reserving errors for directory-review blockers.
            "@typescript-eslint/no-unsafe-argument": "warn",
            "@typescript-eslint/no-unsafe-assignment": "warn",
            "@typescript-eslint/no-unsafe-call": "warn",
            "@typescript-eslint/no-unsafe-member-access": "warn",
            "@typescript-eslint/no-unsafe-return": "warn",
            "@typescript-eslint/no-base-to-string": "warn",
            "@typescript-eslint/no-redundant-type-constituents": "warn",
            "@typescript-eslint/no-unnecessary-type-assertion": "warn",
        },
    },
    {
        // TypeScript checks names, including the PouchDB and NodeJS namespaces that no-undef cannot see.
        files: ["packages/sync-core/src/**/*.ts"],
        rules: { "no-undef": "off" },
    },
    {
        // The one place that reaches the global object outside a browser: in Node.js (the CLI and tests) there is no
        // window, and the CLI adds to the global object later, so a copy would not do. The directory review lists it
        // as a warning.
        files: ["packages/sync-core/src/common/coreEnvFunctions.ts"],
        rules: { "obsidianmd/no-global-this": "off" },
    },
);
