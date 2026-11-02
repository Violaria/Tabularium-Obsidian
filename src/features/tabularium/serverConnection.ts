import type { ObsidianLiveSyncSettings } from "@tabularium/sync-core/compat/common/types";
import { $msg } from "@/core/common/translation";
import { serverError } from "./texts";

/** Server details kept next to the plug-in settings; contains no secrets. */
export interface TabulariumConnection {
    server: string;
    vaultId: string;
    vaultName: string;
    deviceId: string;
    deviceName: string;
    expiresAt: number;
    /** Obsidian's ID of the vault that signed in; a plug-in folder copied into another vault does not connect there. */
    appId?: string;
}
export interface TabulariumUser {
    id: string;
    username: string;
    mustChangePassword: boolean;
}
export interface TabulariumVault {
    id: string;
    name: string;
    state: string;
}
export interface TabulariumDevice {
    id: string;
    username: string;
    password: string;
    expiresAt: number;
}
type Fetcher = (url: string, init: RequestInit) => Promise<Response>;

/** Settings a Tabularium vault requires; the gateway rejects documents written without them. */
export const ENFORCED_SETTINGS = {
    encrypt: true,
    E2EEAlgorithm: "v2",
    usePathObfuscation: true,
    syncInternalFiles: false,
    usePluginSync: false,
    // Peer-to-peer sync would bypass the gateway.
    P2P_Enabled: false,
    P2P_AutoStart: false,
} as const satisfies Partial<ObsidianLiveSyncSettings>;

export class TabulariumApiError extends Error {
    readonly status: number;
    constructor(status: number, message: string) {
        super(serverError(message));
        this.status = status;
    }
}

export function normaliseServer(input: string): string {
    let url: URL;
    try {
        url = new URL(input.trim());
    } catch {
        throw new TabulariumApiError(0, $msg("tabularium.server.invalidAddress"));
    }
    if (url.protocol !== "https:" && url.protocol !== "http:")
        throw new TabulariumApiError(0, $msg("tabularium.server.addressScheme"));
    return `${url.origin}${url.pathname.replace(/\/+$/, "")}`;
}

/** Management API calls made during login; the session token lives only in this object. */
export class TabulariumApi {
    private token?: string;
    readonly server: string;
    private readonly fetcher: Fetcher;
    constructor(server: string, fetcher: Fetcher) {
        this.server = normaliseServer(server);
        this.fetcher = fetcher;
    }
    private async request<T>(
        path: string,
        method = "GET",
        body?: unknown,
        authorization = this.token ? `Bearer ${this.token}` : undefined
    ): Promise<T> {
        let response: Response;
        try {
            response = await this.fetcher(`${this.server}/api/v1${path}`, {
                method,
                headers: { "content-type": "application/json", ...(authorization ? { authorization } : {}) },
                body: body === undefined ? undefined : JSON.stringify(body),
            });
        } catch {
            throw new TabulariumApiError(0, $msg("tabularium.server.unreachable"));
        }
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        if (!response.ok) throw new TabulariumApiError(response.status, data.error ?? `HTTP ${response.status}`);
        return data as T;
    }
    async login(username: string, password: string): Promise<TabulariumUser> {
        const result = await this.request<{ token: string; user: TabulariumUser }>("/sessions", "POST", {
            username,
            password,
        });
        this.token = result.token;
        return result.user;
    }
    async changePassword(currentPassword: string, password: string): Promise<void> {
        if (password.length < 12) throw new TabulariumApiError(400, "Invalid password");
        await this.request("/me/password", "PUT", { currentPassword, password });
    }
    vaults(): Promise<TabulariumVault[]> {
        return this.request("/vaults");
    }
    createVault(name: string): Promise<TabulariumVault> {
        return this.request("/vaults", "POST", { name });
    }
    issueDevice(vaultId: string, name: string): Promise<TabulariumDevice> {
        return this.request(`/vaults/${encodeURIComponent(vaultId)}/devices`, "POST", { name });
    }
    /** Restarts the expiry of the device whose sync credentials are given; the secret stays the same. */
    renewDevice(deviceAuthorization: string): Promise<{ expiresAt: number }> {
        return this.request("/devices/current/renew", "POST", undefined, deviceAuthorization);
    }
    async logout(): Promise<void> {
        if (!this.token) return;
        await this.request("/sessions/current", "DELETE");
        this.token = undefined;
    }
}

export function connectionSettings(server: string, vaultId: string, device: TabulariumDevice, passphrase: string) {
    if (!passphrase) throw new TabulariumApiError(0, $msg("tabularium.server.passphraseRequired"));
    return {
        ...ENFORCED_SETTINGS,
        couchDB_URI: `${normaliseServer(server)}/sync`,
        couchDB_DBNAME: vaultId,
        couchDB_USER: device.username,
        couchDB_PASSWORD: device.password,
        passphrase,
        isConfigured: true,
        liveSync: true,
    } satisfies Partial<ObsidianLiveSyncSettings>;
}

/** Values to restore when settings about to be saved would weaken a Tabularium connection. */
export function enforcedOverrides(
    next: ObsidianLiveSyncSettings,
    previous: ObsidianLiveSyncSettings
): Partial<ObsidianLiveSyncSettings> {
    const overrides: Partial<ObsidianLiveSyncSettings> = {};
    for (const [key, value] of Object.entries(ENFORCED_SETTINGS)) {
        if (next[key as keyof ObsidianLiveSyncSettings] !== value) Object.assign(overrides, { [key]: value });
    }
    if (!next.passphrase && previous.passphrase) overrides.passphrase = previous.passphrase;
    return overrides;
}
