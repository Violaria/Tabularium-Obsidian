# Tabularium for Obsidian

English · [中文](README.zh-CN.md) · [Lingua Latīna](README.la.md)

An Obsidian plug-in that synchronises a vault, end-to-end encrypted, with a self-hosted [Tabularium](https://github.com/Violaria/Tabularium) server.

## Requirements and network use

The plug-in needs Obsidian 1.13 or later and a Tabularium server; without a server and an account the plug-in does nothing. Every network request goes to the server address you enter: signing in, issuing and renewing this device's credentials, synchronisation, Send to Kindle and sharing. The plug-in sends no telemetry, and its help pages are bundled with it.

Notes are encrypted on the device with the vault's passphrase (E2EE V2, with path obfuscation) before they leave it. The passphrase is stored only on the device, and the server rejects unencrypted documents. Two features send readable content, and only when you use them: Send to Kindle mails an EPUB through the server, and a shared note is published at a link that anyone with the link can open.

## Features

- Sign in with the server address, user name and password, then choose an existing vault or create one, name the device and enter the passphrase. The plug-in gets credentials of its own for this device and renews them while it is in use.
- Live, periodic or event-triggered synchronisation, conflict handling and per-note history. Encryption and path obfuscation are always on while connected. Synchronisation goes through the Tabularium server only: hidden files and plug-in and theme settings are not synchronised, and CouchDB, object storage or peer-to-peer cannot be set up by hand.
- Maintenance from the settings page: fetch everything from the server, overwrite the server from this device (after the vault owner allows it on the web), unlock, diagnostics.
- Your own File Explorer ordering, written as an indented list in `Collation.md` notes.
- Send a note, a folder or a selection to a Kindle address configured on the server.
- Share a note or folder as a web page; the page updates when the shared files change.
- A formatting toolbar on text selection, and a tool to find and repair broken internal links.
- Interface in English, Chinese and Latin.

## Installation

Until the plug-in is listed in Obsidian's community directory, copy `main.js`, `manifest.json` and `styles.css` from a release into `.obsidian/plugins/tabularium/` in the vault, then enable Tabularium under Community plug-ins. Run the command "Tabularium: Server connection" to sign in.

## Building

With Node.js 24.10.0:

```bash
npm ci
npm run build       # main.js
npm run check       # type checks, lint, Svelte checks
npm run test:unit
```

Release files are built by GitHub Actions from the tagged commit, checked byte for byte against the tested build, and carry a build provenance attestation (`gh attestation verify main.js --repo Violaria/Tabularium-Obsidian`).

This repository is a submodule of [Tabularium](https://github.com/Violaria/Tabularium). The sync core in `packages/sync-core/` is also used by the server's web notes and command-line client, which live in [Tabularium-Server](https://github.com/Violaria/Tabularium-Server).
