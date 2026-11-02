import type ObsidianLiveSyncPlugin from "@/main";
import { createInstanceLogFunction } from "@tabularium/sync-core/compat/services/lib/logUtils";
import { computed, reactive, reactiveSource, type ReactiveValue } from "octagonal-wheels/dataobject/reactive";
import {
    LOG_LEVEL_DEBUG,
    LOG_LEVEL_INFO,
    LOG_LEVEL_VERBOSE,
    PREFIXMD_LOGFILE,
    type LOG_LEVEL,
} from "@tabularium/sync-core/compat/common/types";
import { scheduleTask } from "octagonal-wheels/concurrency/task";
import { fireAndForget, isDirty, throttle } from "@tabularium/sync-core/compat/common/utils";
import {
    chunkFetchCounts,
    pluginScanningCount,
    hiddenFilesEventCount,
    hiddenFilesProcessingCount,
    type LogEntry,
    logMessages,
} from "@tabularium/sync-core/compat/mock_and_interop/stores";
import {
    EVENT_FILE_RENAMED,
    EVENT_LAYOUT_READY,
    EVENT_LEAF_ACTIVE_CHANGED,
    EVENT_ON_UNRESOLVED_ERROR,
    eventHub,
} from "@/core/common/events.ts";
import { addIcon, debounce, normalizePath, Notice, stringifyYaml, type WorkspaceLeaf } from "@/deps.ts";
import { LOG_LEVEL_NOTICE, setGlobalLogFunction } from "octagonal-wheels/common/logger";
import { LogPaneView, VIEW_TYPE_LOG } from "@/ui/Log/LogPaneView.ts";
import { serialized } from "octagonal-wheels/concurrency/lock";
import { $msg, translateNotice } from "@/core/common/translation";
import { REMOTE_REQUEST_ACTIVITY_MINIMUM_VISIBLE_MS, getTrackedRequestCount } from "@/ui/statusBar/RemoteActivityStatus.ts";
import {
    CHUNK_FETCH_MARKS,
    createChunkFetchCounterLabel,
    createMinimumVisibleActivityCount,
    createPaddedCounterLabel,
} from "@/ui/statusBar/StatusBarDisplay.ts";
import { createFastForwardCheckedChangesDisplay, projectReplicationStatusLabel } from "@/ui/statusBar/ReplicationStatusLabel.ts";
import { createStatusBarRenderer, type StatusBarPart, type StatusBarRenderer } from "@/ui/statusBar/StatusBarRenderer.ts";
import type { LiveSyncCore } from "@/main.ts";
import { LiveSyncError } from "@tabularium/sync-core/compat/common/LSError";
import { isValidPath } from "@/obsidian/common/utils.ts";
import {
    isValidFilenameInAndroid,
    isValidFilenameInDarwin,
    isValidFilenameInWidows,
} from "@tabularium/sync-core/compat/string_and_binary/path";
import { MARK_LOG_NETWORK_ERROR, MARK_LOG_SEPARATOR } from "@tabularium/sync-core/compat/services/lib/logUtils";
import { NetworkWarningStyles } from "@tabularium/sync-core/compat/common/models/setting.const";
import { compatGlobal } from "@tabularium/sync-core/compat/common/coreEnvFunctions";
import { generateReport } from "@/obsidian/common/reportTool.ts";
import {
    ANDROID_LINUX_PATH_COMPONENT_UTF8_WARNING_BOUNDARY,
    findPathComponentsExceedingUtf8Limit,
} from "@/obsidian/common/pathCompatibility.ts";

// This module cannot be a core module because it depends on the Obsidian UI.

// DI the log again.
const recentLogEntries = reactiveSource<LogEntry[]>([]);
const globalLogFunction = (message: unknown, level?: number, key?: string) => {
    const messageX =
        message instanceof Error
            ? new LiveSyncError("[Error Logged]: " + message.message, { cause: message })
            : typeof message === "string"
              ? message
              : JSON.stringify(message);
    const entry = { message: messageX, level, key } as LogEntry;
    recentLogEntries.value = [...recentLogEntries.value, entry];
};

setGlobalLogFunction(globalLogFunction);
// Keep the recent logs in memory for display, but also keep a longer history in logForDump for when the user wants to see more logs.
// logForDump is not reactive and is only used for dumping logs when requested, while recentLogs is reactive and is used for displaying logs in the UI.
const logForDump = [] as string[];

function addLog(log: string) {
    logForDump.push(log);
    while (logForDump.length > 1000) {
        logForDump.shift();
    }
}

// Display log is kept separate from the full log history to optimize performance and memory usage.
// And debounce the updates to the display log to avoid excessive UI updates when there are many log entries in a short time.
const logForDisplay = [] as string[];

const updateLogMessage = debounce(() => {
    logMessages.value = [...logForDisplay];
}, 25);
function addDisplayLog(log: string) {
    logForDisplay.push(log);
    while (logForDisplay.length > 200) {
        logForDisplay.shift();
    }
    updateLogMessage();
}

const redactPatterns = [/PBKDF2 salt \(Security Seed\):.*$/];
function redactLog(log: string) {
    let redactedLog = log;
    for (const pattern of redactPatterns) {
        redactedLog = redactedLog.replace(pattern, (match) => {
            return match.split(":")[0] + ": [REDACTED]";
        });
    }
    return redactedLog;
}

// logStore.intercept(e => e.slice(Math.min(e.length - 200, 0)));

const showDebugLog = false;
export const MARK_DONE = "\u{2009}\u{2009}";
/** Plain glyphs for the status counters; each counter carries a translated tooltip. */
const STATUS_MARKS = {
    processing: "▸",
    pending: "…",
    batched: "□",
    replication: "R",
    database: "D",
    storage: "S",
    pluginScan: "P",
    hiddenFiles: "H",
    conflicts: "≠",
} as const;
export class ModuleLog {
    readonly plugin: ObsidianLiveSyncPlugin;
    readonly core: LiveSyncCore;
    private readonly _log: ReturnType<typeof createInstanceLogFunction>;
    constructor(plugin: ObsidianLiveSyncPlugin, core: LiveSyncCore) {
        this.plugin = plugin;
        this.core = core;
        this._log = createInstanceLogFunction("ModuleLog", core.services.API);
    }
    get app() {
        return this.plugin.app;
    }
    get services() {
        return this.core.services;
    }
    get settings() {
        return this.core.services.setting.settings;
    }

    statusBar?: HTMLElement;

    statusDiv?: HTMLElement;
    statusLine?: HTMLDivElement;
    logMessage?: HTMLDivElement;
    logHistory?: HTMLDivElement;
    messageArea?: HTMLDivElement;

    statusBarRenderer?: StatusBarRenderer;
    statusLineRenderer?: StatusBarRenderer;
    statusBarLabels!: ReactiveValue<{
        message: string;
        status: string;
        parts: readonly StatusBarPart[];
        statusBarParts: readonly StatusBarPart[];
    }>;
    statusLog = reactiveSource("");
    activeFileStatus = reactiveSource("");
    notifies: { [key: string]: { count: number } } = {};

    observeForLogs() {
        const registerDisplay = <T extends { dispose(): void }>(display: T): T => {
            this.plugin.register(() => display.dispose());
            return display;
        };
        const labelReplication = registerDisplay(
            createPaddedCounterLabel(this.services.replication.replicationResultCount, STATUS_MARKS.replication)
        );
        const labelDBCount = registerDisplay(
            createPaddedCounterLabel(this.services.replication.databaseQueueCount, STATUS_MARKS.database)
        );
        const labelStorageCount = registerDisplay(
            createPaddedCounterLabel(this.services.replication.storageApplyingCount, STATUS_MARKS.storage)
        );
        const labelChunkCount = registerDisplay(createChunkFetchCounterLabel(chunkFetchCounts));
        const labelPluginScanCount = registerDisplay(createPaddedCounterLabel(pluginScanningCount, STATUS_MARKS.pluginScan));
        const labelConflictProcessCount = registerDisplay(
            createPaddedCounterLabel(this.services.conflict.conflictProcessQueueCount, STATUS_MARKS.conflicts)
        );
        const hiddenFilesCount = reactive(() => hiddenFilesEventCount.value - hiddenFilesProcessingCount.value);
        const labelHiddenFilesCount = registerDisplay(createPaddedCounterLabel(hiddenFilesCount, STATUS_MARKS.hiddenFiles));
        const queueCountLabelX = reactive(() => {
            return `${labelReplication.value}${labelDBCount.value}${labelStorageCount.value}${labelChunkCount.value}${labelPluginScanCount.value}${labelHiddenFilesCount.value}${labelConflictProcessCount.value}`;
        });
        const queueCountLabel = () => queueCountLabelX.value;

        const trackedRequestCount = reactive(() => {
            return getTrackedRequestCount(this.services.API.requestCount.value, this.services.API.responseCount.value);
        });
        const displayedTrackedRequestCount = registerDisplay(
            createMinimumVisibleActivityCount(trackedRequestCount, REMOTE_REQUEST_ACTIVITY_MINIMUM_VISIBLE_MS)
        );

        const requestingStatLabel = computed(() => {
            return {
                remoteOperationCount: Math.max(0, this.services.replicator.boundedRemoteActivityCount.value),
                trackedRequestCount: displayedTrackedRequestCount.value,
            };
        });

        const fastForwardCount = registerDisplay(
            createFastForwardCheckedChangesDisplay(this.services.replicator.replicationStatics)
        );
        const replicationStatLabel = computed(() =>
            projectReplicationStatusLabel(
                this.services.replicator.replicationStatics.value,
                requestingStatLabel(),
                fastForwardCount.value
            )
        );
        const labelProc = registerDisplay(createPaddedCounterLabel(this.services.fileProcessing.processing, STATUS_MARKS.processing));
        const labelPend = registerDisplay(createPaddedCounterLabel(this.services.fileProcessing.totalQueued, STATUS_MARKS.pending));
        const labelInBatchDelay = registerDisplay(createPaddedCounterLabel(this.services.fileProcessing.batched, STATUS_MARKS.batched));
        const waitingLabel = computed(() => {
            return `${labelProc.value}${labelPend.value}${labelInBatchDelay.value}`;
        });
        const counterPart = (
            key: string,
            mark: string,
            value: number | undefined,
            title: string
        ): StatusBarPart[] => (value === undefined ? [] : [{ key, text: " " + mark, value, title }]);
        const statusLineLabel = computed(() => {
            const replication = replicationStatLabel();
            const queued = queueCountLabel();
            const waiting = waitingLabel();
            const firstLineParts = [
                ...replication.parts,
                ...counterPart("file-processing", STATUS_MARKS.processing, labelProc.count.value, $msg("moduleLog.statusFileProcessing")),
                ...counterPart("file-pending", STATUS_MARKS.pending, labelPend.count.value, $msg("moduleLog.statusFilePending")),
                ...counterPart("file-batched", STATUS_MARKS.batched, labelInBatchDelay.count.value, $msg("moduleLog.statusFileBatched")),
                ...counterPart("queue-replication", STATUS_MARKS.replication, labelReplication.count.value, $msg("moduleLog.statusQueueReplication")),
                ...counterPart("queue-database", STATUS_MARKS.database, labelDBCount.count.value, $msg("moduleLog.statusQueueDatabase")),
                ...counterPart("queue-storage", STATUS_MARKS.storage, labelStorageCount.count.value, $msg("moduleLog.statusQueueStorage")),
                ...counterPart("queue-chunk-initial", CHUNK_FETCH_MARKS.initial, labelChunkCount.initialCount.value, $msg("moduleLog.statusQueueChunkInitial")),
                ...counterPart("queue-chunk-retrying", CHUNK_FETCH_MARKS.retrying, labelChunkCount.retryingCount.value, $msg("moduleLog.statusQueueChunkRetrying")),
                ...counterPart("queue-plugin-scan", STATUS_MARKS.pluginScan, labelPluginScanCount.count.value, $msg("moduleLog.statusQueuePluginScan")),
                ...counterPart("queue-hidden-files", STATUS_MARKS.hiddenFiles, labelHiddenFilesCount.count.value, $msg("moduleLog.statusQueueHiddenFiles")),
                ...counterPart("queue-conflicts", STATUS_MARKS.conflicts, labelConflictProcessCount.count.value, $msg("moduleLog.statusQueueConflicts")),
            ];
            return {
                message: replication.message + waiting + queued,
                parts: firstLineParts,
                statusBarParts: firstLineParts,
            };
        });

        const statusBarLabels = reactive(() => {
            const scheduleMessage = this.services.appLifecycle.isReloadingScheduled()
                ? `${$msg("moduleLog.restartScheduled")}\n`
                : "";
            const { message, parts, statusBarParts } = statusLineLabel();
            const fileStatus = this.activeFileStatus.value;
            const status = scheduleMessage + this.statusLog.value;
            const fileStatusIcon = `${fileStatus && this.settings.hideFileWarningNotice ? " ✗ SKIP" : ""}`;
            const skipPart = fileStatusIcon === "" ? [] : [{ key: "file-skip", text: fileStatusIcon }];
            return {
                message: `${message}${fileStatusIcon}`,
                status,
                parts: [...parts, ...skipPart],
                statusBarParts: [...statusBarParts, ...skipPart],
            };
        });
        this.statusBarLabels = statusBarLabels;

        const applyToDisplay = throttle((label: typeof statusBarLabels.value) => {
            // const v = label;
            this.applyStatusBarText();
        }, 20);
        statusBarLabels.onChanged((label) => applyToDisplay(label.value));
        this.activeFileStatus.onChanged(() => this.updateMessageArea());
    }

    private _everyOnload(): Promise<boolean> {
        eventHub.onEvent(EVENT_LEAF_ACTIVE_CHANGED, () => this.onActiveLeafChange());
        eventHub.onceEvent(EVENT_LAYOUT_READY, () => this.onActiveLeafChange());
        eventHub.onEvent(EVENT_ON_UNRESOLVED_ERROR, () => this.updateMessageArea());

        return Promise.resolve(true);
    }
    adjustStatusDivPosition() {
        const mdv = this.app.workspace.getMostRecentLeaf();
        if (mdv && this.statusDiv) {
            this.statusDiv.remove();
            // this.statusDiv.pa();
            const container = mdv.view.containerEl;
            container.appendChild(this.statusDiv);
        }
    }

    async getActiveFileStatus() {
        const reason = [] as string[];
        const reasonWarn = [] as string[];
        const thisFile = this.app.workspace.getActiveFile();
        if (!thisFile) return "";
        const validPath = isValidPath(thisFile.path);
        if (!validPath) {
            reason.push($msg("moduleLog.fileInvalidPath"));
        } else {
            // The most narrow check: Filename validity on Windows
            const validOnWindows = isValidFilenameInWidows(thisFile.name);
            const validOnDarwin = isValidFilenameInDarwin(thisFile.name);
            const validOnAndroid = isValidFilenameInAndroid(thisFile.name);
            const labels = [];
            if (!validOnWindows) labels.push("Windows");
            if (!validOnDarwin) labels.push("macOS");
            if (!validOnAndroid) labels.push("Android");
            if (labels.length > 0) {
                reasonWarn.push($msg("moduleLog.filePlatformIncompatible", { platforms: labels.join(", ") }));
            }
        }
        const oversizedPathComponents = findPathComponentsExceedingUtf8Limit(thisFile.path);
        if (oversizedPathComponents.length > 0) {
            reasonWarn.push(
                $msg("moduleLog.pathComponentTooLong", {
                    maxBytes: `${ANDROID_LINUX_PATH_COMPONENT_UTF8_WARNING_BOUNDARY}`,
                })
            );
        }
        // Case Sensitivity
        if (this.services.vault.shouldCheckCaseInsensitively()) {
            const f = (await this.core.storageAccess.getFiles())
                .map((e) => e.path)
                .filter((e) => e.toLowerCase() == thisFile.path.toLowerCase());
            if (f.length > 1) {
                reason.push($msg("moduleLog.fileCaseConflict"));
            }
        }
        if (!(await this.services.vault.isTargetFile(thisFile.path))) {
            reason.push($msg("moduleLog.fileIgnored"));
        }
        if (this.services.vault.isFileSizeTooLarge(thisFile.stat.size)) {
            reason.push($msg("moduleLog.fileTooLarge"));
        }
        const result = reason.length > 0 ? $msg("moduleLog.fileNotSynchronised", { reasons: reason.join(", ") }) : "";
        const warnResult =
            reasonWarn.length > 0 ? $msg("moduleLog.fileWarning", { reasons: reasonWarn.join(", ") }) : "";
        return [result, warnResult].filter((e) => e).join("\n");
    }
    async setFileStatus() {
        const fileStatus = await this.getActiveFileStatus();
        this.activeFileStatus.value = fileStatus;
    }

    async updateMessageArea() {
        if (!this.messageArea) return;

        const showStatusOnEditor = this.settings?.showStatusOnEditor ?? false;
        if (this.statusDiv) {
            this.statusDiv.setCssStyles({ display: showStatusOnEditor ? "" : "none" });
        }
        if (!showStatusOnEditor) {
            this.messageArea.innerText = "";
            return;
        }

        const messageLines = [];
        const fileStatus = this.activeFileStatus.value;
        if (fileStatus && !this.settings.hideFileWarningNotice) messageLines.push(fileStatus);
        const messages = (await this.services.appLifecycle.getUnresolvedMessages()).flat().filter((e) => e);
        const stringMessages = messages.filter((m): m is string => typeof m === "string"); // for 'startsWith'
        const networkMessages = stringMessages.filter((m) => m.startsWith(MARK_LOG_NETWORK_ERROR));
        const otherMessages = stringMessages.filter((m) => !m.startsWith(MARK_LOG_NETWORK_ERROR));

        messageLines.push(...otherMessages);

        if (
            this.settings.networkWarningStyle !== NetworkWarningStyles.ICON &&
            this.settings.networkWarningStyle !== NetworkWarningStyles.HIDDEN
        ) {
            messageLines.push(...networkMessages);
        } else if (this.settings.networkWarningStyle === NetworkWarningStyles.ICON) {
            if (networkMessages.length > 0) messageLines.push($msg("moduleLog.networkErrorIcon"));
        }
        this.messageArea.innerText = messageLines.map((e) => `! ${e}`).join("\n");
    }

    onActiveLeafChange() {
        fireAndForget(async () => {
            this.adjustStatusDivPosition();
            await this.setFileStatus();
        });
    }

    nextFrameQueue: ReturnType<typeof compatGlobal.requestAnimationFrame> | undefined = undefined;
    logLines: { ttl: number; message: string }[] = [];

    applyStatusBarText() {
        if (this.nextFrameQueue) {
            return;
        }
        this.nextFrameQueue = compatGlobal.requestAnimationFrame(() => {
            this.nextFrameQueue = undefined;
            const { message, status } = this.statusBarLabels.value;
            // const recent = logMessages.value;
            const newMsg = message;
            let newLog = this.settings?.showOnlyIconsOnEditor ? "" : status;
            const moduleTagEnd = newLog.indexOf(`]${MARK_LOG_SEPARATOR}`);
            if (moduleTagEnd != -1) {
                newLog = newLog.substring(moduleTagEnd + MARK_LOG_SEPARATOR.length + 1);
            }

            const { parts, statusBarParts } = this.statusBarLabels.value;
            this.statusBarRenderer?.render(statusBarParts);
            if (this.statusDiv) {
                this.statusDiv.setCssStyles({ display: this.settings?.showStatusOnEditor ? "" : "none" });
            }
            if (this.settings?.showStatusOnEditor && this.statusDiv) {
                if (this.settings.showLongerLogInsideEditor) {
                    const now = new Date().getTime();
                    this.logLines = this.logLines.filter((e) => e.ttl > now);
                    const minimumNext = this.logLines.reduce(
                        (a, b) => (a < b.ttl ? a : b.ttl),
                        Number.MAX_SAFE_INTEGER
                    );
                    if (this.logLines.length > 0)
                        compatGlobal.setTimeout(() => this.applyStatusBarText(), minimumNext - now);
                    const recent = this.logLines.map((e) => e.message);
                    const recentLogs = recent.reverse().join("\n");
                    if (isDirty("recentLogs", recentLogs)) this.logHistory!.innerText = recentLogs;
                }
                if (isDirty("newMsg", newMsg)) this.statusLineRenderer?.render(parts);
                if (isDirty("newLog", newLog)) this.logMessage!.innerText = newLog;
            } else {
                // const root = activeDocument.documentElement;
                // root.style.setProperty("--log-text", "'" + (newMsg + "\\A " + newLog) + "'");
            }
        });

        scheduleTask("log-hide", 3000, () => {
            this.statusLog.value = "";
        });
    }

    private _allStartOnUnload(): Promise<boolean> {
        for (const key of Object.keys(this.notifies)) {
            this.services.context.notices.hide(`log:${key}`);
        }
        this.notifies = {};
        if (this.statusDiv) {
            this.statusDiv.remove();
        }
        compatGlobal.document.querySelectorAll(`.tabularium-status`)?.forEach((e) => e.remove());
        return Promise.resolve(true);
    }
    _everyOnloadStart(): Promise<boolean> {
        addIcon(
            "view-log",
            `<g transform="matrix(1.28 0 0 1.28 -131 -411)" fill="currentColor" fill-rule="evenodd">
        <path d="m103 330h76v12h-76z"/>
        <path d="m106 346v44h70v-44zm45 16h-20v-8h20z"/>
       </g>`
        );
        this.services.API.addRibbonIcon("view-log", $msg("moduleLog.showLog"), () => {
            void this.services.API.showWindow(VIEW_TYPE_LOG);
        }).addClass("livesync-ribbon-showlog");

        this.services.API.addCommand({
            id: "view-log",
            name: $msg("Show log"),
            callback: () => {
                void this.services.API.showWindow(VIEW_TYPE_LOG);
            },
        });
        this.services.API.addCommand({
            id: "dump-debug-info",
            name: $msg("Generate full report for opening the issue with debug info"),
            callback: async () => {
                const recentLog = [...logForDump];
                const report = await generateReport(this.services.setting.currentSettings(), this.core);
                const info = {
                    ...report,
                    recentLog: recentLog.map(redactLog),
                };
                const yaml = `\`\`\`\`
# ---- Debug Info Dump ----
${stringifyYaml(info)}
\`\`\`\``;
                if (await this.services.UI.promptCopyToClipboard($msg("moduleLog.debugInfoTitle"), yaml)) {
                    new Notice($msg("moduleLog.debugInfoCopied"));
                }
            },
        });
        this.services.API.registerWindow(VIEW_TYPE_LOG, (leaf: WorkspaceLeaf) => new LogPaneView(leaf, this.plugin));
        return Promise.resolve(true);
    }
    private _everyOnloadAfterLoadSettings(): Promise<boolean> {
        recentLogEntries.onChanged((entries) => {
            if (entries.value.length === 0) return;
            const newEntries = [...entries.value];
            recentLogEntries.value = [];
            newEntries.forEach((e) => this.__addLog(e.message, e.level, e.key));
        });
        eventHub.onEvent(EVENT_FILE_RENAMED, (data) => {
            void this.setFileStatus();
        });

        const w = compatGlobal.document.querySelectorAll(`.tabularium-status`);
        w.forEach((e) => e.remove());

        this.observeForLogs();

        if (this.settings.showStatusOnEditor) {
            this.statusDiv = this.app.workspace.containerEl.createDiv({ cls: "tabularium-status" });
            this.statusLine = this.statusDiv.createDiv({ cls: "tabularium-status-statusline" });
            this.messageArea = this.statusDiv.createDiv({ cls: "tabularium-status-messagearea" });
            this.logMessage = this.statusDiv.createDiv({ cls: "tabularium-status-logmessage" });
            this.logHistory = this.statusDiv.createDiv({ cls: "tabularium-status-loghistory" });
            this.statusDiv.setCssStyles({ display: this.settings?.showStatusOnEditor ? "" : "none" });
        }
        eventHub.onEvent(EVENT_LAYOUT_READY, () => this.adjustStatusDivPosition());
        if (this.settings?.showStatusOnStatusbar) {
            this.statusBar = this.services.API.addStatusBarItem();
            this.statusBar?.addClass("tabularium-syncstatusbar");
        }
        if (this.statusLine) {
            const renderer = createStatusBarRenderer(this.statusLine);
            this.statusLineRenderer = renderer;
            this.plugin.register(() => renderer.dispose());
        }
        if (this.statusBar) {
            const renderer = createStatusBarRenderer(this.statusBar);
            this.statusBarRenderer = renderer;
            this.plugin.register(() => renderer.dispose());
        }
        this.adjustStatusDivPosition();
        this._log("Log module loaded", LOG_LEVEL_INFO);
        this._log("Verbose log", LOG_LEVEL_VERBOSE);
        return Promise.resolve(true);
    }

    writeLogToTheFile(now: Date, vaultName: string, newMessage: string) {
        fireAndForget(() =>
            serialized("writeLog", async () => {
                const time = now.toISOString().split("T")[0];
                const logDate = `${PREFIXMD_LOGFILE}${time}.md`;
                const file = await this.core.storageAccess.isExists(normalizePath(logDate));
                if (!file) {
                    await this.core.storageAccess.appendHiddenFile(normalizePath(logDate), "```\n");
                }
                await this.core.storageAccess.appendHiddenFile(
                    normalizePath(logDate),
                    vaultName + ":" + newMessage + "\n"
                );
            })
        );
    }
    __addLog(message: unknown, level: LOG_LEVEL = LOG_LEVEL_INFO, key = ""): void {
        if (level == LOG_LEVEL_DEBUG && !showDebugLog) {
            return;
        }
        let memoOnly = false;
        if (level <= LOG_LEVEL_INFO && this.settings && this.settings.lessInformationInLog) {
            memoOnly = true;
        }
        if (this.settings && !this.settings.showVerboseLog && level == LOG_LEVEL_VERBOSE) {
            memoOnly = true;
        }
        const vaultName = this.services.vault.getVaultName();
        const now = new Date();
        const timestamp = now.toLocaleString();
        let errorInfo = "";
        if (message instanceof Error) {
            if (message instanceof LiveSyncError) {
                if (message.cause && message.cause instanceof Error) {
                    const causedError = message.cause;
                    errorInfo = `${causedError?.name}:${causedError?.message}\n[StackTrace]: ${message.stack}\n[CausedBy]: ${causedError?.stack}`;
                } else {
                    errorInfo = `${message.name}:${message.message}\n[StackTrace]: ${message.stack}`;
                }
            } else {
                const thisStack = new Error().stack;
                errorInfo = `${message.name}:${message.message}\n[StackTrace]: ${message.stack}\n[LogCallStack]: ${thisStack}`;
            }
        }
        const messageContent =
            typeof message == "string"
                ? message
                : message instanceof Error
                  ? `${errorInfo}`
                  : JSON.stringify(message, null, 2);
        const newMessage = timestamp + "->" + messageContent;

        if (this.settings?.writeLogToTheFile) {
            this.writeLogToTheFile(now, vaultName, newMessage);
        }
        addLog(newMessage);
        if (memoOnly) {
            return;
        }
        addDisplayLog(newMessage);
        if (!this.settings?.showOnlyIconsOnEditor) {
            this.statusLog.value = messageContent;
        }
        this.logLines.push({ ttl: now.getTime() + 3000, message: newMessage });

        if (level >= LOG_LEVEL_NOTICE) {
            if (!key) key = messageContent;
            if (key in this.notifies) {
                if (key == messageContent) {
                    this.notifies[key].count++;
                }
            } else {
                this.notifies[key] = {
                    count: 0,
                };
            }
            const timeout = 5000;
            const shouldExpire = !key.startsWith("keepalive-") || messageContent.indexOf(MARK_DONE) !== -1;
            // Notices are written in English by the code; they are shown in the interface language.
            const shown = typeof message == "string" ? translateNotice(messageContent) : messageContent;
            const noticeMessage =
                key == messageContent && this.notifies[key].count > 0
                    ? `(${this.notifies[key].count}):${shown}`
                    : shown;
            this.services.context.notices.show(`log:${key}`, noticeMessage, {
                durationMs: shouldExpire ? timeout : false,
            });
            if (shouldExpire) {
                scheduleTask(`notify-${key}`, timeout, () => {
                    delete this.notifies[key];
                });
            }
        }
    }
    install(): void {
        const core = this.core;
        const services = core.services;
        services.API.addLog.setHandler(globalLogFunction);
        services.appLifecycle.onInitialise.addHandler(this._everyOnloadStart.bind(this));
        services.appLifecycle.onSettingLoaded.addHandler(this._everyOnloadAfterLoadSettings.bind(this));
        services.appLifecycle.onLoaded.addHandler(this._everyOnload.bind(this));
        services.appLifecycle.onBeforeUnload.addHandler(this._allStartOnUnload.bind(this));
    }
}

export function installLog(plugin: ObsidianLiveSyncPlugin, core: LiveSyncCore) {
    const component = new ModuleLog(plugin, core);
    component.install();
    return component;
}
