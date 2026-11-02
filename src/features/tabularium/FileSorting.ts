// File sorting in Obsidian's file list from the lists in Collation.md (see common/fileOrder.ts). The file list's own
// order (the sort the user chose in Obsidian) is kept for everything the rules do not list.
import { Component, normalizePath, Notice, TFile, TFolder, type Plugin, type SettingDefinition, type TAbstractFile } from "obsidian";
import { $msg } from "@/common/translation";
import type { LiveSyncCore } from "@/main";
import {
    arrange,
    bodyOf,
    convertFrontMatter,
    defaultOrder,
    FORMER_RULES_FILE,
    isRulesNote,
    namesOf,
    orderFor,
    parseOrder,
    RULES_FILE,
    type FileOrder,
} from "@/common/fileOrder";
import { confirmAction } from "./Confirm";
import { settingRow } from "./hint";
import { EVENT_REQUEST_RELOAD_SETTING_TAB, eventHub } from "@/common/events.ts";

declare module "obsidian" {
    interface App {
        /** Obsidian's plug-in manager; not in the published API. */
        plugins: { enabledPlugins: Set<string> };
    }
}

/** The standalone Custom File Explorer sorting plug-in. While it is enabled in the vault, it sorts and this component steps aside. */
export const STANDALONE_SORTING_ID = "custom-sort";

interface SortingSettings {
    suspended: boolean;
    statusBar: boolean;
}
const DEFAULT_SETTINGS: SortingSettings = { suspended: false, statusBar: true };

/** The parts of Obsidian's file list this component uses; they are not in Obsidian's published API. */
interface FileListItem {
    file: TAbstractFile;
}
interface FileListView {
    getSortedFolderItems: (this: FileListView, folder: TFolder, ...rest: unknown[]) => FileListItem[];
    requestSort(): void;
}

const folderPath = (folder: TFolder) => (folder.isRoot() ? "" : folder.path);
const isRules = (path: string) => isRulesNote(path) || isRulesNote(path, FORMER_RULES_FILE);
const folderOf = (path: string) => (path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : "");

export class TabulariumSorting extends Component {
    settings: SortingSettings = { ...DEFAULT_SETTINGS };
    /** Set once the standalone plug-in was found enabled; the component stays unloaded until Tabularium loads again. */
    steppedAside = false;
    /** The rules notes, parsed; refreshed when one of them changes. */
    private orders: { folder: string; order: FileOrder }[] = [];
    /** Rules notes under the former name (sortspec.md) where the folder has no Collation.md: not read, offered for conversion. */
    formerRules: string[] = [];
    private statusBarItem?: HTMLElement;
    private patched?: { active: boolean };

    constructor(private readonly plugin: Plugin) {
        super();
    }

    private get app() {
        return this.plugin.app;
    }
    private get settingsFile() {
        return normalizePath(`${this.plugin.manifest.dir}/sorting.json`);
    }

    override onload() {
        void this.start();
    }

    private async start() {
        await this.loadSettings();
        await this.readRules();
        const reread = (file: TAbstractFile) => {
            if (isRules(file.path)) void this.readRules().then(() => this.refresh());
        };
        this.registerEvent(this.app.vault.on("modify", reread));
        this.registerEvent(this.app.vault.on("create", reread));
        this.registerEvent(this.app.vault.on("delete", reread));
        this.registerEvent(
            this.app.vault.on("rename", (file, oldPath) => {
                if (isRules(file.path) || isRules(oldPath)) void this.readRules().then(() => this.refresh());
            })
        );
        // The file list may be created later, or deferred until it is shown.
        this.registerEvent(this.app.workspace.on("layout-change", () => this.takeOver()));
        this.app.workspace.onLayoutReady(() => this.takeOver());
        if (this.settings.statusBar) this.showStatusBar();
    }

    private async loadSettings() {
        const adapter = this.app.vault.adapter;
        if (await adapter.exists(this.settingsFile))
            this.settings = { ...DEFAULT_SETTINGS, ...(JSON.parse(await adapter.read(this.settingsFile)) as Partial<SortingSettings>) };
    }

    async saveSettings() {
        await this.app.vault.adapter.write(this.settingsFile, JSON.stringify(this.settings, null, 2));
    }

    private async readRules() {
        const notes = this.app.vault.getMarkdownFiles().filter((file) => isRulesNote(file.path));
        const texts = await Promise.all(notes.map(async (file) => ({ path: file.path, text: await this.app.vault.cachedRead(file) })));
        this.orders = texts.map((note) => ({ folder: folderOf(note.path), order: parseOrder(note.text, folderOf(note.path)) }));
        const current = new Set(notes.map((file) => folderOf(file.path)));
        const former = this.app.vault
            .getMarkdownFiles()
            .filter((file) => isRulesNote(file.path, FORMER_RULES_FILE) && !current.has(folderOf(file.path)))
            .map((file) => file.path);
        // The settings page offers a conversion for each of them.
        if (former.join("\n") !== this.formerRules.join("\n")) {
            this.formerRules = former;
            eventHub.emitEvent(EVENT_REQUEST_RELOAD_SETTING_TAB);
        }
    }

    private fileList(): FileListView | undefined {
        const leaf = this.app.workspace.getLeavesOfType("file-explorer")[0];
        const view = leaf?.view as unknown as Partial<FileListView> | undefined;
        if (!view || leaf.isDeferred) return undefined;
        return typeof view.getSortedFolderItems === "function" && typeof view.requestSort === "function" ? (view as FileListView) : undefined;
    }

    /**
     * Wraps the file list's method that orders a folder. The wrapper only rearranges what Obsidian ordered. Released, it
     * restores the method, or, when another plug-in wrapped it since, stays in place and passes everything through.
     */
    private takeOver() {
        if (this.patched || this.standaloneEnabled()) return;
        const view = this.fileList();
        if (!view) return;
        const prototype = Object.getPrototypeOf(view) as FileListView;
        const original = prototype.getSortedFolderItems;
        const state = { active: true };
        const rearrange = (folder: TFolder, items: FileListItem[]) =>
            !state.active || this.settings.suspended
                ? items
                : arrange(items, orderFor(this.orders, folderPath(folder)), (item) => namesOf(item.file.name, item.file instanceof TFolder));
        const wrapped = function (this: FileListView, folder: TFolder, ...rest: unknown[]) {
            return rearrange(folder, original.call(this, folder, ...rest));
        };
        prototype.getSortedFolderItems = wrapped;
        this.patched = state;
        this.register(() => {
            state.active = false;
            if (prototype.getSortedFolderItems === wrapped) prototype.getSortedFolderItems = original;
            this.patched = undefined;
            // Back to the file list's own order.
            this.fileList()?.requestSort();
        });
        this.refresh();
    }

    private standaloneEnabled() {
        return this.app.plugins.enabledPlugins.has(STANDALONE_SORTING_ID);
    }

    /** Sorts the file list again, unless the standalone plug-in has been enabled meanwhile: then this component steps aside. */
    refresh() {
        if (this.standaloneEnabled()) {
            this.steppedAside = true;
            this.stepAside();
            return;
        }
        this.fileList()?.requestSort();
        this.updateStatusBar();
    }

    /** Replaced by installFileSorting: unloads this component, which removes its wrapper and status bar entry. */
    stepAside() {}

    async setSuspended(suspended: boolean) {
        this.settings.suspended = suspended;
        await this.saveSettings();
        if (!suspended) await this.readRules();
        this.refresh();
    }

    /** A folder's items in the order the file list shows them, for shares: by name, folders first, then the rules. */
    ordered(folder: TFolder): TAbstractFile[] {
        const items = defaultOrder(folder.children, (item) => item.name, (item) => item instanceof TFolder);
        if (this.settings.suspended) return items;
        return arrange(items, orderFor(this.orders, folderPath(folder)), (item) => namesOf(item.name, item instanceof TFolder));
    }

    private showStatusBar() {
        this.statusBarItem = this.plugin.addStatusBarItem();
        this.register(() => this.statusBarItem?.detach());
        this.updateStatusBar();
    }

    /** Also called when the display language changes. */
    updateStatusBar() {
        this.statusBarItem?.setText($msg(this.settings.suspended ? "tabularium.sorting.statusOff" : "tabularium.sorting.statusOn"));
    }

    /**
     * Converts a rules note under the former name, after showing the result: front-matter rules become the list at its
     * start, and the note is renamed to Collation.md (links to it follow). A note already holding the list is only renamed.
     */
    async convert(path: string) {
        const file = this.app.vault.getFileByPath(path);
        if (!file) return;
        const folder = folderOf(path);
        const target = folder ? `${folder}/${RULES_FILE}` : RULES_FILE;
        const childrenOf = (folderPath: string) => {
            const at = folderPath ? this.app.vault.getFolderByPath(folderPath) : this.app.vault.getRoot();
            return at ? this.ordered(at).map((item) => (item instanceof TFile && item.extension === "md" ? item.basename : item.name)) : [];
        };
        const text = await this.app.vault.read(file);
        const result = parseOrder(text, folder).size ? { text, unsupported: [], moved: [] } : convertFrontMatter(text, folder, childrenOf);
        const list = bodyOf(result.text).split("\n\n")[0];
        const notes = [
            result.unsupported.length ? $msg("tabularium.sorting.convertUnsupported", { lines: result.unsupported.join("\n") }) : "",
            result.moved.length ? $msg("tabularium.sorting.convertMoved", { folders: result.moved.join("、") }) : "",
        ].filter(Boolean);
        const confirmed = await confirmAction(this.app, {
            title: $msg("tabularium.sorting.convertTitle"),
            body: $msg("tabularium.sorting.convertBody", { path, target }),
            preview: list,
            impact: notes.length ? notes.join("\n\n") : undefined,
            action: $msg("tabularium.sorting.convertAction"),
        });
        if (confirmed !== true) return;
        if (result.text !== text) await this.app.vault.process(file, () => result.text);
        await this.app.fileManager.renameFile(file, target);
        new Notice($msg("tabularium.sorting.converted", { path: target }));
    }

    /** The rows of the settings page's file sorting part; `changed` redraws the page after a conversion. */
    settingRows(changed: () => void): SettingDefinition[] {
        const convert = this.formerRules.map((path) =>
            settingRow(`${$msg("tabularium.sorting.convert")} · ${path}`, $msg("tabularium.sorting.convertDesc", { path }), (setting) =>
                setting.addButton((button) =>
                    button
                        .setButtonText($msg("tabularium.sorting.convertButton"))
                        .setCta()
                        .onClick(() => void this.convert(path).then(changed))
                )
            )
        );
        return [
            ...convert,
            settingRow($msg("tabularium.sorting.apply"), $msg("tabularium.sorting.applyDesc"), (setting) =>
                setting.addToggle((toggle) => toggle.setValue(!this.settings.suspended).onChange((on) => void this.setSuspended(!on)))
            ),
            settingRow($msg("tabularium.sorting.statusBar"), $msg("tabularium.sorting.statusBarDesc"), (setting) =>
                setting.addToggle((toggle) =>
                    toggle.setValue(this.settings.statusBar).onChange(async (on) => {
                        this.settings.statusBar = on;
                        await this.saveSettings();
                        if (on) this.showStatusBar();
                        else this.statusBarItem?.detach();
                    })
                )
            ),
        ];
    }
}

/** Not installed while the standalone plug-in is enabled; the settings page says that it sorts the files. */
export function installFileSorting(plugin: Plugin, core: LiveSyncCore): TabulariumSorting | undefined {
    if (plugin.app.plugins.enabledPlugins.has(STANDALONE_SORTING_ID)) return undefined;
    const sorting = plugin.addChild(new TabulariumSorting(plugin));
    sorting.stepAside = () => plugin.removeChild(sorting);
    // Registered once the display language is known, so the command names follow it.
    core.services.appLifecycle.onSettingLoaded.addHandler(() => {
        plugin.addCommand({ id: "enable-custom-sorting", name: $msg("tabularium.sorting.commandOn"), callback: () => void sorting.setSuspended(false) });
        plugin.addCommand({ id: "suspend-custom-sorting", name: $msg("tabularium.sorting.commandOff"), callback: () => void sorting.setSuspended(true) });
        return Promise.resolve(true);
    });
    return sorting;
}
