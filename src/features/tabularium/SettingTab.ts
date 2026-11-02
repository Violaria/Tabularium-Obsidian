// Tabularium's settings page, the plug-in's only one: connection, sync, file sorting, Send to Kindle, appearance,
// maintenance and help. Options that a Tabularium connection forces (encryption, path obfuscation, hidden-file and
// customisation sync) or that only apply to other remotes are not offered.
import { Platform, PluginSettingTab, Setting, setIcon } from "obsidian";
import { $msg, $t } from "@/common/translation";
import { SUPPORTED_I18N_LANGS } from "@/common/rosetta";
import {
    EVENT_REQUEST_RELOAD_SETTING_TAB,
    EVENT_REQUEST_RUN_DOCTOR,
    EVENT_REQUEST_RUN_FIX_INCOMPLETE,
    eventHub,
} from "@/common/events.ts";
import { VIEW_TYPE_LOG } from "@/modules/features/Log/LogPaneView.ts";
import { getConfig, type AllSettingItemKey } from "@/modules/features/SettingDialogue/settingConstants.ts";
import { NetworkWarningStyles } from "@tabularium/sync-core/compat/common/models/setting.const";
import { FlagFilesHumanReadable, FlagFilesOriginal, type ObsidianLiveSyncSettings } from "@tabularium/sync-core/compat/common/types";
import { constructCustomRegExpList, splitCustomRegExpList } from "@tabularium/sync-core/compat/common/utils";
import {
    REPLICATION_PROGRESS_PRESENTATIONS,
    USER_INITIATED_REPLICATION_AUTHORITY,
} from "@tabularium/sync-core/replication";
import type ObsidianLiveSyncPlugin from "@/main";
import { confirmAction } from "./Confirm";
import { FETCH_CHOICES, rememberFetchChoice, type FetchChoice } from "@/serviceFeatures/redFlag.simpleFetch";
import { REBUILD_CONFIRMED_KEY } from "@/serviceFeatures/redFlag";
import { HELP_TOPICS, RELEASES } from "./help";
import { hint } from "./hint";

const SECTIONS = ["connection", "sync", "sorting", "kindle", "appearance", "maintenance", "help"] as const;
type Section = (typeof SECTIONS)[number];
const ICONS: Record<Section, string> = {
    connection: "server",
    sync: "refresh-cw",
    sorting: "arrow-down-wide-narrow",
    kindle: "send",
    appearance: "palette",
    maintenance: "wrench",
    help: "help-circle",
};

/** Rarely needed options, in Maintenance under Advanced. None of them needs the server's data rebuilt. */
const ADVANCED: { heading: string; keys: AllSettingItemKey[] }[] = [
    {
        heading: "tabularium.settings.advancedSync",
        keys: [
            "syncMinimumInterval",
            "batchSaveMinimumDelay",
            "batchSaveMaximumDelay",
            "syncOnlyRegEx",
            "useIgnoreFiles",
            "ignoreFiles",
            "doNotDeleteFolder",
            "allowSleepDuringSynchronisation",
        ],
    },
    {
        heading: "tabularium.settings.advancedConflicts",
        keys: ["checkConflictOnlyOnOpen", "showMergeDialogOnlyOnActive", "disableMarkdownAutoMerge", "writeDocumentsIfConflicted"],
    },
    {
        heading: "tabularium.settings.advancedTransfer",
        keys: [
            "batch_size",
            "batches_limit",
            "useTimeouts",
            "readChunksOnline",
            "concurrencyOfReadChunksOnline",
            "minimumIntervalOfReadChunksOnline",
            "hashCacheMaxCount",
        ],
    },
    {
        heading: "tabularium.settings.advancedFiles",
        keys: [
            "deleteMetadataOfDeletedFiles",
            "automaticallyDeleteMetadataOfDeletedFiles",
            "processSizeMismatchedFiles",
            "disableWorkerForGeneratingChunks",
            "processSmallFilesInUIThread",
        ],
    },
    {
        heading: "tabularium.settings.advancedLog",
        keys: ["lessInformationInLog", "showVerboseLog", "writeLogToTheFile"],
    },
];
const REGEX_LISTS = new Set<AllSettingItemKey>(["syncIgnoreRegEx", "syncOnlyRegEx"]);
/** Bounds of number settings, as upstream's pages had them; other numbers must be zero or more. */
const BOUNDS: Partial<Record<AllSettingItemKey, [number, number]>> = {
    batch_size: [2, 10_000],
    batches_limit: [2, 10_000],
    periodicReplicationInterval: [1, 5000],
    syncMaxSizeInMB: [0, 10_000],
    concurrencyOfReadChunksOnline: [1, 1000],
};

type SyncMode = "live" | "periodic" | "events";

export class TabulariumSettingTab extends PluginSettingTab {
    private section: Section = "connection";
    private advancedOpen = false;
    private readonly owner: ObsidianLiveSyncPlugin;

    constructor(plugin: ObsidianLiveSyncPlugin) {
        super(plugin.app, plugin);
        this.owner = plugin;
        // Saving settings (also from commands) asks open setting pages to redraw, e.g. after a language change.
        eventHub.onEvent(EVENT_REQUEST_RELOAD_SETTING_TAB, () => {
            if (plugin.sorting?.ready) plugin.sorting.updateStatusBar();
            if (this.containerEl.isConnected) this.display();
        });
    }

    private get core() {
        return this.owner.core;
    }
    private get settings() {
        return this.core.services.setting.currentSettings();
    }

    private async save(partial: Partial<ObsidianLiveSyncSettings>) {
        await this.core.services.setting.applyPartial(partial, true);
    }

    show(section: Section) {
        this.section = section;
        this.display();
    }

    override display(): void {
        const { containerEl } = this;
        const scrolled = containerEl.scrollTop;
        containerEl.empty();
        containerEl.addClass("tabularium-settings");
        const nav = containerEl.createDiv({ cls: "tabularium-settings-nav" });
        for (const section of SECTIONS) {
            const button = nav.createEl("button", { cls: section === this.section ? "is-active" : "" });
            setIcon(button.createSpan(), ICONS[section]);
            button.createSpan({ text: $msg(`tabularium.settings.${section}`) });
            button.addEventListener("click", () => this.show(section));
        }
        const body = containerEl.createDiv({ cls: "tabularium-settings-body" });
        this.render(body);
        containerEl.scrollTop = scrolled;
    }

    private render(el: HTMLElement) {
        switch (this.section) {
            case "connection":
                return this.connection(el);
            case "sync":
                return this.sync(el);
            case "sorting":
                return this.sorting(el);
            case "kindle":
                return this.kindle(el);
            case "appearance":
                return this.appearance(el);
            case "maintenance":
                return this.maintenance(el);
            case "help":
                return this.help(el);
        }
    }

    /** A row for a stored setting, its control chosen by the value's type; the description goes behind an icon. */
    private row(el: HTMLElement, key: AllSettingItemKey) {
        // The pattern lists have no upstream description; theirs are in Tabularium's catalogue.
        const config = REGEX_LISTS.has(key)
            ? { name: $msg(`tabularium.settings.${key}` as never), desc: $msg(`tabularium.settings.${key}Desc` as never), placeHolder: "" }
            : getConfig(key);
        if (!config) throw new Error(`No setting description for ${key}`);
        const setting = new Setting(el).setName(config.name);
        if (config.desc) hint(setting, config.desc);
        const settings = this.settings as unknown as Record<string, unknown>;
        const value = settings[key];
        if (REGEX_LISTS.has(key)) {
            setting.addTextArea((text) => {
                text.inputEl.rows = 3;
                text.inputEl.spellcheck = false;
                text.setValue(splitCustomRegExpList(value as never, "|[]|").join("\n"));
                text.inputEl.addEventListener("change", () => {
                    const patterns = text.getValue().split("\n").map((line) => line.trim()).filter(Boolean);
                    void this.save({ [key]: constructCustomRegExpList(patterns as never, "|[]|") });
                });
            });
        } else if (typeof value === "boolean") {
            setting.addToggle((toggle) => toggle.setValue(value).onChange((next) => void this.save({ [key]: next })));
        } else if (typeof value === "number") {
            const [min, max] = BOUNDS[key] ?? [0, Number.MAX_SAFE_INTEGER];
            setting.addText((text) => {
                text.inputEl.type = "number";
                text.inputEl.min = String(min);
                if (max !== Number.MAX_SAFE_INTEGER) text.inputEl.max = String(max);
                text.setValue(String(value));
                text.inputEl.addEventListener("change", () => {
                    const raw = text.getValue().trim();
                    const next = Number(raw);
                    // An emptied or out-of-range field keeps the saved value.
                    if (raw === "" || !Number.isFinite(next) || next < min || next > max) text.setValue(String(value));
                    else void this.save({ [key]: next });
                });
            });
        } else {
            setting.addText((text) => {
                if (config.placeHolder) text.setPlaceholder(config.placeHolder);
                text.setValue(typeof value === "string" ? value : "");
                text.inputEl.addEventListener("change", () => void this.save({ [key]: text.getValue() }));
            });
        }
        return setting;
    }

    private heading(el: HTMLElement, key: string) {
        new Setting(el).setName($msg(key as never)).setHeading();
    }

    private connection(el: HTMLElement) {
        const server = this.owner.tabularium!;
        const connection = server.connection;
        if (!connection) {
            new Setting(el)
                .setName($msg("tabularium.server.notConnected"))
                .setDesc($msg("tabularium.settings.notConnectedDesc"))
                .addButton((b) => b.setButtonText($msg("tabularium.server.openConnection")).setCta().onClick(() => server.open()));
            return;
        }
        new Setting(el).setName($msg("tabularium.server.server")).setDesc(connection.server);
        new Setting(el).setName($msg("tabularium.server.vault")).setDesc(connection.vaultName);
        new Setting(el)
            .setName($msg("tabularium.server.device"))
            .setDesc(
                $msg("tabularium.server.deviceExpiry", {
                    device: connection.deviceName,
                    date: new Date(connection.expiresAt).toLocaleString(),
                })
            );
        new Setting(el)
            .setName($msg("tabularium.settings.status"))
            .setDesc(this.status())
            .addButton((b) =>
                b.setButtonText($msg("tabularium.settings.syncNow")).onClick(async () => {
                    b.setDisabled(true);
                    await this.core.services.replication.replicateUserInitiated({
                        trigger: "manual",
                        progressPresentation: REPLICATION_PROGRESS_PRESENTATIONS.QUIET,
                        interaction: USER_INITIATED_REPLICATION_AUTHORITY,
                    });
                    this.display();
                })
            );
        this.lock(el);
        new Setting(el)
            .addButton((b) => b.setButtonText($msg("tabularium.settings.changeVault")).onClick(() => server.openLogin()))
            .addButton((b) =>
                b
                    .setButtonText($msg("tabularium.server.disconnect"))
                    .setWarning()
                    .onClick(async () => {
                        const ok = await confirmAction(this.app, {
                            title: $msg("tabularium.settings.disconnectTitle"),
                            body: $msg("tabularium.server.disconnectHint"),
                            action: $msg("tabularium.server.disconnect"),
                        });
                        if (!ok) return;
                        await server.disconnect();
                        this.display();
                    })
            );
    }

    private status() {
        const statics = this.core.services.replicator.replicationStatics.value;
        const pending = this.core.services.fileProcessing.totalQueued.value;
        const state = {
            STARTED: "syncing",
            CONNECTED: "live",
            JOURNAL_SEND: "syncing",
            JOURNAL_RECEIVE: "syncing",
            PAUSED: "idle",
            COMPLETED: "idle",
            NOT_CONNECTED: "stopped",
            CLOSED: "stopped",
            ERRORED: "error",
        }[statics.syncStatus];
        const text = $msg(`tabularium.settings.state.${state}` as never);
        return pending > 0 ? `${text} ${$msg("tabularium.settings.pending", { count: String(pending) })}` : text;
    }

    /** The remote lock that a rebuild leaves: explained, with the way out. */
    private lock(el: HTMLElement) {
        const replicator = this.core.replicator;
        if (!replicator?.remoteLocked) return;
        const accepted = !replicator.remoteLockedAndDeviceNotAccepted;
        new Setting(el)
            .setName($msg("tabularium.settings.locked"))
            .setDesc($msg(accepted ? "tabularium.settings.lockedAccepted" : "tabularium.settings.lockedNotAccepted"))
            .addButton((b) =>
                b.setButtonText($msg("tabularium.settings.fetch")).onClick(() => void this.fetchFromServer())
            )
            .addButton((b) =>
                b
                    .setButtonText($msg("tabularium.settings.unlock"))
                    .setWarning()
                    .onClick(() => void this.unlock())
            );
    }

    private async unlock() {
        const ok = await confirmAction(this.app, {
            title: $msg("tabularium.settings.unlockTitle"),
            body: $msg("tabularium.settings.unlockBody"),
            impact: $msg("tabularium.settings.unlockImpact"),
            action: $msg("tabularium.settings.unlock"),
            typeToConfirm: this.owner.tabularium!.connection?.vaultName,
        });
        if (!ok) return;
        await this.core.services.replication.markUnlocked();
        this.display();
    }

    private async fetchFromServer() {
        const choice = await confirmAction<FetchChoice>(this.app, {
            title: $msg("tabularium.settings.fetchTitle"),
            body: $msg("tabularium.settings.fetchBody"),
            impact: $msg("tabularium.settings.fetchImpact"),
            action: $msg("tabularium.settings.fetchAction"),
            choices: (Object.keys(FETCH_CHOICES) as FetchChoice[]).map((value) => ({
                value,
                label: $msg(`tabularium.settings.fetch.${value}` as never),
                desc: $msg(`tabularium.settings.fetch.${value}Desc` as never),
            })),
        });
        if (typeof choice !== "string") return;
        // The scheduled fetch after the restart takes this answer instead of asking again.
        await rememberFetchChoice(this.core, choice);
        await this.core.storageAccess.writeFileAuto(FlagFilesHumanReadable.FETCH_ALL, "");
        this.core.services.appLifecycle.performRestart();
    }

    private syncMode(el: HTMLElement) {
        const settings = this.settings;
        const mode: SyncMode = settings.liveSync ? "live" : settings.periodicReplication ? "periodic" : "events";
        hint(new Setting(el).setName($msg("tabularium.settings.mode")), $msg("tabularium.settings.modeDesc")).addDropdown((d) =>
            d
                .addOption("live", $msg("tabularium.settings.modeLive"))
                .addOption("periodic", $msg("tabularium.settings.modePeriodic"))
                .addOption("events", $msg("tabularium.settings.modeEvents"))
                .setValue(mode)
                .onChange(async (next) => {
                    await this.save({ liveSync: next === "live", periodicReplication: next === "periodic" });
                    this.display();
                })
        );
        if (mode === "periodic") this.row(el, "periodicReplicationInterval");
        if (mode !== "live") for (const key of ["syncOnStart", "syncOnSave", "syncOnEditorSave", "syncOnFileOpen", "syncAfterMerge"] as const) this.row(el, key);
        this.row(el, mode === "live" ? "batchSaveInLiveSync" : "batchSave");
    }

    private sync(el: HTMLElement) {
        const pause = this.owner.livePause;
        if (pause?.paused) {
            // While paused the triggers are off and recorded; editing them here would be overwritten on resume.
            hint(new Setting(el).setName($msg("tabularium.settings.livePaused")), $msg("tabularium.settings.livePausedDesc")).addButton((b) =>
                b.setButtonText($msg("tabularium.syncMenu.resume")).onClick(async () => {
                    await pause.resume();
                    this.display();
                })
            );
        } else this.syncMode(el);
        if (Platform.isDesktop) this.row(el, "keepReplicationActiveInBackground");
        this.heading(el, "tabularium.settings.whatSyncs");
        this.row(el, "syncMaxSizeInMB");
        this.row(el, "syncIgnoreRegEx");
        this.heading(el, "tabularium.settings.conflicts");
        this.row(el, "resolveConflictsByNewerFile");
    }

    private sorting(el: HTMLElement) {
        const sorting = this.owner.sorting;
        if (!sorting) {
            new Setting(el).setDesc($msg("tabularium.sorting.standalone"));
            return;
        }
        if (!sorting.ready) {
            new Setting(el).setDesc($msg("tabularium.sorting.notReady"));
            return;
        }
        sorting.renderSettings(el.createDiv({ cls: "tabularium-sorting-settings" }));
    }

    private kindle(el: HTMLElement) {
        const kindle = this.owner.kindle!;
        if (!this.owner.tabularium?.connection) {
            new Setting(el).setDesc($msg("tabularium.settings.needsConnection"));
            return;
        }
        void kindle.renderStatus(el);
    }

    private appearance(el: HTMLElement) {
        const settings = this.settings;
        new Setting(el).setName($msg("tabularium.settings.language")).addDropdown((d) => {
            // Default follows Obsidian; Obsidian offers no Latin, so Latin is only chosen here.
            d.addOption("", $t("lang-auto"));
            for (const language of SUPPORTED_I18N_LANGS) d.addOption(language, $t(`lang-${language}`));
            d.setValue(settings.displayLanguage).onChange((next) => void this.save({ displayLanguage: next as never }));
        });
        this.row(el, "showStatusOnStatusbar");
        this.row(el, "showStatusOnEditor");
        if (settings.showStatusOnEditor) this.row(el, "showOnlyIconsOnEditor");
        new Setting(el).setName($msg("tabularium.settings.networkWarning")).addDropdown((d) =>
            d
                .addOption(NetworkWarningStyles.BANNER, $msg("tabularium.settings.networkBanner"))
                .addOption(NetworkWarningStyles.ICON, $msg("tabularium.settings.networkIcon"))
                .addOption(NetworkWarningStyles.HIDDEN, $msg("tabularium.settings.networkHidden"))
                .setValue(settings.networkWarningStyle)
                .onChange((next) => void this.save({ networkWarningStyle: next as never }))
        );
        this.row(el, "hideFileWarningNotice");
    }

    private maintenance(el: HTMLElement) {
        const connected = Boolean(this.owner.tabularium?.connection);
        const action = (name: string, desc: string, button: string, run: () => unknown, warning = false) =>
            hint(new Setting(el).setName($msg(name as never)), $msg(desc as never)).addButton((b) => {
                b.setButtonText($msg(button as never)).onClick(() => void run());
                if (warning) b.setWarning();
            });
        this.heading(el, "tabularium.settings.recovery");
        if (connected) {
            action("tabularium.settings.fetch", "tabularium.settings.fetchDesc", "tabularium.settings.fetchAction", () => this.fetchFromServer());
            action("tabularium.settings.overwrite", "tabularium.settings.overwriteDesc", "tabularium.settings.overwriteAction", () => this.overwriteServer(), true);
            if (this.core.replicator?.remoteLocked)
                action("tabularium.settings.unlock", "tabularium.settings.unlockDesc", "tabularium.settings.unlock", () => this.unlock(), true);
        }
        action("tabularium.settings.suspend", "tabularium.settings.suspendDesc", "tabularium.settings.suspendAction", async () => {
            await this.core.storageAccess.writeFileAuto(FlagFilesOriginal.SUSPEND_ALL, "");
            this.core.services.appLifecycle.performRestart();
        });
        action("tabularium.settings.resetLocal", "tabularium.settings.resetLocalDesc", "tabularium.settings.resetLocalAction", () => this.resetLocal(), true);
        this.heading(el, "tabularium.settings.diagnosis");
        action("tabularium.settings.log", "tabularium.settings.logDesc", "tabularium.settings.open", () => this.core.services.API.showWindow(VIEW_TYPE_LOG));
        action("tabularium.settings.report", "tabularium.settings.reportDesc", "tabularium.settings.copy", () =>
            this.app.commands.executeCommandById("tabularium:dump-debug-info")
        );
        action("tabularium.settings.doctor", "tabularium.settings.doctorDesc", "tabularium.settings.run", () =>
            eventHub.emitEvent(EVENT_REQUEST_RUN_DOCTOR, "")
        );
        action("tabularium.settings.broken", "tabularium.settings.brokenDesc", "tabularium.settings.run", () =>
            eventHub.emitEvent(EVENT_REQUEST_RUN_FIX_INCOMPLETE)
        );
        action("tabularium.settings.resolveAll", "tabularium.settings.resolveAllDesc", "tabularium.settings.run", async () => {
            const ok = await confirmAction(this.app, {
                title: $msg("tabularium.settings.resolveAll"),
                body: $msg("tabularium.settings.resolveAllDesc"),
                impact: $msg("tabularium.settings.resolveAllImpact"),
                action: $msg("tabularium.settings.run"),
            });
            if (ok) await this.core.services.conflict.resolveAllConflictedFilesByNewerOnes();
        });
        const links = this.owner.linkRepair;
        if (links) {
            this.heading(el, "tabularium.settings.links");
            action("tabularium.settings.checkLinks", "tabularium.settings.checkLinksDesc", "tabularium.settings.run", () => links.check());
            hint(new Setting(el).setName($msg("tabularium.settings.autoLinks")), $msg("tabularium.settings.autoLinksDesc")).addToggle((toggle) =>
                toggle.setValue(links.auto).onChange((on) => (links.auto = on))
            );
        }
        const menus = this.owner.editorMenus;
        if (menus) {
            this.heading(el, "tabularium.settings.editor");
            hint(new Setting(el).setName($msg("tabularium.settings.formatToolbar")), $msg("tabularium.settings.formatToolbarDesc")).addToggle((toggle) =>
                toggle.setValue(menus.toolbar).onChange((on) => (menus.toolbar = on))
            );
        }
        const advanced = el.createEl("details", { cls: "tabularium-advanced" });
        // Saving a setting redraws the page: the fold stays as it was.
        advanced.open = this.advancedOpen;
        advanced.addEventListener("toggle", () => (this.advancedOpen = advanced.open));
        advanced.createEl("summary", { text: $msg("tabularium.settings.advanced") });
        advanced.createEl("p", { cls: "setting-item-description", text: $msg("tabularium.settings.advancedDesc") });
        for (const group of ADVANCED) {
            this.heading(advanced, group.heading);
            for (const key of group.keys) this.row(advanced, key);
        }
    }

    private async overwriteServer() {
        const ok = await confirmAction(this.app, {
            title: $msg("tabularium.settings.overwriteTitle"),
            body: $msg("tabularium.settings.overwriteBody"),
            impact: $msg("tabularium.settings.overwriteImpact"),
            action: $msg("tabularium.settings.overwriteAction"),
            typeToConfirm: this.owner.tabularium!.connection!.vaultName,
        });
        if (!ok) return;
        await this.core.storageAccess.writeFileAuto(FlagFilesHumanReadable.REBUILD_ALL, "");
        // Confirmed here: the scheduled rebuild after the restart does not ask again.
        await this.core.services.setting.config.setValue(REBUILD_CONFIRMED_KEY, String(Date.now()));
        this.core.services.appLifecycle.performRestart();
    }

    private async resetLocal() {
        const ok = await confirmAction(this.app, {
            title: $msg("tabularium.settings.resetLocalTitle"),
            body: $msg("tabularium.settings.resetLocalBody"),
            action: $msg("tabularium.settings.resetLocalAction"),
        });
        if (!ok) return;
        await this.core.services.database.resetDatabase();
        if (!(await this.core.services.databaseEvents.initialiseDatabase()))
            throw new Error($msg("Ui.Common.LocalDatabaseInitialisationFailed"));
    }

    private help(el: HTMLElement) {
        for (const topic of HELP_TOPICS) {
            const details = el.createEl("details", { cls: "tabularium-help" });
            details.createEl("summary", { text: $msg(`tabularium.help.${topic}.title` as never) });
            for (const paragraph of $msg(`tabularium.help.${topic}.body` as never).split("\n\n"))
                details.createEl("p", { text: paragraph });
        }
        this.heading(el, "tabularium.settings.changelog");
        for (const version of RELEASES) {
            const details = el.createEl("details", { cls: "tabularium-help" });
            details.createEl("summary", { text: version });
            for (const line of $msg(`tabularium.release.${version}` as never).split("\n"))
                details.createEl("p", { text: line });
        }
        this.heading(el, "tabularium.settings.about");
        new Setting(el)
            .setName($msg("tabularium.settings.version", { version: this.owner.manifest.version }))
            .setDesc($msg("tabularium.settings.aboutDesc"));
    }
}
