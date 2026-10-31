// Creating, updating and listing the shares of one vault, for web notes and the plug-in alike. The client supplies the
// server calls (a browser session or the device's credentials) and access to the vault's files.
import { contentKey, encrypt, fromBase64Url, newShareKey, openRecord, sealRecord, toBase64Url, vaultShareKey, type ShareRecord } from "./crypto";
import { buildShare, encodeBundle, titleOf, type ShareSource } from "./package";

export type ShareMode = "encrypted" | "public";
export interface ShareView {
    id: string;
    slug: string;
    vaultId: string;
    mode: ShareMode;
    sealed: string;
    expiresAt: number | null;
    password: boolean;
    indexable: boolean;
    views: number;
    size: number;
    createdAt: number;
    updatedAt: number | null;
    state: "active" | "expired" | "revoked";
}
export interface ShareList {
    base: string;
    maxBytes: number;
    shares: ShareView[];
}
export interface ShareApi {
    list(): Promise<ShareList>;
    create(body: Record<string, unknown>): Promise<ShareView>;
    update(id: string, body: Record<string, unknown>): Promise<ShareView>;
    upload(id: string, bundle: Uint8Array): Promise<ShareView>;
    revoke(id: string): Promise<void>;
}
/** A share of this vault with its record; the record is missing when it cannot be opened with this passphrase. */
export interface OwnShare {
    view: ShareView;
    record?: ShareRecord;
}
export interface ShareSettings {
    mode: ShareMode;
    slug: string;
    expiresAt: number | null;
    password: string;
    indexable: boolean;
    authorised: string[];
    reviewed: string[];
}
/** Errors the clients translate: the share is over the server's size limit, or the target has no files. */
export class ShareError extends Error {
    constructor(readonly code: "tooLarge" | "empty", readonly size = 0) {
        super(code);
    }
}

export class Sharing {
    private key?: Promise<CryptoKey>;
    private maxBytes = Infinity;
    constructor(
        private readonly api: ShareApi,
        private readonly vaultId: string,
        private readonly passphrase: string,
        private readonly vaultName: string,
        private readonly source: () => Promise<ShareSource>
    ) {}
    private sealKey() {
        return (this.key ??= vaultShareKey(this.passphrase, this.vaultId));
    }

    async list() {
        const list = await this.api.list();
        this.maxBytes = list.maxBytes;
        const key = await this.sealKey();
        const shares: OwnShare[] = [];
        for (const view of list.shares.filter((share) => share.vaultId === this.vaultId)) {
            let record: ShareRecord | undefined;
            try {
                record = await openRecord(key, view.sealed);
            } catch {
                /* sealed with another passphrase */
            }
            shares.push({ view, record });
        }
        return { base: list.base, shares };
    }

    /** The link to give out; an encrypted link carries its key after `#`, which browsers never send to the server. */
    static link(base: string, share: OwnShare) {
        const origin = (base || window.location.origin).replace(/\/$/, "");
        return `${origin}/s/${encodeURIComponent(share.view.slug)}${share.record?.key ? `#${share.record.key}` : ""}`;
    }

    /** Creates a share of `target`, or saves new settings for `existing`, then uploads its content. */
    async save(target: string, folder: boolean, settings: ShareSettings, existing?: OwnShare) {
        const record: ShareRecord = {
            v: 1,
            key: settings.mode === "encrypted" ? existing?.record?.key || toBase64Url(newShareKey()) : "",
            password: settings.password,
            target,
            folder,
            authorised: settings.authorised,
            reviewed: settings.reviewed,
            unreviewed: 0,
        };
        const sealed = await sealRecord(await this.sealKey(), record);
        const password = settings.mode === "public" ? settings.password : Boolean(settings.password);
        const view = existing
            ? await this.api.update(existing.view.id, { sealed, expiresAt: settings.expiresAt, password, indexable: settings.indexable })
            : await this.api.create({ vaultId: this.vaultId, slug: settings.slug, mode: settings.mode, sealed, expiresAt: settings.expiresAt, password, indexable: settings.indexable });
        try {
            return await this.upload({ view, record });
        } catch (error) {
            // A new share whose content could not be built is withdrawn, so no empty link is left behind.
            if (!existing) await this.api.revoke(view.id).catch((): void => undefined);
            throw error;
        }
    }

    /** Builds the share from the vault as it is now and replaces its content. */
    async upload(share: Required<OwnShare>) {
        const { record } = share;
        const source = await this.source();
        if (!source.files.some((file) => file === record.target || (record.folder && (!record.target || file.startsWith(`${record.target}/`))))) throw new ShareError("empty");
        const title = record.folder ? (record.target ? titleOf(record.target) : this.vaultName) : titleOf(record.target);
        const built = await buildShare(source, { title, target: record.target, folder: record.folder, authorised: new Set(record.authorised), reviewed: new Set(record.reviewed) });
        const encoder = new TextEncoder();
        const plain = new Map<string, Uint8Array>([["manifest", encoder.encode(JSON.stringify(built.manifest))], ...built.files]);
        let files = plain;
        if (record.key) {
            const key = await contentKey(fromBase64Url(record.key), record.password || undefined);
            files = new Map();
            for (const [name, data] of plain) files.set(name, await encrypt(key, data));
        }
        const size = [...files.values()].reduce((sum, data) => sum + data.length, 0);
        if (size > this.maxBytes) throw new ShareError("tooLarge", size);
        let view = await this.api.upload(share.view.id, encodeBundle(files));
        if (built.unreviewed.length !== record.unreviewed) {
            record.unreviewed = built.unreviewed.length;
            view = await this.api.update(view.id, { sealed: await sealRecord(await this.sealKey(), record) });
        }
        return { view, record };
    }

    /** Rebuilds the active shares that `changed` paths belong to; returns how many were updated. */
    async refresh(changed: string[]) {
        const { shares } = await this.list();
        let updated = 0;
        for (const share of shares) {
            const { record } = share;
            if (!record || share.view.state !== "active") continue;
            const touched = changed.some(
                (path) =>
                    path === record.target ||
                    (record.folder && (!record.target || path.startsWith(`${record.target}/`))) ||
                    record.authorised.includes(path)
            );
            if (!touched) continue;
            try {
                await this.upload({ view: share.view, record });
                updated++;
            } catch (error) {
                // A share whose note was deleted or renamed keeps its last content.
                if (!(error instanceof ShareError && error.code === "empty")) throw error;
            }
        }
        return updated;
    }

    revoke(share: OwnShare) {
        return this.api.revoke(share.view.id);
    }
}
