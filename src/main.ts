import { LOG_LEVEL_URGENT } from "octagonal-wheels/common/logger";
import { getLanguage, Notice, Plugin, type App, type PluginManifest } from "./deps";
import { setGetLanguage } from "@vrtmrz/livesync-commonlib/compat/common/coreEnvFunctions";
setGetLanguage(getLanguage);
import { LiveSyncCommands } from "./features/LiveSyncCommands.ts";
// import { ModuleDev } from "./modules/extras/ModuleDev.ts";

import { ModuleLog } from "./modules/features/ModuleLog.ts";
import { ModuleObsidianEvents } from "./modules/essentialObsidian/ModuleObsidianEvents.ts";
import { ModuleObsidianSettingDialogue } from "./modules/features/ModuleObsidianSettingTab.ts";
import { ModuleObsidianDocumentHistory } from "./modules/features/ModuleObsidianDocumentHistory.ts";
import { ModuleObsidianGlobalHistory } from "./modules/features/ModuleGlobalHistory.ts";
import type { InjectableServiceHub } from "@vrtmrz/livesync-commonlib/compat/services/implements/injectable/InjectableServiceHub";
import { ObsidianServiceHub } from "./modules/services/ObsidianServiceHub.ts";
import { ServiceRebuilder } from "@vrtmrz/livesync-commonlib/compat/serviceModules/Rebuilder";
import { ServiceDatabaseFileAccess } from "@/serviceModules/DatabaseFileAccess.ts";
import { ServiceFileAccessObsidian } from "@/serviceModules/ServiceFileAccessImpl.ts";
import { StorageAccessManager } from "@vrtmrz/livesync-commonlib/compat/managers/StorageProcessingManager";
import { ServiceFileHandler } from "./serviceModules/FileHandler.ts";
import { FileAccessObsidian } from "./serviceModules/FileAccessObsidian.ts";
import { StorageEventManagerObsidian } from "./managers/StorageEventManagerObsidian.ts";
import type { ServiceModules } from "./types.ts";
import { setNoticeClass } from "@vrtmrz/livesync-commonlib/compat/mock_and_interop/wrapper";
import type { ObsidianServiceContext } from "@/modules/services/ObsidianServiceContext";
import { LiveSyncBaseCore } from "./LiveSyncBaseCore.ts";
import { SetupManager } from "./modules/features/SetupManager.ts";
import { enableI18nFeature } from "./serviceFeatures/onLayoutReady/enablei18n.ts";
import { useOfflineScanner } from "@vrtmrz/livesync-commonlib/compat/serviceFeatures/offlineScanner";
import { useRedFlagFeatures } from "./serviceFeatures/redFlag.ts";
import { useCompatibilityReview } from "./serviceFeatures/compatibilityReview.ts";
import { createObsidianCompatibilityReviewUi } from "./serviceFeatures/compatibilityReviewObsidian.ts";
import { createFileReflectionProvenance } from "./serviceModules/FileReflectionProvenance.ts";
import { useInteractiveConflictResolutionFeature } from "./serviceFeatures/interactiveConflictResolution";
import { ConflictResolveModal } from "./modules/features/InteractiveConflictResolving/ConflictResolveModal.ts";
import { useObsidianReplicationRibbonFeature } from "./serviceFeatures/obsidianReplicationRibbon.ts";
import { useStartupLifecycleFeature } from "./serviceFeatures/startupLifecycle";
import { useJoinedDevicesFeature } from "./serviceFeatures/useJoinedDevices";
import type { ObsidianNoticeGroups } from "@/modules/services/ObsidianNoticeGroups";
import { useDatabaseDiagnosticsFeature } from "./serviceFeatures/useDatabaseDiagnostics";
import { installTabulariumServer, type TabulariumServer } from "./features/tabularium/ServerLogin.ts";
import { installKindle, type TabulariumKindle } from "./features/tabularium/Kindle.ts";
import { installCustomSorting, type TabulariumCustomSorting } from "./features/tabularium/CustomSorting.ts";
import { installShare, type TabulariumShare } from "./features/tabularium/Share.ts";
import { installSyncMenu } from "./features/tabularium/SyncMenu.ts";
import { installLinkRepair, type TabulariumLinkRepair } from "./features/tabularium/LinkRepair.ts";
import { installEditorMenus, type TabulariumEditorMenus } from "./features/tabularium/EditorMenus.ts";
export type LiveSyncCore = LiveSyncBaseCore<ObsidianServiceContext, LiveSyncCommands>;
export default class ObsidianLiveSyncPlugin extends Plugin {
    core: LiveSyncCore;
    sorting?: TabulariumCustomSorting;
    tabularium?: TabulariumServer;
    kindle?: TabulariumKindle;
    share?: TabulariumShare;
    linkRepair?: TabulariumLinkRepair;
    editorMenus?: TabulariumEditorMenus;

    /**
     * Initialise service modules.
     */
    private initialiseServiceModules(
        core: LiveSyncBaseCore<ObsidianServiceContext, LiveSyncCommands>,
        services: InjectableServiceHub<ObsidianServiceContext>
    ): ServiceModules {
        const storageAccessManager = new StorageAccessManager();
        // If we want to implement to the other platform, implement ObsidianXXXXXService.
        const vaultAccess = new FileAccessObsidian(this.app, {
            storageAccessManager: storageAccessManager,
            vaultService: services.vault,
            settingService: services.setting,
            APIService: services.API,
            pathService: services.path,
        });
        const storageEventManager = new StorageEventManagerObsidian(this, core, {
            fileProcessing: services.fileProcessing,
            setting: services.setting,
            vaultService: services.vault,
            storageAccessManager: storageAccessManager,
            APIService: services.API,
        });
        const storageAccess = new ServiceFileAccessObsidian({
            API: services.API,
            setting: services.setting,
            fileProcessing: services.fileProcessing,
            vault: services.vault,
            appLifecycle: services.appLifecycle,
            storageEventManager: storageEventManager,
            storageAccessManager: storageAccessManager,
            vaultAccess: vaultAccess,
        });

        const databaseFileAccess = new ServiceDatabaseFileAccess({
            events: services.context.events,
            API: services.API,
            database: services.database,
            path: services.path,
            storageAccess: storageAccess,
            vault: services.vault,
        });

        const fileHandler = new ServiceFileHandler({
            events: services.context.events,
            API: services.API,
            databaseFileAccess: databaseFileAccess,
            conflict: services.conflict,
            setting: services.setting,
            fileProcessing: services.fileProcessing,
            vault: services.vault,
            path: services.path,
            replication: services.replication,
            storageAccess: storageAccess,
            fileReflectionProvenance: createFileReflectionProvenance(services.keyValueDB),
        });
        const rebuilder = new ServiceRebuilder({
            path: services.path,
            events: services.context.events,
            API: services.API,
            database: services.database,
            appLifecycle: services.appLifecycle,
            setting: services.setting,
            remote: services.remote,
            databaseEvents: services.databaseEvents,
            replication: services.replication,
            replicator: services.replicator,
            UI: services.UI,
            vault: services.vault,
            fileHandler: fileHandler,
            fileProcessing: services.fileProcessing,
            storageAccess: storageAccess,
            control: services.control,
        });
        return {
            rebuilder,
            fileHandler,
            databaseFileAccess,
            storageAccess,
        };
    }

    /**
     * @obsolete Use services.setting.saveSettingData instead. Save the settings to the disk. This is usually called after changing the settings in the code, to persist the changes.
     */
    async saveSettings() {
        await this.core.services.setting.saveSettingData();
    }

    constructor(app: App, manifest: PluginManifest) {
        super(app, manifest);
        // Maybe no more need to setNoticeClass, but for safety, set it in the constructor of the main plugin class.
        // TODO: remove this.
        setNoticeClass(Notice);

        const serviceHub = new ObsidianServiceHub(this);

        this.core = new LiveSyncBaseCore(
            serviceHub,
            (core, serviceHub) => {
                return this.initialiseServiceModules(core, serviceHub);
            },
            (core) => {
                const extraModules = [
                    new ModuleObsidianEvents(this, core),
                    new ModuleObsidianSettingDialogue(this, core),
                    new ModuleLog(this, core),
                    new ModuleObsidianDocumentHistory(this, core),
                    new ModuleObsidianGlobalHistory(this, core),
                    // new ModuleDev(this, core),
                    new SetupManager(core), // this should be moved to core?
                ];
                return extraModules;
            },
            (core) => {
                // Hidden-file and customisation sync are off on a Tabularium connection, so their add-ons are not loaded.
                return [];
            },
            (core) => {
                //TODO Fix: useXXXX
                const featuresInitialiser = enableI18nFeature;
                const curriedFeature = () => featuresInitialiser(core);
                core.services.appLifecycle.onLayoutReady.addHandler(curriedFeature);
                const setupManager = core.getModule(SetupManager);
                this.tabularium = installTabulariumServer(this, core, setupManager);
                this.kindle = installKindle(this, this.tabularium, core);
                this.share = installShare(this, this.tabularium, core, () => this.sorting);
                this.linkRepair = installLinkRepair(this, core);
                this.editorMenus = installEditorMenus(this, core);
                useObsidianReplicationRibbonFeature(core);
                useDatabaseDiagnosticsFeature(core);
                // A vault's devices run different software (this plug-in, the server mirror's CLI, Tabularius, web notes), so
                // comparing their version numbers only produces misleading notices; the device list stays available.
                const noVersionNotices: ObsidianNoticeGroups = {
                    setItem: () => {}, finish: () => false, removeItem: () => false, hide: () => false, dispose: () => {},
                };
                useJoinedDevicesFeature(core, noVersionNotices);
                // Only the Tabularium login connects: no saved-connection switching, setup URIs, QR codes or onboarding.
                useOfflineScanner(core);
                useRedFlagFeatures(core);
                useInteractiveConflictResolutionFeature(core, (filename, conflictCheckResult) => {
                    return new ConflictResolveModal(this.app, filename, conflictCheckResult);
                });
                const compatibilityReview = useCompatibilityReview(
                    core,
                    createObsidianCompatibilityReviewUi(core.confirm)
                );
                useStartupLifecycleFeature(core, {
                    // Not connected: point to the Tabularium login instead of the upstream onboarding wizard.
                    inviteToOnboarding: () => this.tabularium!.invite(),
                    waitForCompatibilityReview: () => compatibilityReview.openReview(),
                });
            }
        );
    }

    private async _startUp() {
        if (!(await this.core.services.control.onLoad())) return;
        const onReady = this.core.services.control.onReady.bind(this.core.services.control);
        this.app.workspace.onLayoutReady(onReady);
    }
    override onload() {
        // Before the sorting component, so "Sync" comes right above its submenu in the file menu.
        installSyncMenu(this, this.core, () => !!this.tabularium?.connection);
        this.sorting = installCustomSorting(this, this.core);
        void this._startUp();
    }
    override onunload(): void {
        void this.core.services.control.onUnload().catch((error) => {
            this.core.services.API.addLog(
                "Failed to unload Tabularium: " + String(error),
                LOG_LEVEL_URGENT,
                "shutdown"
            );
        });
    }
}
