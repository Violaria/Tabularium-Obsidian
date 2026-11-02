import { Modal, Setting, type App } from "obsidian";
import { $msg } from "@/common/translation";
import { destructive } from "./hint";

export interface ConfirmOptions<C extends string = string> {
    title: string;
    /** What will happen. */
    body: string;
    /** Text shown as it is, in a scrolling block: what will be written. */
    preview?: string;
    /** What it means for the vault's other devices, shown in the one warning block. */
    impact?: string;
    /** The button, naming the action. */
    action: string;
    /** When given, the action is enabled only after this text (the vault's name) is typed. */
    typeToConfirm?: string;
    /** When given, one of these must be chosen first; none is chosen in advance. */
    choices?: { value: C; label: string; desc: string }[];
}

/**
 * A Tabularium confirmation: what happens, the effect on other devices, one way to confirm, two buttons. Resolves to
 * the chosen value (or true without choices) when confirmed, false otherwise.
 */
export function confirmAction<C extends string = string>(app: App, options: ConfirmOptions<C>): Promise<C | boolean> {
    return new Promise((resolve) => {
        let result: C | boolean = false;
        let typed = options.typeToConfirm === undefined;
        let chosen: C | undefined;
        const modal = new Modal(app);
        modal.modalEl.addClass("tabularium-confirm");
        modal.setTitle(options.title);
        const { contentEl } = modal;
        for (const paragraph of options.body.split("\n\n")) contentEl.createEl("p", { text: paragraph });
        if (options.preview !== undefined) contentEl.createEl("pre", { cls: "tabularium-confirm-preview", text: options.preview });
        let button!: HTMLButtonElement;
        const update = () => {
            button.disabled = !typed || (options.choices !== undefined && chosen === undefined);
        };
        if (options.choices) {
            const list = contentEl.createDiv({ cls: "tabularium-choices" });
            for (const choice of options.choices) {
                const label = list.createEl("label", { cls: "tabularium-choice" });
                const input = label.createEl("input", { type: "radio" });
                input.name = "tabularium-choice";
                input.addEventListener("change", () => {
                    chosen = choice.value;
                    update();
                });
                const text = label.createDiv();
                text.createDiv({ cls: "tabularium-choice-label", text: choice.label });
                text.createDiv({ cls: "setting-item-description", text: choice.desc });
            }
        }
        if (options.impact) contentEl.createDiv({ cls: "tabularium-confirm-impact", text: options.impact });
        if (options.typeToConfirm !== undefined) {
            const expected = options.typeToConfirm;
            new Setting(contentEl)
                .setName($msg("tabularium.confirm.typeName", { name: expected }))
                .addText((text) =>
                    text.onChange((value) => {
                        typed = value.trim() === expected;
                        update();
                    })
                );
        }
        new Setting(contentEl)
            .addButton((b) => b.setButtonText($msg("tabularium.confirm.cancel")).onClick(() => modal.close()))
            .addButton((b) => {
                button = b.buttonEl;
                destructive(b.setButtonText(options.action))
                    .onClick(() => {
                        result = chosen ?? true;
                        modal.close();
                    });
            });
        update();
        modal.onClose = () => {
            contentEl.empty();
            resolve(result);
        };
        modal.open();
    });
}
