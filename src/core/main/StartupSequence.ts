import type { SyncCore } from "@/core/createCore";
import { createInstanceLogFunction } from "@tabularium/sync-core/compat/services/lib/logUtils";
import { fireAndForget } from "octagonal-wheels/promises";
import {
    LOG_LEVEL_NOTICE,
    LOG_LEVEL_VERBOSE,
    type SyncSettings,
} from "@tabularium/sync-core/compat/common/types";
import {
    EVENT_LAYOUT_READY,
    EVENT_PLUGIN_LOADED,
    EVENT_REQUEST_RELOAD_SETTING_TAB,
    EVENT_SETTING_SAVED,
    eventHub,
} from "@/core/common/events.ts";
import { $msg, setLang } from "@/core/common/translation";
import { initialiseWorkerModule } from "@tabularium/sync-core/compat/worker/bgWorker";
import { manifestVersion, packageVersion } from "@tabularium/sync-core/compat/common/coreEnvVars";
import { VaultScanResults } from "@tabularium/sync-core/compat/serviceFeatures/offlineScanner";

export class StartupSequence {
    readonly core: SyncCore;
    private readonly _log: ReturnType<typeof createInstanceLogFunction>;
    constructor(core: SyncCore) {
        this.core = core;
        this._log = createInstanceLogFunction("StartupSequence", core.services.API);
    }
    get services() {
        return this.core.services;
    }
    get settings() {
        return this.core.services.setting.settings;
    }

    async _onReady() {
        if (!(await this.core.services.appLifecycle.onLayoutReady())) return false;
        eventHub.emitEvent(EVENT_LAYOUT_READY);
        if (this.settings.suspendFileWatching || this.settings.suspendParseReplicationResult) {
            const ANSWER_KEEP = $msg("startupSequence.optionKeepSyncDisabled");
            const ANSWER_RESUME = $msg("startupSequence.optionResumeAndRestart");
            const message = $msg("startupSequence.msgScramEnabled", {
                fileWatchingStatus: this.settings.suspendFileWatching ? "suspended" : "active",
                parseReplicationStatus: this.settings.suspendParseReplicationResult ? "suspended" : "active",
            });
            if (
                (await this.core.confirm.askSelectStringDialogue(message, [ANSWER_KEEP, ANSWER_RESUME], {
                    defaultAction: ANSWER_KEEP,
                    title: $msg("startupSequence.titleScramEnabled"),
                })) == ANSWER_RESUME
            ) {
                this.settings.suspendFileWatching = false;
                this.settings.suspendParseReplicationResult = false;
                await this.services.setting.saveSettingData();
                this.services.appLifecycle.scheduleRestart();
                return false;
            }
        }
        // Ordinary start-up may continue when individual files could not be
        // processed. Explicit Fetch and Rebuild flows retain the strict default.
        const { ignoreSuspending = false, continueOnFileFailure = true } = this.core.startupDatabaseOptions;
        const initialisationResult = await this.services.databaseEvents.initialiseDatabase(
            false,
            false,
            ignoreSuspending,
            continueOnFileFailure
        );
        if (initialisationResult === VaultScanResults.FAILED) {
            this._log($msg("Ui.Common.LocalDatabaseInitialisationFailed"), LOG_LEVEL_NOTICE);
            //TODO:stop all sync.
            return false;
        }
        if (initialisationResult === VaultScanResults.COMPLETED_WITH_FILE_FAILURES) {
            this._log($msg("Ui.Common.SomeFilesCouldNotBeSynchronised"), LOG_LEVEL_NOTICE);
        }
        if (!(await this.core.services.appLifecycle.onFirstInitialise())) return false;
        // await this.core.$$realizeSettingSyncMode();
        await this.services.control.applySettings();
        fireAndForget(async () => {
            this._log($msg("startupSequence.logAdditionalSafetyScan"), LOG_LEVEL_VERBOSE);
            if (!(await this.services.appLifecycle.onScanningStartupIssues())) {
                this._log($msg("startupSequence.logSafetyScanFailed"), LOG_LEVEL_NOTICE);
            } else {
                this._log($msg("startupSequence.logSafetyScanCompleted"), LOG_LEVEL_VERBOSE);
            }
        });
        return true;
    }

    _wireUpEvents() {
        eventHub.onEvent(EVENT_SETTING_SAVED, (settings: SyncSettings) => {
            fireAndForget(async () => {
                try {
                    const lang = this.core.services.setting.currentSettings()?.displayLanguage;
                    if (lang !== undefined) {
                        setLang(lang);
                    }
                    if (this.core.services.database.isDatabaseReady()) {
                        await this.core.services.control.applySettings();
                    }
                    eventHub.emitEvent(EVENT_REQUEST_RELOAD_SETTING_TAB);
                } catch (e) {
                    this._log(`Error in Setting Save Event`, LOG_LEVEL_NOTICE);
                    this._log(e, LOG_LEVEL_VERBOSE);
                }
            });
        });
        return Promise.resolve(true);
    }

    async _onLoad(): Promise<boolean> {
        initialiseWorkerModule(this.services.context.events);
        await this.services.appLifecycle.onWireUpEvents();
        // debugger;
        eventHub.emitEvent(EVENT_PLUGIN_LOADED);
        this._log($msg("startupSequence.logLoadingPlugin"));
        if (!(await this.services.appLifecycle.onInitialise())) {
            this._log($msg("startupSequence.logPluginInitCancelled"), LOG_LEVEL_NOTICE);
            return false;
        }
        // this.addUIs();
        this._log($msg("startupSequence.logPluginVersion", { manifestVersion, packageVersion }));
        await this.services.setting.loadSettings();
        // The chosen display language applies before commands are registered (onSettingLoaded and onLoaded).
        setLang(this.services.setting.currentSettings().displayLanguage);
        if (!(await this.services.appLifecycle.onSettingLoaded())) {
            this._log($msg("startupSequence.logPluginInitCancelled"), LOG_LEVEL_NOTICE);
            return false;
        }
        await this.services.database.openDatabase({
            databaseEvents: this.services.databaseEvents,
            replicator: this.services.replicator,
        });
        // this.core.$$realizeSettingSyncMode = this.core.$$realizeSettingSyncMode.bind(this);
        // this.$$parseReplicationResult = this.$$parseReplicationResult.bind(this);
        // this.$$replicate = this.$$replicate.bind(this);
        await this.core.services.appLifecycle.onLoaded();
        return true;
    }

    // async _onUnload(): Promise<void> {
    //     eventHub.emitEvent(EVENT_PLUGIN_UNLOADED);
    //     await this.services.appLifecycle.onBeforeUnload();
    //     cancelAllPeriodicTask();
    //     cancelAllTasks();
    //     stopAllRunningProcessors();
    //     await this.services.appLifecycle.onUnload();
    //     this._unloaded = true;
    //     for (const addOn of this.core.addOns) {
    //         addOn.onunload();
    //     }
    //     if (this.services.database.localDatabase != null) {
    //         this.services.database.localDatabase.onunload();
    //         if (this.core.replicator) {
    //             this.core.replicator?.closeReplication();
    //         }
    //         await this.services.database.localDatabase.close();
    //     }
    //     eventHub.emitEvent(EVENT_PLATFORM_UNLOADED);
    //     eventHub.offAll();
    //     this._log($msg("startupSequence.logUnloadingPlugin"));
    //     return;
    // }

    // private async _realizeSettingSyncMode(): Promise<void> {
    //     await this.services.appLifecycle.onSuspending();
    //     await this.services.setting.onBeforeRealiseSetting();
    //     this.services.database.localDatabase.refreshSettings();
    //     await this.services.fileProcessing.commitPendingFileEvents();
    //     await this.services.setting.onRealiseSetting();
    //     // disable all sync temporary.
    //     if (this.services.appLifecycle.isSuspended()) return;
    //     await this.services.appLifecycle.onResuming();
    //     await this.services.appLifecycle.onResumed();
    //     await this.services.setting.onSettingRealised();
    //     return;
    // }

    // isReady = false;

    // _isReady(): boolean {
    //     return this.isReady;
    // }

    // _markIsReady(): void {
    //     this.isReady = true;
    // }

    // _resetIsReady(): void {
    //     this.isReady = false;
    // }

    // _suspended = false;
    // _isSuspended(): boolean {
    //     return this._suspended || !this.settings?.isConfigured;
    // }

    // _setSuspended(value: boolean) {
    //     this._suspended = value;
    // }

    // _unloaded = false;
    // _isUnloaded(): boolean {
    //     return this._unloaded;
    // }

    install(): void {
        const core = this.core;
        const services = core.services;
        // services.appLifecycle.isSuspended.setHandler(this._isSuspended.bind(this));
        // services.appLifecycle.setSuspended.setHandler(this._setSuspended.bind(this));
        // services.appLifecycle.isReady.setHandler(this._isReady.bind(this));
        // services.appLifecycle.markIsReady.setHandler(this._markIsReady.bind(this));
        // services.appLifecycle.resetIsReady.setHandler(this._resetIsReady.bind(this));
        // services.appLifecycle.hasUnloaded.setHandler(this._isUnloaded.bind(this));
        services.appLifecycle.onReady.addHandler(this._onReady.bind(this));
        services.appLifecycle.onWireUpEvents.addHandler(this._wireUpEvents.bind(this));
        services.appLifecycle.onLoad.addHandler(this._onLoad.bind(this));
    }
}

export function installMainLifecycle(core: SyncCore) {
    const component = new StartupSequence(core);
    component.install();
    return component;
}
