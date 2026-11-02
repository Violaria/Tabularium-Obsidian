// "Sync" in the file explorer's context menu, right above the sorting submenu: sync now, pausing or resuming live sync,
// and a note's history.
import { Platform, TFile, type Menu, type MenuItem, type Plugin } from "obsidian";
import {
    REPLICATION_PROGRESS_PRESENTATIONS,
    USER_INITIATED_REPLICATION_AUTHORITY,
} from "@tabularium/sync-core/replication";
import { $msg } from "@/core/common/translation";
import { eventHub } from "@/core/common/events.ts";
import { EVENT_REQUEST_SHOW_HISTORY } from "@/obsidian/common/obsidianEvents.ts";
import type { LiveSyncCore } from "@/main";
import type { LiveSyncPause } from "./LiveSyncPause.ts";

/** Not in Obsidian's published typings; the sorting component uses the same call. */
type SubmenuItem = MenuItem & { setSubmenu(): Menu };

/**
 * Must be installed before the sorting component: menu handlers run in the order they were registered, and the sorting
 * submenu is added by its own handler. `connected` is asked when the menu opens.
 */
export function installSyncMenu(
    plugin: Plugin,
    core: LiveSyncCore,
    connected: () => boolean,
    livePause: () => LiveSyncPause | undefined
) {
    const fill = (menu: Menu, file: TFile | undefined, flat: boolean) => {
        type Action = "now" | "pause" | "resume" | "history";
        const title = (action: Action) => {
            const key = `tabularium.syncMenu.${action}` as const;
            return flat ? $msg("tabularium.syncMenu.flat", { action: $msg(key) }) : $msg(key);
        };
        menu.addItem((item) =>
            item
                .setTitle(title("now"))
                .setIcon("refresh-cw")
                .onClick(() =>
                    void core.services.replication.replicateUserInitiated({
                        trigger: "manual",
                        progressPresentation: REPLICATION_PROGRESS_PRESENTATIONS.QUIET,
                        interaction: USER_INITIATED_REPLICATION_AUTHORITY,
                    })
                )
        );
        const pause = livePause();
        if (pause?.paused)
            menu.addItem((item) =>
                item.setTitle(title("resume")).setIcon("play").onClick(() => void pause.resume())
            );
        else if (pause?.canPause())
            menu.addItem((item) =>
                item.setTitle(title("pause")).setIcon("pause").onClick(() => void pause.pause())
            );
        if (file)
            menu.addItem((item) =>
                item
                    .setTitle(title("history"))
                    .setIcon("history")
                    .onClick(() => eventHub.emitEvent(EVENT_REQUEST_SHOW_HISTORY, { file }))
            );
    };
    const add = (menu: Menu, file?: TFile) => {
        if (!connected()) return;
        // Mobile menus have no submenus: the items go into the menu itself, named with the submenu's title.
        if (Platform.isMobile) {
            menu.addSeparator();
            fill(menu, file, true);
            return;
        }
        menu.addItem((item) => {
            item.setTitle($msg("tabularium.syncMenu.title")).setIcon("refresh-cw");
            fill((item as SubmenuItem).setSubmenu(), file, false);
        });
    };
    plugin.registerEvent(plugin.app.workspace.on("file-menu", (menu, file) => add(menu, file instanceof TFile ? file : undefined)));
    plugin.registerEvent(plugin.app.workspace.on("files-menu", (menu) => add(menu)));
}
