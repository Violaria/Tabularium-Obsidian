// Broken links: internal links that no longer reach a file, after a note was moved or renamed outside Obsidian's own
// rename (in a file manager, with Git, on another device with link updates off). Found with Obsidian's link index; each
// is offered the files with the same name; repairs are written with Obsidian's own link format.
import { Modal, Notice, parseLinktext, Setting, debounce } from "@/deps";
import type { App, ButtonComponent, Plugin, ReferenceCache, TFile } from "obsidian";
import { LOG_LEVEL_INFO } from "octagonal-wheels/common/logger";
import { $msg } from "@/core/common/translation";
import { ownStorageKeys } from "./ownNames";
import type { LiveSyncCore } from "@/main";

/** One broken link: where it is, what it says, and the files it could mean. */
export interface BrokenLink {
    file: TFile;
    /** The link as written, with its position in the note. */
    original: string;
    start: number;
    end: number;
    /** The path part of the link, its `#heading` or `^block`, and the text shown instead of it. */
    path: string;
    subpath: string;
    alias?: string;
    embed: boolean;
    candidates: TFile[];
}

/** Turned on per device: plug-in settings are not synced, and two devices fixing the same notes would conflict. */
const AUTO_DELAY_MS = 10_000;

/** The text shown instead of the target: `[[target|alias]]`, or the text of `[text](target)` when it differs from the path. */
function aliasOf(reference: ReferenceCache) {
    const wiki = /^!?\[\[[^\]|]*\|([^\]]*)\]\]$/.exec(reference.original);
    if (wiki) return wiki[1];
    if (reference.original.replace(/^!/, "").startsWith("[[")) return undefined;
    return reference.displayText || undefined;
}

export class TabulariumLinkRepair {
    constructor(
        private readonly plugin: Plugin,
        private readonly core: LiveSyncCore
    ) {}

    // Kept in this device's browser storage for this vault (Obsidian's own vault storage needs 1.8.7).
    private get autoKey() {
        return ownStorageKeys.autoLinkRepair(this.plugin.app.vault.getName());
    }
    get auto() {
        return window.localStorage.getItem(this.autoKey) === "on";
    }
    set auto(on: boolean) {
        if (on) window.localStorage.setItem(this.autoKey, "on");
        else window.localStorage.removeItem(this.autoKey);
    }

    install() {
        const { app } = this.plugin;
        // Registered once the display language is known, so the command name follows it.
        this.core.services.appLifecycle.onSettingLoaded.addHandler(() => {
            this.plugin.addCommand({ id: "check-broken-links", name: $msg("tabularium.links.check"), callback: () => this.check() });
            return Promise.resolve(true);
        });
        // After the link index settles (a sync, a move), unambiguous links are repaired when this device does so.
        const later = debounce((): void => void this.repairUnambiguous(), AUTO_DELAY_MS, true);
        app.workspace.onLayoutReady((): void => {
            this.plugin.registerEvent(
                app.metadataCache.on("resolved", (): void => {
                    if (this.auto) later();
                })
            );
        });
    }

    /** Every internal link in the vault's notes that reaches no file, with the files of the same name. */
    find(): BrokenLink[] {
        const { vault, metadataCache } = this.plugin.app;
        const all = vault.getFiles();
        const found: BrokenLink[] = [];
        for (const file of vault.getMarkdownFiles()) {
            const cache = metadataCache.getFileCache(file);
            for (const reference of [...(cache?.links ?? []), ...(cache?.embeds ?? [])]) {
                const { path, subpath } = parseLinktext(reference.link);
                if (!path || /^[a-z][a-z0-9+.-]*:/i.test(path)) continue;
                if (metadataCache.getFirstLinkpathDest(path, file.path)) continue;
                const name = path.slice(path.lastIndexOf("/") + 1);
                const note = !/\.[^/.]+$/.test(name) || /\.md$/i.test(name);
                const wanted = name.replace(/\.md$/i, "");
                found.push({
                    file,
                    original: reference.original,
                    start: reference.position.start.offset,
                    end: reference.position.end.offset,
                    path,
                    subpath,
                    alias: aliasOf(reference),
                    embed: reference.original.startsWith("!"),
                    candidates: all.filter((candidate) => (note ? candidate.extension === "md" && candidate.basename === wanted : candidate.name === name)),
                });
            }
        }
        return found;
    }

    /**
     * Points each link at its chosen file, written as Obsidian writes links (the user's link format), keeping the heading,
     * block and alias. A link whose text changed since it was found is left alone. Returns how many were fixed and skipped.
     */
    async repair(choices: { link: BrokenLink; target: TFile }[]) {
        const { vault, fileManager } = this.plugin.app;
        let fixed = 0;
        let skipped = 0;
        const byFile = new Map<TFile, { link: BrokenLink; target: TFile }[]>();
        for (const choice of choices) byFile.set(choice.link.file, [...(byFile.get(choice.link.file) ?? []), choice]);
        for (const [file, list] of byFile) {
            await vault.process(file, (data) => {
                // From the end, so earlier offsets stay valid.
                for (const { link, target } of [...list].sort((a, b) => b.link.start - a.link.start)) {
                    if (data.slice(link.start, link.end) !== link.original) {
                        skipped++;
                        continue;
                    }
                    const written = fileManager.generateMarkdownLink(target, file.path, link.subpath, link.alias);
                    data = data.slice(0, link.start) + (link.embed && !written.startsWith("!") ? `!${written}` : written) + data.slice(link.end);
                    fixed++;
                }
                return data;
            });
        }
        return { fixed, skipped };
    }

    check() {
        const broken = this.find();
        if (!broken.length) {
            new Notice($msg("tabularium.links.none"));
            return;
        }
        new BrokenLinksModal(this.plugin.app, this, broken).open();
    }

    /** Repairs the links that have exactly one file of the same name, and logs what changed. */
    async repairUnambiguous() {
        const choices = this.find().flatMap((link) => (link.candidates.length === 1 ? [{ link, target: link.candidates[0] }] : []));
        if (!choices.length) return;
        const { fixed } = await this.repair(choices);
        const notes = [...new Set(choices.map((choice) => choice.link.file.path))];
        this.core.services.API.addLog(`Repaired ${fixed} broken links automatically in ${notes.join(", ")}`, LOG_LEVEL_INFO, "links");
    }
}

/** The broken links by note, each with a choice of file (or none), repaired together. */
class BrokenLinksModal extends Modal {
    constructor(
        app: App,
        private readonly repairer: TabulariumLinkRepair,
        private readonly broken: BrokenLink[]
    ) {
        super(app);
    }

    override onOpen() {
        this.modalEl.addClass("tabularium-links-modal");
        this.setTitle($msg("tabularium.links.title", { count: String(this.broken.length) }));
        const chosen = new Map<BrokenLink, TFile | undefined>();
        const byNote = new Map<string, BrokenLink[]>();
        for (const link of this.broken) byNote.set(link.file.path, [...(byNote.get(link.file.path) ?? []), link]);
        const list = this.contentEl.createDiv({ cls: "tabularium-links" });
        let fixButton: ButtonComponent | undefined;
        const count = () => [...chosen.values()].filter(Boolean).length;
        const refresh = () => fixButton?.setButtonText($msg("tabularium.links.repair", { count: String(count()) })).setDisabled(!count());
        for (const [path, links] of byNote) {
            list.createEl("h4", { text: path });
            for (const link of links) {
                // A single file of the same name is chosen already; with several, the user picks one.
                chosen.set(link, link.candidates.length === 1 ? link.candidates[0] : undefined);
                const row = new Setting(list).setName(link.original);
                if (!link.candidates.length) {
                    row.setDesc($msg("tabularium.links.noCandidate"));
                    continue;
                }
                row.addDropdown((dropdown) => {
                    dropdown.addOption("", $msg("tabularium.links.leave"));
                    for (const candidate of link.candidates) dropdown.addOption(candidate.path, candidate.path);
                    dropdown.setValue(chosen.get(link)?.path ?? "");
                    dropdown.onChange((value) => {
                        chosen.set(link, link.candidates.find((candidate) => candidate.path === value));
                        refresh();
                    });
                });
            }
        }
        new Setting(this.contentEl).addButton((button) =>
            (fixButton = button)
                .setCta()
                .onClick(async () => {
                    const choices = [...chosen].flatMap(([link, target]) => (target ? [{ link, target }] : []));
                    if (!choices.length) return;
                    button.setDisabled(true);
                    const { fixed, skipped } = await this.repairer.repair(choices);
                    new Notice(skipped ? $msg("tabularium.links.doneSkipped", { fixed: String(fixed), skipped: String(skipped) }) : $msg("tabularium.links.done", { fixed: String(fixed) }));
                    this.close();
                })
        );
        refresh();
    }

    override onClose() {
        this.contentEl.empty();
    }
}

export function installLinkRepair(plugin: Plugin, core: LiveSyncCore) {
    const repair = new TabulariumLinkRepair(plugin, core);
    repair.install();
    return repair;
}
