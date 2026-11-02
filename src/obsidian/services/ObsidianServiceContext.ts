import type ObsidianLiveSyncPlugin from "@/main";
import type { App, Plugin } from "@/deps";
import { ServiceContext } from "@tabularium/sync-core/context";
import { eventHub } from "@/core/common/events";
import { translateLiveSyncMessage } from "@/core/common/translation";
import type { ObsidianNoticeGroups } from "./ObsidianNoticeGroups";
import type { KeyedNoticeManager } from "@vrtmrz/obsidian-plugin-kit/notice";

/** Host capabilities owned by one Self-hosted LiveSync plug-in instance. */
export class ObsidianServiceContext extends ServiceContext {
    app: App;
    plugin: Plugin;
    liveSyncPlugin: ObsidianLiveSyncPlugin;
    readonly notices: KeyedNoticeManager;
    readonly noticeGroups: ObsidianNoticeGroups;

    constructor(
        app: App,
        plugin: Plugin,
        liveSyncPlugin: ObsidianLiveSyncPlugin,
        notices: KeyedNoticeManager,
        noticeGroups: ObsidianNoticeGroups
    ) {
        super({ events: eventHub, translate: translateLiveSyncMessage });
        this.app = app;
        this.plugin = plugin;
        this.liveSyncPlugin = liveSyncPlugin;
        this.notices = notices;
        this.noticeGroups = noticeGroups;
    }
}
