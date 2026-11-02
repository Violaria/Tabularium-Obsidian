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
        "**/test/**",
        "src/apps/_test/**",
        "src/apps/cli/testdeno/**",
        "src/apps/notes/vite.config.ts",
        "src/apps/notes/public/**",
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
                project: [
                    "./tsconfig.json",
                    "./src/apps/browser/tsconfig.json",
                    "./src/apps/cli/tsconfig.json",
                    "./src/apps/webapp/tsconfig.json",
                    "./src/apps/notes/tsconfig.json",
                ],
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
            // A suggestion, not a requirement: getSettingDefinitions() needs Obsidian 1.13 and the plug-in supports 1.7.2,
            // so the settings page stays imperative. The directory review still lists it.
            "obsidianmd/settings-tab/prefer-setting-definitions": "off",
        },
    },
    {
        files: ["src/apps/**/*.{ts,js,mjs}"],
        rules: {
            // These applications are inspected by the directory review but accept external command and file data.
            "@typescript-eslint/restrict-template-expressions": "warn",
        },
    },
    {
        files: ["src/apps/browser/**/*.ts", "src/apps/webapp/**/*.ts"],
        rules: {
            "obsidianmd/prefer-active-doc": "off",
        },
    },
    {
        // A standalone web page: Obsidian's requestUrl, vault-scoped storage and DOM helpers do not exist there.
        files: ["src/apps/notes/**/*.ts"],
        rules: {
            "obsidianmd/prefer-active-doc": "off",
            "no-restricted-globals": "off",
            // createEl and friends are Obsidian's additions to the DOM; a web page creates elements the standard way.
            "obsidianmd/prefer-create-el": "off",
            // Obsidian's popout windows do not exist in a web page.
            "obsidianmd/prefer-window-timers": "off",
        },
    }
);
