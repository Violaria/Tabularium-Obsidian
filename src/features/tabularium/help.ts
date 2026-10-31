// Built-in help and version history; the texts are in the message catalogue (tabularium.help.*, tabularium.release.*).

export const HELP_TOPICS = ["connect", "status", "passphrase", "migrate", "rebuild", "errors"] as const;

/** Newest first. */
export const RELEASES = [
    "0.21.0",
    "0.20.0",
    "0.19.0",
    "0.18.2",
    "0.18.1",
    "0.18.0",
    "0.17.0",
    "0.16.0",
    "0.15.0",
    "0.14.0",
    "0.13.0",
    "0.12.0",
    "0.5.0",
    "0.4.0",
    "0.3.0",
] as const;
