# Tabularium for Obsidian

English · [中文](README.zh-CN.md) · [Lingua Latīna](README.la.md)

An Obsidian plug-in that synchronises a vault, end-to-end encrypted, with a self-hosted [Tabularium](https://github.com/Violaria/Tabularium) server.

## Requirements and network use

You need a Tabularium server; without a server and an account the plug-in does nothing. Every network request goes to the server address you enter: signing in, issuing and renewing this device's credentials, synchronisation, Send to Kindle and sharing. The plug-in sends no telemetry, and its help pages are bundled with it.

Notes are encrypted on the device with the vault's passphrase (E2EE V2, with path obfuscation) before they leave it. The passphrase is stored only on the device, and the server rejects unencrypted documents. Two features send readable content, and only when you use them: Send to Kindle mails an EPUB through the server, and a shared note is published at a link that anyone with the link can open.

## Features

- Sign in with the server address, user name and password, then choose an existing vault or create one, name the device and enter the passphrase. The plug-in gets credentials of its own for this device and renews them while it is in use.
- Live, periodic or event-triggered synchronisation, conflict handling and per-note history. Encryption and path obfuscation are always on while connected. Synchronisation goes through the Tabularium server only: hidden files and plug-in and theme settings are not synchronised, and CouchDB, object storage or peer-to-peer cannot be set up by hand.
- Maintenance from the settings page: fetch everything from the server, overwrite the server from this device (after the vault owner allows it on the web), unlock, diagnostics.
- Your own File Explorer ordering, defined in `sortspec.md` files.
- Send a note, a folder or a selection to a Kindle address configured on the server.
- Share a note or folder as a web page; the page updates when the shared files change.
- A formatting toolbar on text selection, and a tool to find and repair broken internal links.
- Interface in English, Chinese and Latin.
- Can be enabled in the same vault as Self-hosted LiveSync and Custom File Explorer sorting: their local data stay apart, and while Custom File Explorer sorting is enabled it does the sorting.

## Installation

Until the plug-in is listed in Obsidian's community directory, copy `main.js`, `manifest.json` and `styles.css` from a release into `.obsidian/plugins/tabularium/` in the vault, then enable Tabularium under Community plug-ins. Run the command "Tabularium: Server connection" to sign in.

## Building

This repository is a submodule of [Tabularium](https://github.com/Violaria/Tabularium); it depends on the sorting package there. Clone the parent with `--recurse-submodules` and, with Node.js 24.10.0:

```bash
npm run bootstrap
npm run build --prefix apps/obsidian      # main.js
npm run check --prefix apps/obsidian      # type checks, lint, Svelte checks
npm run test:unit --prefix apps/obsidian
```

The same source also produces the browser client (`src/apps/notes/`) and the command-line client (`src/apps/cli/`) that the Tabularium server uses.
