import { PartialMessages as def } from "./def.ts";
import { PartialMessages as la } from "./la.ts";
import { PartialMessages as zh } from "./zh.ts";
import { expandKeywords, type MESSAGE } from "@/core/common/rosetta.ts";

type MessageKeys = keyof typeof def.def;

const messages = {
    ...def,
    ...la,
    ...zh,
};
const w = Object.entries(messages)
    .map(([lang, messageDefs]) => Object.entries(messageDefs).map(([key, value]) => [key, [lang, value]] as const))
    .flat();

const _allMessages = w.reduce(
    (acc, [key, value]) => {
        if (!acc[key]) acc[key] = {};
        acc[key][value[0]] = value[1];
        return acc;
    },
    {} as Record<string, Record<string, string>>
) as Record<MessageKeys, { [key: string]: string }>;

const expandedMessage = {
    ...expandKeywords(_allMessages, "def"),
    ...expandKeywords(_allMessages, "la"),
    ...expandKeywords(_allMessages, "zh"),
};

export const allMessages = expandedMessage as { [key: string]: MESSAGE };
export { type MessageKeys };
