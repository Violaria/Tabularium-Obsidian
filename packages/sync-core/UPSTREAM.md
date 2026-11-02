# Upstream

This package is the synchronisation core of Tabularium. It is derived from Commonlib, the shared library of Self-hosted LiveSync, by vorotamoroz, under the MIT licence in `LICENSE`.

| | |
| --- | --- |
| Repository | https://github.com/vrtmrz/livesync-commonlib |
| Commit | `3ecb95b` (Merge pull request #187 from vrtmrz/release/0.2.1) |
| Published as | `@vrtmrz/livesync-commonlib@0.2.1`, integrity `sha512-fnQb2FcEG+NqIQX9KhTstea4B7C4VAL0g9ry5rp41qnJDuLaR5zfCz995L+l3Khyrp/9kcPw4VX5RUmV+8GVog==` |

A read-only clone of the upstream repository is kept in the parent repository at `reference/livesync-commonlib`; nothing builds from it.

The release commit `029a36f` (Release Commonlib 0.2.1) has the same `src/`; the merge `3ecb95b` adds dependency updates (`markdown-it ^14.3.3`) that the published manifest carries, so the package was built from it.

## Checking the origin

Building the upstream commit with its own tools gives the published package file for file:

```bash
git -C reference/livesync-commonlib archive 3ecb95b | tar -x -C /tmp/commonlib-0.2.1
cd /tmp/commonlib-0.2.1 && npm ci --ignore-scripts && npm run build:package
# .package/ now equals the contents of the npm tarball of 0.2.1
```

Building this package (`npm run build:core` in `apps/obsidian`) gives the same `dist/`, except that the comments naming module paths inside `dist/worker/bgWorker.js` start with `../../node_modules/` instead of `node_modules/`, because the dependencies are installed in the plug-in project two levels up. Diff the two with the paths normalised:

```bash
norm() { sed -E 's#(// )(\.\./)+(node_modules|src)/#\1\3/#g' "$1"; }
diff -rq -x bgWorker.js dist /tmp/commonlib-0.2.1/.package/dist
cmp <(norm dist/worker/bgWorker.js) <(norm /tmp/commonlib-0.2.1/.package/dist/worker/bgWorker.js)
```

## Changes from upstream

Each kind of change is listed here when it is made.

1. Taken from the commit: `src/` (without integration tests, which need CouchDB or MinIO services), `_tools/build-package.mjs`, `_tools/package-boundary.mjs`, `docs/migration/downstream-imports.json`, `tsconfig.json`, `tsconfig.build.json`, `vitest.config.ts`, the test fixture `test/pathIdentityDeletionCases.ts`, `LICENSE`, and `readme.md` as `README.md`. Upstream's other documents, release and GitHub tools, examples and agent notes are not taken.
2. Built in place as a workspace of the plug-in project. `package.json` is the published manifest of 0.2.1 (same name, version, `exports`, `imports`, `typesVersions`, `sideEffects` and dependencies) with `private`, a `build` script and the build-time dev dependencies added. Upstream's `prettier`, `vitest` and `@smithy/protocol-http` dev dependencies are left out: the plug-in's vitest runs the tests, and `@smithy/protocol-http` was only used by an object-storage test.
3. `_tools/build-package.mjs` writes `dist/` in this directory instead of `.package/`, no longer copies the README, licence and documents, and compares the manifest it would generate with `package.json` instead of writing it, failing when they differ. `tsconfig.build.json` emits to `dist`.
4. `src/package.json` stands in for upstream's source manifest (`"type": "module"`, the `#worker` imports, no `sideEffects`), so that bundling the worker from source keeps the same modules as upstream's build. Without it the published manifest's `sideEffects` list would apply to the sources and drop modules from the worker.
5. Renamed to `@tabularium/sync-core` (version kept at 0.2.1, the upstream release it starts from). Import specifiers in the plug-in, the CLI, the browser client, their tools and tests, and the examples in `README.md` use the new name; `_tools/package-boundary.mjs` recognises it.
6. The unit tests (`src/**/*.unit.spec.ts`, `*.unit.test.ts`) run with `npm run test --workspace @tabularium/sync-core`, which the plug-in's `npm run test:unit` calls after its own tests.
7. `package.json` is the source of truth for the public surface; upstream's inventory of downstream imports (`docs/migration/downstream-imports.json`) and the code that generated `exports` from it are removed. The build checks that `typesVersions` mirrors `exports` and that every target of `exports`, `imports` and `sideEffects` exists.
8. Pruned by reachability from the plug-in, browser client and CLI (`npm run check:unreachable` in `apps/obsidian` follows into this package): modules nothing reaches, the exports nothing imports, and the tests of removed modules are deleted. `pouchdb-test.ts` and `pouchdb-http.ts`, PouchDB builds only tests use, moved from `src/pouchdb/` to `test/`.
9. CouchDB is the only remote. The object-storage journal replicator (S3/MinIO), the P2P replicator (Trystero), the RPC layer and the P2P service are removed, with their tests and exports; the API service no longer offers the S3 SDK's custom fetch handler. The remote-type constants and the object-storage and P2P setting fields stay, so settings written by older versions are still read. Dependencies that only those parts used are removed: `@aws-sdk/client-s3`, the `@smithy/*` packages, `@trystero-p2p/nostr` and `qrcode-generator`, and `idb` and `markdown-it`, which nothing here imports any more.
10. Flag files have Tabularium's own names, so that the original plug-in in the same vault and this one do not answer each other's: `FlagFiles` (`tabularium-suspend.md`, `tabularium-rebuild.md`, `tabularium-fetch.md`) replaces `FlagFilesOriginal`, `FlagFilesHumanReadable` and the `FLAGMD_*` constants, and the rebuilder schedules with it. The original's names are kept as `UpstreamFlagFiles`, which `shouldBeIgnored` still excludes from synchronisation. The unused `Setup.QRCode` message, left from the removed QR code, is removed.
