// Tabularium's settings page, the plug-in's only one: connection, then pages for sync, file sorting, Send to Kindle,
// appearance, maintenance and help. Options that a Tabularium connection forces (encryption, path obfuscation,
// hidden-file and customisation sync) or that only apply to other remotes are not offered. The page is declared
// (getSettingDefinitions), so Obsidian's settings search finds every row; update() draws it again after a change.
import {
    Platform,
    PluginSettingTab,
    type Setting,
    type SettingDefinition,
    type SettingDefinitionGroup,
    type SettingDefinitionItem,
    type SettingDefinitionPage,
    type SettingGroupItem,
} from "obsidian";
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
import { FlagFiles, type ObsidianLiveSyncSettings } from "@tabularium/sync-core/compat/common/types";
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
import { destructive, settingRow, shownWhen, textRow } from "./hint";

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

type Section = (SettingGroupItem | SettingDefinitionGroup)[];

/** Marks Tabularium's groups, for the divider fix in styles.css. */
const GROUP_CLASS = "tabularium-settings-group";
const group = (heading: string | undefined, items: SettingGroupItem[], visible?: () => boolean): SettingDefinitionGroup => ({
    type: "group",
    heading: heading && $msg(heading as never),
    cls: GROUP_CLASS,
    items,
    visible,
});
const isGroup = (item: Section[number]): item is SettingDefinitionGroup => "type" in item && item.type !== "page";
/** A page whose rows outside a group are put in an unnamed one, as Obsidian would, but marked as Tabularium's. */
const page = (name: string, items: Section, desc?: string): SettingDefinitionPage => {
    const grouped: SettingDefinitionItem[] = [];
    let loose: SettingGroupItem[] | undefined;
    for (const item of items) {
        if (isGroup(item)) {
            grouped.push(item);
            loose = undefined;
        } else if (loose) loose.push(item);
        else grouped.push(group(undefined, (loose = [item])));
    }
    return { type: "page", name, desc, items: grouped };
};

export class TabulariumSettingTab extends PluginSettingTab {
    private readonly owner: ObsidianLiveSyncPlugin;

    constructor(plugin: ObsidianLiveSyncPlugin) {
        super(plugin.app, plugin);
        this.owner = plugin;
        // Saving settings (also from commands) asks for the page again, e.g. after a language change.
        eventHub.onEvent(EVENT_REQUEST_RELOAD_SETTING_TAB, () => {
            plugin.sorting?.updateStatusBar();
            this.update();
        });
    }

    private get core() {
        return this.owner.core;
    }
    private get settings() {
        return this.core.services.setting.currentSettings();
    }
    private get connected() {
        return Boolean(this.owner.tabularium?.connection);
    }
    private get mode(): SyncMode {
        const settings = this.settings;
        return settings.liveSync ? "live" : settings.periodicReplication ? "periodic" : "events";
    }

    private async save(partial: Partial<ObsidianLiveSyncSettings>) {
        await this.core.services.setting.applyPartial(partial, true);
    }

    override getSettingDefinitions(): SettingDefinitionItem[] {
        return [
            group("tabularium.settings.connection", this.connection()),
            group(undefined, [
                page($msg("tabularium.settings.sync"), this.sync()),
                page($msg("tabularium.settings.sorting"), this.sorting()),
                page($msg("tabularium.settings.kindle"), this.kindle()),
                page($msg("tabularium.settings.appearance"), this.appearance()),
                page($msg("tabularium.settings.maintenance"), this.maintenance()),
                page($msg("tabularium.settings.help"), this.help()),
            ]),
        ];
    }

    /** A row for a stored setting, its control chosen by the value's type; the description goes behind an icon. */
    private stored(key: AllSettingItemKey, visible?: () => boolean): SettingDefinition {
        // The pattern lists have no upstream description; theirs are in Tabularium's catalogue.
        const config = REGEX_LISTS.has(key)
            ? { name: $msg(`tabularium.settings.${key}` as never), desc: $msg(`tabularium.settings.${key}Desc` as never), placeHolder: "" }
            : getConfig(key);
        if (!config) throw new Error(`No setting description for ${key}`);
        return settingRow(config.name, config.desc, (setting) => this.control(setting, key, config.placeHolder), visible);
    }

    private control(setting: Setting, key: AllSettingItemKey, placeholder: string | undefined) {
        const value = (this.settings as unknown as Record<string, unknown>)[key];
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
                if (placeholder) text.setPlaceholder(placeholder);
                text.setValue(typeof value === "string" ? value : "");
                text.inputEl.addEventListener("change", () => void this.save({ [key]: text.getValue() }));
            });
        }
    }

    /** A row whose button runs an action; destructive ones are marked. */
    private action(name: string, desc: string, button: string, run: () => unknown, options: { warning?: boolean; visible?: () => boolean } = {}) {
        return settingRow(
            $msg(name as never),
            $msg(desc as never),
            (setting) =>
                setting.addButton((b) => {
                    b.setButtonText($msg(button as never)).onClick(() => void run());
                    if (options.warning) destructive(b);
                }),
            options.visible
        );
    }

    private connection(): SettingDefinition[] {
        const server = () => this.owner.tabularium!;
        const connection = () => server().connection!;
        const connected = () => this.connected;
        return [
            shownWhen(() => !connected(), {
                name: $msg("tabularium.server.notConnected"),
                render: (setting) =>
                    void setting
                        .setDesc($msg("tabularium.settings.notConnectedDesc"))
                        .addButton((b) => b.setButtonText($msg("tabularium.server.openConnection")).setCta().onClick(() => server().open())),
            }),
            textRow($msg("tabularium.server.server"), () => connection().server, connected),
            textRow($msg("tabularium.server.vault"), () => connection().vaultName, connected),
            textRow(
                $msg("tabularium.server.device"),
                () =>
                    $msg("tabularium.server.deviceExpiry", {
                        device: connection().deviceName,
                        date: new Date(connection().expiresAt).toLocaleString(),
                    }),
                connected
            ),
            shownWhen(connected, {
                name: $msg("tabularium.settings.status"),
                render: (setting) =>
                    void setting.setDesc(this.status()).addButton((b) =>
                        b.setButtonText($msg("tabularium.settings.syncNow")).onClick(async () => {
                            b.setDisabled(true);
                            await this.core.services.replication.replicateUserInitiated({
                                trigger: "manual",
                                progressPresentation: REPLICATION_PROGRESS_PRESENTATIONS.QUIET,
                                interaction: USER_INITIATED_REPLICATION_AUTHORITY,
                            });
                            this.update();
                        })
                    ),
            }),
            // The remote lock that a rebuild leaves: explained, with the way out.
            shownWhen(() => connected() && Boolean(this.core.replicator?.remoteLocked), {
                name: $msg("tabularium.settings.locked"),
                render: (setting) =>
                    void setting
                        .setDesc(
                            $msg(
                                this.core.replicator.remoteLockedAndDeviceNotAccepted
                                    ? "tabularium.settings.lockedNotAccepted"
                                    : "tabularium.settings.lockedAccepted"
                            )
                        )
                        .addButton((b) => b.setButtonText($msg("tabularium.settings.fetch")).onClick(() => void this.fetchFromServer()))
                        .addButton((b) => destructive(b.setButtonText($msg("tabularium.settings.unlock"))).onClick(() => void this.unlock())),
            }),
            shownWhen(connected, {
                name: "",
                searchable: false,
                render: (setting) =>
                    void setting
                        .addButton((b) => b.setButtonText($msg("tabularium.settings.changeVault")).onClick(() => server().openLogin()))
                        .addButton((b) =>
                            destructive(b.setButtonText($msg("tabularium.server.disconnect"))).onClick(async () => {
                                const ok = await confirmAction(this.app, {
                                    title: $msg("tabularium.settings.disconnectTitle"),
                                    body: $msg("tabularium.server.disconnectHint"),
                                    action: $msg("tabularium.server.disconnect"),
                                });
                                if (!ok) return;
                                await server().disconnect();
                                this.update();
                            })
                        ),
            }),
        ];
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
        this.update();
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
        await this.core.storageAccess.writeFileAuto(FlagFiles.FETCH_ALL, "");
        this.core.services.appLifecycle.performRestart();
    }

    private sync(): Section {
        const paused = () => Boolean(this.owner.livePause?.paused);
        const mode = (...modes: SyncMode[]) => () => !paused() && modes.includes(this.mode);
        return [
            // While paused the triggers are off and recorded; editing them here would be overwritten on resume.
            settingRow(
                $msg("tabularium.settings.livePaused"),
                $msg("tabularium.settings.livePausedDesc"),
                (setting) =>
                    setting.addButton((b) =>
                        b.setButtonText($msg("tabularium.syncMenu.resume")).onClick(async () => {
                            await this.owner.livePause!.resume();
                            this.update();
                        })
                    ),
                paused
            ),
            settingRow(
                $msg("tabularium.settings.mode"),
                $msg("tabularium.settings.modeDesc"),
                (setting) =>
                    setting.addDropdown((d) =>
                        d
                            .addOption("live", $msg("tabularium.settings.modeLive"))
                            .addOption("periodic", $msg("tabularium.settings.modePeriodic"))
                            .addOption("events", $msg("tabularium.settings.modeEvents"))
                            .setValue(this.mode)
                            .onChange(async (next) => {
                                await this.save({ liveSync: next === "live", periodicReplication: next === "periodic" });
                                this.update();
                            })
                    ),
                () => !paused()
            ),
            this.stored("periodicReplicationInterval", mode("periodic")),
            ...(["syncOnStart", "syncOnSave", "syncOnEditorSave", "syncOnFileOpen", "syncAfterMerge"] as const).map((key) =>
                this.stored(key, mode("periodic", "events"))
            ),
            this.stored("batchSaveInLiveSync", mode("live")),
            this.stored("batchSave", mode("periodic", "events")),
            this.stored("keepReplicationActiveInBackground", () => Platform.isDesktop),
            group("tabularium.settings.whatSyncs", [this.stored("syncMaxSizeInMB"), this.stored("syncIgnoreRegEx")]),
            group("tabularium.settings.conflicts", [this.stored("resolveConflictsByNewerFile")]),
        ];
    }

    private sorting(): Section {
        const sorting = this.owner.sorting;
        const active = () => Boolean(sorting && !sorting.steppedAside);
        const rows = sorting ? sorting.settingRows(() => this.update()).map((row) => ({ ...row, visible: active })) : [];
        return [textRow("", () => $msg("tabularium.sorting.standalone"), () => !active()), ...rows];
    }

    private kindle(): Section {
        const connected = () => this.connected;
        return [
            textRow("", () => $msg("tabularium.settings.needsConnection"), () => !connected()),
            shownWhen(connected, {
                name: $msg("tabularium.kindle.serverStatus"),
                render: (setting) => void this.owner.kindle!.statusText().then((text) => setting.setDesc(text)),
            }),
            textRow("", () => $msg("tabularium.kindle.settingDesc"), connected),
        ];
    }

    private appearance(): Section {
        return [
            settingRow($msg("tabularium.settings.language"), undefined, (setting) =>
                setting.addDropdown((d) => {
                    // Default follows Obsidian; Obsidian offers no Latin, so Latin is only chosen here.
                    d.addOption("", $t("lang-auto"));
                    for (const language of SUPPORTED_I18N_LANGS) d.addOption(language, $t(`lang-${language}`));
                    d.setValue(this.settings.displayLanguage).onChange((next) => void this.save({ displayLanguage: next as never }));
                })
            ),
            this.stored("showStatusOnStatusbar"),
            this.stored("showStatusOnEditor"),
            this.stored("showOnlyIconsOnEditor", () => this.settings.showStatusOnEditor),
            settingRow($msg("tabularium.settings.networkWarning"), undefined, (setting) =>
                setting.addDropdown((d) =>
                    d
                        .addOption(NetworkWarningStyles.BANNER, $msg("tabularium.settings.networkBanner"))
                        .addOption(NetworkWarningStyles.ICON, $msg("tabularium.settings.networkIcon"))
                        .addOption(NetworkWarningStyles.HIDDEN, $msg("tabularium.settings.networkHidden"))
                        .setValue(this.settings.networkWarningStyle)
                        .onChange((next) => void this.save({ networkWarningStyle: next as never }))
                )
            ),
            this.stored("hideFileWarningNotice"),
        ];
    }

    private maintenance(): Section {
        const connected = () => this.connected;
        const links = () => this.owner.linkRepair;
        const menus = () => this.owner.editorMenus;
        return [
            group("tabularium.settings.recovery", [
                this.action("tabularium.settings.fetch", "tabularium.settings.fetchDesc", "tabularium.settings.fetchAction", () => this.fetchFromServer(), {
                    visible: connected,
                }),
                this.action("tabularium.settings.overwrite", "tabularium.settings.overwriteDesc", "tabularium.settings.overwriteAction", () => this.overwriteServer(), {
                    warning: true,
                    visible: connected,
                }),
                this.action("tabularium.settings.unlock", "tabularium.settings.unlockDesc", "tabularium.settings.unlock", () => this.unlock(), {
                    warning: true,
                    visible: () => connected() && Boolean(this.core.replicator?.remoteLocked),
                }),
                this.action("tabularium.settings.suspend", "tabularium.settings.suspendDesc", "tabularium.settings.suspendAction", async () => {
                    await this.core.storageAccess.writeFileAuto(FlagFiles.SUSPEND_ALL, "");
                    this.core.services.appLifecycle.performRestart();
                }),
                this.action("tabularium.settings.resetLocal", "tabularium.settings.resetLocalDesc", "tabularium.settings.resetLocalAction", () => this.resetLocal(), {
                    warning: true,
                }),
            ]),
            group("tabularium.settings.diagnosis", [
                this.action("tabularium.settings.log", "tabularium.settings.logDesc", "tabularium.settings.open", () => this.core.services.API.showWindow(VIEW_TYPE_LOG)),
                this.action("tabularium.settings.report", "tabularium.settings.reportDesc", "tabularium.settings.copy", () =>
                    this.app.commands.executeCommandById("tabularium:dump-debug-info")
                ),
                this.action("tabularium.settings.doctor", "tabularium.settings.doctorDesc", "tabularium.settings.run", () =>
                    eventHub.emitEvent(EVENT_REQUEST_RUN_DOCTOR, "")
                ),
                this.action("tabularium.settings.broken", "tabularium.settings.brokenDesc", "tabularium.settings.run", () =>
                    eventHub.emitEvent(EVENT_REQUEST_RUN_FIX_INCOMPLETE)
                ),
                this.action("tabularium.settings.resolveAll", "tabularium.settings.resolveAllDesc", "tabularium.settings.run", async () => {
                    const ok = await confirmAction(this.app, {
                        title: $msg("tabularium.settings.resolveAll"),
                        body: $msg("tabularium.settings.resolveAllDesc"),
                        impact: $msg("tabularium.settings.resolveAllImpact"),
                        action: $msg("tabularium.settings.run"),
                    });
                    if (ok) await this.core.services.conflict.resolveAllConflictedFilesByNewerOnes();
                }),
            ]),
            group(
                "tabularium.settings.links",
                [
                    this.action("tabularium.settings.checkLinks", "tabularium.settings.checkLinksDesc", "tabularium.settings.run", () => links()!.check()),
                    settingRow($msg("tabularium.settings.autoLinks"), $msg("tabularium.settings.autoLinksDesc"), (setting) =>
                        setting.addToggle((toggle) => toggle.setValue(links()!.auto).onChange((on) => (links()!.auto = on)))
                    ),
                ]
            ),
            group(
                "tabularium.settings.editor",
                [
                    settingRow($msg("tabularium.settings.formatToolbar"), $msg("tabularium.settings.formatToolbarDesc"), (setting) =>
                        setting.addToggle((toggle) => toggle.setValue(menus()!.toolbar).onChange((on) => (menus()!.toolbar = on)))
                    ),
                ]
            ),
            group(undefined, [
                page(
                    $msg("tabularium.settings.advanced"),
                    ADVANCED.map(({ heading, keys }) => group(heading, keys.map((key) => this.stored(key)))),
                    $msg("tabularium.settings.advancedDesc")
                ),
            ]),
        ];
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
        await this.core.storageAccess.writeFileAuto(FlagFiles.REBUILD_ALL, "");
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

    private help(): Section {
        const paragraphs = (texts: string[], cls?: string) => (setting: Setting) => {
            setting.settingEl.addClass("tabularium-help");
            for (const text of texts) setting.descEl.createEl("p", { cls, text });
        };
        return [
            group(
                undefined,
                HELP_TOPICS.map((topic) =>
                    page($msg(`tabularium.help.${topic}.title` as never), [
                        {
                            name: "",
                            searchable: false,
                            render: paragraphs(
                                $msg(`tabularium.help.${topic}.body` as never, { pluginDir: `${this.owner.manifest.dir ?? ""}/` }).split("\n\n")
                            ),
                        },
                    ])
                )
            ),
            group(undefined, [
                page(
                    $msg("tabularium.settings.changelog"),
                    RELEASES.map((version) => ({
                        name: version,
                        render: paragraphs($msg(`tabularium.release.${version}` as never).split("\n"), "tabularium-help-line"),
                    }))
                ),
            ]),
            group("tabularium.settings.about", [
                textRow($msg("tabularium.settings.version", { version: this.owner.manifest.version }), () => $msg("tabularium.settings.aboutDesc")),
            ]),
        ];
    }
}
