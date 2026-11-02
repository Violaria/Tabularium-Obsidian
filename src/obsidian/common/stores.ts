import { PersistentMap } from "octagonal-wheels/dataobject/PersistentMap";
import { ownStorageKeys } from "@/features/tabularium/ownNames";

export let sameChangePairs: PersistentMap<number[]>;

export function initializeStores(vaultName: string) {
    sameChangePairs = new PersistentMap<number[]>(ownStorageKeys.sameChanges(vaultName));
}
