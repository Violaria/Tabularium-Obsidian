import { $msg } from "@/common/translation";
import type { NecessaryServices } from "@vrtmrz/livesync-commonlib/compat/interfaces/ServiceModule";
import {
    encodeQR,
    encodeSettingsToQRCodeData,
    OutputFormat,
} from "@vrtmrz/livesync-commonlib/compat/API/processSetting";
import { EVENT_REQUEST_SHOW_SETUP_QR } from "@vrtmrz/livesync-commonlib/compat/events/coreEvents";
import { fireAndForget } from "@vrtmrz/livesync-commonlib/compat/common/utils";
import type { SetupFeatureHost } from "./types";

export async function encodeSetupSettingsAsQR(host: SetupFeatureHost) {
    const settings = host.services.setting.currentSettings();
    const settingString = encodeSettingsToQRCodeData(settings);
    const result = encodeQR(settingString, OutputFormat.SVG);
    if (result === "") {
        return "";
    }

    if (typeof result === "string") {
        const msg = host.services.context.translate("Setup.QRCode", { qr_image: result });
        const ok = $msg("OK");
        await host.services.UI.confirm.confirmWithMessage($msg("Setup.QRCodeTitle"), msg, [ok], ok);
        return result;
    } else {
        // Multi-page QR code
        let currentIndex = 0;
        while (currentIndex < result.total) {
            const msg = $msg("Setup.QRCodeAggregated", {
                current: String(currentIndex + 1),
                total: String(result.total),
                part: result.parts[currentIndex],
            });
            const [back, next, cancel, done] = [$msg("Back"), $msg("Next"), $msg("Cancel"), $msg("Done")];
            const buttons = [];
            if (currentIndex > 0) buttons.push(back);
            if (currentIndex < result.total - 1) {
                buttons.push(next);
                buttons.push(cancel);
            } else {
                buttons.push(done);
            }

            const choice = await host.services.UI.confirm.confirmWithMessage(
                $msg("Setup.QRCodeAggregatedTitle"),
                msg,
                buttons,
                buttons.includes(next) ? next : done
            );

            if (choice === next) {
                currentIndex++;
            } else if (choice === back) {
                currentIndex--;
            } else {
                break;
            }
        }
        return result.parts[0]; // Return the first one for compatibility
    }
}

export function useSetupQRCodeFeature(host: NecessaryServices<"API" | "UI" | "setting" | "appLifecycle", never>) {
    host.services.appLifecycle.onLoaded.addHandler(() => {
        host.services.API.addCommand({
            id: "livesync-setting-qr",
            name: $msg("Show settings as a QR code"),
            checkCallback: (checking) => {
                if (!host.services.setting.currentSettings().isConfigured) return false;
                if (!checking) fireAndForget(encodeSetupSettingsAsQR(host));
                return true;
            },
        });
        host.services.context.events.onEvent(EVENT_REQUEST_SHOW_SETUP_QR, () =>
            fireAndForget(() => encodeSetupSettingsAsQR(host))
        );
        return Promise.resolve(true);
    });
}
