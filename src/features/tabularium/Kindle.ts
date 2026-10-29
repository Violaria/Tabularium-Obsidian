import { Modal, Notice, Setting, TFile, TFolder, requestUrl, type Plugin, type TAbstractFile } from "obsidian";
import type { TabulariumServer } from "./ServerLogin";
import { MAX_BOOK_BYTES, assembleBook, kindleErrors, notesIn, type BookSource } from "./kindleBook";

interface KindleStatus {
    configured: boolean;
    address: string | null;
    dailyLimit: number;
    remaining: number;
}
const sendable = (file: TAbstractFile): file is TFile | TFolder => file instanceof TFolder || (file instanceof TFile && file.extension === "md");

/** Builds EPUBs from notes on this device and sends them through the Tabularium server's mail relay. */
export class TabulariumKindle {
    readonly plugin: Plugin;
    private readonly server: TabulariumServer;

    constructor(plugin: Plugin, server: TabulariumServer) {
        this.plugin = plugin;
        this.server = server;
    }

    install() {
        const { app } = this.plugin;
        this.plugin.addCommand({
            id: "send-note-to-kindle",
            name: "发送当前笔记到 Kindle",
            checkCallback: (checking) => {
                const file = app.workspace.getActiveFile();
                if (!file || file.extension !== "md") return false;
                if (!checking) void this.run([file]);
                return true;
            },
        });
        this.plugin.addCommand({ id: "kindle-status", name: "Kindle 发送状态", callback: () => this.open() });
        // file-menu covers the file explorer and the "more options" menu of an open note; files-menu a multiple selection.
        this.plugin.registerEvent(
            app.workspace.on("file-menu", (menu, file) => {
                if (!sendable(file)) return;
                menu.addItem((item) => item.setTitle("发送到 Kindle").setIcon("send").onClick(() => void this.run([file])));
            })
        );
        this.plugin.registerEvent(
            app.workspace.on("files-menu", (menu, files) => {
                const items = files.filter(sendable);
                if (!items.length) return;
                menu.addItem((item) => item.setTitle(`发送 ${items.length} 项到 Kindle`).setIcon("send").onClick(() => void this.run(items)));
            })
        );
    }

    /** A note becomes a book of its own; a folder becomes one book of all notes below it. */
    book(item: TFile | TFolder) {
        if (item instanceof TFile) return { notes: [item.path], title: item.basename };
        const folder = item.isRoot() ? "" : item.path;
        return { notes: notesIn(folder, this.plugin.app.vault.getMarkdownFiles().map((file) => file.path)), title: item.name || this.plugin.app.vault.getName(), folder };
    }

    private get source(): BookSource {
        const { vault, metadataCache } = this.plugin.app;
        const file = (path: string) => {
            const found = vault.getFileByPath(path);
            if (!found) throw new Error(`找不到文件：${path}`);
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
        if (!connection) throw new Error("请先登录 Tabularium 服务器。");
        return { server: connection.server, authorization: this.server.deviceAuthorization() };
    }

    async status(): Promise<KindleStatus> {
        const { server, authorization } = this.credentials();
        const response = await requestUrl({ url: `${server}/api/v1/kindle/status`, headers: { authorization }, throw: false });
        if (response.status !== 200) throw new Error(`读取状态失败（HTTP ${response.status}）`);
        return response.json as KindleStatus;
    }

    /** Sends the notes as one book; throws with a readable message on failure. */
    async send(notes: string[], title: string, folder?: string) {
        if (!notes.length) throw new Error("没有可发送的笔记。");
        const { server, authorization } = this.credentials();
        const book = await assembleBook(this.source, notes, title, folder);
        if (book.length > MAX_BOOK_BYTES) throw new Error(kindleErrors["Request body too large"]);
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
            throw new Error(kindleErrors[reason] ?? reason);
        }
        return book.length;
    }

    /** Sends each item as its own book, one after another; stops at the first failure. */
    private async run(items: (TFile | TFolder)[]) {
        for (const item of items) {
            const { notes, title, folder } = this.book(item);
            try {
                const size = await this.send(notes, title, folder);
                new Notice(`已发送《${title}》到 Kindle（${(size / 1024).toFixed(0)} KB）。`);
            } catch (error) {
                new Notice(`发送《${title}》到 Kindle 失败：${(error as Error).message}`);
                return;
            }
        }
    }

    open() {
        new KindleModal(this).open();
    }
}

class KindleModal extends Modal {
    private readonly kindle: TabulariumKindle;
    constructor(kindle: TabulariumKindle) {
        super(kindle.plugin.app);
        this.kindle = kindle;
        this.setTitle("Kindle 发送状态");
    }
    override async onOpen() {
        const { contentEl } = this;
        const status = await this.kindle.status().catch((error: Error) => error);
        contentEl.empty();
        new Setting(contentEl)
            .setName("服务器状态")
            .setDesc(
                status instanceof Error
                    ? status.message
                    : !status.configured
                      ? "服务器尚未配置发信。"
                      : status.address
                        ? `发送到 ${status.address}，今天还可发送 ${status.remaining} 次。`
                        : "请先在服务器控制台的 Kindle 页面填写 Kindle 地址。"
            );
    }
    override onClose() {
        this.contentEl.empty();
    }
}

export function installKindle(plugin: Plugin, server: TabulariumServer) {
    const kindle = new TabulariumKindle(plugin, server);
    kindle.install();
    return kindle;
}
