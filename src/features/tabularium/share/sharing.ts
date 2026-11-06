// Creating, updating and listing the shares of one vault, for web notes and the plug-in alike. The client supplies the
// server calls (a browser session or the device's credentials) and access to the vault's files.
import { contentKey, encrypt, fromBase64Url, newShareKey, openRecord, sealRecord, toBase64Url, vaultShareKey, type ShareRecord } from "./crypto";
import { buildShare, encodeBundle, included, titleOf, type ShareSource } from "./package";

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
    desensitize: boolean;
    protect: boolean;
}
/** Changes made on this device: paths created, edited or deleted, and renames of files and folders (old path, new path). */
export interface Changes {
    paths: string[];
    renames: (readonly [string, string])[];
}
/** A share that could not be updated, and why. */
export interface ShareFailure {
    share: OwnShare;
    error: unknown;
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
        private readonly source: () => Promise<ShareSource>,
        /** This device, which becomes the uploader of the shares it saves. */
        private readonly deviceId: string
    ) {}
    private sealKey() {
        return (this.key ??= vaultShareKey(this.passphrase, this.vaultId));
    }

    /** Whether this device keeps the share up to date. */
    updatesHere(record: ShareRecord) {
        return !record.uploader || record.uploader === this.deviceId;
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
            uploader: this.deviceId,
            desensitize: settings.desensitize,
            protect: settings.protect,
        };
        const sealed = await sealRecord(await this.sealKey(), record);
        const password = settings.mode === "public" ? settings.password : Boolean(settings.password);
        // A search engine cannot read a page of drawings.
        const indexable = settings.indexable && !settings.protect;
        const view = existing
            ? await this.api.update(existing.view.id, { sealed, expiresAt: settings.expiresAt, password, indexable })
            : await this.api.create({ vaultId: this.vaultId, slug: settings.slug, mode: settings.mode, sealed, expiresAt: settings.expiresAt, password, indexable });
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
        const built = await buildShare(source, {
            title,
            target: record.target,
            folder: record.folder,
            authorised: new Set(record.authorised),
            reviewed: new Set(record.reviewed),
            idKey: record.key ? fromBase64Url(record.key) : undefined,
            desensitize: record.desensitize !== false,
            protect: record.protect === true,
        });
        const encoder = new TextEncoder();
        const plain = new Map<string, Uint8Array>([["manifest", encoder.encode(JSON.stringify(built.manifest))], ...built.files]);
        let files = plain;
        if (record.key) {
            const key = await contentKey(fromBase64Url(record.key), record.password || undefined);
            files = new Map();
            for (const [name, data] of plain) files.set(name, await encrypt(key, data));
        } else if (record.protect) {
            // A protected public page: encrypted in transit, with the key beside the content for the viewer to fetch.
            const raw = newShareKey();
            const key = await contentKey(raw);
            files = new Map([["key", raw]]);
            for (const [name, data] of plain) files.set(name, await encrypt(key, data));
        }
        const size = [...files.values()].reduce((sum, data) => sum + data.length, 0);
        if (size > this.maxBytes) throw new ShareError("tooLarge", size);
        let view = await this.api.upload(share.view.id, encodeBundle(files));
        const stamp = await builtFrom(source, record);
        if (built.unreviewed.length !== record.unreviewed || stamp !== record.built) {
            record.unreviewed = built.unreviewed.length;
            record.built = stamp;
            view = await this.api.update(view.id, { sealed: await sealRecord(await this.sealKey(), record) });
        }
        return { view, record };
    }

    /**
     * Rebuilds the active shares this device uploads that the changes touch. A share follows a rename of its note or folder
     * (renames made here, and renames another device made, which arrive as a deletion and a creation of the same name); a
     * share whose note or folder is gone is withdrawn, so nothing deleted stays published. One share failing leaves the
     * others to be updated. Returns the shares updated, those withdrawn and those that failed.
     */
    async refresh({ paths, renames }: Changes) {
        const { shares } = await this.list();
        const source = await this.source();
        const touched = (record: ShareRecord, next: ShareRecord) => [...paths, ...renames.flat()].some((path) => inside(record, path) || inside(next, path));
        return this.renew(shares, source, paths, renames, touched);
    }

    /**
     * Brings the shares this device updates up to what it holds, after it was away. Renames made elsewhere are followed by
     * name, as there is no record of the changes themselves.
     */
    async catchUp() {
        const { shares } = await this.list();
        const source = await this.source();
        const behind: OwnShare[] = [];
        for (const share of shares) {
            if (!share.record || share.view.state !== "active" || share.record.uploader !== this.deviceId) continue;
            if ((await builtFrom(source, share.record)) !== share.record.built) behind.push(share);
        }
        return this.renew(behind, source, [...source.files], [], () => true);
    }

    private async renew(shares: OwnShare[], source: ShareSource, paths: string[], renames: (readonly [string, string])[], touched: (record: ShareRecord, next: ShareRecord) => boolean) {
        const key = await this.sealKey();
        const withdrawn: OwnShare[] = [];
        const failed: ShareFailure[] = [];
        let updated = 0;
        const moved = (path: string) => {
            for (const [from, to] of renames) {
                if (path === from) return to;
                if (from && path.startsWith(`${from}/`)) return to + path.slice(from.length);
            }
            return path;
        };
        for (const share of shares) {
            const { record } = share;
            if (!record || share.view.state !== "active" || !this.updatesHere(record)) continue;
            const next: ShareRecord = { ...record, target: record.target && moved(record.target), authorised: record.authorised.map(moved) };
            if (!touched(record, next)) continue;
            try {
                if (!exists(next, source.files)) {
                    const found = relocated(next, paths, source.files);
                    if (found === undefined) {
                        await this.api.revoke(share.view.id);
                        withdrawn.push(share);
                        continue;
                    }
                    next.target = found;
                }
                let view = share.view;
                if (next.target !== record.target || next.authorised.some((path, i) => path !== record.authorised[i])) {
                    view = await this.api.update(view.id, { sealed: await sealRecord(key, next) });
                }
                await this.upload({ view, record: next });
                updated++;
            } catch (error) {
                if (!(error instanceof ShareError && error.code === "empty")) failed.push({ share, error });
            }
        }
        return { updated, withdrawn, failed };
    }

    revoke(share: OwnShare) {
        return this.api.revoke(share.view.id);
    }
}

const inside = (record: ShareRecord, path: string) =>
    path === record.target || (record.folder && (!record.target || path.startsWith(`${record.target}/`))) || record.authorised.includes(path);

/** A digest of the revisions of everything a share is built from; undefined on clients that do not catch up. */
async function builtFrom(source: ShareSource, record: ShareRecord) {
    if (!source.revision) return undefined;
    const paths = [...new Set([...included(record.target, record.folder, source.files), ...record.authorised.filter((path) => source.files.includes(path))])].sort();
    const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(paths.map((path) => [path, source.revision!(path)]))));
    return toBase64Url(new Uint8Array(hash));
}

/** Whether a share's note, or a file of its folder, is in the vault. */
const exists = (record: ShareRecord, files: readonly string[]) =>
    record.folder ? !record.target || files.some((file) => file.startsWith(`${record.target}/`)) : files.includes(record.target);
const lastSegment = (path: string) => path.slice(path.lastIndexOf("/") + 1);
/**
 * Where a share's missing note or folder went when another device renamed it: the one changed path with the same name
 * (for a folder, the one folder of that name above the changed paths). Undefined when there is none or more than one.
 */
function relocated(record: ShareRecord, paths: string[], files: readonly string[]) {
    const name = lastSegment(record.target);
    const present = paths.filter((path) => files.includes(path));
    const candidates = new Set<string>();
    for (const path of present) {
        if (!record.folder) {
            if (path !== record.target && lastSegment(path) === name) candidates.add(path);
            continue;
        }
        const segments = path.split("/");
        segments.slice(0, -1).forEach((segment, i) => {
            const folder = segments.slice(0, i + 1).join("/");
            if (segment === name && folder !== record.target) candidates.add(folder);
        });
    }
    return candidates.size === 1 ? [...candidates][0] : undefined;
}
