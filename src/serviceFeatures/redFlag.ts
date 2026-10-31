import { LOG_LEVEL_INFO, LOG_LEVEL_NOTICE, LOG_LEVEL_VERBOSE } from "octagonal-wheels/common/logger";
import type { NecessaryServices } from "@vrtmrz/livesync-commonlib/compat/interfaces/ServiceModule";
import { createInstanceLogFunction, type LogFunction } from "@vrtmrz/livesync-commonlib/compat/services/lib/logUtils";
import {
    FlagFilesHumanReadable,
    FlagFilesOriginal,
} from "@vrtmrz/livesync-commonlib/compat/common/models/redflag.const";
import FetchEverything from "@/modules/features/SetupWizard/dialogs/FetchEverything.svelte";
import RebuildEverything from "@/modules/features/SetupWizard/dialogs/RebuildEverything.svelte";
import { REMOTE_MINIO, REMOTE_P2P } from "@vrtmrz/livesync-commonlib/compat/common/models/setting.const";
import { assessTweakCompatibility, type ObsidianLiveSyncSettings } from "@vrtmrz/livesync-commonlib/settings";
import { RemotePreferredTweakStatuses } from "@vrtmrz/livesync-commonlib/compat/common/models/tweak.definition";
import {
    TYPE_BACKUP_SKIPPED,
    type FetchEverythingResult,
    type RebuildEverythingResult,
} from "@/modules/features/SetupWizard/dialogs/setupDialogTypes";
import { askAndPerformFastSetupOnScheduledFetchAll } from "./redFlag.simpleFetch";
import { ConnectionStringParser } from "@vrtmrz/livesync-commonlib/compat/common/ConnectionString";
import { activateRemoteConfiguration } from "@vrtmrz/livesync-commonlib/remote-configurations";
import { isP2PMainRemote } from "@/common/remoteConfiguration";
import { $msg } from "@/common/translation";

/**
 * Flag file handler interface, similar to target filter pattern.
 */
interface FlagFileHandler {
    priority: number;
    check: () => Promise<boolean>;
    handle: () => Promise<boolean>;
}

type InitialisationOperation = "fetch" | "rebuild";

export async function isFlagFileExist(host: NecessaryServices<never, "storageAccess">, path: string) {
    const redFlagExist = await host.serviceModules.storageAccess.isExists(
        host.serviceModules.storageAccess.normalisePath(path)
    );
    if (redFlagExist) {
        return true;
    }
    return false;
}

export async function deleteFlagFile(host: NecessaryServices<never, "storageAccess">, log: LogFunction, path: string) {
    try {
        const isFlagged = await host.serviceModules.storageAccess.isExists(
            host.serviceModules.storageAccess.normalisePath(path)
        );
        if (isFlagged) {
            await host.serviceModules.storageAccess.delete(path, true);
        }
    } catch (ex) {
        log($msg("RedFlag.CouldNotDeleteFlag", { path }));
        log(ex, LOG_LEVEL_VERBOSE);
    }
}
async function askAndActivateRemoteDatabase(host: NecessaryServices<"UI" | "setting", never>, log: LogFunction) {
    const settings = host.services.setting.currentSettings();
    if (settings.remoteConfigurations && Object.keys(settings.remoteConfigurations).length > 1) {
        const REMOTE_KEEP_CURRENT = $msg("RedFlag.SelectRemote.Buttons.UseActive");
        const REMOTE_CANCEL = $msg("Cancel");
        const message = $msg("RedFlag.SelectRemote.Message");
        const options = Object.entries(settings.remoteConfigurations).map(([id, config]) => {
            const parsed = ConnectionStringParser.parse(config.uri);
            const displayURI = (config.uri.split("@").pop() || "").substring(0, 20) + "..."; // Show only the last part of URI for better readability and privacy.
            return {
                name: `${config.name} - ${parsed.type} (${displayURI})`,
                id: id,
            };
        });
        options.push({
            name: REMOTE_KEEP_CURRENT,
            id: "keep_current",
        });
        options.push({
            name: REMOTE_CANCEL,
            id: "cancel",
        });

        const selections = options.map((option) => option.name);
        // const defaultAction =
        //     options.find((option) => option.id === settings.activeConfigurationId)?.name || selections[0];
        const selectedId = await host.services.UI.confirm.askSelectStringDialogue(message, selections, {
            title: $msg("RedFlag.SelectRemote.Title"),
            defaultAction: REMOTE_KEEP_CURRENT,
        });
        const selectedConfig = options.find((option) => option.name === selectedId);
        if (selectedConfig) {
            if (selectedConfig.id === "keep_current") {
                log($msg("RedFlag.SelectRemote.KeepCurrent"), LOG_LEVEL_INFO);
                return true;
            }
            if (selectedConfig.id === "cancel") {
                log($msg("RedFlag.SelectRemote.Cancelled"), LOG_LEVEL_NOTICE);
                return false;
            }
            const activated = activateRemoteConfiguration(settings, selectedConfig.id);
            if (activated) {
                await host.services.setting.applyPartial(activated);
                log($msg("RedFlag.SelectRemote.Activated", { name: selectedConfig.name }), LOG_LEVEL_INFO);
                return true;
            } else {
                log($msg("RedFlag.SelectRemote.ActivationFailed", { name: selectedConfig.name }), LOG_LEVEL_NOTICE);
                return false;
            }
        } else {
            log($msg("RedFlag.SelectRemote.NoneSelected"), LOG_LEVEL_NOTICE);
            return false;
        }
    }
    return true; // If there is only one or no remote configuration, proceed without asking.
}
/**
 * Factory function to create a fetch all flag handler.
 * All logic related to fetch all flag is encapsulated here.
 */
export function createFetchAllFlagHandler(
    host: NecessaryServices<
        | "vault"
        | "fileProcessing"
        | "tweakValue"
        | "UI"
        | "setting"
        | "appLifecycle"
        | "path"
        | "keyValueDB"
        | "database",
        "storageAccess" | "rebuilder" | "fileHandler"
    >,
    log: LogFunction
): FlagFileHandler {
    // Check if fetch all flag is active
    const isFlagActive = async () =>
        (await isFlagFileExist(host, FlagFilesOriginal.FETCH_ALL)) ||
        (await isFlagFileExist(host, FlagFilesHumanReadable.FETCH_ALL));

    // Cleanup fetch all flag files
    const cleanupFlag = async () => {
        await deleteFlagFile(host, log, FlagFilesOriginal.FETCH_ALL);
        await deleteFlagFile(host, log, FlagFilesHumanReadable.FETCH_ALL);
    };

    // Handle the fetch all scheduled operation
    const onScheduled = async () => {
        // Select the remote database if there are multiple remotes configured.
        const isRemoteActivated = await askAndActivateRemoteDatabase(host, log);
        if (!isRemoteActivated) {
            return await cancelScheduledInitialisation(host, cleanupFlag);
        }

        // Ask user for use Fast Setup
        const useFastSetup = await askAndPerformFastSetupOnScheduledFetchAll(host, log, cleanupFlag);
        if (useFastSetup !== undefined) {
            return useFastSetup;
        }
        // if useFastSetup is undefined, it means user choose to proceed with normal fetch process, so continue to ask for fetch method.

        const method =
            await host.services.UI.dialogManager.openWithExplicitCancel<FetchEverythingResult>(FetchEverything);
        if (method === "cancelled") {
            log($msg("RedFlag.Fetch.Cancelled"), LOG_LEVEL_NOTICE);
            return await cancelScheduledInitialisation(host, cleanupFlag);
        }
        const { vault, extra } = method;
        const settings = await Promise.resolve(host.services.setting.currentSettings());
        // If remote is MinIO, makeLocalChunkBeforeSync is not available. (because no-deduplication on sending).
        const makeLocalChunkBeforeSyncAvailable = settings.remoteType !== REMOTE_MINIO;
        const mapVaultStateToAction = {
            identical: {
                makeLocalChunkBeforeSync: makeLocalChunkBeforeSyncAvailable,
                makeLocalFilesBeforeSync: false,
            },
            independent: {
                makeLocalChunkBeforeSync: false,
                makeLocalFilesBeforeSync: false,
            },
            unbalanced: {
                makeLocalChunkBeforeSync: false,
                makeLocalFilesBeforeSync: true,
            },
            cancelled: {
                makeLocalChunkBeforeSync: false,
                makeLocalFilesBeforeSync: false,
            },
        } as const;

        if (!(await adjustSettingToRemoteIfNeeded(host, log, extra, settings))) {
            log($msg("RedFlag.Fetch.InitialisationCancelled"), LOG_LEVEL_NOTICE);
            return await cancelScheduledInitialisation(host, cleanupFlag);
        }
        return await processVaultInitialisation(host, log, async () => {
            const vaultStateToAction = mapVaultStateToAction[vault];
            const { makeLocalChunkBeforeSync, makeLocalFilesBeforeSync } = vaultStateToAction;
            log(
                $msg("RedFlag.Fetch.Starting", {
                    makeLocalChunkBeforeSync: `${makeLocalChunkBeforeSync}`,
                    makeLocalFilesBeforeSync: `${makeLocalFilesBeforeSync}`,
                }),
                LOG_LEVEL_INFO
            );
            await host.serviceModules.rebuilder.$fetchLocal(makeLocalChunkBeforeSync, !makeLocalFilesBeforeSync);
            await cleanupFlag();
            log($msg("RedFlag.Fetch.Completed"), LOG_LEVEL_NOTICE);
            return true;
        });
    };

    return {
        priority: 10,
        check: () => isFlagActive(),
        handle: async () => {
            const res = await onScheduled();
            if (res) {
                return await verifyAndUnlockSuspension(host, log);
            }
            return false;
        },
    };
}

/**
 * Adjust setting to remote configuration.
 * @param config current configuration to retrieve remote preferred config
 * @param operation operation which will consume the selected configuration
 * @returns whether initialisation may continue.
 */
export async function adjustSettingToRemote(
    host: NecessaryServices<"tweakValue" | "UI" | "setting", never>,
    log: LogFunction,
    config: ObsidianLiveSyncSettings,
    operation: InitialisationOperation = "fetch"
): Promise<boolean> {
    while (true) {
        const remoteResult = await host.services.tweakValue.fetchRemotePreferred(config);
        if (remoteResult.status === RemotePreferredTweakStatuses.NOT_CONFIGURED) {
            const useDeviceSettings = $msg("Use this device's settings");
            const cancelInitialisation = $msg("Cancel");
            log($msg("RedFlag.RemoteSettings.NotConfigured", { reason: `${remoteResult.reason}` }), LOG_LEVEL_INFO);
            const choice = await host.services.UI.confirm.askSelectStringDialogue(
                $msg(
                    "The selected remote has no saved synchronisation settings. This is normal for a new remote. Use this device's settings, or cancel if you expected existing settings."
                ),
                [useDeviceSettings, cancelInitialisation] as const,
                {
                    defaultAction: useDeviceSettings,
                    timeout: 0,
                    title: $msg("No Synchronisation Settings Found"),
                }
            );
            return choice === useDeviceSettings;
        }
        if (remoteResult.status === RemotePreferredTweakStatuses.UNAVAILABLE) {
            const retryRemoteSettings = $msg("Retry");
            const useDeviceSettings = $msg("Use this device's settings");
            const cancelInitialisation = $msg("Cancel");
            log($msg("RedFlag.RemoteSettings.Unavailable"), LOG_LEVEL_NOTICE);
            log(remoteResult.error, LOG_LEVEL_VERBOSE);
            if (operation === "rebuild") {
                const choice = await host.services.UI.confirm.askSelectStringDialogue(
                    $msg(
                        "Could not read the remote's synchronisation settings. Retry, or continue the overwrite with this device's settings. A working connection is still required."
                    ),
                    [retryRemoteSettings, useDeviceSettings, cancelInitialisation] as const,
                    {
                        defaultAction: retryRemoteSettings,
                        timeout: 0,
                        title: $msg("Could Not Read Synchronisation Settings"),
                    }
                );
                if (choice === retryRemoteSettings) continue;
                return choice === useDeviceSettings;
            }
            const choice = await host.services.UI.confirm.askSelectStringDialogue(
                $msg(
                    "Could not read the remote's synchronisation settings. Check the connection and credentials, then retry."
                ),
                [retryRemoteSettings, cancelInitialisation] as const,
                {
                    defaultAction: retryRemoteSettings,
                    timeout: 0,
                    title: $msg("Could Not Read Synchronisation Settings"),
                }
            );
            if (choice === retryRemoteSettings) continue;
            return false;
        }
        if (remoteResult.status === RemotePreferredTweakStatuses.UNSUPPORTED) {
            log($msg("RedFlag.RemoteSettings.Unsupported"), LOG_LEVEL_INFO);
            return true;
        }

        if (operation === "rebuild") {
            // An overwrite makes this device authoritative for both the Vault contents and the
            // shared synchronisation settings. The remote lookup above remains a connection
            // preflight, but settings from the database which is about to be replaced must not
            // overwrite intentional local changes such as enabling E2EE.
            log($msg("RedFlag.RemoteSettings.RebuildUsesLocal"), LOG_LEVEL_NOTICE);
            return true;
        }

        const remoteTweaks = remoteResult.values;
        const assessment = assessTweakCompatibility(config, remoteTweaks);
        if (assessment.alignment === "matched") {
            log($msg("RedFlag.RemoteSettings.Matched"), LOG_LEVEL_NOTICE);
        } else {
            const ok = $msg("RedFlag.RemoteSettings.Buttons.OK");
            await host.services.UI.confirm.askSelectStringDialogue(
                $msg("RedFlag.RemoteSettings.Supplemented"),
                [ok] as const,
                {
                    defaultAction: ok,
                    timeout: 0,
                }
            );
        }

        config = {
            ...config,
            ...assessment.adoptPreferred.changes,
        } satisfies ObsidianLiveSyncSettings;
        await host.services.setting.applyExternalSettings(config, true);
        log($msg("RedFlag.RemoteSettings.Applied"), LOG_LEVEL_NOTICE);
        return true;
    }
}

/**
 * Adjust setting to remote if needed.
 * @param extra result of dialogues that may contain preventFetchingConfig flag (e.g, from FetchEverything or RebuildEverything)
 * @param config current configuration to retrieve remote preferred config
 * @param operation operation which will consume the selected configuration
 */
export async function adjustSettingToRemoteIfNeeded(
    host: NecessaryServices<"tweakValue" | "UI" | "setting", never>,
    log: LogFunction,
    extra: { preventFetchingConfig: boolean } | null,
    config: ObsidianLiveSyncSettings,
    operation: InitialisationOperation = "fetch"
): Promise<boolean> {
    if (extra?.preventFetchingConfig) {
        return true;
    }

    // P2P has no centralised remote configuration; skip to avoid a spurious
    // "Failed to connect to the remote server" error dialog.
    if (config.remoteType === REMOTE_P2P) {
        log($msg("RedFlag.RemoteSettings.SkippedP2P"), LOG_LEVEL_INFO);
        return true;
    }

    const canProceed = await adjustSettingToRemote(host, log, config, operation);
    if (!canProceed) {
        log($msg("RedFlag.RemoteSettings.NotApplied"), LOG_LEVEL_NOTICE);
    }
    return canProceed;
}

/**
 * Cancel a scheduled Fetch or Rebuild without changing the selected automatic
 * synchronisation mode. The persisted Scram switches keep both reflection
 * directions paused until the existing start-up dialogue resumes them.
 */
export async function cancelScheduledInitialisation(
    host: NecessaryServices<"setting" | "appLifecycle", never>,
    cleanupFlag: () => Promise<void>
): Promise<false> {
    await host.services.setting.applyPartial(
        {
            suspendFileWatching: true,
            suspendParseReplicationResult: true,
        },
        true
    );
    await cleanupFlag();
    host.services.appLifecycle.performRestart();
    return false;
}

type InitialisationSuspensionPolicy = "resume" | "keep" | "keep-on-failure";

/**
 * Process Vault initialisation with file watching and synchronisation suspended.
 * @param proc Process to execute during initialisation. It returns true only when normal operation may resume.
 * @param suspensionPolicy Final file-reflection state. `keep-on-failure` controls both reflection directions so a partly completed Fast Setup remains isolated.
 * @returns The result of the process, or false if an error occurs.
 */
/** The synchronisation mode, which initialisation suspends; Tabularium restores it once the initialisation completes. */
const SYNC_MODE_KEYS = [
    "liveSync",
    "periodicReplication",
    "syncOnSave",
    "syncOnEditorSave",
    "syncOnStart",
    "syncOnFileOpen",
    "syncAfterMerge",
    "batchSave",
] as const;

export async function processVaultInitialisation(
    host: NecessaryServices<"setting", never>,
    log: LogFunction,
    proc: () => Promise<boolean>,
    suspensionPolicy: InitialisationSuspensionPolicy = "resume"
) {
    let completed = false;
    const current = host.services.setting.currentSettings();
    const syncMode = Object.fromEntries(SYNC_MODE_KEYS.map((key) => [key, current[key]])) as Partial<ObsidianLiveSyncSettings>;
    try {
        // Disable batch saving and file watching during initialisation.
        await host.services.setting.applyPartial({ batchSave: false }, false);
        await host.services.setting.suspendAllSync();
        await host.services.setting.suspendExtraSync();
        await host.services.setting.applyPartial(
            suspensionPolicy === "keep-on-failure"
                ? { suspendFileWatching: true, suspendParseReplicationResult: true }
                : { suspendFileWatching: true },
            true
        );
        try {
            const result = await proc();
            completed = result;
            return result;
        } catch (ex) {
            log($msg("RedFlag.Initialisation.ProcessError"), LOG_LEVEL_NOTICE);
            log(ex, LOG_LEVEL_VERBOSE);
            return false;
        }
    } catch (ex) {
        log($msg("RedFlag.Initialisation.Error"), LOG_LEVEL_NOTICE);
        log(ex, LOG_LEVEL_VERBOSE);
        return false;
    } finally {
        if (suspensionPolicy === "resume") {
            await host.services.setting.applyPartial({ suspendFileWatching: false }, true);
        } else if (suspensionPolicy === "keep") {
            await host.services.setting.applyPartial({ suspendFileWatching: true }, true);
        } else {
            // Fast Setup owns both directions at this boundary. Reasserting the
            // outcome also covers a late failure after finishRebuild started to
            // resume reflection, and the legacy doNotSuspendOnFetching path.
            await host.services.setting.applyPartial(
                {
                    suspendFileWatching: !completed,
                    suspendParseReplicationResult: !completed,
                },
                true
            );
        }
        if (completed) await host.services.setting.applyPartial(syncMode, true);
    }
}

/** Set by Tabularium's settings page once the rebuild was confirmed there, so the dialogue is not shown again. */
export const REBUILD_CONFIRMED_KEY = "tabularium-rebuild-confirmed";
const REBUILD_CONFIRMATION_MS = 10 * 60_000;

export async function verifyAndUnlockSuspension(
    host: NecessaryServices<"setting" | "appLifecycle" | "UI", never>,
    log: LogFunction
) {
    if (!host.services.setting.currentSettings().suspendFileWatching) {
        return true;
    }
    if (
        (await host.services.UI.confirm.askYesNoDialog($msg("RedFlag.ResumeAndRestart"), {
            defaultOption: "Yes",
            timeout: 15,
        })) != "yes"
    ) {
        // TODO: Confirm actually proceed to next process.
        return true;
    }
    await host.services.setting.applyPartial({ suspendFileWatching: false }, true);
    host.services.appLifecycle.performRestart();
    return false;
}

/**
 * Factory function to create a rebuild flag handler.
 * All logic related to rebuild flag is encapsulated here.
 */
export function createRebuildFlagHandler(
    host: NecessaryServices<"setting" | "appLifecycle" | "UI" | "tweakValue", "storageAccess" | "rebuilder">,
    log: LogFunction
) {
    // Check if rebuild flag is active
    const isFlagActive = async () =>
        (await isFlagFileExist(host, FlagFilesOriginal.REBUILD_ALL)) ||
        (await isFlagFileExist(host, FlagFilesHumanReadable.REBUILD_ALL));

    // Cleanup rebuild flag files
    const cleanupFlag = async () => {
        await deleteFlagFile(host, log, FlagFilesOriginal.REBUILD_ALL);
        await deleteFlagFile(host, log, FlagFilesHumanReadable.REBUILD_ALL);
    };

    // Handle the rebuild everything scheduled operation
    const onScheduled = async () => {
        const settings = host.services.setting.currentSettings();
        const confirmedAt = Number(await host.services.setting.config.getValue(REBUILD_CONFIRMED_KEY, "0"));
        await host.services.setting.config.delete(REBUILD_CONFIRMED_KEY);
        const method: RebuildEverythingResult | "cancelled" =
            Date.now() - confirmedAt < REBUILD_CONFIRMATION_MS
                ? { backup: TYPE_BACKUP_SKIPPED, extra: { preventFetchingConfig: false } }
                : await host.services.UI.dialogManager.openWithExplicitCancel<RebuildEverythingResult, { isP2P: boolean }>(
                      RebuildEverything,
                      { isP2P: isP2PMainRemote(settings) }
                  );
        if (method === "cancelled") {
            log($msg("RedFlag.Rebuild.Cancelled"), LOG_LEVEL_NOTICE);
            return await cancelScheduledInitialisation(host, cleanupFlag);
        }
        const { extra } = method;
        if (!(await adjustSettingToRemoteIfNeeded(host, log, extra, settings, "rebuild"))) {
            log($msg("RedFlag.Rebuild.InitialisationCancelled"), LOG_LEVEL_NOTICE);
            return await cancelScheduledInitialisation(host, cleanupFlag);
        }
        return await processVaultInitialisation(host, log, async () => {
            await host.serviceModules.rebuilder.$rebuildEverything();
            await cleanupFlag();
            log($msg("RedFlag.Rebuild.Completed"), LOG_LEVEL_NOTICE);
            return true;
        });
    };

    return {
        priority: 20,
        check: () => isFlagActive(),
        handle: async () => {
            const res = await onScheduled();
            if (res) {
                return await verifyAndUnlockSuspension(host, log);
            }
            return false;
        },
    };
}

/**
 * Factory function to create a suspend all flag handler.
 * All logic related to suspend flag is encapsulated here.
 */
export function createSuspendFlagHandler(
    host: NecessaryServices<"setting", "storageAccess">,
    log: LogFunction
): FlagFileHandler {
    // Check if suspend flag is active
    const isFlagActive = async () => await isFlagFileExist(host, FlagFilesOriginal.SUSPEND_ALL);

    // Handle the suspend all scheduled operation
    const onScheduled = async () => {
        log($msg("RedFlag.Suspend.Detected"), LOG_LEVEL_NOTICE);
        return await processVaultInitialisation(
            host,
            log,
            async () => {
                log($msg("RedFlag.Suspend.Suspended"), LOG_LEVEL_NOTICE);
                await host.services.setting.applyPartial({ writeLogToTheFile: true }, true);
                return Promise.resolve(false);
            },
            "keep"
        );
    };

    return {
        priority: 5,
        check: () => isFlagActive(),
        handle: () => onScheduled(),
    };
}

export function flagHandlerToEventHandler(flagHandler: FlagFileHandler) {
    return async () => {
        if (await flagHandler.check()) {
            return await flagHandler.handle();
        }
        return true;
    };
}

export function useRedFlagFeatures(
    host: NecessaryServices<
        | "API"
        | "appLifecycle"
        | "UI"
        | "setting"
        | "tweakValue"
        | "fileProcessing"
        | "vault"
        | "path"
        | "keyValueDB"
        | "database",
        "storageAccess" | "rebuilder" | "fileHandler"
    >
) {
    const log = createInstanceLogFunction("SF:RedFlag", host.services.API);
    const handlerFetch = createFetchAllFlagHandler(host, log);
    const handlerRebuild = createRebuildFlagHandler(host, log);
    const handlerSuspend = createSuspendFlagHandler(host, log);
    host.services.appLifecycle.onLayoutReady.addHandler(flagHandlerToEventHandler(handlerFetch), handlerFetch.priority);
    host.services.appLifecycle.onLayoutReady.addHandler(
        flagHandlerToEventHandler(handlerRebuild),
        handlerRebuild.priority
    );
    host.services.appLifecycle.onLayoutReady.addHandler(
        flagHandlerToEventHandler(handlerSuspend),
        handlerSuspend.priority
    );
}
