import { Modal, Notice, Setting, normalizePath, setIcon, setTooltip, type Plugin } from "obsidian";
import { REMOTE_COUCHDB, type ObsidianLiveSyncSettings } from "@vrtmrz/livesync-commonlib/compat/common/types";
import { upsertRemoteConfigurationInPlace } from "@vrtmrz/livesync-commonlib/remote-configurations";
import { applySettingsWithScheduledInitialisation } from "@/serviceFeatures/setupObsidian/setupActivationLifecycle.ts";
import { type SetupManager, UserMode } from "@/modules/features/SetupManager";
import type { LiveSyncCore } from "@/main";
import { $msg } from "@/common/translation";
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

/** Credentials are renewed once less than half of their 30-day life is left. */
export const RENEW_BEFORE_MS = 15 * 86_400_000;
const RENEW_CHECK_MS = 6 * 3_600_000;

const randomKey = () =>
    Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) => byte.toString(16).padStart(2, "0")).join("");

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
        settings.onBeforeSaveSettingData.addHandler(
            async (next: ObsidianLiveSyncSettings, previous: ObsidianLiveSyncSettings) => {
                if (!this.connection) return;
                const overrides = enforcedOverrides(next, previous);
                if (Object.keys(overrides).length) new Notice($msg("tabularium.server.enforced"));
                return await Promise.resolve(overrides);
            }
        );
        this.core.services.appLifecycle.onSettingLoaded.addHandler(async () => {
            // Registered once the display language is known, so the command name follows it.
            this.plugin.addCommand({
                id: "server-connection",
                name: $msg("tabularium.server.command"),
                callback: () => this.open(),
            });
            const adapter = this.plugin.app.vault.adapter;
            if (await adapter.exists(this.file))
                this.connection = JSON.parse(await adapter.read(this.file)) as TabulariumConnection;
            if (!this.connection) return true;
            const current = settings.currentSettings();
            const overrides = enforcedOverrides(current, current);
            if (Object.keys(overrides).length) await settings.applyPartial(overrides, true);
            return true;
        });
        this.app.workspace.onLayoutReady(() => {
            void this.renew();
        });
        this.plugin.registerInterval(
            window.setInterval(() => {
                void this.renew();
            }, RENEW_CHECK_MS)
        );
    }

    /** Basic authorization with this device's sync credentials, for the gateway's device routes. */
    deviceAuthorization() {
        const settings = this.core.services.setting.currentSettings();
        return `Basic ${btoa(String.fromCharCode(...new TextEncoder().encode(`${settings.couchDB_USER}:${settings.couchDB_PASSWORD}`)))}`;
    }

    /**
     * Renews the device credentials when they are close to expiry. Being offline is not reported: the next check retries.
     * Returns whether the credentials were renewed.
     */
    async renew() {
        const connection = this.connection;
        if (!connection || connection.expiresAt - Date.now() > RENEW_BEFORE_MS) return false;
        try {
            const { expiresAt } = await this.api(connection.server).renewDevice(this.deviceAuthorization());
            this.connection = { ...connection, expiresAt };
            await this.plugin.app.vault.adapter.write(this.file, JSON.stringify(this.connection, null, 2));
            return true;
        } catch (error) {
            if (!(error instanceof TabulariumApiError) || error.status === 0) return false;
            new Notice(
                error.status === 401
                    ? $msg("tabularium.server.credentialsInvalid")
                    : $msg("tabularium.server.renewFailed", { error: error.message })
            );
            return false;
        }
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
            vault =
                "id" in target
                    ? (await api.vaults()).find((v) => v.id === target.id)
                    : await api.createVault(target.create);
            if (!vault) throw new TabulariumApiError(404, $msg("tabularium.server.vaultMissing"));
            if (vault.state !== "ready") throw new TabulariumApiError(409, "Vault is not ready");
            device = await api.issueDevice(vault.id, options.deviceName);
        } finally {
            await api.logout();
        }
        return await this.apply(
            api.server,
            vault,
            device,
            options.deviceName,
            options.passphrase,
            "id" in options.vault ? "fetch" : "upload"
        );
    }

    /**
     * Writes the connection and restarts. Upstream's rebuild would delete the remote database, which the gateway only allows
     * inside an owner-approved rebuild window, and a new vault has nothing to replace.
     */
    async apply(
        server: string,
        vault: TabulariumVault,
        device: TabulariumDevice,
        deviceName: string,
        passphrase: string,
        initialise: Initialise
    ) {
        const settings = this.core.services.setting;
        let next = {
            ...settings.currentSettings(),
            ...connectionSettings(server, vault.id, device, passphrase),
            remoteType: REMOTE_COUCHDB,
        } as ObsidianLiveSyncSettings;
        upsertRemoteConfigurationInPlace(next, "couchdb", { activate: true, name: "Tabularium" });
        next = await settings.adjustSettings(next);
        const connection: TabulariumConnection = {
            server,
            vaultId: vault.id,
            vaultName: vault.name,
            deviceId: device.id,
            deviceName,
            expiresAt: device.expiresAt,
        };
        const write = async () => {
            this.connection = connection;
            await this.plugin.app.vault.adapter.write(this.file, JSON.stringify(connection, null, 2));
            await this.setupManager.applySetting(
                next,
                initialise === "upload" ? UserMode.NewUser : UserMode.ExistingUser
            );
            // A device that synchronised with LiveSync before keeps that local database, whose documents carry IDs
            // without path obfuscation; the gateway refuses them. The upload starts from an empty database that the
            // restart fills from the vault's files.
            if (initialise === "upload") {
                const { database, databaseEvents, replicator } = this.core.services;
                if (!(await database.resetDatabaseForCurrentSettings({ databaseEvents, replicator })))
                    throw new Error($msg("tabularium.server.resetFailed"));
            }
            // Encrypt data.json with a key kept on this device instead of the fixed default.
            if (settings.currentSettings().configPassphraseStore !== "LOCALSTORAGE")
                await settings.changeConfigurationEncryption("LOCALSTORAGE", randomKey());
        };
        if (initialise === "fetch")
            return await applySettingsWithScheduledInitialisation(this.core.rebuilder, "fetch", write);
        await write();
        this.core.services.appLifecycle.performRestart();
        return true;
    }

    /** Forgets the connection on this device; the server keeps the device until it is revoked there. */
    async disconnect() {
        this.connection = undefined;
        await this.plugin.app.vault.adapter.remove(this.file);
        await this.core.services.setting.applyPartial(
            {
                couchDB_URI: "",
                couchDB_DBNAME: "",
                couchDB_USER: "",
                couchDB_PASSWORD: "",
                remoteConfigurations: {},
                activeConfigurationId: "",
                isConfigured: false,
                liveSync: false,
                syncOnStart: false,
                periodicReplication: false,
            },
            true
        );
        await this.core.services.control.applySettings();
    }

    open() {
        new ServerModal(this).open();
    }

    /** Shown while this vault is not connected, in place of the upstream onboarding invitation. */
    invite() {
        this.core.services.UI.confirm.askInPopup(
            "tabularium-not-connected",
            `${$msg("tabularium.server.notConnectedNotice")} {HERE}`,
            (anchor) => {
                anchor.href = "#";
                anchor.textContent = $msg("tabularium.server.openConnection");
                anchor.addEventListener("click", (event) => {
                    event.preventDefault();
                    this.open();
                });
            },
            60_000
        );
    }
}

/** An explanation behind an icon after the setting name: shown on hover, and as a notice when tapped on mobile. */
function hint(setting: Setting, text: string) {
    const icon = setting.nameEl.createSpan({ cls: "tabularium-hint" });
    setIcon(icon, "alert-circle");
    setTooltip(icon, text);
    icon.addEventListener("click", () => new Notice(text));
    return setting;
}

class ServerModal extends Modal {
    private readonly server: TabulariumServer;
    private api?: TabulariumApi;
    private password = "";

    constructor(server: TabulariumServer) {
        super(server.app);
        this.server = server;
        this.modalEl.addClass("tabularium-server-dialog");
        this.setTitle($msg("tabularium.server.title"));
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
        new Setting(contentEl).setName($msg("tabularium.server.server")).setDesc(connection.server);
        new Setting(contentEl).setName($msg("tabularium.server.vault")).setDesc(connection.vaultName);
        new Setting(contentEl)
            .setName($msg("tabularium.server.device"))
            .setDesc(
                $msg("tabularium.server.deviceExpiry", {
                    device: connection.deviceName,
                    date: new Date(connection.expiresAt).toLocaleString(),
                })
            );
        new Setting(contentEl)
            .setDesc($msg("tabularium.server.disconnectHint"))
            .addButton((b) => b.setButtonText($msg("tabularium.server.signInAgain")).onClick(() => this.login()))
            .addButton((b) =>
                b
                    .setButtonText($msg("tabularium.server.disconnect"))
                    .setWarning()
                    .onClick(() =>
                        this.run(b.buttonEl, async () => {
                            await this.server.disconnect();
                            new Notice($msg("tabularium.server.disconnected"));
                            this.close();
                        })
                    )
            );
    }

    private login() {
        const { contentEl } = this;
        contentEl.empty();
        const values = { server: this.server.connection?.server ?? "", username: "", password: "" };
        new Setting(contentEl).setName($msg("tabularium.server.address")).addText((t) =>
            t
                .setPlaceholder("https://notes.example.com")
                .setValue(values.server)
                .onChange((v) => (values.server = v))
        );
        new Setting(contentEl)
            .setName($msg("tabularium.server.username"))
            .addText((t) => t.onChange((v) => (values.username = v)));
        new Setting(contentEl).setName($msg("tabularium.server.password")).addText((t) => {
            t.inputEl.type = "password";
            t.onChange((v) => (values.password = v));
        });
        new Setting(contentEl).addButton((b) =>
            b
                .setButtonText($msg("tabularium.server.signIn"))
                .setCta()
                .onClick(() =>
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
        contentEl.createEl("p", { text: $msg("tabularium.server.firstLogin") });
        let password = "";
        let confirm = "";
        for (const [name, set] of [
            [$msg("tabularium.server.newPassword"), (v: string) => (password = v)],
            [$msg("tabularium.server.confirmPassword"), (v: string) => (confirm = v)],
        ] as const) {
            new Setting(contentEl).setName(name).addText((t) => {
                t.inputEl.type = "password";
                t.onChange(set);
            });
        }
        new Setting(contentEl).addButton((b) =>
            b
                .setButtonText($msg("tabularium.server.saveAndContinue"))
                .setCta()
                .onClick(() =>
                    this.run(b.buttonEl, async () => {
                        if (password !== confirm) throw new Error($msg("tabularium.server.passwordsDiffer"));
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
        const values = {
            vault: vaults[0]?.id ?? "",
            name: this.app.vault.getName(),
            device: `Obsidian ${this.app.vault.getName()}`,
            passphrase: "",
            confirm: "",
        };
        const creating = () => values.vault === "";
        const render = () => {
            contentEl.empty();
            new Setting(contentEl).setName($msg("tabularium.server.vault")).addDropdown((d) => {
                for (const v of vaults) d.addOption(v.id, v.name);
                d.addOption("", $msg("tabularium.server.newVault"));
                d.setValue(values.vault).onChange((v) => {
                    values.vault = v;
                    render();
                });
            });
            if (creating())
                new Setting(contentEl)
                    .setName($msg("tabularium.server.newVaultName"))
                    .addText((t) => t.setValue(values.name).onChange((v) => (values.name = v)));
            new Setting(contentEl)
                .setName($msg("tabularium.server.deviceName"))
                .addText((t) => t.setValue(values.device).onChange((v) => (values.device = v)));
            hint(
                new Setting(contentEl).setName($msg("tabularium.server.passphrase")),
                creating() ? $msg("tabularium.server.passphraseNew") : $msg("tabularium.server.passphraseExisting")
            ).addText((t) => {
                t.inputEl.type = "password";
                t.onChange((v) => (values.passphrase = v));
            });
            if (creating()) {
                new Setting(contentEl).setName($msg("tabularium.server.confirmPassphrase")).addText((t) => {
                    t.inputEl.type = "password";
                    t.onChange((v) => (values.confirm = v));
                });
            }
            new Setting(contentEl).addButton((b) =>
                b
                    .setButtonText($msg("tabularium.server.connect"))
                    .setCta()
                    .onClick(() =>
                        this.run(b.buttonEl, async () => {
                            if (creating() && values.passphrase !== values.confirm)
                                throw new Error($msg("tabularium.server.passphrasesDiffer"));
                            if (!values.passphrase) throw new Error($msg("tabularium.server.passphraseRequired"));
                            const vault = creating()
                                ? await this.api!.createVault(values.name)
                                : vaults.find((v) => v.id === values.vault)!;
                            const device = await this.api!.issueDevice(vault.id, values.device);
                            await this.api!.logout();
                            this.close();
                            await this.server.apply(
                                this.api!.server,
                                vault,
                                device,
                                values.device,
                                values.passphrase,
                                creating() ? "upload" : "fetch"
                            );
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
