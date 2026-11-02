import { InjectableServiceHub } from "@tabularium/sync-core/compat/services/implements/injectable/InjectableServiceHub";
import { compatGlobal } from "@tabularium/sync-core/compat/common/coreEnvFunctions";
import { createWebStorageValueStore } from "@vrtmrz/value-store/web-storage";
import { ObsidianServiceContext } from "@/obsidian/services/ObsidianServiceContext";
import type { ServiceInstances } from "@tabularium/sync-core/compat/services/ServiceHub";
import type TabulariumPlugin from "@/main";
import { ObsidianKeyValueDBService, ObsidianReplicatorService } from "./ObsidianServices";
import { InjectableConflictService } from "@tabularium/sync-core/compat/services/implements/injectable/InjectableConflictService";
import { InjectableDatabaseEventService } from "@tabularium/sync-core/compat/services/implements/injectable/InjectableDatabaseEventService";
import { InjectableFileProcessingService } from "@tabularium/sync-core/compat/services/implements/injectable/InjectableFileProcessingService";
import { InjectableRemoteService } from "@tabularium/sync-core/compat/services/implements/injectable/InjectableRemoteService";
import { InjectableReplicationService } from "@tabularium/sync-core/compat/services/implements/injectable/InjectableReplicationService";
import { InjectableTestService } from "@tabularium/sync-core/compat/services/implements/injectable/InjectableTestService";
import { InjectableTweakValueService } from "@tabularium/sync-core/compat/services/implements/injectable/InjectableTweakValueService";
import { ControlService } from "@tabularium/sync-core/compat/services/base/ControlService";
import { ObsidianSettingService } from "./ObsidianSettingService";
import { ObsidianDatabaseService } from "./ObsidianDatabaseService";
import { ObsidianAPIService } from "./ObsidianAPIService";
import { ObsidianAppLifecycleService } from "./ObsidianAppLifecycleService";
import { ObsidianPathService } from "./ObsidianPathService";
import { ObsidianVaultService } from "./ObsidianVaultService";
import { ObsidianUIService } from "./ObsidianUIService";
import { createScreenWakeLockManager } from "octagonal-wheels/browser/wakeLock";
import { PouchDB } from "@tabularium/sync-core/compat/pouchdb/pouchdb-browser";
import { OpenKeyValueDatabase } from "@/obsidian/common/KeyValueDB";
import { ObsidianNoticeGroupManager } from "./ObsidianNoticeGroups";
import { KeyedNoticeManager } from "@vrtmrz/obsidian-plugin-kit/notice";
import { setLang } from "@/core/common/translation";
import { DEVICE_VALUE_PREFIX } from "@/features/tabularium/ownNames";

// InjectableServiceHub

export class ObsidianServiceHub extends InjectableServiceHub<ObsidianServiceContext> {
    constructor(plugin: TabulariumPlugin) {
        const notices = new KeyedNoticeManager();
        const noticeGroups = new ObsidianNoticeGroupManager();
        const context = new ObsidianServiceContext(plugin.app, plugin, plugin, notices, noticeGroups);

        const API = new ObsidianAPIService(context);
        const conflict = new InjectableConflictService<ObsidianServiceContext>(context);
        const fileProcessing = new InjectableFileProcessingService<ObsidianServiceContext>(context);

        const tweakValue = new InjectableTweakValueService<ObsidianServiceContext>(context);

        const setting = new ObsidianSettingService(context, {
            APIService: API,
            onDisplayLanguageChanged: setLang,
            deviceValues: createWebStorageValueStore(compatGlobal.localStorage, { prefix: DEVICE_VALUE_PREFIX }),
        });
        const appLifecycle = new ObsidianAppLifecycleService(context, {
            settingService: setting,
        });
        const remote = new InjectableRemoteService<ObsidianServiceContext>(context, {
            pouchDB: PouchDB,
            APIService: API,
            appLifecycle: appLifecycle,
            setting: setting,
        });
        const vault = new ObsidianVaultService(context, {
            settingService: setting,
            APIService: API,
        });
        const test = new InjectableTestService<ObsidianServiceContext>(context);
        const databaseEvents = new InjectableDatabaseEventService<ObsidianServiceContext>(context);
        const path = new ObsidianPathService(context, {
            settingService: setting,
        });
        const screenWakeLock = createScreenWakeLockManager();
        appLifecycle.onUnload.addHandler(async () => {
            await screenWakeLock.dispose();
            notices.dispose();
            noticeGroups.dispose();
            return true;
        });
        const database = new ObsidianDatabaseService(context, {
            pouchDB: PouchDB,
            path: path,
            vault: vault,
            setting: setting,
            API: API,
        });
        const keyValueDB = new ObsidianKeyValueDBService(context, {
            openKeyValueDatabase: OpenKeyValueDatabase,
            appLifecycle: appLifecycle,
            databaseEvents: databaseEvents,
            vault: vault,
        });
        const config = setting.config;
        const replicator = new ObsidianReplicatorService(context, {
            settingService: setting,
            appLifecycleService: appLifecycle,
            databaseEventService: databaseEvents,
            activityRunner: screenWakeLock,
            isMobile: () => API.isMobile(),
        });
        const replication = new InjectableReplicationService<ObsidianServiceContext>(context, {
            APIService: API,
            appLifecycleService: appLifecycle,
            replicatorService: replicator,
            settingService: setting,
            fileProcessingService: fileProcessing,
            databaseService: database,
        });

        const control = new ControlService<ObsidianServiceContext>(context, {
            appLifecycleService: appLifecycle,
            databaseService: database,
            fileProcessingService: fileProcessing,
            settingService: setting,
            APIService: API,
            replicatorService: replicator,
        });
        const ui = new ObsidianUIService(context, {
            appLifecycle,
            config,
            replicator,
            APIService: API,
            control: control,
        });
        // Using 'satisfies' to ensure all services are provided
        const serviceInstancesToInit = {
            appLifecycle: appLifecycle,
            conflict: conflict,
            database: database,
            databaseEvents: databaseEvents,
            fileProcessing: fileProcessing,
            replication: replication,
            replicator: replicator,
            remote: remote,
            setting: setting,
            tweakValue: tweakValue,
            vault: vault,
            test: test,
            ui: ui,
            path: path,
            API: API,
            config: config,
            keyValueDB: keyValueDB,
            control: control,
        } satisfies Required<ServiceInstances<ObsidianServiceContext>>;

        super(context, serviceInstancesToInit);
    }
}
