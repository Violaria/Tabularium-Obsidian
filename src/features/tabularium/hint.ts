import { setIcon, setTooltip, type ButtonComponent, type Setting, type SettingDefinition, type SettingDefinitionRender } from "obsidian";

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
 * A drawn row shown only while `visible` says so. Obsidian draws hidden rows too; this one stays empty while hidden, as
 * what it shows may not exist then. Every change that can show it redraws the page (update()).
 */
export function shownWhen(visible: (() => boolean) | undefined, row: SettingDefinitionRender): SettingDefinitionRender {
    if (!visible) return row;
    return { ...row, visible, render: (setting, group) => (visible() ? row.render(setting, group) : undefined) };
}

/**
 * A row of the settings page that draws its own control. The description goes behind the icon (see hint) and is a
 * search term, so Obsidian's settings search finds the row by it.
 */
export function settingRow(
    name: string,
    desc: string | undefined,
    draw: (setting: Setting) => unknown,
    visible?: () => boolean
): SettingDefinition {
    return shownWhen(visible, {
        name,
        aliases: desc ? [desc] : undefined,
        render: (setting) => {
            if (desc) hint(setting, desc);
            draw(setting);
        },
    });
}

/** A row with text only, a state or an explanation, shown as the description; without a name it is not offered in search. */
export function textRow(name: string, text: () => string, visible?: () => boolean): SettingDefinition {
    return shownWhen(visible, { name, searchable: name !== "", render: (setting) => void setting.setDesc(text()) });
}

export function destructive(button: ButtonComponent) {
    return button.setDestructive();
}
