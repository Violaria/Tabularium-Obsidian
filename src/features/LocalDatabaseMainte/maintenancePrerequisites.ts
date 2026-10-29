import type { ObsidianLiveSyncSettings } from "@vrtmrz/livesync-commonlib/compat/common/types";
import { $msg } from "@/common/translation";

type MaintenancePrerequisiteSettings = Pick<ObsidianLiveSyncSettings, "readChunksOnline">;

type MaintenancePrerequisiteOptions = {
    operationName: string;
    settings: MaintenancePrerequisiteSettings;
    askSelectStringDialogue: (
        message: string,
        buttons: readonly string[],
        options: { title: string; defaultAction: string }
    ) => Promise<string | false | undefined>;
    applyPartial: (settings: Partial<ObsidianLiveSyncSettings>, saveImmediately?: boolean) => Promise<void>;
};

export async function ensureLocalDatabaseMaintenancePrerequisites({
    operationName,
    settings,
    askSelectStringDialogue,
    applyPartial,
}: MaintenancePrerequisiteOptions): Promise<boolean> {
    const requiredSettings = {
        readChunksOnline: false,
    } satisfies MaintenancePrerequisiteSettings;

    const missing = settings.readChunksOnline ? [$msg("maintenancePrerequisites.fetchChunksOff")] : [];

    if (missing.length == 0) return true;

    const APPLY = $msg("maintenancePrerequisites.apply");
    const CANCEL = $msg("Cancel");
    const result = await askSelectStringDialogue(
        $msg("maintenancePrerequisites.message", { operation: operationName, settings: missing.join("\n") }),
        [APPLY, CANCEL],
        {
            title: $msg("maintenancePrerequisites.title", { operation: operationName }),
            defaultAction: CANCEL,
        }
    );

    if (result !== APPLY) return false;

    await applyPartial(requiredSettings, true);
    return true;
}
