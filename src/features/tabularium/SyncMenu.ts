// "Sync" in the file explorer's context menu, right above the sorting submenu: sync now, and a note's history.
import { Platform, TFile, type Menu, type MenuItem, type Plugin } from "obsidian";
import {
    REPLICATION_PROGRESS_PRESENTATIONS,
    USER_INITIATED_REPLICATION_AUTHORITY,
} from "@vrtmrz/livesync-commonlib/replication";
import { $msg } from "@/common/translation";
import { eventHub } from "@/common/events.ts";
import { EVENT_REQUEST_SHOW_HISTORY } from "@/common/obsidianEvents.ts";
import type { LiveSyncCore } from "@/main";

/** Not in Obsidian's published typings; the sorting component uses the same call. */
type SubmenuItem = MenuItem & { setSubmenu(): Menu };

/**
 * Must be installed before the sorting component: menu handlers run in the order they were registered, and the sorting
 * submenu is added by its own handler. `connected` is asked when the menu opens.
 */
export function installSyncMenu(plugin: Plugin, core: LiveSyncCore, connected: () => boolean) {
    const fill = (menu: Menu, file: TFile | undefined, flat: boolean) => {
        const title = (key: "tabularium.syncMenu.now" | "tabularium.syncMenu.history") =>
            flat ? $msg("tabularium.syncMenu.flat", { action: $msg(key) }) : $msg(key);
        menu.addItem((item) =>
            item
                .setTitle(title("tabularium.syncMenu.now"))
                .setIcon("refresh-cw")
                .onClick(() =>
                    void core.services.replication.replicateUserInitiated({
                        trigger: "manual",
                        progressPresentation: REPLICATION_PROGRESS_PRESENTATIONS.QUIET,
                        interaction: USER_INITIATED_REPLICATION_AUTHORITY,
                    })
                )
        );
        if (file)
            menu.addItem((item) =>
                item
                    .setTitle(title("tabularium.syncMenu.history"))
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
