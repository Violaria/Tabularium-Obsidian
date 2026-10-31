// What web notes and the share viewer add to markdown-it so notes read like they do in Obsidian: code blocks with the
// language named, a copy button and highlighting (shell sessions look like a terminal, configuration files like a
// settings panel), Obsidian callouts (> [!note] Title), and task lists. Raw HTML stays disabled; highlight.js returns
// escaped text with its own spans only.
import type MarkdownIt from "markdown-it";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import shell from "highlight.js/lib/languages/shell";
import powershell from "highlight.js/lib/languages/powershell";
import dos from "highlight.js/lib/languages/dos";
import yaml from "highlight.js/lib/languages/yaml";
import json from "highlight.js/lib/languages/json";
import ini from "highlight.js/lib/languages/ini";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import cpp from "highlight.js/lib/languages/cpp";
import c from "highlight.js/lib/languages/c";
import csharp from "highlight.js/lib/languages/csharp";
import java from "highlight.js/lib/languages/java";
import go from "highlight.js/lib/languages/go";
import rust from "highlight.js/lib/languages/rust";
import sql from "highlight.js/lib/languages/sql";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import nginx from "highlight.js/lib/languages/nginx";
import diff from "highlight.js/lib/languages/diff";
import markdown from "highlight.js/lib/languages/markdown";
import php from "highlight.js/lib/languages/php";
import lua from "highlight.js/lib/languages/lua";
import makefile from "highlight.js/lib/languages/makefile";
import latex from "highlight.js/lib/languages/latex";
import plaintext from "highlight.js/lib/languages/plaintext";
import { escapeXml } from "@/features/tabularium/epub";

for (const [name, language] of Object.entries({ bash, shell, powershell, dos, yaml, json, ini, xml, css, javascript, typescript, python, cpp, c, csharp, java, go, rust, sql, dockerfile, nginx, diff, markdown, php, lua, makefile, latex, plaintext }))
    hljs.registerLanguage(name, language);
hljs.registerAliases(["sh", "zsh", "fish"], { languageName: "bash" });
hljs.registerAliases(["console", "terminal"], { languageName: "shell" });
hljs.registerAliases(["toml", "conf", "cfg", "env", "properties", "systemd", "service"], { languageName: "ini" });
hljs.registerAliases(["html", "svg", "xaml"], { languageName: "xml" });
hljs.registerAliases(["cmd", "bat"], { languageName: "dos" });
hljs.registerAliases(["jsonc", "json5"], { languageName: "json" });

/** Shell sessions read as a terminal, configuration as a settings panel, the rest as code. */
const TERMINAL = new Set(["bash", "sh", "zsh", "fish", "shell", "console", "terminal", "powershell", "ps1", "pwsh", "ps", "cmd", "bat", "dos"]);
const CONFIG = new Set(["yaml", "yml", "json", "jsonc", "json5", "toml", "ini", "conf", "cfg", "env", "properties", "nginx", "dockerfile", "systemd", "service", "xml", "caddyfile"]);
const NAMES: Record<string, string> = {
    bash: "Bash", sh: "Shell", zsh: "Zsh", fish: "Fish", shell: "Shell", console: "Terminal", terminal: "Terminal", powershell: "PowerShell", ps1: "PowerShell",
    pwsh: "PowerShell", cmd: "CMD", bat: "Batch", yaml: "YAML", yml: "YAML", json: "JSON", jsonc: "JSON", toml: "TOML", ini: "INI", conf: "Config", cfg: "Config",
    env: "Env", nginx: "nginx", dockerfile: "Dockerfile", systemd: "systemd", xml: "XML", html: "HTML", css: "CSS", js: "JavaScript", javascript: "JavaScript",
    ts: "TypeScript", typescript: "TypeScript", py: "Python", python: "Python", cpp: "C++", "c++": "C++", c: "C", cs: "C#", csharp: "C#", java: "Java",
    go: "Go", rust: "Rust", rs: "Rust", sql: "SQL", diff: "Diff", md: "Markdown", markdown: "Markdown", php: "PHP", lua: "Lua", makefile: "Makefile",
    tex: "LaTeX", latex: "LaTeX", text: "Text", txt: "Text", plaintext: "Text",
};
const CALLOUT_GROUPS: Record<string, string> = {
    note: "note", info: "note", todo: "note", abstract: "summary", summary: "summary", tldr: "summary", tip: "tip", hint: "tip", important: "tip",
    success: "success", check: "success", done: "success", question: "question", help: "question", faq: "question", warning: "warning",
    caution: "warning", attention: "warning", failure: "danger", fail: "danger", missing: "danger", danger: "danger", error: "danger", bug: "danger",
    example: "example", quote: "quote", cite: "quote",
};

export interface MarkdownTexts {
    copy: string;
}

/** Adds code blocks, callouts and task lists to a markdown-it instance. */
export function enhance(md: MarkdownIt, texts: MarkdownTexts) {
    md.renderer.rules.fence = (tokens, index) => {
        const token = tokens[index];
        const lang = token.info.trim().split(/\s+/)[0].toLowerCase();
        // Diagrams are drawn after the page shows them (renderDiagrams); until then, and where they cannot be, the source shows.
        if (lang === "mermaid") return `<figure class="mermaid-diagram" data-source="${escapeXml(token.content)}"><pre><code>${escapeXml(token.content)}</code></pre></figure>`;
        const known = lang && hljs.getLanguage(lang);
        const body = known ? hljs.highlight(token.content, { language: lang, ignoreIllegals: true }).value : escapeXml(token.content);
        const kind = TERMINAL.has(lang) ? "terminal" : CONFIG.has(lang) ? "config" : "code";
        const name = NAMES[lang] ?? (lang ? lang : "");
        return `<figure class="code-block" data-kind="${kind}"><figcaption><span class="code-lang">${escapeXml(name)}</span><button type="button" class="code-copy">${escapeXml(texts.copy)}</button></figcaption><pre><code class="hljs">${body}</code></pre></figure>`;
    };
    // Callouts: a quote whose first line is [!type] with an optional title (and +/- for folding, shown open here).
    md.core.ruler.after("block", "callouts", (state) => {
        const tokens = state.tokens;
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].type !== "blockquote_open" || tokens[i + 1]?.type !== "paragraph_open" || tokens[i + 2]?.type !== "inline") continue;
            const inline = tokens[i + 2];
            const match = /^\[!([A-Za-z-]+)\][+-]?[ \t]*([^\n]*)\n?/.exec(inline.content);
            if (!match) continue;
            const type = match[1].toLowerCase();
            tokens[i].meta = { callout: CALLOUT_GROUPS[type] ?? "note", title: match[2].trim() || type.charAt(0).toUpperCase() + type.slice(1) };
            inline.content = inline.content.slice(match[0].length);
            // A callout with only a title has an empty first paragraph: drop it.
            if (!inline.content.trim()) {
                tokens[i + 1].hidden = true;
                tokens[i + 3].hidden = true;
            }
        }
    });
    md.renderer.rules.blockquote_open = (tokens, index, options, env, self) => {
        const meta = tokens[index].meta as { callout: string; title: string } | null;
        if (!meta) return self.renderToken(tokens, index, options);
        return `<div class="callout" data-callout="${meta.callout}"><div class="callout-title">${escapeXml(meta.title)}</div><div class="callout-body">`;
    };
    md.renderer.rules.blockquote_close = (tokens, index, options, env, self) => {
        let depth = 0;
        for (let open = index - 1; open >= 0; open--) {
            if (tokens[open].type === "blockquote_close") depth++;
            else if (tokens[open].type === "blockquote_open") {
                if (depth === 0) return tokens[open].meta ? "</div></div>" : self.renderToken(tokens, index, options);
                depth--;
            }
        }
        return self.renderToken(tokens, index, options);
    };
    // Task lists: "- [ ] item" and "- [x] item".
    md.core.ruler.after("inline", "tasks", (state) => {
        const tokens = state.tokens;
        for (let i = 2; i < tokens.length; i++) {
            const inline = tokens[i];
            if (inline.type !== "inline" || tokens[i - 1].type !== "paragraph_open" || tokens[i - 2].type !== "list_item_open") continue;
            const first = inline.children?.[0];
            const match = first?.type === "text" ? /^\[([ xX])\]\s/.exec(first.content) : null;
            if (!match || !first) continue;
            first.content = first.content.slice(match[0].length);
            const box = new state.Token("html_inline", "", 0);
            box.content = `<input type="checkbox" disabled${match[1] === " " ? "" : " checked"}> `;
            inline.children!.unshift(box);
            tokens[i - 2].attrJoin("class", match[1] === " " ? "task" : "task done");
        }
    });
}

/** Copies the code of the block whose copy button was clicked; returns whether the click was on one. */
export function copyCode(event: MouseEvent, copied: string) {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>(".code-copy");
    if (!button) return false;
    event.preventDefault();
    const code = button.closest(".code-block")?.querySelector("code")?.textContent ?? "";
    const label = button.textContent;
    void navigator.clipboard.writeText(code).then(() => {
        button.textContent = copied;
        setTimeout(() => (button.textContent = label), 1500);
    });
    return true;
}
