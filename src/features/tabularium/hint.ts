import { setIcon, setTooltip, type Setting } from "obsidian";

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
