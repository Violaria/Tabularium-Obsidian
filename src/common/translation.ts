// Avoid using Obsidian's native function for CLIs.
import { getLanguage } from "@tabularium/sync-core/compat/common/coreEnvFunctions";
import {
    commonlibEnglishMessages,
    englishMessageTranslator,
    type CommonlibMessageKey,
    type MessageTranslator,
} from "@tabularium/sync-core/context";
import { LOG_KIND_WARNING, notice } from "octagonal-wheels/common/logger";
import type { TaggedType } from "octagonal-wheels/common/types";
import { SUPPORTED_I18N_LANGS, type AllMessageKeys, type I18N_LANGS, type LiveSyncCatalogueMessageKey } from "./rosetta";
import { allMessages } from "./messages/combinedMessages.prod.ts";
import {
    liveSyncProvisionalEnglishMessages,
    type LiveSyncProvisionalMessageKey,
} from "./messages/LiveSyncProvisionalMessages.ts";

/** Obsidian's interface languages mapped to ours; Latin is not offered by Obsidian and is chosen in the settings. */
export function languageForObsidian(obsidianLanguage: string): I18N_LANGS {
    return obsidianLanguage.toLowerCase().startsWith("zh") ? "zh" : "def";
}

export function isSupportedLanguage(lang: string): lang is I18N_LANGS {
    return lang === "" || SUPPORTED_I18N_LANGS.includes(lang);
}

function resolveLanguage(lang: I18N_LANGS): I18N_LANGS {
    if (lang !== "") return lang;
    return languageForObsidian(getLanguage());
}

// "" follows Obsidian, resolved on each lookup: this module loads before the plug-in installs Obsidian's language getter,
// so resolving here would fix English for every command registered before the layout is ready.
export let currentLang: I18N_LANGS = "";
const missingTranslations = [] as string[];
let __onMissingTranslations = (key: string) => notice(key, LOG_KIND_WARNING);
const msgCache = new Map<string, string>();

export function getResolvedLang(lang: I18N_LANGS = currentLang): I18N_LANGS {
    return resolveLanguage(lang);
}

export function isAutoDisplayLanguage(lang: I18N_LANGS): boolean {
    return lang === "";
}

export function __getMissingTranslations() {
    return missingTranslations;
}

export function __onMissingTranslation(callback: (key: string) => void) {
    __onMissingTranslations = callback;
}

/** Accepts any saved setting value: a language that is not shipped falls back to automatic selection. */
export function setLang(lang: string) {
    const resolvedLang = resolveLanguage(isSupportedLanguage(lang) ? lang : "");
    if (resolvedLang === currentLang) return;
    currentLang = resolvedLang;
    msgCache.clear();
}

function _getMessage(key: string, lang: I18N_LANGS) {
    if (key.trim() == "") return key;

    const provisionalEnglish = liveSyncProvisionalEnglishMessages[key as LiveSyncProvisionalMessageKey];
    const msgs =
        allMessages[key] ?? (provisionalEnglish === undefined ? undefined : ({ def: provisionalEnglish } as const));
    if (msgs === undefined && isCommonlibMessageKey(key)) return englishMessageTranslator(key);
    const resolvedLang = resolveLanguage(lang);
    let msg = msgs?.[resolvedLang];

    if (!msg) {
        if (missingTranslations.indexOf(key) === -1) {
            __onMissingTranslations(key);
            missingTranslations.push(key);
        }
        // Commonlib and provisional texts keep their English outside the catalogue.
        msg = msgs?.def ?? (isCommonlibMessageKey(key) ? englishMessageTranslator(key) : provisionalEnglish);
    }
    return msg ?? key;
}

function getMessage(key: string) {
    if (msgCache.has(key)) return msgCache.get(key) as string;
    const msg = _getMessage(key, currentLang);
    msgCache.set(key, msg);
    return msg;
}

export function $t(message: string, lang?: I18N_LANGS) {
    if (lang !== undefined) {
        return _getMessage(message, lang);
    }
    return getMessage(message);
}

export function translateIfAvailable(message: string, lang?: I18N_LANGS) {
    if (message.trim() == "" || (!isLiveSyncMessageKey(message) && !isCommonlibMessageKey(message))) return message;
    return $t(message, lang);
}

/** Catalogue keys with `${…}` values (template literals in the source) as patterns over the rendered text. */
let noticePatterns: { key: string; pattern: RegExp; names: string[] }[] | undefined;
function patterns() {
    noticePatterns ??= Object.keys(allMessages)
        .filter((key) => key.includes("${"))
        .map((key) => {
            const names: string[] = [];
            const pattern = key
                .split(/(\$\{[^}]*\})/)
                .map((part) => {
                    if (!/^\$\{[^}]*\}$/.test(part)) return part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                    names.push(part);
                    return "([\\s\\S]*?)";
                })
                .join("");
            return { key, pattern: new RegExp(`^${pattern}$`), names };
        });
    return noticePatterns;
}

/**
 * A notice as written in English by the code (often upstream's, as a rendered template literal) in the interface
 * language: an exact catalogue entry, else an entry whose `${…}` parts match the values, which are put into the
 * translation. Text not in the catalogue is shown as it is.
 */
export function translateNotice(message: string): string {
    if (isLiveSyncMessageKey(message)) return $t(message);
    for (const { key, pattern, names } of patterns()) {
        const match = pattern.exec(message);
        if (!match) continue;
        let text = $t(key);
        names.forEach((name, index) => (text = text.split(name).join(match[index + 1])));
        return text;
    }
    return message;
}

function isCommonlibMessageKey(key: string): key is CommonlibMessageKey {
    return key in commonlibEnglishMessages;
}

function isLiveSyncMessageKey(key: string): key is LiveSyncCatalogueMessageKey {
    return key in allMessages || key in liveSyncProvisionalEnglishMessages;
}

/**
 * TagFunction to Automatically translate.
 * @param strings
 * @param values
 * @returns
 */
export function $f(strings: TemplateStringsArray, ...values: string[]) {
    let result = "";
    for (let i = 0; i < values.length; i++) {
        result += getMessage(strings[i]) + values[i];
    }
    result += getMessage(strings[strings.length - 1]);
    return result;
}

export function $msg<T extends AllMessageKeys>(
    key: T,
    params: Record<string, string> = {},
    lang?: I18N_LANGS
): TaggedType<string, T> {
    let msg = $t(key, lang);
    for (const [placeholder, value] of Object.entries(params)) {
        const regex = new RegExp(`\\\${${placeholder}}`, "g");
        // A function replacement: values such as file names or server errors may contain `$&` or `$'`.
        msg = msg.replace(regex, () => value);
    }
    return msg as TaggedType<string, T>;
}

/** Supplies the LiveSync-owned language catalogue through the Commonlib host boundary. */
export type LiveSyncMessageTranslator = MessageTranslator<AllMessageKeys>;

export const translateLiveSyncMessage: LiveSyncMessageTranslator = (key, params) => {
    if (!isLiveSyncMessageKey(key)) return englishMessageTranslator(key, params);
    return $msg(key, params === undefined ? undefined : { ...params });
};
