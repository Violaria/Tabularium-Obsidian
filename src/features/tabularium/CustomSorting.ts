import { $msg } from "@/common/translation";
import { hint } from "./hint";
import type { LiveSyncCore } from "@/main";
import { Modal, Notice, normalizePath, Plugin, PluginSettingTab, Setting } from "obsidian";
import { CustomSortPlugin, type CustomSortPluginSettings } from "@tabularium/custom-sort";

/** The sorting component's menu, ribbon and command texts, and their keys in the catalogue (tabularium.sorting.ui.*). */
const SORT_TEXTS: Record<string, string> = {
    "Toggle custom sorting": "toggle",
    "Apply custom sorting": "apply",
    "Custom sort: apply custom sorting": "applyFlat",
    "Suspend custom sorting": "suspend",
    "Custom sort: suspend custom sorting": "suspendFlat",
    "Bookmark it for sorting": "bookmark",
    "Bookmark it for custom sorting": "bookmarkFlat",
    "UNbookmark it from sorting": "unbookmark",
    "UNbookmark it from custom sorting": "unbookmarkFlat",
    "Bookmark it+siblings for sorting": "bookmarkSiblings",
    "Bookmark it+siblings for custom sorting": "bookmarkSiblingsFlat",
    "UNbookmark it+siblings from sorting": "unbookmarkSiblings",
    "UNbookmark it+siblings from custom sorting": "unbookmarkSiblingsFlat",
    "Custom sort: bookmark selected for sorting": "bookmarkSelected",
    "Bookmark selected for custom sorting": "bookmarkSelectedFlat",
    "Custom sort: UNbookmark selected from sorting": "unbookmarkSelected",
    "UNbookmark selected from custom sorting": "unbookmarkSelectedFlat",
    "Custom sort:": "submenu",
    "Enable and apply the custom sorting, (re)parsing the sorting configuration first. Sort-on.": "commandOn",
    "Suspend the custom sorting. Sort-off.": "commandOff",
};

/** Own the upstream sorting component within the Tabularium plug-in. */
export class TabulariumCustomSorting extends CustomSortPlugin {
    ready = false;
    private running = false;
    private sortingSettingsTab!: PluginSettingTab;
    private settingsDialogue?: Modal;

    override async onload(): Promise<void> {
        this.running = true;
        await super.onload();
        this.ready = true;
    }

    override onunload(): void {
        this.running = false;
        this.ready = false;
        this.settingsDialogue?.close();
    }

    /**
     * The sorting component reports in English. Routine confirmations (rules parsed, applied, paused) are not shown;
     * problems are shown in the interface language.
     */
    override showNotice(message: string, timeout?: number) {
        if (message.startsWith("Parsing custom sorting specification FAILED")) {
            const detail = message.slice(message.indexOf("\n") + 1);
            super.showNotice($msg("tabularium.sorting.parseFailed", { detail }), timeout);
        } else if (message.startsWith("Custom sort File Explorer view problem")) {
            super.showNotice($msg("tabularium.sorting.viewProblem"), timeout);
        }
    }

    override text(english: string): string {
        const key = SORT_TEXTS[english];
        return key ? $msg(`tabularium.sorting.ui.${key}` as never) : english;
    }

    /** Registered by installCustomSorting once the display language is known. */
    override registerCommands(): void {}

    override isThePluginStillInstalledAndEnabled(): boolean {
        return this.running;
    }

    override initialize(): void {
        const applyWhenReady = () => {
            if (!this.running || this.settings.suspended || this.customSortAppliedAtLeastOnce) return;
            const explorer = this.getFileExplorer().v;
            if (explorer && !explorer.isDeferred) this.switchPluginStateTo(true);
        };
        this.registerEvent(this.app.workspace.on("layout-change", applyWhenReady));
        this.app.workspace.onLayoutReady(() => {
            if (!this.running) return;
            const timer = window.setTimeout(applyWhenReady, this.settings.delayForInitialApplication);
            this.register(() => window.clearTimeout(timer));
        });
    }

    override addSettingTab(tab: PluginSettingTab): void {
        this.sortingSettingsTab = tab;
    }

    override async loadData(): Promise<Partial<CustomSortPluginSettings>> {
        const path = normalizePath(`${this.manifest.dir}/custom-sort.json`);
        if (!(await this.app.vault.adapter.exists(path))) return {};
        return JSON.parse(await this.app.vault.adapter.read(path)) as CustomSortPluginSettings;
    }

    override async saveData(data: CustomSortPluginSettings): Promise<void> {
        await this.app.vault.adapter.write(
            normalizePath(`${this.manifest.dir}/custom-sort.json`),
            JSON.stringify(data, null, 2)
        );
    }

    openSettings(): void {
        if (!this.ready) return;
        this.settingsDialogue?.close();
        const dialogue = new Modal(this.app);
        dialogue.setTitle($msg("tabularium.sorting.title"));
        dialogue.contentEl.addClass("tabularium-sorting-settings");
        this.renderSettings(dialogue.contentEl);
        this.settingsDialogue = dialogue;
        dialogue.open();
    }

    /** The sorting settings in the interface language, then applying and pausing. */
    renderSettings(el: HTMLElement): void {
        if (!this.ready) return;
        const settings = this.settings;
        const save = (): void => {
            void this.saveSettings();
        };
        const row = (name: string) => hint(new Setting(el).setName($msg(`tabularium.sorting.${name}` as never)), $msg(`tabularium.sorting.${name}Desc` as never));
        const text = (name: string, value: string, placeholder: string, apply: (value: string) => void) =>
            row(name).addText((input) => {
                input.setPlaceholder(placeholder).setValue(value);
                input.inputEl.addEventListener("change", () => {
                    apply(input.getValue().trim());
                    save();
                });
            });
        const toggle = (name: string, value: boolean, apply: (value: boolean) => void) =>
            row(name).addToggle((input) =>
                input.setValue(value).onChange((next) => {
                    apply(next);
                    save();
                })
            );
        new Setting(el)
            .setName($msg("tabularium.sorting.apply"))
            .setDesc($msg("tabularium.sorting.applyDesc"))
            .addButton((button) =>
                button
                    .setButtonText($msg("tabularium.sorting.applyButton"))
                    .setCta()
                    .onClick(() => this.switchPluginStateTo(true))
            )
            .addButton((button) =>
                button.setButtonText($msg("tabularium.sorting.pause")).onClick(() => this.switchPluginStateTo(false))
            );
        text("specFile", settings.additionalSortspecFile, "sorting-configuration", (value) => (settings.additionalSortspecFile = value));
        text("indexNote", settings.indexNoteNameForFolderNotes, "index", (value) => (settings.indexNoteNameForFolderNotes = value));
        row("delay").addText((input) => {
            input.inputEl.type = "number";
            input.inputEl.min = "0";
            input.inputEl.max = "30";
            input.setValue(String(settings.delayForInitialApplication / 1000));
            input.inputEl.addEventListener("change", () => {
                const seconds = Number(input.getValue());
                if (!Number.isFinite(seconds) || seconds < 0 || seconds > 30) return;
                settings.delayForInitialApplication = seconds * 1000;
                save();
            });
        });
        toggle("statusBar", settings.statusBarEntryEnabled, (value) => {
            settings.statusBarEntryEnabled = value;
            this.statusBarItemEl?.detach();
            if (value) {
                this.statusBarItemEl = this.addStatusBarItem();
                this.updateStatusBar();
            }
        });
        toggle("contextMenu", settings.customSortContextSubmenu, (value) => (settings.customSortContextSubmenu = value));
        toggle("bookmarks", settings.automaticBookmarksIntegration, (value) => (settings.automaticBookmarksIntegration = value));
        text("bookmarksGroup", settings.bookmarksGroupToConsumeAsOrderingReference, "sortspec", (value) => {
            settings.bookmarksGroupToConsumeAsOrderingReference = normalizePath(value).replace(/[/\\]/g, "_");
        });
        toggle("bookmarksMenus", settings.bookmarksContextMenus, (value) => {
            settings.bookmarksContextMenus = value;
            if (value) settings.customSortContextSubmenu = true;
        });
    }

    /** The status bar entry in the interface language. */
    override updateStatusBar() {
        this.statusBarItemEl?.setText(
            $msg(!this.settings.suspended && this.customSortAppliedAtLeastOnce ? "tabularium.sorting.statusOn" : "tabularium.sorting.statusOff")
        );
    }
}

export function installCustomSorting(plugin: Plugin, core: LiveSyncCore): TabulariumCustomSorting | undefined {
    if (plugin.app.plugins.enabledPlugins.has("custom-sort")) {
        new Notice($msg("tabularium.sorting.standalone"));
        return undefined;
    }
    const sorting = plugin.addChild(new TabulariumCustomSorting(plugin.app, plugin.manifest));
    // Registered once the display language is known, so the command name follows it.
    core.services.appLifecycle.onSettingLoaded.addHandler(() => {
        plugin.addCommand({
            id: "file-sorting-settings",
            name: $msg("tabularium.sorting.command"),
            callback: () => sorting.openSettings(),
        });
        for (const [id, english, on] of [
            ["enable-custom-sorting", "Enable and apply the custom sorting, (re)parsing the sorting configuration first. Sort-on.", true],
            ["suspend-custom-sorting", "Suspend the custom sorting. Sort-off.", false],
        ] as const) {
            plugin.addCommand({ id, name: sorting.text(english), callback: () => sorting.switchPluginStateTo(on) });
        }
        // The status bar entry and the ribbon button were written before the display language was known.
        if (sorting.ready) sorting.updateStatusBar();
        sorting.ribbonIconEl?.setAttribute("aria-label", sorting.text("Toggle custom sorting"));
        return Promise.resolve(true);
    });
    return sorting;
}
