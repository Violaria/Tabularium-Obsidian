import type PouchDB from "pouchdb-core";
import {
    type HasSettings,
    type SyncSettings,
    type EntryDoc,
} from "@tabularium/sync-core/compat/common/types";
import type { Confirm } from "@tabularium/sync-core/compat/interfaces/Confirm";
import type { DatabaseFileAccess } from "@tabularium/sync-core/compat/interfaces/DatabaseFileAccess";
import type { Rebuilder } from "@tabularium/sync-core/compat/interfaces/DatabaseRebuilder";
import type { IFileHandler } from "@tabularium/sync-core/compat/interfaces/FileHandler";
import type { StorageAccess } from "@tabularium/sync-core/compat/interfaces/StorageAccess";
import type { LocalDatabaseEnv } from "@tabularium/sync-core/compat/pouchdb/LocalDatabase";
import type { CouchDBReplicatorEnv } from "@tabularium/sync-core/compat/replication/couchdb/CouchDBReplicator";
import type { AbstractReplicator } from "@tabularium/sync-core/compat/replication/AbstractReplicator";
import type { ReplicatorInstance } from "@tabularium/sync-core/replication";
import { useTargetFilters } from "@tabularium/sync-core/compat/serviceFeatures/targetFilter";
import { useRemoteConfigurationMigration } from "@tabularium/sync-core/compat/serviceFeatures/remoteConfig";
import type { ServiceContext } from "@tabularium/sync-core/context";
import type { InjectableServiceHub } from "@tabularium/sync-core/compat/services/implements/injectable/InjectableServiceHub";
import { installTweakResolution } from "./coreFeatures/ModuleResolveMismatchedTweaks";
import { installMainLifecycle } from "./main/StartupSequence";
import type { ServiceModules } from "@tabularium/sync-core/compat/interfaces/ServiceModule";
import { usePrepareDatabaseForUse } from "@tabularium/sync-core/compat/serviceFeatures/prepareDatabaseForUse";
import { useReplicationScheduling, type ReplicationSchedulingControl } from "./serviceFeatures/replicationScheduling";
import { createCentralReplicatorProviderDefinitions } from "./common/replicatorProviders";
import { useReplicationFeature } from "./serviceFeatures/replication";
import { useConflictResolutionFeature } from "./serviceFeatures/conflictResolution";
import { useBasicCommandsFeature } from "./serviceFeatures/basicCommands";

/** Focused views returned by serviceFeatures which the host may consume during composition. */
export interface CoreFeatureViews {
    readonly replicationScheduling: ReplicationSchedulingControl;
}

export interface StartupDatabaseOptions {
    readonly ignoreSuspending?: boolean;
    readonly continueOnFileFailure?: boolean;
}

type CompatibilityReplicatorView = ReplicatorInstance & Partial<AbstractReplicator>;

/** What an entry point gives `createCore`: its service hub, service modules, features and components. */
export interface CoreOptions<T extends ServiceContext> {
    readonly hub: InjectableServiceHub<T>;
    /** The platform's storage, file and database access. */
    readonly serviceModules: (core: SyncCore<T>, hub: InjectableServiceHub<T>) => ServiceModules;
    /** Platform features, registered after the core's own and before replication. */
    readonly features?: (core: SyncCore<T>, views: CoreFeatureViews) => void;
    /** Platform components, registered last: after replication, basic commands and the start-up sequence. */
    readonly components?: (core: SyncCore<T>) => void;
    readonly startupDatabaseOptions?: StartupDatabaseOptions;
}

/**
 * Assembles the sync core for the plug-in, web notes and the CLI. The order is fixed, as lifecycle handlers run in the
 * order they are registered: replicator providers, service modules, the core's features, the platform's features,
 * replication and basic commands, the start-up sequence and tweak resolution, then the platform's components.
 */
export function createCore<T extends ServiceContext>(options: CoreOptions<T>): SyncCore<T> {
    const core = new SyncCore(options.hub, options.startupDatabaseOptions);
    core.services.replicator.registerReplicatorProviderDefinitions(createCentralReplicatorProviderDefinitions(core));
    core.setServiceModules(options.serviceModules(core, options.hub));
    useConflictResolutionFeature(core);
    useTargetFilters(core);
    usePrepareDatabaseForUse(core);
    useRemoteConfigurationMigration(core);
    const views: CoreFeatureViews = Object.freeze({ replicationScheduling: useReplicationScheduling(core) });
    options.features?.(core, views);
    useReplicationFeature(core);
    useBasicCommandsFeature(core);
    installMainLifecycle(core);
    installTweakResolution(core);
    options.components?.(core);
    return core;
}

/** The assembled sync core: its services and service modules. Made by `createCore`. */
export class SyncCore<T extends ServiceContext = ServiceContext>
    implements LocalDatabaseEnv, CouchDBReplicatorEnv, HasSettings<SyncSettings>
{
    constructor(
        readonly services: InjectableServiceHub<T>,
        readonly startupDatabaseOptions: StartupDatabaseOptions = {}
    ) {}

    private _serviceModules?: ServiceModules;

    get serviceModules(): ServiceModules {
        if (!this._serviceModules) throw new Error("Service modules are not ready yet");
        return this._serviceModules;
    }

    setServiceModules(modules: ServiceModules) {
        this._serviceModules = modules;
    }

    /**
     * @obsolete Use services.UI.confirm instead. The confirm function to show a confirmation dialog to the user.
     */
    get confirm(): Confirm {
        return this.services.UI.confirm;
    }

    /**
     * @obsolete Use services.setting.currentSettings instead. The current settings of the plug-in.
     */
    get settings() {
        return this.services.setting.settings;
    }

    /**
     * @obsolete Use services.setting.settings instead. Set the settings of the plug-in.
     */
    set settings(value: SyncSettings) {
        this.services.setting.settings = value;
    }

    /**
     * @obsolete Use services.setting.currentSettings instead. Get the settings of the plug-in.
     * @returns The current settings of the plug-in.
     */
    getSettings(): SyncSettings {
        return this.settings;
    }

    /**
     * @obsolete Use services.database.localDatabase instead. The local database instance.
     */
    get localDatabase() {
        return this.services.database.localDatabase;
    }

    /**
     * @obsolete Use services.database.localDatabase instead. Get the PouchDB database instance. Note that this is not the same as the local database instance, which is a wrapper around the PouchDB database.
     * @returns The PouchDB database instance.
     */
    getDatabase(): PouchDB.Database<EntryDoc> {
        return this.localDatabase.localDatabase;
    }

    /**
     * @obsolete Use the provider context or a focused service operation instead.
     * Provider-specific members on this compatibility view are optional.
     */
    get replicator(): CompatibilityReplicatorView {
        return this.services.replicator.getActiveReplicator() as CompatibilityReplicatorView;
    }

    /**
     * @obsolete Use services.keyValueDB.kvDB instead. Get the key-value database instance. This is used for storing large data that cannot be stored in the simple store, such as file metadata, etc.
     */
    get kvDB() {
        return this.services.keyValueDB.kvDB;
    }

    /// Modules which were relied on services
    /**
     * Storage Accessor for handling file operations.
     * @obsolete Use serviceModules.storageAccess instead.
     */
    get storageAccess(): StorageAccess {
        return this.serviceModules.storageAccess;
    }
    /**
     * Database File Accessor for handling file operations related to the database, such as exporting the database, importing from a file, etc.
     * @obsolete Use serviceModules.databaseFileAccess instead.
     */
    get databaseFileAccess(): DatabaseFileAccess {
        return this.serviceModules.databaseFileAccess;
    }
    /**
     * File Handler for handling file operations related to replication, such as resolving conflicts, applying changes from replication, etc.
     * @obsolete Use serviceModules.fileHandler instead.
     */
    get fileHandler(): IFileHandler {
        return this.serviceModules.fileHandler;
    }
    /**
     * Rebuilder for handling database rebuilding operations.
     * @obsolete Use serviceModules.rebuilder instead.
     */
    get rebuilder(): Rebuilder {
        return this.serviceModules.rebuilder;
    }
}
