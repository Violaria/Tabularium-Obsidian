import { initializeStores } from "@/obsidian/common/stores";

import type { ObsidianServiceContext } from "@/obsidian/services/ObsidianServiceContext";
import { DatabaseService, type DatabaseServiceDependencies } from "@tabularium/sync-core/compat/services/base/DatabaseService";

export class ObsidianDatabaseService<T extends ObsidianServiceContext> extends DatabaseService<T> {
    private __onOpenDatabase(vaultName: string) {
        initializeStores(vaultName);
        return Promise.resolve(true);
    }
    constructor(context: T, dependencies: DatabaseServiceDependencies) {
        super(context, dependencies);
        this.onOpenDatabase.addHandler(this.__onOpenDatabase.bind(this));
    }
}
