# Tabularium for Obsidian

An Obsidian plug-in that synchronises a vault, end-to-end encrypted, with a self-hosted [Tabularium](https://github.com/Violaria/Tabularium) server. It is a fork of [Self-hosted LiveSync](https://github.com/vrtmrz/obsidian-livesync) 1.0.40 and includes the File Explorer sorting of [Custom File Explorer sorting](https://github.com/SebastianMC/obsidian-custom-sort) 3.2.0, so it replaces both plug-ins. Disable Self-hosted LiveSync and any other synchronisation plug-in in a vault before enabling this one.

## Requirements and network use

You need an account on a Tabularium server; the plug-in does nothing without one. Every network request goes to the server address you enter: signing in, issuing and renewing this device's credentials, synchronisation, Send to Kindle and sharing. The plug-in sends no telemetry, and its help pages are bundled with it.

Notes are encrypted on the device with the vault's passphrase (LiveSync E2EE V2, with path obfuscation) before they leave it. The passphrase is stored only on the device, and the server rejects unencrypted documents. Two features send readable content, and only when you use them: Send to Kindle mails an EPUB through the server, and a shared note is published at a link that anyone with the link can open.

## Features

- Sign in with the server address, user name and password, then choose an existing vault or create one, name the device and enter the passphrase. The plug-in gets credentials of its own for this device and renews them while it is in use.
- Live, periodic or event-triggered synchronisation, conflict handling and per-note history from LiveSync. Encryption and path obfuscation are always on while connected; hidden-file sync, customisation sync and the manual CouchDB, object storage and peer-to-peer setups of the original plug-in are removed.
- Maintenance from the settings page: fetch everything from the server, overwrite the server from this device (after the vault owner allows it on the web), unlock, diagnostics.
- File Explorer sorting with `sortspec.md` files, as in Custom File Explorer sorting.
- Send a note, a folder or a selection to a Kindle address configured on the server.
- Share a note or folder as a web page; the page updates when the shared files change.
- A formatting toolbar on text selection, and a tool to find and repair broken internal links.
- Interface in English, Chinese and Latin.

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

The same source also produces the browser client (`src/apps/notes/`) and the LiveSync CLI (`src/apps/cli/`) that the Tabularium server uses.

## Licence

MIT, as Self-hosted LiveSync, whose copyright notice is kept in `LICENSE`. Custom File Explorer sorting is by SebastianMC.
