import { setIcon, setTooltip, type ButtonComponent, type Setting } from "obsidian";

/** An explanation behind an icon after the setting name: shown on hover; tapping it (on mobile) shows or hides it below the name. */
export function hint(setting: Setting, text: string) {
    const icon = setting.nameEl.createSpan({ cls: "tabularium-hint" });
    setIcon(icon, "info");
    setTooltip(icon, text);
    icon.addEventListener("click", () => {
        setting.descEl.setText(setting.descEl.getText() === text ? "" : text);
    });
    return setting;
}

/**
 * Marks a button as destructive. Obsidian 1.13 has setDestructive and deprecates setWarning; both set this class, and
 * the plug-in supports Obsidian 1.7.2.
 */
export function destructive(button: ButtonComponent) {
    button.buttonEl.addClass("mod-warning");
    return button;
}
