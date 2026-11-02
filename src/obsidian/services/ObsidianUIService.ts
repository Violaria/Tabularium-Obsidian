import type { IConfigService } from "@tabularium/sync-core/compat/services/base/IService";
import type { AppLifecycleService } from "@tabularium/sync-core/compat/services/base/AppLifecycleService";
import type { ReplicatorService } from "@tabularium/sync-core/compat/services/base/ReplicatorService";
import { UIService } from "@tabularium/sync-core/compat/services/implements/base/UIService";
import { ObsidianServiceContext } from "@/obsidian/services/ObsidianServiceContext";
import { ObsidianSvelteDialogManager } from "@/ui/dialogs/SvelteDialogObsidian";
import DialogToCopy from "@/ui/dialogs/dialogues/DialogueToCopy.svelte";
import type { IAPIService, IControlService } from "@tabularium/sync-core/compat/services/base/IService";
export type ObsidianUIServiceDependencies<T extends ObsidianServiceContext = ObsidianServiceContext> = {
    appLifecycle: AppLifecycleService<T>;
    config: IConfigService;
    replicator: ReplicatorService<T>;
    APIService: IAPIService;
    control: IControlService;
};

export class ObsidianUIService extends UIService<ObsidianServiceContext> {
    override get dialogToCopy() {
        return DialogToCopy;
    }
    constructor(context: ObsidianServiceContext, dependents: ObsidianUIServiceDependencies<ObsidianServiceContext>) {
        const obsidianConfirm = dependents.APIService.confirm;
        const obsidianSvelteDialogManager = new ObsidianSvelteDialogManager<ObsidianServiceContext>(context, {
            appLifecycle: dependents.appLifecycle,
            config: dependents.config,
            replicator: dependents.replicator,
            confirm: obsidianConfirm,
            control: dependents.control,
        });
        super(context, {
            dialogManager: obsidianSvelteDialogManager,
            APIService: dependents.APIService,
        });
    }
}
