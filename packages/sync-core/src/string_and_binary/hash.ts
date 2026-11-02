import type { XXHashAPI } from "xxhash-wasm-102";
import { digestHash, xxhashNew as untypedXxhashNew } from "octagonal-wheels/hash/xxhash.js";

/** octagonal-wheels ships its patched xxhash-wasm without declarations; it has the API of xxhash-wasm 1.0.2. */
export const xxhashNew = untypedXxhashNew as unknown as () => Promise<XXHashAPI>;
export { digestHash };
