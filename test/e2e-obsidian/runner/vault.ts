import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
    createTemporaryVault as createGenericTemporaryVault,
    type TemporaryVault,
} from "@vrtmrz/obsidian-test-session";

export type { TemporaryVault };

export async function createTemporaryVault(prefix = "obsidian-livesync-e2e-"): Promise<TemporaryVault> {
    const vault = await createGenericTemporaryVault({
        prefix,
        pluginIds: ["tabularium"],
        idPrefix: "livesync-e2e",
    });
    // Obsidian 1.14 opens settings (and, at the first start, the community plug-ins page) in a window of its own,
    // which the test session would take for the vault's window; in the main window they are a dialogue as before.
    const appConfig = join(vault.path, ".obsidian", "app.json");
    await writeFile(appConfig, JSON.stringify({ ...JSON.parse(await readFile(appConfig, "utf8")), settingsPopoutWindow: false }, null, 4));
    return vault;
}
