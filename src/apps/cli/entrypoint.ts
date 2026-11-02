#!/usr/bin/env node
import { RTCPeerConnection } from "werift";
import { main } from "./main";
import { compatGlobal } from "@tabularium/sync-core/compat/common/coreEnvFunctions";
import { createNodeStandardIo } from "@tabularium/sync-core/node";
import { writeStderrLine } from "./cliOutput";

if (
    typeof (compatGlobal as unknown as Record<string, unknown>).RTCPeerConnection === "undefined" &&
    typeof RTCPeerConnection === "function"
) {
    // Fill only the standard WebRTC global in Node CLI runtime.
    (compatGlobal as unknown as Record<string, unknown>).RTCPeerConnection = RTCPeerConnection;
}

const standardIo = createNodeStandardIo();

main(standardIo).catch((error) => {
    writeStderrLine(standardIo, `[Fatal Error]`, error);
    process.exit(1);
});
