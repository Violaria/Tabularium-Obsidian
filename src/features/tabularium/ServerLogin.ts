import { Modal, Notice, Platform, Setting, normalizePath, type Plugin } from "obsidian";
import { destructive, hint } from "./hint";
import { REMOTE_COUCHDB, type SyncSettings } from "@tabularium/sync-core/compat/common/types";
import { upsertRemoteConfigurationInPlace } from "@tabularium/sync-core/remote-configurations";
import { applySettingsWithScheduledInitialisation } from "@/obsidian/serviceFeatures/setupObsidian/setupActivationLifecycle.ts";
import { LIVE_SYNC_PAUSE_KEY } from "./SyncPause.ts";
import type { PluginCore } from "@/main";
import { $msg } from "@/core/common/translation";
import {
    connectionSettings,
    enforcedOverrides,
    TabulariumApi,
    TabulariumApiError,
    type TabulariumConnection,
    type TabulariumDevice,
    type TabulariumVault,
} from "./serverConnection";
import { clientId, clientName } from "./clientIdentity";
import { rememberFetchChoice, type FetchChoice } from "@/obsidian/serviceFeatures/redFlag.simpleFetch";

export interface ConnectOptions {
    server: string;
    username: string;
    password: string;
    newPassword?: string;
    vault: { id: string } | { create: string };
    passphrase: string;
    /** What happens to files already on this device when an existing vault is fetched. */
    fetch?: FetchChoice;
}
/** A new vault is empty, so the device uploads through ordinary sync; an existing vault is fetched first. */
type Initialise = "upload" | "fetch";

/** Credentials are renewed once less than half of their 30-day life is left. */
export const RENEW_BEFORE_MS = 15 * 86_400_000;
const RENEW_CHECK_MS = 6 * 3_600_000;

/** The device value holding the key that encrypts the settings of this device's vaults. */
const CONFIGURATION_KEY = "ls-setting-passphrase";
const randomKey = () =>
    Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) => byte.toString(16).padStart(2, "0")).join("");

/** Connects this plug-in to a Tabularium server and keeps the connection encrypted. */
export class TabulariumServer {
    connection?: TabulariumConnection;
    readonly app: Plugin["app"];
    private readonly plugin: Plugin;
    private readonly core: PluginCore;

    constructor(plugin: Plugin, core: PluginCore) {
        this.plugin = plugin;
        this.app = plugin.app;
        this.core = core;
    }

    private get appId() {
        return this.app.appId ?? "";
    }

    /** What this plug-in reports to the server: the machine, and this Obsidian vault as an installation on it. */
    client() {
        return {
            id: clientId(window.localStorage),
            name: clientName(Platform),
            installation: this.appId || this.app.vault.getName(),
        };
    }

    private get file() {
        return normalizePath(`${this.plugin.manifest.dir}/tabularium.json`);
    }

    install() {
        const settings = this.core.services.setting;
        settings.onBeforeSaveSettingData.addHandler(
            async (next: SyncSettings, previous: SyncSettings) => {
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
            if (!(await adapter.exists(this.file))) return true;
            const stored = JSON.parse(await adapter.read(this.file)) as TabulariumConnection;
            // Settled before anything synchronises: a connection signed in from another vault is cleared here.
            if (stored.appId && stored.appId !== this.appId) {
                await this.forget();
                new Notice($msg("tabularium.server.foreignConnection"));
                return true;
            }
            this.connection = stored;
            // Connections made before 0.26.5 are bound to the vault that has them now.
            if (!stored.appId && this.appId) {
                this.connection = { ...stored, appId: this.appId };
                await adapter.write(this.file, JSON.stringify(this.connection, null, 2));
            }
            const current = settings.currentSettings();
            const overrides = enforcedOverrides(current, current);
            if (Object.keys(overrides).length) await settings.applyPartial(overrides, true);
            void this.joinClient();
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
            // Disconnected or connected elsewhere while renewing: nothing to write.
            if (this.connection !== connection) return false;
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

    /**
     * Reports this client at each start with the credentials it has. Connections made before the server knew clients join
     * this way, a name changed on the web arrives here, and revoked credentials are told at once instead of showing up
     * as sync errors. Being offline or on an older server is not reported: the next start tries again.
     */
    async joinClient() {
        const connection = this.connection;
        if (!connection) return false;
        try {
            const { name } = await this.api(connection.server).joinClient(this.client(), this.deviceAuthorization());
            if (this.connection !== connection) return false;
            if (connection.joined && connection.deviceName === name) return true;
            this.connection = { ...connection, deviceName: name, joined: true };
            await this.plugin.app.vault.adapter.write(this.file, JSON.stringify(this.connection, null, 2));
            return true;
        } catch (error) {
            if (!(error instanceof TabulariumApiError)) throw error;
            if (error.status === 401) new Notice($msg("tabularium.server.credentialsInvalid"));
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
            device = await api.issueDevice(vault.id, this.client());
        } finally {
            await api.logout();
        }
        return await this.apply(
            api.server,
            vault,
            device,
            options.passphrase,
            "id" in options.vault ? "fetch" : "upload",
            options.fetch
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
        passphrase: string,
        initialise: Initialise,
        fetchChoice: FetchChoice = "remote-keep"
    ) {
        const settings = this.core.services.setting;
        /** The settings for this connection, from the current ones. */
        const prepare = async () => {
            // One remote, always the same entry: signing in again or changing vault replaces it instead of adding another.
            const next = {
                ...settings.currentSettings(),
                ...connectionSettings(server, vault.id, device, passphrase),
                remoteType: REMOTE_COUCHDB,
                remoteConfigurations: {},
            } as SyncSettings;
            upsertRemoteConfigurationInPlace(next, "couchdb", { id: "tabularium", activate: true, name: "Tabularium" });
            return await settings.adjustSettings(next);
        };
        const connection: TabulariumConnection = {
            server,
            vaultId: vault.id,
            vaultName: vault.name,
            deviceId: device.id,
            deviceName: device.machineName ?? this.client().name,
            expiresAt: device.expiresAt,
            appId: this.appId,
            joined: Boolean(device.machineName),
        };
        const write = async () => {
            // Nothing synchronises until the new settings and an empty local database are in place, and data.json is
            // encrypted with this device's own key before the credentials are written to it.
            this.core.services.appLifecycle.setSuspended(true);
            try {
                // The key is one per device, shared by its vaults: another vault's key is reused, not replaced.
                if (settings.currentSettings().configPassphraseStore !== "LOCALSTORAGE")
                    await settings.changeConfigurationEncryption(
                        "LOCALSTORAGE",
                        (await settings.deviceValues.getValue(CONFIGURATION_KEY, "")) || randomKey()
                    );
                const newSettings = await prepare();
                settings.clearUsedPassphrase();
                await settings.applyExternalSettings(newSettings, true);
                // A device that synchronised through the original plug-in before keeps that local database, whose documents carry IDs
                // without path obfuscation; the gateway refuses them. The upload starts from an empty database that the
                // restart fills from the vault's files.
                if (initialise === "upload") {
                    const { database, databaseEvents, replicator } = this.core.services;
                    if (!(await database.resetDatabaseForCurrentSettings({ databaseEvents, replicator })))
                        throw new Error($msg("tabularium.server.resetFailed"));
                }
                // Decided at sign-in, once for all files: asking file by file lets an old copy replace newer notes.
                if (initialise === "fetch") await rememberFetchChoice(this.core, fetchChoice);
                // The login wrote new sync settings, so a pause recorded before no longer applies.
                await this.core.services.setting.config.delete(LIVE_SYNC_PAUSE_KEY);
                // The connection is recorded last, once the settings are in place.
                this.connection = connection;
                await this.plugin.app.vault.adapter.write(this.file, JSON.stringify(connection, null, 2));
            } finally {
                this.core.services.appLifecycle.setSuspended(false);
            }
        };
        if (initialise === "fetch")
            return await applySettingsWithScheduledInitialisation(this.core.serviceModules.rebuilder, "fetch", write);
        await write();
        this.core.services.appLifecycle.performRestart();
        return true;
    }

    /** Revokes this device's credentials and forgets the connection. An unreachable server keeps them until they expire. */
    async disconnect() {
        const connection = this.connection;
        if (connection)
            await this.api(connection.server)
                .revokeDevice(this.deviceAuthorization())
                .catch((error: unknown) => {
                    if (!(error instanceof TabulariumApiError)) throw error;
                });
        await this.forget();
        await this.core.services.control.applySettings();
    }

    /** Removes the connection and its sync settings from this vault, without applying them yet. */
    private async forget() {
        this.connection = undefined;
        await this.core.services.setting.config.delete(LIVE_SYNC_PAUSE_KEY);
        await this.plugin.app.vault.adapter.remove(this.file);
        await this.core.services.setting.applyPartial(
            {
                couchDB_URI: "",
                couchDB_DBNAME: "",
                couchDB_USER: "",
                couchDB_PASSWORD: "",
                passphrase: "",
                remoteConfigurations: {},
                activeConfigurationId: "",
                isConfigured: false,
                liveSync: false,
                syncOnStart: false,
                periodicReplication: false,
            },
            true
        );
    }

    open() {
        new ServerModal(this).open();
    }

    /** Sign in again, to renew this device or to change to another vault. */
    openLogin() {
        new ServerModal(this, true).open();
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

class ServerModal extends Modal {
    private readonly server: TabulariumServer;
    private api?: TabulariumApi;
    private password = "";

    private readonly signIn: boolean;

    constructor(server: TabulariumServer, signIn = false) {
        super(server.app);
        this.server = server;
        this.signIn = signIn;
        this.modalEl.addClass("tabularium-server-dialog");
        this.setTitle($msg("tabularium.server.title"));
    }

    override onOpen() {
        if (this.server.connection && !this.signIn) this.status(this.server.connection);
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
        new Setting(contentEl).setName($msg("tabularium.server.device")).setDesc(
            $msg("tabularium.server.deviceExpiry", {
                device: connection.deviceName,
                date: new Date(connection.expiresAt).toLocaleString(),
            })
        );
        new Setting(contentEl)
            .setDesc($msg("tabularium.server.disconnectHint"))
            .addButton((b) => b.setButtonText($msg("tabularium.server.signInAgain")).onClick(() => this.login()))
            .addButton((b) =>
                destructive(b.setButtonText($msg("tabularium.server.disconnect")))
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
                        // A session left from an earlier sign-in in this dialogue is ended first.
                        await this.api?.logout();
                        this.api = this.server.api(values.server);
                        const user = await this.api.login(values.username, values.password);
                        this.password = values.password;
                        if (user.mustChangePassword) this.changePassword();
                        else await this.chooseVault();
                    })
                )
        );
        this.markFields();
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
        this.markFields();
    }

    private async chooseVault() {
        const vaults = (await this.api!.vaults()).filter((v) => v.state === "ready");
        const { contentEl } = this;
        contentEl.empty();
        const values = {
            vault: vaults[0]?.id ?? "",
            name: this.app.vault.getName(),
            fetch: "remote-keep" as FetchChoice,
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
            if (!creating() && this.app.vault.getFiles().length > 0)
                hint(new Setting(contentEl).setName($msg("tabularium.server.localNotes")), $msg("tabularium.server.localNotesHint")).addDropdown((d) => {
                    for (const choice of ["remote-keep", "newer-keep"] as const)
                        d.addOption(choice, $msg(`tabularium.settings.fetch.${choice}` as never));
                    d.setValue(values.fetch).onChange((v) => (values.fetch = v as FetchChoice));
                });
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
                            const device = await this.api!.issueDevice(vault.id, this.server.client());
                            await this.api!.logout();
                            this.close();
                            await this.server.apply(
                                this.api!.server,
                                vault,
                                device,
                                values.passphrase,
                                creating() ? "upload" : "fetch",
                                values.fetch
                            );
                        })
                    )
            );
            this.markFields();
        };
        render();
    }

    /** Rows holding a field: the label goes above the field (styles.css). */
    private markFields() {
        for (const row of Array.from(this.contentEl.querySelectorAll(".setting-item")))
            if (row.querySelector("input, select")) row.addClass("tabularium-field");
    }

    override onClose() {
        this.contentEl.empty();
        void this.api?.logout();
    }
}

export function installTabulariumServer(plugin: Plugin, core: PluginCore) {
    const server = new TabulariumServer(plugin, core);
    server.install();
    return server;
}
