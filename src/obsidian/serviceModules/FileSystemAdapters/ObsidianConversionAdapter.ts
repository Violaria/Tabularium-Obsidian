import type { UXFileInfoStub, UXFolderInfo } from "@tabularium/sync-core/compat/common/types";
import type { IConversionAdapter } from "@tabularium/sync-core/compat/serviceModules/adapters";
import { TFileToUXFileInfoStub, TFolderToUXFileInfoStub } from "@/obsidian/utilObsidian";
import type { TFile, TFolder } from "obsidian";

/**
 * Conversion adapter implementation for Obsidian
 */

export class ObsidianConversionAdapter implements IConversionAdapter<TFile, TFolder> {
    nativeFileToUXFileInfoStub(file: TFile): UXFileInfoStub {
        return TFileToUXFileInfoStub(file);
    }

    nativeFolderToUXFolder(folder: TFolder): UXFolderInfo {
        return TFolderToUXFileInfoStub(folder);
    }
}
