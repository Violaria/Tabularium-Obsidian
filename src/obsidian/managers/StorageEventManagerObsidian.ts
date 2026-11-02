import type { FilePath } from "@tabularium/sync-core/compat/common/types";
import type TabulariumPlugin from "@/main";
import type { PluginCore } from "@/main";
import { StorageEventManagerBase, type StorageEventManagerBaseDependencies } from "@tabularium/sync-core/compat/managers/StorageEventManager";
import { ObsidianStorageEventManagerAdapter } from "./ObsidianStorageEventManagerAdapter";

export class StorageEventManagerObsidian extends StorageEventManagerBase<ObsidianStorageEventManagerAdapter> {
    core: PluginCore;

    // Necessary evil.
    // cmdHiddenFileSync: HiddenFileSync;

    constructor(plugin: TabulariumPlugin, core: PluginCore, dependencies: StorageEventManagerBaseDependencies) {
        const adapter = new ObsidianStorageEventManagerAdapter(plugin, core, dependencies.fileProcessing);
        super(adapter, dependencies);
        this.core = core;
    }

    /**
     * Override _watchVaultRawEvents to add Obsidian-specific logic
     */
    protected override async _watchVaultRawEvents(path: FilePath) {
        if (!this.settings.syncInternalFiles && !this.settings.usePluginSync) return;
        if (!this.settings.watchInternalFileChanges) return;
        if (!path.startsWith(this.core.services.API.getSystemConfigDir())) return;
        if (path.endsWith("/")) {
            // Folder
            return;
        }
        const isTargetFile = await this.vaultService.isTargetFileInExtra(path);
        if (!isTargetFile) return;

        void this.appendQueue(
            [
                {
                    type: "INTERNAL",
                    file: this.adapter.converter.toInternalFileInfo(path),
                    skipBatchWait: true, // Internal files should be processed immediately.
                },
            ],
            null
        );
    }
}
