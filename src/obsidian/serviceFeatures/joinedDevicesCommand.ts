import { declareUICommand } from "@tabularium/sync-core/ui-commands";

export const OPEN_JOINED_DEVICES = declareUICommand<void, "closed" | "already-open" | "unavailable">(
    "livesync:joined-devices"
);
