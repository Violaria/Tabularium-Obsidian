import type { FilePath } from "./db.type";

export const PREFIXMD_LOGFILE = "tabularium-log-";

/**
 * Tabularium's flag files at the vault root: each asks the plug-in to suspend, fetch or rebuild at the next start. Their
 * names are its own, so the original sync plug-in in the same vault does not respond to them, nor Tabularium to
 * the original's.
 */
export const FlagFiles = {
    SUSPEND_ALL: "tabularium-suspend.md" as FilePath,
    REBUILD_ALL: "tabularium-rebuild.md" as FilePath,
    FETCH_ALL: "tabularium-fetch.md" as FilePath,
} as const;

/**
 * The original plug-in's flag files. They trigger nothing here, and are still never synchronised, so that one device's
 * flag cannot reach the original plug-in on another device through Tabularium.
 */
export const UpstreamFlagFiles: readonly FilePath[] = [
    "redflag.md" as FilePath,
    "redflag2.md" as FilePath,
    "redflag3.md" as FilePath,
    "flag_rebuild.md" as FilePath,
    "flag_fetch.md" as FilePath,
];
