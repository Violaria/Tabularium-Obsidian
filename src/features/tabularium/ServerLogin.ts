import { Modal, Notice, Setting, normalizePath, type Plugin } from "obsidian";
import { REMOTE_COUCHDB, type ObsidianLiveSyncSettings } from "@vrtmrz/livesync-commonlib/compat/common/types";
import { upsertRemoteConfigurationInPlace } from "@vrtmrz/livesync-commonlib/remote-configurations";
import { applySettingsWithScheduledInitialisation } from "@/serviceFeatures/setupObsidian/setupActivationLifecycle.ts";
import { type SetupManager, UserMode } from "@/modules/features/SetupManager";
import type { LiveSyncCore } from "@/main";
import {
    connectionSettings,
    enforcedOverrides,
    TabulariumApi,
    TabulariumApiError,
    type TabulariumConnection,
    type TabulariumDevice,
    type TabulariumVault,
} from "./serverConnection";

export interface ConnectOptions {
    server: string;
    username: string;
    password: string;
    newPassword?: string;
    vault: { id: string } | { create: string };
    deviceName: string;
    passphrase: string;
}
/** A new vault is empty, so the device uploads through ordinary sync; an existing vault is fetched first. */
type Initialise = "upload" | "fetch";

const randomKey = () => Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) => byte.toString(16).padStart(2, "0")).join("");

/** Connects this plug-in to a Tabularium server and keeps the connection encrypted. */
export class TabulariumServer {
    connection?: TabulariumConnection;
    readonly app: Plugin["app"];
    private readonly plugin: Plugin;
    private readonly core: LiveSyncCore;
    private readonly setupManager: SetupManager;

    constructor(plugin: Plugin, core: LiveSyncCore, setupManager: SetupManager) {
        this.plugin = plugin;
        this.app = plugin.app;
        this.core = core;
        this.setupManager = setupManager;
    }

    private get file() {
        return normalizePath(`${this.plugin.manifest.dir}/tabularium.json`);
    }

    install() {
        const settings = this.core.services.setting;
        settings.onBeforeSaveSettingData.addHandler(async (next: ObsidianLiveSyncSettings, previous: ObsidianLiveSyncSettings) => {
            if (!this.connection) return;
            const overrides = enforcedOverrides(next, previous);
            if (Object.keys(overrides).length) new Notice("Tabularium 要求保持端到端加密和路径混淆，相关设置已恢复。");
            return await Promise.resolve(overrides);
        });
        this.core.services.appLifecycle.onSettingLoaded.addHandler(async () => {
            const adapter = this.plugin.app.vault.adapter;
            if (await adapter.exists(this.file)) this.connection = JSON.parse(await adapter.read(this.file)) as TabulariumConnection;
            if (!this.connection) return true;
            const current = settings.currentSettings();
            const overrides = enforcedOverrides(current, current);
            if (Object.keys(overrides).length) await settings.applyPartial(overrides, true);
            return true;
        });
        this.plugin.addCommand({ id: "server-connection", name: "服务器连接", callback: () => this.open() });
    }

    api(server: string) {
        return new TabulariumApi(server, (url, init) => this.core.services.API.nativeFetch(url, init));
    }

    /** The whole login flow without dialogues; the interactive flow goes through the same steps. */
    async connect(options: ConnectOptions): Promise<boolean> {
        const api = this.api(options.server);
        let vault: TabulariumVault | undefined;
        let device: TabulariumDevice;
        try {
            const user = await api.login(options.username, options.password);
            if (user.mustChangePassword) {
                if (!options.newPassword) throw new TabulariumApiError(403, "Change initial password first");
                await api.changePassword(options.password, options.newPassword);
            }
            const target = options.vault;
            vault = "id" in target ? (await api.vaults()).find((v) => v.id === target.id) : await api.createVault(target.create);
            if (!vault) throw new TabulariumApiError(404, "笔记库不存在。");
            if (vault.state !== "ready") throw new TabulariumApiError(409, "Vault is not ready");
            device = await api.issueDevice(vault.id, options.deviceName);
        } finally {
            await api.logout();
        }
        return await this.apply(api.server, vault, device, options.deviceName, options.passphrase, "id" in options.vault ? "fetch" : "upload");
    }

    /**
     * Writes the connection and restarts. Upstream's rebuild would delete the remote database, which the gateway only allows
     * inside an owner-approved rebuild window, and a new vault has nothing to replace.
     */
    async apply(server: string, vault: TabulariumVault, device: TabulariumDevice, deviceName: string, passphrase: string, initialise: Initialise) {
        const settings = this.core.services.setting;
        let next = { ...settings.currentSettings(), ...connectionSettings(server, vault.id, device, passphrase), remoteType: REMOTE_COUCHDB } as ObsidianLiveSyncSettings;
        upsertRemoteConfigurationInPlace(next, "couchdb", { activate: true, name: "Tabularium" });
        next = await settings.adjustSettings(next);
        const connection: TabulariumConnection = { server, vaultId: vault.id, vaultName: vault.name, deviceId: device.id, deviceName, expiresAt: device.expiresAt };
        const write = async () => {
            this.connection = connection;
            await this.plugin.app.vault.adapter.write(this.file, JSON.stringify(connection, null, 2));
            await this.setupManager.applySetting(next, initialise === "upload" ? UserMode.NewUser : UserMode.ExistingUser);
            // Encrypt data.json with a key kept on this device instead of the fixed default.
            if (settings.currentSettings().configPassphraseStore !== "LOCALSTORAGE") await settings.changeConfigurationEncryption("LOCALSTORAGE", randomKey());
        };
        if (initialise === "fetch") return await applySettingsWithScheduledInitialisation(this.core.rebuilder, "fetch", write);
        await write();
        this.core.services.appLifecycle.performRestart();
        return true;
    }

    /** Forgets the connection on this device; the server keeps the device until it is revoked there. */
    async disconnect() {
        this.connection = undefined;
        await this.plugin.app.vault.adapter.remove(this.file);
        await this.core.services.setting.applyPartial(
            { couchDB_URI: "", couchDB_DBNAME: "", couchDB_USER: "", couchDB_PASSWORD: "", remoteConfigurations: {}, activeConfigurationId: "", isConfigured: false, liveSync: false, syncOnStart: false, periodicReplication: false },
            true
        );
        await this.core.services.control.applySettings();
    }

    open() {
        new ServerModal(this).open();
    }
}

class ServerModal extends Modal {
    private readonly server: TabulariumServer;
    private api?: TabulariumApi;
    private password = "";

    constructor(server: TabulariumServer) {
        super(server.app);
        this.server = server;
        this.setTitle("Tabularium 服务器");
    }

    override onOpen() {
        if (this.server.connection) this.status(this.server.connection);
        else this.login();
    }

    private run(button: HTMLButtonElement, action: () => Promise<void>) {
        button.disabled = true;
        action()
            .catch((error: Error) => new Notice(error.message))
            .finally(() => (button.disabled = false));
    }

    private status(connection: TabulariumConnection) {
        const { contentEl } = this;
        contentEl.empty();
        new Setting(contentEl).setName("服务器").setDesc(connection.server);
        new Setting(contentEl).setName("笔记库").setDesc(connection.vaultName);
        new Setting(contentEl).setName("本设备").setDesc(`${connection.deviceName}，凭据有效期至 ${new Date(connection.expiresAt).toLocaleString()}`);
        new Setting(contentEl)
            .setDesc("断开只清除本机的连接设置，笔记保留。服务器上的设备凭据请在控制台撤销。")
            .addButton((b) => b.setButtonText("重新登录").onClick(() => this.login()))
            .addButton((b) =>
                b.setButtonText("断开连接").setWarning().onClick(() =>
                    this.run(b.buttonEl, async () => {
                        await this.server.disconnect();
                        new Notice("已断开 Tabularium 服务器。");
                        this.close();
                    })
                )
            );
    }

    private login() {
        const { contentEl } = this;
        contentEl.empty();
        const values = { server: this.server.connection?.server ?? "", username: "", password: "" };
        new Setting(contentEl).setName("服务器地址").addText((t) => t.setPlaceholder("https://notes.example.com").setValue(values.server).onChange((v) => (values.server = v)));
        new Setting(contentEl).setName("用户名").addText((t) => t.onChange((v) => (values.username = v)));
        new Setting(contentEl).setName("登录密码").addText((t) => {
            t.inputEl.type = "password";
            t.onChange((v) => (values.password = v));
        });
        new Setting(contentEl).addButton((b) =>
            b.setButtonText("登录").setCta().onClick(() =>
                this.run(b.buttonEl, async () => {
                    this.api = this.server.api(values.server);
                    const user = await this.api.login(values.username, values.password);
                    this.password = values.password;
                    if (user.mustChangePassword) this.changePassword();
                    else await this.chooseVault();
                })
            )
        );
    }

    private changePassword() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.createEl("p", { text: "首次登录需要设置新的登录密码（至少 12 个字符）。" });
        let password = "";
        let confirm = "";
        for (const [name, set] of [["新密码", (v: string) => (password = v)], ["确认新密码", (v: string) => (confirm = v)]] as const) {
            new Setting(contentEl).setName(name).addText((t) => {
                t.inputEl.type = "password";
                t.onChange(set);
            });
        }
        new Setting(contentEl).addButton((b) =>
            b.setButtonText("保存并继续").setCta().onClick(() =>
                this.run(b.buttonEl, async () => {
                    if (password !== confirm) throw new Error("两次输入的密码不一致。");
                    await this.api!.changePassword(this.password, password);
                    await this.chooseVault();
                })
            )
        );
    }

    private async chooseVault() {
        const vaults = (await this.api!.vaults()).filter((v) => v.state === "ready");
        const { contentEl } = this;
        contentEl.empty();
        const values = { vault: vaults[0]?.id ?? "", name: this.app.vault.getName(), device: `Obsidian ${this.app.vault.getName()}`, passphrase: "", confirm: "" };
        const creating = () => values.vault === "";
        const render = () => {
            contentEl.empty();
            new Setting(contentEl).setName("笔记库").addDropdown((d) => {
                for (const v of vaults) d.addOption(v.id, v.name);
                d.addOption("", "新建笔记库");
                d.setValue(values.vault).onChange((v) => {
                    values.vault = v;
                    render();
                });
            });
            if (creating()) new Setting(contentEl).setName("新笔记库名称").addText((t) => t.setValue(values.name).onChange((v) => (values.name = v)));
            new Setting(contentEl).setName("设备名称").addText((t) => t.setValue(values.device).onChange((v) => (values.device = v)));
            new Setting(contentEl)
                .setName("笔记解密口令")
                .setDesc(creating() ? "笔记在本机加密后上传，服务器无法读取。口令遗失后无法找回笔记。" : "输入这个笔记库在其他设备上使用的口令。")
                .addText((t) => {
                    t.inputEl.type = "password";
                    t.onChange((v) => (values.passphrase = v));
                });
            if (creating()) {
                new Setting(contentEl).setName("确认口令").addText((t) => {
                    t.inputEl.type = "password";
                    t.onChange((v) => (values.confirm = v));
                });
                contentEl.createEl("p", { text: "连接后 Obsidian 会重新加载，本机笔记随后上传到新笔记库。" });
            } else {
                contentEl.createEl("p", { text: "连接后 Obsidian 会重新加载并从服务器获取笔记。需要用本机笔记覆盖服务器时，先连接，再由所有者在控制台授权本设备重建。" });
            }
            new Setting(contentEl).addButton((b) =>
                b.setButtonText("连接").setCta().onClick(() =>
                    this.run(b.buttonEl, async () => {
                        if (creating() && values.passphrase !== values.confirm) throw new Error("两次输入的口令不一致。");
                        if (!values.passphrase) throw new Error("需要设置笔记解密口令。");
                        const vault = creating() ? await this.api!.createVault(values.name) : vaults.find((v) => v.id === values.vault)!;
                        const device = await this.api!.issueDevice(vault.id, values.device);
                        await this.api!.logout();
                        this.close();
                        await this.server.apply(this.api!.server, vault, device, values.device, values.passphrase, creating() ? "upload" : "fetch");
                    })
                )
            );
        };
        render();
    }

    override onClose() {
        this.contentEl.empty();
        void this.api?.logout();
    }
}

export function installTabulariumServer(plugin: Plugin, core: LiveSyncCore, setupManager: SetupManager) {
    const server = new TabulariumServer(plugin, core, setupManager);
    server.install();
    return server;
}
