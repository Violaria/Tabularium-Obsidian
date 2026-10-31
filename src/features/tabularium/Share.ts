// Sharing from Obsidian: "Share…" on notes and folders opens the same dialog as web notes, and changes in the vault
// update the shares they belong to after a quiet period. Server calls use this device's credentials; texts come from the
// web pages' catalogue, so both clients word sharing the same way.
import { Modal, Notice, TFile, TFolder, requestUrl, type Plugin, type TAbstractFile } from "obsidian";
import { mount, unmount } from "svelte";
import { LOG_LEVEL_INFO } from "octagonal-wheels/common/logger";
import type { LiveSyncCore } from "@/main";
import { getResolvedLang } from "@/common/translation";
import { catalogues, type Language } from "../../../../server/ui/messages";
import type { TabulariumServer } from "./ServerLogin";
import type { TabulariumCustomSorting } from "./CustomSorting";
import ShareDialog from "./share/ShareDialog.svelte";
import { ShareError, Sharing, type ShareApi, type ShareList, type ShareView } from "./share/sharing";
import type { ShareSource, ShareTreeNode } from "./share/package";

const UPDATE_DELAY_MS = 10_000;
const shareable = (file: TAbstractFile): file is TFile | TFolder => file instanceof TFolder || (file instanceof TFile && file.extension === "md");

function language(): Language {
    const lang = getResolvedLang();
    return lang === "zh" ? "zh" : lang === "la" ? "la" : "en";
}
export function shareText(key: string, params: Record<string, string | number> = {}) {
    const catalogue = catalogues[language()] as Record<string, string>;
    const text = catalogue[key] ?? (catalogues.en as Record<string, string>)[key] ?? key;
    return text.replace(/\{(\w+)\}/g, (match, name: string) => (name in params ? String(params[name]) : match));
}
const shareError = (code: string) => {
    const key = `error.${code}`;
    return key in catalogues.en ? shareText(key) : code;
};

export class TabulariumShare {
    private timer?: number;
    private readonly changed = new Set<string>();

    constructor(
        private readonly plugin: Plugin,
        private readonly server: TabulariumServer,
        private readonly core: LiveSyncCore,
        private readonly sorting: () => TabulariumCustomSorting | undefined
    ) {}

    install() {
        const { app } = this.plugin;
        this.plugin.registerEvent(
            app.workspace.on("file-menu", (menu, file) => {
                if (!shareable(file) || !this.server.connection) return;
                menu.addItem((item) =>
                    item
                        .setTitle(shareText("share.menu"))
                        .setIcon("share-2")
                        .onClick(() => void this.open(file).catch((error) => new Notice(shareError(error instanceof Error ? error.message : String(error)))))
                );
            })
        );
        // Obsidian reports every file as created while it loads the vault; changes count from when the layout is ready.
        app.workspace.onLayoutReady(() => {
            const touched = (path: string) => this.touched([path]);
            this.plugin.registerEvent(app.vault.on("modify", (file) => touched(file.path)));
            this.plugin.registerEvent(app.vault.on("create", (file) => touched(file.path)));
            this.plugin.registerEvent(app.vault.on("delete", (file) => touched(file.path)));
            this.plugin.registerEvent(app.vault.on("rename", (file, old) => this.touched([file.path, old])));
        });
    }

    private sharing() {
        const connection = this.server.connection;
        if (!connection) throw new Error(shareText("share.signInFirst"));
        const authorization = this.server.deviceAuthorization();
        const call = async <T>(path: string, method = "GET", body?: unknown, binary?: Uint8Array): Promise<T> => {
            const response = await requestUrl({
                url: `${connection.server}/api/v1/shares${path}`,
                method,
                headers: { authorization },
                contentType: binary ? "application/octet-stream" : "application/json",
                body: binary ? (binary.buffer.slice(binary.byteOffset, binary.byteOffset + binary.byteLength) as ArrayBuffer) : body === undefined ? undefined : JSON.stringify(body),
                throw: false,
            });
            let result: (T & { error?: string }) | undefined;
            try {
                result = response.json as T & { error?: string };
            } catch {
                /* not JSON */
            }
            if (response.status >= 400) throw new Error(result?.error ?? `HTTP ${response.status}`);
            return result as T;
        };
        const api: ShareApi = {
            list: () => call<ShareList>(""),
            create: (body) => call<ShareView>("", "POST", body),
            update: (id, body) => call<ShareView>(`/${id}`, "PATCH", body),
            upload: (id, bundle) => call<ShareView>(`/${id}/content`, "PUT", undefined, bundle),
            revoke: async (id) => {
                await call(`/${id}`, "DELETE");
            },
        };
        const passphrase = this.core.services.setting.currentSettings().passphrase;
        return new Sharing(api, connection.vaultId, passphrase, this.plugin.app.vault.getName(), () => Promise.resolve(this.source()));
    }

    /** The vault's files, with folders in the order the file explorer shows them (the vault's sortspec.md rules). */
    private source(): ShareSource {
        const { vault } = this.plugin.app;
        const file = (path: string) => {
            const found = vault.getFileByPath(path);
            if (!found) throw new ShareError("empty");
            return found;
        };
        const ordered = (folder: TFolder): TAbstractFile[] => {
            const sorting = this.sorting();
            if (sorting) return sorting.orderedFolderItemsForBookmarking(folder, undefined as never);
            return [...folder.children].sort((a, b) =>
                a instanceof TFolder === b instanceof TFolder ? a.name.localeCompare(b.name) : a instanceof TFolder ? -1 : 1
            );
        };
        const convert = (item: TAbstractFile): ShareTreeNode =>
            item instanceof TFolder
                ? { name: item.name, path: item.path, folder: true, children: ordered(item).map(convert) }
                : { name: item.name, path: item.path, folder: false, children: [] };
        return {
            files: vault.getFiles().map((f) => f.path),
            read: (path) => vault.cachedRead(file(path)),
            readBinary: async (path) => new Uint8Array(await vault.readBinary(file(path))),
            tree: (folder) => {
                const found = folder ? vault.getFolderByPath(folder) : vault.getRoot();
                return found ? convert(found) : { name: folder, path: folder, folder: true, children: [] };
            },
        };
    }

    async open(item: TFile | TFolder) {
        const sharing = this.sharing();
        const folder = item instanceof TFolder;
        const target = folder && item.isRoot() ? "" : item.path;
        const { base, shares } = await sharing.list();
        const existing = shares.find((s) => s.view.state === "active" && s.record?.target === target && s.record.folder === folder);
        new ShareModal(this.plugin, {
            sharing,
            source: this.source(),
            target,
            folder,
            name: folder ? item.name || this.plugin.app.vault.getName() : item.basename,
            base: base || this.server.connection!.server,
            existing,
        }).open();
    }

    private touched(paths: string[]) {
        if (!this.server.connection) return;
        for (const path of paths) this.changed.add(path);
        window.clearTimeout(this.timer);
        this.timer = window.setTimeout((): void => void this.update(), UPDATE_DELAY_MS);
    }
    private async update() {
        const paths = [...this.changed];
        this.changed.clear();
        if (!paths.length || !this.server.connection) return;
        try {
            await this.sharing().refresh(paths);
        } catch (error) {
            // Being offline is not reported: the next change tries again.
            if (error instanceof ShareError) new Notice(shareText("share.updateFailed", { error: error.code === "tooLarge" ? shareText("share.tooLarge", { size: `${Math.ceil(error.size / 1048576)} MB` }) : shareText("share.empty") }));
            else this.core.services.API.addLog(`Updating shares failed: ${error instanceof Error ? error.message : String(error)}`, LOG_LEVEL_INFO, "share");
        }
    }
}

interface DialogProps {
    sharing: Sharing;
    source: ShareSource;
    target: string;
    folder: boolean;
    name: string;
    base: string;
    existing?: Awaited<ReturnType<Sharing["list"]>>["shares"][number];
}
class ShareModal extends Modal {
    private component?: ReturnType<typeof mount>;
    constructor(
        plugin: Plugin,
        private readonly props: DialogProps
    ) {
        super(plugin.app);
    }
    override onOpen() {
        this.modalEl.addClass("tabularium-share-modal");
        this.component = mount(ShareDialog, {
            target: this.contentEl,
            props: {
                ...this.props,
                t: shareText,
                serverError: shareError,
                formatDate: (time: number) => new Date(time).toLocaleString(),
                confirmRevoke: () => confirm(this.app, shareText("share.revokeTitle"), shareText("share.revokeBody"), shareText("share.revoke")),
                close: () => this.close(),
            },
        });
    }
    override onClose() {
        if (this.component) void unmount(this.component);
        this.contentEl.empty();
    }
}

/** A confirmation in Obsidian's own dialog, with the action named on a red button. */
function confirm(app: Plugin["app"], title: string, body: string, action: string) {
    return new Promise<boolean>((resolve) => {
        const modal = new (class extends Modal {
            answered = false;
            override onOpen() {
                this.titleEl.setText(title);
                this.contentEl.createEl("p", { text: body });
                const buttons = this.contentEl.createDiv({ cls: "modal-button-container" });
                buttons.createEl("button", { text: shareText("share.cancel") }).addEventListener("click", () => this.close());
                buttons.createEl("button", { text: action, cls: "mod-warning" }).addEventListener("click", () => {
                    this.answered = true;
                    this.close();
                });
            }
            override onClose() {
                resolve(this.answered);
                this.contentEl.empty();
            }
        })(app);
        modal.open();
    });
}

export function installShare(plugin: Plugin, server: TabulariumServer, core: LiveSyncCore, sorting: () => TabulariumCustomSorting | undefined) {
    const share = new TabulariumShare(plugin, server, core, sorting);
    share.install();
    return share;
}
