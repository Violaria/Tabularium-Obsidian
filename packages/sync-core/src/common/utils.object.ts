import { SyncError } from "./LSError";

export function asCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj)) as T;
}

export function ensureError(error: unknown): Error {
    if (error instanceof Error) {
        return error;
    }
    return SyncError.fromError(error);
}
