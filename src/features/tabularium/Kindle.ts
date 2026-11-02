import { Modal, Notice, Setting, TFile, TFolder, requestUrl, type Plugin, type TAbstractFile } from "obsidian";
import type { TabulariumServer } from "./ServerLogin";
import type { LiveSyncCore } from "@/main";
import { $msg } from "@/common/translation";
import { MAX_BOOK_BYTES, assembleBook, notesIn, type BookSource } from "./kindleBook";
import { bookTexts, serverError } from "./texts";

interface KindleStatus {
    configured: boolean;
    address: string | null;
    dailyLimit: number;
    remaining: number;
}
const sendable = (file: TAbstractFile): file is TFile | TFolder =>
    file instanceof TFolder || (file instanceof TFile && file.extension === "md");

/** Builds EPUBs from notes on this device and sends them through the Tabularium server's mail relay. */
export class TabulariumKindle {
    readonly plugin: Plugin;
    private readonly server: TabulariumServer;

    constructor(plugin: Plugin, server: TabulariumServer) {
        this.plugin = plugin;
        this.server = server;
    }

    private addCommands() {
        const { app } = this.plugin;
        this.plugin.addCommand({
            id: "send-note-to-kindle",
            name: $msg("tabularium.kindle.sendCurrent"),
            checkCallback: (checking) => {
                const file = app.workspace.getActiveFile();
                if (!file || file.extension !== "md" || !this.server.connection) return false;
                if (!checking) void this.run([file]);
                return true;
            },
        });
        this.plugin.addCommand({
            id: "kindle-status",
            name: $msg("tabularium.kindle.status"),
            callback: () => this.open(),
        });
    }

    install(core: LiveSyncCore) {
        const { app } = this.plugin;
        // Registered once the display language is known, so the command names follow it.
        core.services.appLifecycle.onSettingLoaded.addHandler(() => {
            this.addCommands();
            return Promise.resolve(true);
        });
        // file-menu covers the file explorer and the "more options" menu of an open note; files-menu a multiple selection.
        this.plugin.registerEvent(
            app.workspace.on("file-menu", (menu, file) => {
                if (!sendable(file) || !this.server.connection) return;
                menu.addItem((item) =>
                    item
                        .setTitle($msg("tabularium.kindle.send"))
                        .setIcon("send")
                        .onClick(() => void this.run([file]))
                );
            })
        );
        this.plugin.registerEvent(
            app.workspace.on("files-menu", (menu, files) => {
                const items = files.filter(sendable);
                if (!items.length || !this.server.connection) return;
                menu.addItem((item) =>
                    item
                        .setTitle($msg("tabularium.kindle.sendItems", { count: String(items.length) }))
                        .setIcon("send")
                        .onClick(() => void this.run(items))
                );
            })
        );
    }

    /** A note becomes a book of its own; a folder becomes one book of all notes below it. */
    book(item: TFile | TFolder) {
        if (item instanceof TFile) return { notes: [item.path], title: item.basename };
        const folder = item.isRoot() ? "" : item.path;
        return {
            notes: notesIn(
                folder,
                this.plugin.app.vault.getMarkdownFiles().map((file) => file.path)
            ),
            title: item.name || this.plugin.app.vault.getName(),
            folder,
        };
    }

    private get source(): BookSource {
        const { vault, metadataCache } = this.plugin.app;
        const file = (path: string) => {
            const found = vault.getFileByPath(path);
            if (!found) throw new Error($msg("tabularium.kindle.fileMissing", { path }));
            return found;
        };
        return {
            read: (path) => vault.cachedRead(file(path)),
            readBinary: async (path) => new Uint8Array(await vault.readBinary(file(path))),
            resolve: (target, from) => metadataCache.getFirstLinkpathDest(target, from)?.path,
        };
    }

    private credentials() {
        const connection = this.server.connection;
        if (!connection) throw new Error($msg("tabularium.kindle.signInFirst"));
        return { server: connection.server, authorization: this.server.deviceAuthorization() };
    }

    async status(): Promise<KindleStatus> {
        const { server, authorization } = this.credentials();
        const response = await requestUrl({
            url: `${server}/api/v1/kindle/status`,
            headers: { authorization },
            throw: false,
        });
        if (response.status !== 200)
            throw new Error($msg("tabularium.kindle.statusFailed", { status: String(response.status) }));
        return response.json as KindleStatus;
    }

    /** Sends the notes as one book; throws with a readable message on failure. */
    async send(notes: string[], title: string, folder?: string) {
        if (!notes.length) throw new Error($msg("tabularium.kindle.noNotes"));
        const { server, authorization } = this.credentials();
        const book = await assembleBook(this.source, notes, title, bookTexts(), folder);
        if (book.length > MAX_BOOK_BYTES) throw new Error(serverError("Request body too large"));
        const response = await requestUrl({
            url: `${server}/api/v1/kindle/send`,
            method: "POST",
            headers: { authorization, "x-tabularium-filename": encodeURIComponent(`${title}.epub`) },
            contentType: "application/epub+zip",
            body: book.buffer.slice(book.byteOffset, book.byteOffset + book.byteLength) as ArrayBuffer,
            throw: false,
        });
        if (response.status !== 200) {
            const reason = (response.json as { error?: string } | undefined)?.error ?? `HTTP ${response.status}`;
            throw new Error(serverError(reason));
        }
        return book.length;
    }

    /** Sends each item as its own book, one after another; stops at the first failure. */
    private async run(items: (TFile | TFolder)[]) {
        for (const item of items) {
            const { notes, title, folder } = this.book(item);
            try {
                const size = await this.send(notes, title, folder);
                new Notice($msg("tabularium.kindle.sent", { title, size: (size / 1024).toFixed(0) }));
            } catch (error) {
                new Notice($msg("tabularium.kindle.sendFailed", { title, error: (error as Error).message }));
                return;
            }
        }
    }

    open() {
        new KindleModal(this).open();
    }

    /** The server's mail setting and this account's Kindle address with today's remaining sends. */
    async statusText() {
        const status = await this.status().catch((error: Error) => error);
        return status instanceof Error
            ? status.message
            : !status.configured
              ? serverError("Mail delivery is not configured")
              : status.address
                ? $msg("tabularium.kindle.sendingTo", { address: status.address, remaining: String(status.remaining) })
                : serverError("Kindle address not set");
    }
}

class KindleModal extends Modal {
    private readonly kindle: TabulariumKindle;
    constructor(kindle: TabulariumKindle) {
        super(kindle.plugin.app);
        this.kindle = kindle;
        this.setTitle($msg("tabularium.kindle.status"));
    }
    override async onOpen() {
        this.contentEl.empty();
        new Setting(this.contentEl).setName($msg("tabularium.kindle.serverStatus")).setDesc(await this.kindle.statusText());
        new Setting(this.contentEl).setDesc($msg("tabularium.kindle.settingDesc"));
    }
    override onClose() {
        this.contentEl.empty();
    }
}

export function installKindle(plugin: Plugin, server: TabulariumServer, core: LiveSyncCore) {
    const kindle = new TabulariumKindle(plugin, server);
    kindle.install(core);
    return kindle;
}
