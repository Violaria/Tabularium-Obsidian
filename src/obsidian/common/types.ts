import type { PluginManifest, TFile } from "@/deps.ts";
import { type DatabaseEntry, type EntryBody, type FilePath } from "@tabularium/sync-core/compat/common/types";
export type { CacheData, FileEventItem } from "@tabularium/sync-core/compat/common/types";

export interface PluginDataEntry extends DatabaseEntry {
    deviceVaultName: string;
    mtime: number;
    manifest: PluginManifest;
    mainJs: string;
    manifestJson: string;
    styleCss?: string;
    // it must be encrypted.
    dataJson?: string;
    _conflicts?: string[];
    type: "plugin";
}

export interface PluginList {
    [key: string]: PluginDataEntry[];
}

export interface DevicePluginList {
    [key: string]: PluginDataEntry;
}
export const PERIODIC_PLUGIN_SWEEP = 60;

export interface InternalFileInfo {
    path: FilePath;
    mtime: number;
    ctime: number;
    size: number;
    deleted?: boolean;
}

export interface FileInfo {
    path: FilePath;
    mtime: number;
    ctime: number;
    size: number;
    deleted?: boolean;
    file: TFile;
}

export type queueItem = {
    entry: EntryBody;
    missingChildren: string[];
    timeout?: number;
    done?: boolean;
    warned?: boolean;
};

export const FileWatchEventQueueMax = 10;

export { configURIBase, configURIBaseQR } from "@tabularium/sync-core/compat/common/types";

export {
    CHeader,
    PSCHeader,
    PSCHeaderEnd,
    ICHeader,
    ICHeaderEnd,
    ICHeaderLength,
    ICXHeader,
} from "@tabularium/sync-core/compat/common/models/fileaccess.const";
