import type TabulariumPlugin from "@/main";
import type { PluginCore } from "@/main";
import { type TFile } from "@/deps.ts";
import { $msg } from "@/core/common/translation";
import { eventHub } from "@/core/common/events.ts";
import { EVENT_REQUEST_SHOW_HISTORY } from "@/obsidian/common/obsidianEvents.ts";
import type { FilePathWithPrefix, LoadedEntry, DocumentID } from "@tabularium/sync-core/compat/common/types";
import { DocumentHistoryModal } from "@/ui/DocumentHistory/DocumentHistoryModal.ts";
import { fireAndForget } from "octagonal-wheels/promises";

export class ModuleObsidianDocumentHistory {
    readonly plugin: TabulariumPlugin;
    readonly core: PluginCore;
    constructor(plugin: TabulariumPlugin, core: PluginCore) {
        this.plugin = plugin;
        this.core = core;
    }
    get app() {
        return this.plugin.app;
    }
    get services() {
        return this.core.services;
    }

    _everyOnloadStart(): Promise<boolean> {
        this.services.API.addCommand({
            id: "livesync-history",
            name: $msg("Show history"),
            callback: () => {
                const file = this.services.vault.getActiveFilePath();
                if (file) this.showHistory(file, undefined);
            },
        });

        this.services.API.addCommand({
            id: "livesync-filehistory",
            name: $msg("Pick a file to show history"),
            callback: () => {
                fireAndForget(async () => await this.fileHistory());
            },
        });
        eventHub.onEvent(
            EVENT_REQUEST_SHOW_HISTORY,
            ({ file, fileOnDB }: { file: TFile | FilePathWithPrefix; fileOnDB?: LoadedEntry }) => {
                this.showHistory(file, fileOnDB?._id);
            }
        );
        return Promise.resolve(true);
    }

    showHistory(file: TFile | FilePathWithPrefix, id?: DocumentID) {
        new DocumentHistoryModal(this.app, this.core, this.plugin, file, id).open();
    }

    async fileHistory() {
        const notes: { id: DocumentID; path: FilePathWithPrefix; dispPath: string; mtime: number }[] = [];
        for await (const doc of this.services.database.localDatabase.findAllDocs()) {
            notes.push({ id: doc._id, path: this.services.path.getPath(doc), dispPath: this.services.path.getPath(doc), mtime: doc.mtime });
        }
        notes.sort((a, b) => b.mtime - a.mtime);
        const notesList = notes.map((e) => e.dispPath);
        const target = await this.core.confirm.askSelectString($msg("File to view History"), notesList);
        if (target) {
            const targetId = notes.find((e) => e.dispPath == target)!;
            this.showHistory(targetId.path, targetId.id);
        }
    }
    install(): void {
        const core = this.core;
        const services = core.services;
        services.appLifecycle.onInitialise.addHandler(this._everyOnloadStart.bind(this));
    }
}

export function installDocumentHistory(plugin: TabulariumPlugin, core: PluginCore) {
    const component = new ModuleObsidianDocumentHistory(plugin, core);
    component.install();
    return component;
}
