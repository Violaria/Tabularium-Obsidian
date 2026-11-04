import type { Platform } from "obsidian";

const CLIENT_ID = "tabularium:client-id";

/** Which of Obsidian's platform flags are set; kept apart from `Platform` so the choice can be tested. */
export type PlatformFlags = Pick<typeof Platform, "isIosApp" | "isTablet" | "isAndroidApp" | "isMacOS" | "isWin" | "isLinux">;

export function clientName(platform: PlatformFlags) {
    const system = platform.isIosApp
        ? platform.isTablet
            ? "iPad"
            : "iPhone"
        : platform.isAndroidApp
          ? "Android"
          : platform.isMacOS
            ? "macOS"
            : platform.isWin
              ? "Windows"
              : platform.isLinux
                ? "Linux"
                : "";
    return system ? `Obsidian · ${system}` : "Obsidian";
}

/**
 * This machine's ID on the server. It groups the credentials of all vaults on the machine, so it is kept in the storage
 * they share rather than in `App#saveLocalStorage`, which is per vault. It is not a secret: it gives no access.
 */
export function clientId(storage: Pick<Storage, "getItem" | "setItem">) {
    const stored = storage.getItem(CLIENT_ID);
    if (stored) return stored;
    const id = crypto.randomUUID();
    storage.setItem(CLIENT_ID, id);
    return id;
}
