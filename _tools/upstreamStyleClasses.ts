// The class names of the original Self-hosted LiveSync's style sheet (styles.css at 935511c6, version 1.0.40), less the
// ones that are Obsidian's own: deleted, is-ios, is-mobile, modal, selected, setting-item, setting-item-control,
// setting-item-description, setting-item-info, svg-icon and workspace-leaf-content appear in Obsidian's app.css. The
// original's styles apply to any element with these classes, and Tabularium's to the original's, so neither the
// plug-in's style sheet nor its interface code may use them; checkStyleClasses.ts enforces this.
export const upstreamStyleClasses: readonly string[] = [
    "active-pane", "added", "conflict-action-button", "conflict-action-container", "conflict-dev-name", "diff-focused",
    "diff-nav", "diff-nav-btn", "diff-nav-indicator", "diff-only-label", "diff-options-row", "divider",
    "history-added", "history-deleted", "history-diff-options-row", "history-highlight-diff-container",
    "history-highlight-diff-label", "history-normal", "history-rev-indicator", "history-rev-nav-btn",
    "history-rev-nav-row", "history-search-input", "history-search-progress-indicator",
    "history-search-result-indicator", "history-search-row", "img-base", "img-overlay",
    "livesync-compatibility-review-notice", "livesync-message-box-container", "livesync-stat-ff",
    "livesync-stat-inactive", "livesync-stat-item", "livesync-stat-p2p", "livesync-stat-pull-remaining",
    "livesync-stat-push-remaining", "livesync-status", "livesync-status-loghistory", "livesync-status-messagearea",
    "livesync-status-statusline", "livesync-stat-value", "ls-dialog", "ls-imgdiff-wrap", "ls-mark-cr",
    "menu-setting-advanced-disabled", "menu-setting-edgecase-disabled", "menu-setting-poweruser-disabled", "normal",
    "ob-btn-config-fix", "ob-btn-config-head", "ob-btn-config-info", "op-flex", "op-info", "op-pre", "op-scrollable",
    "op-warn", "op-warn-info", "overlay", "password-input", "setting-collapsed", "sls-dialogue-note-countdown",
    "sls-dialogue-note-wrapper", "sls-header-button", "sls-hidden", "sls-item-dirty", "sls-item-dirty-help",
    "sls-item-invalid-value", "sls-keypair", "sls-onboarding-invitation-action", "sls-plugins-tbl",
    "sls-plugins-tbl-buttons", "sls-plugins-tbl-device-head", "sls-plugins-wrap", "sls-qr", "sls-remote-list",
    "sls-repair-action-menu", "sls-repair-ancestor-warning", "sls-repair-header", "sls-repair-metric",
    "sls-repair-result", "sls-repair-results", "sls-repair-revision", "sls-repair-revision-title", "sls-repair-status",
    "sls-repair-status-ok", "sls-repair-status-warning", "sls-review-harness", "sls-review-harness__error",
    "sls-review-harness__privacy", "sls-review-harness__result", "sls-review-harness__resumed",
    "sls-review-harness__warning", "sls-setting", "sls-setting-additional-action", "sls-setting-advanced",
    "sls-setting-disabled", "sls-setting-edgecase", "sls-setting-hidden", "sls-setting-label", "sls-setting-menu",
    "sls-setting-menu-btn", "sls-setting-menu-buttons", "sls-setting-menu-wrapper", "sls-setting-obsolete",
    "sls-setting-panel-title", "sls-setting-poweruser", "sls-setting-tab", "sls-setting-with-additional-actions",
    "sls-troubleshoot-preview", "syncstatusbar", "tcenter", "vpk-action-dialog__message",
];
