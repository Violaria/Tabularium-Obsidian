// Tabularium ships English, Chinese and Latin. Every plug-in message — catalogue, Commonlib and provisional — must
// exist in all three, and no plug-in or web page text may contain emoji. Run after `npm run i18n:bake`; exits non-zero with the offending keys.
import { commonlibEnglishMessages } from "@tabularium/sync-core/context";
import { provisionalEnglishMessages } from "../src/core/common/messages/ProvisionalMessages.ts";

const fs = process.getBuiltinModule("node:fs");
const path = process.getBuiltinModule("node:path");
const dir = path.resolve(import.meta.dirname, "../src/core/common/messagesJson");
const load = (lang: string) => JSON.parse(fs.readFileSync(path.join(dir, `${lang}.json`), "utf8")) as Record<string, string>;
const en = load("en");
const catalogues = { zh: load("zh"), la: load("la") };
const external: Record<string, string> = { ...commonlibEnglishMessages, ...provisionalEnglishMessages };

const keys = [...new Set([...Object.keys(en), ...Object.keys(external)])].sort();
const emoji = /\p{Extended_Pictographic}/u;
const problems: string[] = [];
for (const [lang, catalogue] of Object.entries(catalogues)) {
    const missing = keys.filter((key) => !catalogue[key]?.trim());
    if (missing.length) problems.push(`${lang}: ${missing.length} missing\n  ${missing.slice(0, 20).join("\n  ")}`);
    const extra = Object.keys(catalogue).filter((key) => !(key in en) && !(key in external));
    if (extra.length) problems.push(`${lang}: ${extra.length} keys not in English\n  ${extra.slice(0, 20).join("\n  ")}`);
}
// English shown to users: the catalogue, or Commonlib/provisional text where the catalogue does not override it.
const shown: Record<string, Record<string, string>> = { en: { ...external, ...en }, ...catalogues };
for (const [lang, catalogue] of Object.entries(shown)) {
    const withEmoji = Object.entries(catalogue).filter(([, text]) => emoji.test(text));
    if (withEmoji.length) problems.push(`${lang}: ${withEmoji.length} texts with emoji\n  ${withEmoji.slice(0, 20).map(([key]) => key).join("\n  ")}`);
}
// The product is Tabularium: shown texts never name the original plug-in, not even by its id or in a link.
// Placeholders (`${…}`) are code, not displayed text.
const upstreamName = /livesync/i;
const exempt = (text: string) => text.replace(/\$\{[^}]*\}/g, "");
for (const [lang, catalogue] of Object.entries(shown)) {
    const named = Object.entries(catalogue).filter(([, text]) => upstreamName.test(exempt(text)));
    if (named.length) problems.push(`${lang}: ${named.length} texts name Tabularium\n  ${named.slice(0, 20).map(([key]) => key).join("\n  ")}`);
}
// Web pages: the types already require every language; check them for emoji too.
const { catalogues: web } = await import("../../server/ui/messages.ts");
for (const [lang, catalogue] of Object.entries(web)) {
    const withEmoji = Object.entries(catalogue).filter(([, text]) => emoji.test(text));
    if (withEmoji.length) problems.push(`web ${lang}: ${withEmoji.length} texts with emoji\n  ${withEmoji.map(([key]) => key).join("\n  ")}`);
}
if (problems.length) {
    process.stderr.write(`Interface languages are incomplete:\n${problems.join("\n")}\n`);
    process.exit(1);
}
process.stdout.write(`${keys.length} plug-in messages and ${Object.keys(web.en).length} web texts in English, Chinese and Latin, no emoji, no upstream product name.\n`);
