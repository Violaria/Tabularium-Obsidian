import { $msg } from "@/common/translation";
import type { LiveSyncCore } from "@/main";
import { Modal, Notice, normalizePath, Plugin, PluginSettingTab, Setting } from "obsidian";
import { CustomSortPlugin, type CustomSortPluginSettings } from "@tabularium/custom-sort";

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
        this.sortingSettingsTab.containerEl = dialogue.contentEl;
        this.sortingSettingsTab.display();
        const actions = dialogue.contentEl.createDiv();
        new Setting(actions)
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
        this.settingsDialogue = dialogue;
        dialogue.open();
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
        return Promise.resolve(true);
    });
    return sorting;
}
