import { EventHub } from "octagonal-wheels/events";

declare global {
    interface LSEvents {
        hello: string;
        world: undefined;
    }
}

/** An event hub owned by one Commonlib service context. */
export type SyncEventHub = EventHub<LSEvents>;

/** Creates an isolated event hub for one Commonlib client or host composition. */
export function createSyncEventHub(): SyncEventHub {
    return new EventHub<LSEvents>();
}
