import { compatGlobal } from "./common/coreEnvFunctions";

let webcrypto: Crypto;
export async function getWebCrypto() {
    if (webcrypto) {
        return webcrypto;
    }
    // Browsers, Obsidian and Node.js (19 and later) all provide Web Crypto globally.
    webcrypto = compatGlobal.crypto;
    return webcrypto;
}
