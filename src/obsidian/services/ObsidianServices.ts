import { InjectableReplicatorService } from "@tabularium/sync-core/compat/services/implements/injectable/InjectableReplicatorService";
import type { ObsidianServiceContext } from "@/obsidian/services/ObsidianServiceContext";
import { KeyValueDBService } from "@tabularium/sync-core/compat/services/base/KeyValueDBService";
import { reactiveSource } from "octagonal-wheels/dataobject/reactive";
import type { ReplicatorServiceDependencies } from "@tabularium/sync-core/compat/services/base/ReplicatorService";
import type { SyncSettings } from "@tabularium/sync-core/compat/common/types";

type ActivityOptions = {
    label?: string;
};

type ObsidianReplicatorServiceDependencies = ReplicatorServiceDependencies & {
    isMobile: () => boolean;
};

type SleepPreferenceSettings = Pick<
    SyncSettings,
    "allowSleepDuringSynchronisation" | "allowSleepDuringSynchronisationOnDesktop"
>;

export function shouldAllowSleepDuringSynchronisation(settings: SleepPreferenceSettings, isMobile: boolean): boolean {
    return settings.allowSleepDuringSynchronisation || (!isMobile && settings.allowSleepDuringSynchronisationOnDesktop);
}

function withSleepPreference(dependencies: ObsidianReplicatorServiceDependencies): ReplicatorServiceDependencies {
    const activityRunner = dependencies.activityRunner;
    if (!activityRunner) return dependencies;
    return {
        ...dependencies,
        activityRunner: {
            async run<T>(task: () => T | PromiseLike<T>, options?: ActivityOptions): Promise<T> {
                const allowSleep = shouldAllowSleepDuringSynchronisation(
                    dependencies.settingService.currentSettings(),
                    dependencies.isMobile()
                );
                return allowSleep ? await task() : await activityRunner.run(task, options);
            },
        },
    };
}


// InjectableReplicatorService
export class ObsidianReplicatorService extends InjectableReplicatorService<ObsidianServiceContext> {
    readonly boundedLocalApplicationActivityCount = reactiveSource(0);

    constructor(context: ObsidianServiceContext, dependencies: ObsidianReplicatorServiceDependencies) {
        super(context, withSleepPreference(dependencies));
    }

    async runBoundedLocalApplicationActivity<T>(task: () => T | PromiseLike<T>, options?: ActivityOptions): Promise<T> {
        this.boundedLocalApplicationActivityCount.value++;
        try {
            return this.dependencies.activityRunner
                ? await this.dependencies.activityRunner.run(task, options)
                : await task();
        } finally {
            this.boundedLocalApplicationActivityCount.value--;
        }
    }
}

/** The key-value database service is abstract in the core; this is its Obsidian implementation. */
export class ObsidianKeyValueDBService extends KeyValueDBService<ObsidianServiceContext> {}
