import type TabulariumPlugin from "@/main";
import type { App, Plugin } from "@/deps";
import { ServiceContext } from "@tabularium/sync-core/context";
import { eventHub } from "@/core/common/events";
import { translateCatalogueMessage } from "@/core/common/translation";
import type { ObsidianNoticeGroups } from "./ObsidianNoticeGroups";
import type { KeyedNoticeManager } from "@vrtmrz/obsidian-plugin-kit/notice";

/** Host capabilities owned by one Tabularium plug-in instance. */
export class ObsidianServiceContext extends ServiceContext {
    app: App;
    plugin: Plugin;
    tabulariumPlugin: TabulariumPlugin;
    readonly notices: KeyedNoticeManager;
    readonly noticeGroups: ObsidianNoticeGroups;

    constructor(
        app: App,
        plugin: Plugin,
        tabulariumPlugin: TabulariumPlugin,
        notices: KeyedNoticeManager,
        noticeGroups: ObsidianNoticeGroups
    ) {
        super({ events: eventHub, translate: translateCatalogueMessage });
        this.app = app;
        this.plugin = plugin;
        this.tabulariumPlugin = tabulariumPlugin;
        this.notices = notices;
        this.noticeGroups = noticeGroups;
    }
}
