// Interface texts of Tabularium's plug-in features that need more than a single catalogue lookup.
import { $msg, getResolvedLang } from "@/core/common/translation";
import type { BookTexts } from "./kindleBook";

const SERVER_ERRORS = [
    "Invalid username or password",
    "Invalid current password",
    "Change initial password first",
    "Too many requests",
    "Vault is not ready",
    "Invalid password",
    "Kindle address not set",
    "Mail delivery is not configured",
    "Daily Kindle delivery limit reached",
    "Request body too large",
];

/** A server error code in the interface language; unknown codes are shown as sent. */
export const serverError = (code: string) =>
    SERVER_ERRORS.includes(code)
        ? $msg(`tabularium.serverError.${code}` as "tabularium.serverError.Too many requests")
        : code;

/** Texts placed inside a Kindle book, and the book's language, follow the interface language. */
export const bookTexts = (): BookTexts => ({
    language: getResolvedLang() === "def" ? "en" : getResolvedLang(),
    contents: $msg("tabularium.kindle.contents"),
    missingImage: (name) => $msg("tabularium.kindle.missingImage", { name }),
});
