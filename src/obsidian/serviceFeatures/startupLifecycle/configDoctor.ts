import { performDoctorConsultation, RebuildOptions } from "@tabularium/sync-core/compat/common/configForDoc";
import type { SyncSettings } from "@tabularium/sync-core/compat/common/types";
import type { Confirm } from "@tabularium/sync-core/compat/interfaces/Confirm";
import type { Rebuilder } from "@tabularium/sync-core/compat/interfaces/DatabaseRebuilder";
import type { MessageTranslator } from "@tabularium/sync-core/context";

/** Collaborators required to run one Config Doctor consultation. */
export interface ConfigDoctorDependencies {
    readonly confirm: Confirm;
    readonly translate: MessageTranslator;
    readonly settings: SyncSettings;
    readonly setSettings: (settings: SyncSettings) => void;
    readonly saveSettings: () => Promise<void>;
    readonly rebuilder: Pick<Rebuilder, "scheduleRebuild" | "scheduleFetch">;
    readonly performRestart: () => void;
}

/**
 * Run Config Doctor and, when requested by its result, reserve the next-start
 * rebuild or fetch operation before restarting the application.
 *
 * The positional arguments retain the established defaults and operation
 * semantics for both start-up and request-event callers.
 */
export async function runConfigDoctor(
    dependencies: ConfigDoctorDependencies,
    skipRebuild: boolean = false,
    activateReason = "updated",
    forceRescan = false
): Promise<boolean> {
    const { shouldRebuild, shouldRebuildLocal, isModified, settings } = await performDoctorConsultation(
        {
            confirm: dependencies.confirm,
            translate: dependencies.translate,
        },
        dependencies.settings,
        {
            localRebuild: skipRebuild ? RebuildOptions.SkipEvenIfRequired : RebuildOptions.AutomaticAcceptable,
            remoteRebuild: skipRebuild ? RebuildOptions.SkipEvenIfRequired : RebuildOptions.AutomaticAcceptable,
            activateReason,
            forceRescan,
        }
    );
    if (isModified) {
        dependencies.setSettings(settings);
        await dependencies.saveSettings();
    }
    if (!skipRebuild) {
        if (shouldRebuild) {
            await dependencies.rebuilder.scheduleRebuild();
            dependencies.performRestart();
            return false;
        } else if (shouldRebuildLocal) {
            await dependencies.rebuilder.scheduleFetch();
            dependencies.performRestart();
            return false;
        }
    }
    return true;
}
