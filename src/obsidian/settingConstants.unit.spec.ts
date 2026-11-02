import { afterEach, describe, expect, it } from "vitest";

import { setLang } from "@/core/common/translation";
import { getConfig, getConfName } from "./settingConstants";

describe("setting manifest labels", () => {
    afterEach(() => setLang("def"));

    it("renders names and descriptions in the selected display language", () => {
        setLang("zh");

        expect(getConfName("liveSync")).toBe("同步模式");
        expect(getConfig("couchDB_URI")).toMatchObject({ name: "服务器 URI" });
        expect(getConfig("encrypt")).toMatchObject({
            name: "端到端加密",
            desc: "加密远程数据库中的内容。如果您使用插件的同步功能,则建议启用此功能 ",
        });
    });

    it("leaves English untouched, so that the catalogue key and its English value stay interchangeable", () => {
        expect(getConfName("liveSync")).toBe("Sync Mode");
        expect(getConfig("encrypt")).toMatchObject({
            name: "End-to-End Encryption",
            desc: "Encrypt contents on the remote database. If you use the plugin's synchronization feature, enabling this is recommended.",
        });
    });

    it("translates labels which Commonlib owns", () => {
        setLang("zh");

        expect(getConfName("chunkSplitterVersion")).toBe("块分割器");
    });
});
