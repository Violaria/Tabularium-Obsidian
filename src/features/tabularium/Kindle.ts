import { Modal, Notice, Setting, TFile, TFolder, requestUrl, type Plugin, type TAbstractFile } from "obsidian";
import type { LiveSyncCore } from "@/main";
import type { TabulariumServer } from "./ServerLogin";
import { buildEpub, type EpubChapter, type EpubImage } from "./epub";
import { isPackableImage, renderNote } from "./render";

interface KindleStatus {
    configured: boolean;
    address: string | null;
    dailyLimit: number;
    remaining: number;
}
const MAX_BYTES = 50 * 1024 * 1024;
const MEDIA_TYPES: Record<string, string> = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif" };
const errors: Record<string, string> = {
    "Kindle address not set": "请先在服务器控制台的 Kindle 页面填写 Kindle 地址。",
    "Mail delivery is not configured": "服务器尚未配置发信。",
    "Daily Kindle delivery limit reached": "今天的发送次数已用完。",
    "Request body too large": "电子书超过 50 MB，请分开发送。",
};

const sendable = (file: TAbstractFile): file is TFile | TFolder => file instanceof TFolder || (file instanceof TFile && file.extension === "md");

/** Builds EPUBs from notes on this device and sends them through the Tabularium server's mail relay. */
export class TabulariumKindle {
    readonly plugin: Plugin;
    private readonly core: LiveSyncCore;
    private readonly server: TabulariumServer;

    constructor(plugin: Plugin, core: LiveSyncCore, server: TabulariumServer) {
        this.plugin = plugin;
        this.core = core;
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
        if (item instanceof TFile) return { files: [item], title: item.basename };
        return { files: this.notes(item), title: item.name || this.plugin.app.vault.getName(), folder: item.path };
    }

    private notes(folder: TFolder): TFile[] {
        const files: TFile[] = [];
        const walk = (folder: TFolder) => {
            for (const child of folder.children) {
                if (child instanceof TFolder) walk(child);
                else if (child instanceof TFile && child.extension === "md") files.push(child);
            }
        };
        walk(folder);
        return files.sort((a, b) => a.path.localeCompare(b.path, "zh"));
    }

    /**
     * Builds the book in memory; images are packed once each, in the order they are first referenced.
     * For a folder book, notes in sub-folders of `folder` are grouped by their relative folder path.
     */
    async build(files: TFile[], title: string, folder?: string) {
        const { app } = this.plugin;
        const images: EpubImage[] = [];
        const packed = new Map<string, string>();
        const queued: { file: TFile; href: string }[] = [];
        const root = folder === "/" ? "" : folder;
        const chapters: EpubChapter[] = [];
        for (const file of files) {
            const resolve = (target: string) => {
                const image = app.metadataCache.getFirstLinkpathDest(target, file.path);
                if (!image || !isPackableImage(image.path)) return undefined;
                if (!packed.has(image.path)) {
                    const href = `images/image-${packed.size + 1}.${image.extension.toLowerCase()}`;
                    packed.set(image.path, href);
                    queued.push({ file: image, href });
                }
                return packed.get(image.path);
            };
            const rendered = renderNote(await app.vault.cachedRead(file), resolve);
            const parent = file.parent?.path === "/" ? "" : (file.parent?.path ?? "");
            const group = root !== undefined && parent !== root ? parent.slice(root ? root.length + 1 : 0) : undefined;
            chapters.push({ title: file.basename, ...rendered, group });
        }
        for (const { file, href } of queued) {
            images.push({ href, mediaType: MEDIA_TYPES[file.extension.toLowerCase()], data: new Uint8Array(await app.vault.readBinary(file)) });
        }
        return buildEpub({ title, language: "zh", identifier: `urn:uuid:${crypto.randomUUID()}`, modified: new Date(), chapters, images });
    }

    private credentials() {
        const connection = this.server.connection;
        if (!connection) throw new Error("请先登录 Tabularium 服务器。");
        const settings = this.core.services.setting.currentSettings();
        return { server: connection.server, authorization: `Basic ${btoa(String.fromCharCode(...new TextEncoder().encode(`${settings.couchDB_USER}:${settings.couchDB_PASSWORD}`)))}` };
    }

    async status(): Promise<KindleStatus> {
        const { server, authorization } = this.credentials();
        const response = await requestUrl({ url: `${server}/api/v1/kindle/status`, headers: { authorization }, throw: false });
        if (response.status !== 200) throw new Error(`读取状态失败（HTTP ${response.status}）`);
        return response.json as KindleStatus;
    }

    /** Sends the notes as one book; throws with a readable message on failure. */
    async send(files: TFile[], title: string, folder?: string) {
        if (!files.length) throw new Error("没有可发送的笔记。");
        const { server, authorization } = this.credentials();
        const book = await this.build(files, title, folder);
        if (book.length > MAX_BYTES) throw new Error(errors["Request body too large"]);
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
            throw new Error(errors[reason] ?? reason);
        }
        return book.length;
    }

    /** Sends each item as its own book, one after another; stops at the first failure. */
    private async run(items: (TFile | TFolder)[]) {
        for (const item of items) {
            const { files, title, folder } = this.book(item);
            try {
                const size = await this.send(files, title, folder);
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

export function installKindle(plugin: Plugin, core: LiveSyncCore, server: TabulariumServer) {
    const kindle = new TabulariumKindle(plugin, core, server);
    kindle.install();
    return kindle;
}
