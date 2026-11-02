import { describe, expect, it } from "vitest";
import type { ObsidianLiveSyncSettings } from "@tabularium/sync-core/compat/common/types";
import { createNewVaultSettings } from "@tabularium/sync-core/settings";
import { getCouchDBReplicatorConfigurationIdentity } from "./replicatorConfigurationIdentity";

describe("active Replicator configuration identity", () => {
    it("replaces a connection when the path identity mode changes", () => {
        const previous = configuredSettings({ pathNormalizationVersion: 0 });
        const next = { ...previous, pathNormalizationVersion: 1 as const };
        expect(getCouchDBReplicatorConfigurationIdentity(next)).not.toBe(
            getCouchDBReplicatorConfigurationIdentity(previous)
        );
    });

    it("treats a missing path identity mode as version 0", () => {
        const missingVersion = configuredSettings();
        Reflect.deleteProperty(missingVersion, "pathNormalizationVersion");
        const explicitVersion0 = { ...missingVersion, pathNormalizationVersion: 0 as const };

        expect(getCouchDBReplicatorConfigurationIdentity(explicitVersion0)).toBe(
            getCouchDBReplicatorConfigurationIdentity(missingVersion)
        );
    });

    function configuredSettings(overrides: Partial<ObsidianLiveSyncSettings> = {}): ObsidianLiveSyncSettings {
        return Object.assign(createNewVaultSettings(), {
            activeConfigurationId: "profile-a",
            couchDB_URI: "https://couch.example.test/base",
            couchDB_USER: "alice",
            couchDB_PASSWORD: "secret-a",
            couchDB_DBNAME: "vault",
            couchDB_CustomHeaders: "X-Second: two\nX-First: one",
            endpoint: "https://objects.example.test/base",
            accessKey: "alice",
            secretKey: "secret-a",
            bucket: "vault",
            bucketPrefix: "notes/",
            region: "auto",
            bucketCustomHeaders: "X-Second: two\nX-First: one",
            encrypt: true,
            passphrase: "encryption-a",
            useDynamicIterationCount: false,
            permitEmptyPassphrase: false,
            enableCompression: false,
            ...overrides,
        });
    }

    it("replaces a connection when the independent ID key changes", () => {
        const first = configuredSettings({ idDerivationVersion: 1, idDerivationKey: "a".repeat(64) });
        const second = { ...first, idDerivationKey: "b".repeat(64) };
        expect(getCouchDBReplicatorConfigurationIdentity(second)).not.toBe(
            getCouchDBReplicatorConfigurationIdentity(first)
        );
    });

    it.each([
        ["couchDB_URI", "https://other.example.test/base"],
        ["couchDB_DBNAME", "other-vault"],
        ["couchDB_USER", "bob"],
        ["couchDB_PASSWORD", "secret-b"],
        ["couchDB_CustomHeaders", "X-First: changed"],
        ["useRequestAPI", true],
        ["disableRequestURI", true],
        ["encrypt", false],
        ["passphrase", "encryption-b"],
        ["useDynamicIterationCount", true],
        ["E2EEAlgorithm", ""],
        ["permitEmptyPassphrase", true],
        ["enableCompression", true],
    ] satisfies Array<[keyof ObsidianLiveSyncSettings, ObsidianLiveSyncSettings[keyof ObsidianLiveSyncSettings]]>)(
        "detects a CouchDB %s change",
        (key, value) => {
            const settings = configuredSettings();
            expect(getCouchDBReplicatorConfigurationIdentity({ ...settings, [key]: value })).not.toBe(
                getCouchDBReplicatorConfigurationIdentity(settings)
            );
        }
    );

    it("ignores persisted central profile identity when the effective connection settings match", () => {
        const settings = configuredSettings({ activeConfigurationId: "profile-a" });
        const otherProfile = { ...settings, activeConfigurationId: "profile-b" };

        expect(getCouchDBReplicatorConfigurationIdentity(otherProfile)).toBe(
            getCouchDBReplicatorConfigurationIdentity(settings)
        );
    });

    it("recreates the CouchDB connection when internal Metadata encryption becomes effective", () => {
        const active = configuredSettings({ usePathObfuscation: true, encryptInternalMetadata: false });
        const enabled = { ...active, encryptInternalMetadata: true };

        expect(getCouchDBReplicatorConfigurationIdentity(enabled)).not.toBe(
            getCouchDBReplicatorConfigurationIdentity(active)
        );
        const inactive = { ...active, usePathObfuscation: false };
        expect(getCouchDBReplicatorConfigurationIdentity({ ...inactive, encryptInternalMetadata: true })).toBe(
            getCouchDBReplicatorConfigurationIdentity(inactive)
        );
    });

    it("projects only the active CouchDB authentication mode", () => {
        const basic = configuredSettings({ useJWT: false, jwtKey: "inactive-a" });
        expect(getCouchDBReplicatorConfigurationIdentity({ ...basic, jwtKey: "inactive-b" })).toBe(
            getCouchDBReplicatorConfigurationIdentity(basic)
        );

        const jwt = configuredSettings({
            useJWT: true,
            jwtAlgorithm: "HS256",
            jwtKey: "jwt-a",
            jwtKid: "kid-a",
            jwtSub: "subject-a",
            jwtExpDuration: 5,
        });
        expect(getCouchDBReplicatorConfigurationIdentity({ ...jwt, couchDB_PASSWORD: "inactive" })).toBe(
            getCouchDBReplicatorConfigurationIdentity(jwt)
        );
        expect(getCouchDBReplicatorConfigurationIdentity({ ...jwt, jwtKey: "jwt-b" })).not.toBe(
            getCouchDBReplicatorConfigurationIdentity(jwt)
        );
    });

    it("normalises endpoint and header representation without using the setup URI grammar", () => {
        const settings = configuredSettings();
        const couchIdentity = getCouchDBReplicatorConfigurationIdentity(settings);

        expect(
            getCouchDBReplicatorConfigurationIdentity({
                ...settings,
                couchDB_URI: "https://couch.example.test:443/base/",
                couchDB_CustomHeaders: "X-First: one\nX-Second: two",
            })
        ).toBe(couchIdentity);
    });

    it("ignores inactive remote-security credentials", () => {
        const settings = configuredSettings({ encrypt: false, passphrase: "inactive-a" });

        expect(
            getCouchDBReplicatorConfigurationIdentity({
                ...settings,
                passphrase: "inactive-b",
                useDynamicIterationCount: !settings.useDynamicIterationCount,
                E2EEAlgorithm: "",
                permitEmptyPassphrase: !settings.permitEmptyPassphrase,
            })
        ).toBe(getCouchDBReplicatorConfigurationIdentity(settings));
    });

    it("keeps malformed endpoints deterministic and scoped", () => {
        const settings = configuredSettings({ couchDB_URI: "not a URL" });

        expect(() => getCouchDBReplicatorConfigurationIdentity(settings)).not.toThrow();
        expect(
            getCouchDBReplicatorConfigurationIdentity({ ...settings, couchDB_URI: "different invalid URL" })
        ).not.toBe(getCouchDBReplicatorConfigurationIdentity(settings));
        const unrelatedPluginChange = { ...settings, displayLanguage: "ja" };
        expect(getCouchDBReplicatorConfigurationIdentity(unrelatedPluginChange)).toBe(
            getCouchDBReplicatorConfigurationIdentity(settings)
        );
    });
});
