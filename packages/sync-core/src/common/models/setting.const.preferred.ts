import { E2EEAlgorithms } from "./setting.const";
import type { SyncSettings } from "./setting.type";

export const PREFERRED_BASE: Partial<SyncSettings> = {
    syncMaxSizeInMB: 50,
    customChunkSize: 0,
    chunkSplitterVersion: "v3-rabin-karp",
    usePluginSyncV2: true,
    handleFilenameCaseSensitive: false,
    E2EEAlgorithm: E2EEAlgorithms.V2,
};

export const PREFERRED_SETTING_CLOUDANT: Partial<SyncSettings> = {
    ...PREFERRED_BASE,
    sendChunksBulkMaxSize: 1,
    concurrencyOfReadChunksOnline: 100,
    minimumIntervalOfReadChunksOnline: 333,
};
export const PREFERRED_SETTING_SELF_HOSTED: Partial<SyncSettings> = {
    ...PREFERRED_BASE,
    sendChunksBulkMaxSize: 1,
    concurrencyOfReadChunksOnline: 30,
    minimumIntervalOfReadChunksOnline: 25,
};
export const PREFERRED_JOURNAL_SYNC: Partial<SyncSettings> = {
    ...PREFERRED_BASE,
    concurrencyOfReadChunksOnline: 30,
    minimumIntervalOfReadChunksOnline: 25,
};
