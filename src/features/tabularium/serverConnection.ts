import type { ObsidianLiveSyncSettings } from "@vrtmrz/livesync-commonlib/compat/common/types";

/** Server details kept next to the plug-in settings; contains no secrets. */
export interface TabulariumConnection {
    server: string;
    vaultId: string;
    vaultName: string;
    deviceId: string;
    deviceName: string;
    expiresAt: number;
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
} as const satisfies Partial<ObsidianLiveSyncSettings>;

const messages: Record<string, string> = {
    "Invalid username or password": "用户名或密码不正确。",
    "Invalid current password": "当前密码不正确。",
    "Change initial password first": "需要先修改初始密码。",
    "Too many requests": "尝试次数过多，请稍后再试。",
    "Vault is not ready": "笔记库尚未创建完成，请在服务器控制台重试建库。",
    "Invalid password": "新密码至少需要 12 个字符。",
};

export class TabulariumApiError extends Error {
    readonly status: number;
    constructor(status: number, message: string) {
        super(messages[message] ?? message);
        this.status = status;
    }
}

export function normaliseServer(input: string): string {
    let url: URL;
    try {
        url = new URL(input.trim());
    } catch {
        throw new TabulariumApiError(0, "服务器地址无效。");
    }
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new TabulariumApiError(0, "服务器地址须以 https:// 或 http:// 开头。");
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
    private async request<T>(path: string, method = "GET", body?: unknown): Promise<T> {
        let response: Response;
        try {
            response = await this.fetcher(`${this.server}/api/v1${path}`, {
                method,
                headers: { "content-type": "application/json", ...(this.token ? { authorization: `Bearer ${this.token}` } : {}) },
                body: body === undefined ? undefined : JSON.stringify(body),
            });
        } catch {
            throw new TabulariumApiError(0, "无法连接服务器，请检查地址和网络。");
        }
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        if (!response.ok) throw new TabulariumApiError(response.status, data.error ?? `HTTP ${response.status}`);
        return data as T;
    }
    async login(username: string, password: string): Promise<TabulariumUser> {
        const result = await this.request<{ token: string; user: TabulariumUser }>("/sessions", "POST", { username, password });
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
    async logout(): Promise<void> {
        if (!this.token) return;
        await this.request("/sessions/current", "DELETE");
        this.token = undefined;
    }
}

export function connectionSettings(server: string, vaultId: string, device: TabulariumDevice, passphrase: string) {
    if (!passphrase) throw new TabulariumApiError(0, "需要设置笔记解密口令。");
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
export function enforcedOverrides(next: ObsidianLiveSyncSettings, previous: ObsidianLiveSyncSettings): Partial<ObsidianLiveSyncSettings> {
    const overrides: Partial<ObsidianLiveSyncSettings> = {};
    for (const [key, value] of Object.entries(ENFORCED_SETTINGS)) {
        if (next[key as keyof ObsidianLiveSyncSettings] !== value) Object.assign(overrides, { [key]: value });
    }
    if (!next.passphrase && previous.passphrase) overrides.passphrase = previous.passphrase;
    return overrides;
}
