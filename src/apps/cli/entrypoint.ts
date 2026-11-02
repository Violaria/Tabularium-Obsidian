#!/usr/bin/env node
import { main } from "./main";
import { createNodeStandardIo } from "@tabularium/sync-core/node";
import { writeStderrLine } from "./cliOutput";

const standardIo = createNodeStandardIo();

main(standardIo).catch((error) => {
    writeStderrLine(standardIo, `[Fatal Error]`, error);
    process.exit(1);
});
