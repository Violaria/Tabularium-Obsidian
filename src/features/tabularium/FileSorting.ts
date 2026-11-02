// File sorting in Obsidian's file list from the lists in Collation.md (see common/fileOrder.ts). The file list's own
// order (the sort the user chose in Obsidian) is kept for everything the rules do not list.
import { Component, MarkdownView, normalizePath, Notice, Platform, TFile, TFolder, type Menu, type MenuItem, type Plugin, type SettingDefinition, type TAbstractFile } from "obsidian";
import { $msg } from "@/core/common/translation";
import type { LiveSyncCore } from "@/main";
import {
    arrange,
    bodyOf,
    convertFrontMatter,
    defaultOrder,
    FORMER_RULES_FILE,
    isRulesNote,
    locateItem,
    moveItem,
    namesOf,
    orderFor,
    parseOrder,
    RULES_FILE,
    type FileOrder,
} from "@/core/common/fileOrder";
import { confirmAction } from "./Confirm";
import { settingRow } from "./hint";
import { EVENT_REQUEST_RELOAD_SETTING_TAB, eventHub } from "@/core/common/events.ts";

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
/** Not in Obsidian's published typings; the sync menu uses the same call. */
type SubmenuItem = MenuItem & { setSubmenu(): Menu };
/** The name an item is listed by: a note without `.md`, a folder or another file by its name. */
const listedName = (file: TAbstractFile) => (file instanceof TFile && file.extension === "md" ? file.basename : file.name);
const namesOfFile = (file: TAbstractFile) => namesOf(file.name, file instanceof TFolder);

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
        this.registerEvent(this.app.workspace.on("file-menu", (menu, file) => this.addMenu(menu, [file])));
        this.registerEvent(this.app.workspace.on("files-menu", (menu, files) => this.addMenu(menu, files)));
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

    /**
     * "Sorting" in the file explorer's context menu, below "Sync": apply or pause, and for items of one folder, show the
     * item in its rules note or move it to the top or the bottom of its folder.
     */
    private addMenu(menu: Menu, files: TAbstractFile[]) {
        const items = files.filter((file) => !(file instanceof TFolder && file.isRoot()));
        const parent = items.length ? folderOf(items[0].path) : undefined;
        const ofOneFolder = parent !== undefined && items.every((file) => folderOf(file.path) === parent);
        type Action = "apply" | "pause" | "locate" | "first" | "last";
        const fill = (target: Menu, flat: boolean) => {
            const add = (action: Action, icon: string, run: () => Promise<void>) =>
                target.addItem((item) => {
                    const key = `tabularium.sorting.menu.${action}` as const;
                    item.setTitle(flat ? $msg("tabularium.sorting.menu.flat", { action: $msg(key) }) : $msg(key))
                        .setIcon(icon)
                        .onClick(() => void run().catch((error: Error) => new Notice(error.message)));
                });
            if (this.settings.suspended) add("apply", "play", () => this.setSuspended(false));
            else add("pause", "pause", () => this.setSuspended(true));
            if (!ofOneFolder) return;
            if (!flat) target.addSeparator();
            if (items.length === 1 && this.rulesNoteFor(parent)) add("locate", "locate", () => this.locate(items[0]));
            add("first", "arrow-up-to-line", () => this.move(items, "first"));
            add("last", "arrow-down-to-line", () => this.move(items, "last"));
        };
        // Mobile menus have no submenus: the items go into the menu itself, named with the submenu's title.
        if (Platform.isMobile) {
            menu.addSeparator();
            fill(menu, true);
            return;
        }
        menu.addItem((item) => {
            item.setTitle($msg("tabularium.sorting.menu.title")).setIcon("arrow-down-wide-narrow");
            fill((item as SubmenuItem).setSubmenu(), false);
        });
    }

    /** The rules note that orders a folder: the nearest Collation.md at or above it. */
    private rulesNoteFor(folder: string): TFile | undefined {
        const covering = this.orders
            .map((source) => source.folder)
            .filter((at) => at === "" || folder === at || folder.startsWith(`${at}/`))
            .sort((a, b) => b.length - a.length);
        for (const at of covering) {
            const file = this.app.vault.getFileByPath(at ? `${at}/${RULES_FILE}` : RULES_FILE);
            if (file) return file;
        }
        return undefined;
    }

    /** Opens the rules note with the cursor on the item, or on the nearest listed folder above it. */
    private async locate(file: TAbstractFile) {
        const note = this.rulesNoteFor(folderOf(file.path));
        if (!note) return;
        const line = locateItem(await this.app.vault.read(note), folderOf(note.path), file.path, namesOfFile(file)) ?? 0;
        const leaf = this.app.workspace.getLeaf(false);
        await leaf.openFile(note, { state: { mode: "source" } });
        const view = leaf.view instanceof MarkdownView ? leaf.view : undefined;
        if (!view) return;
        const at = { line, ch: view.editor.getLine(line).length };
        view.editor.setCursor(at);
        view.editor.scrollIntoView({ from: at, to: at }, true);
        view.editor.focus();
    }

    /**
     * Moves items of one folder to its top or bottom in the rules note that orders it, keeping their order among
     * themselves; writes them in if they are not listed. Without a rules note, Collation.md is made at the vault root.
     */
    private async move(files: TAbstractFile[], place: "first" | "last") {
        const parent = folderOf(files[0].path);
        const folder = parent ? this.app.vault.getFolderByPath(parent) : this.app.vault.getRoot();
        if (!folder) return;
        const shown = this.ordered(folder);
        const inOrder = [...files].sort((a, b) => shown.indexOf(a) - shown.indexOf(b));
        // Each move puts one item at the edge: the last one moved ends up outermost.
        const sequence = place === "first" ? inOrder.reverse() : inOrder;
        const note = this.rulesNoteFor(parent) ?? (await this.app.vault.create(RULES_FILE, ""));
        const at = folderOf(note.path);
        await this.app.vault.process(note, (text) =>
            sequence.reduce((current, file) => moveItem(current, at, file.path, listedName(file), namesOfFile(file), place), text)
        );
        await this.readRules();
        this.refresh();
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
