import MarkdownIt from "markdown-it";
import { escapeXml } from "./epub";

/** Returns the href of the image inside the book, or undefined when it cannot be included. */
export type ImageResolver = (target: string) => string | undefined;

const IMAGE = /\.(png|jpe?g|gif)$/i;
export const isPackableImage = (path: string) => IMAGE.test(path);

// Obsidian syntax is rewritten outside code only: fenced blocks and inline code are kept as written.
const CODE = /(^```[\s\S]*?^```|^~~~[\s\S]*?^~~~|`[^`\n]*`)/m;
function rewriteObsidian(markdown: string) {
    return markdown
        .split(new RegExp(CODE.source, "gm"))
        .map((part, index) => {
            if (index % 2) return part;
            return part
                .replace(/%%[\s\S]*?%%/g, "")
                .replace(/!\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]/g, (_, target: string, alias = "") =>
                    `![${alias.replace(/^\d+(x\d+)?$/, "")}](embed:${encodeURIComponent(target.trim())})`)
                .replace(/\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g, (_, target: string, alias?: string) =>
                    alias ?? target.replace(/#.*$/, "").split("/").pop()!);
        })
        .join("");
}

export function renderNote(markdown: string, resolveImage: ImageResolver) {
    const headings: { id: string; title: string }[] = [];
    const md = new MarkdownIt({ html: false, xhtmlOut: true, breaks: true, linkify: false });
    md.renderer.rules.image = (tokens, index) => {
        const token = tokens[index];
        const src = token.attrGet("src") ?? "";
        const alt = token.content;
        let target = src;
        if (src.startsWith("embed:")) target = decodeURIComponent(src.slice(6));
        else {
            try { target = decodeURI(src); } catch { /* keep the raw source */ }
        }
        const href = /^[a-z]+:/i.test(target) ? undefined : resolveImage(target);
        if (href) return `<img src="${escapeXml(href)}" alt="${escapeXml(alt)}"/>`;
        return `<span class="missing">[图片：${escapeXml(alt || target.split("/").pop()!)}]</span>`;
    };
    // Only web links survive; links to notes and attachments have no target inside the book.
    const external = (href: string | null) => !!href && /^(https?|mailto):/i.test(href);
    md.renderer.rules.link_open = (tokens, index, options, _env, self) =>
        external(tokens[index].attrGet("href")) ? self.renderToken(tokens, index, options) : "";
    md.renderer.rules.link_close = (tokens, index, options, _env, self) => {
        let open = index;
        while (open > 0 && tokens[open].type !== "link_open") open--;
        return external(tokens[open].attrGet("href")) ? self.renderToken(tokens, index, options) : "";
    };
    md.renderer.rules.heading_open = (tokens, index, options, _env, self) => {
        if (tokens[index].tag === "h2") {
            const id = `h-${headings.length + 1}`;
            tokens[index].attrSet("id", id);
            headings.push({ id, title: tokens[index + 1].content });
        }
        return self.renderToken(tokens, index, options);
    };
    const source = markdown
        .replace(/^---\r?\n[\s\S]*?\r?\n---(\r?\n|$)/, "")
        // Characters that XML does not allow.
        // eslint-disable-next-line no-control-regex -- matching control characters is the purpose here
        .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\ufffe\uffff]/g, "");
    return { body: md.render(rewriteObsidian(source)), headings };
}
