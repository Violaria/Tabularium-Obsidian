import { describe, expect, it } from "vitest";

import { eventHub } from "@/core/common/events";
import { translateCatalogueMessage } from "@/core/common/translation";
import { observeServiceContext } from "../../../test/contracts/serviceContext";
import { ObsidianServiceContext } from "./ObsidianServiceContext";

const TRANSLATION_KEY = "Replicator.Message.InitialiseFatalError";

describe("ObsidianServiceContext contract", () => {
    it("preserves the plug-in capabilities and host-neutral API results", () => {
        type Parameters = ConstructorParameters<typeof ObsidianServiceContext>;
        const app = {} as Parameters[0];
        const plugin = {} as Parameters[1];
        const tabulariumPlugin = {} as Parameters[2];
        const notices = {} as Parameters[3];
        const noticeGroups = {} as Parameters[4];
        const context = new ObsidianServiceContext(app, plugin, tabulariumPlugin, notices, noticeGroups);

        expect(observeServiceContext(context, TRANSLATION_KEY)).toEqual({
            translation: translateCatalogueMessage(TRANSLATION_KEY),
            receivedEvents: ["context-contract-event"],
        });
        expect(context.events).toBe(eventHub);
        expect(context.app).toBe(app);
        expect(context.plugin).toBe(plugin);
        expect(context.tabulariumPlugin).toBe(tabulariumPlugin);
        expect(context.notices).toBe(notices);
        expect(context.noticeGroups).toBe(noticeGroups);
    });
});
