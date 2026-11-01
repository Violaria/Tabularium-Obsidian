# Test procedures

Run the commands below from `apps/obsidian`, inside the Tabularium parent repository (`npm run bootstrap` there first). The parent repository runs the tests across components: real-client synchronisation through the gateway, Tabularius, backups and release packages.

## Source and unit checks

```bash
NODE_OPTIONS=--max-old-space-size=3072 npm run check
NODE_OPTIONS=--max-old-space-size=3072 npm run test:unit -- --maxWorkers=1
npm run test:notes
```

`npm run check` runs TypeScript for the plug-in and its apps, ESLint with the project rules and with the Obsidian Community rules (`lint:community`, `lint:community:tools`; the tools check allows no warnings), Svelte checks, the bundle compatibility check and the trilingual catalogue checks. `npm run check:unreachable` lists source files and tests that no entry reaches; its output should be empty. `test:notes` runs the web notes tests.

After changing `package.json` or `package-lock.json`, confirm that `npm ci` completes without changing the lockfile.

| Boundary | Procedure |
| --- | --- |
| Multiple-device file conflicts and stale-file protection | [CouchDB procedure below](#multiple-device-conflict-regression-tests) |
| CLI subprocesses and filesystem workflows | [CLI mirror tests below](#cli-mirror-regression-tests) and [test authoring](../src/apps/cli/testdeno/CONTRIBUTING_TESTS.md) |
| Obsidian start-up, file watching and synchronisation with the gateway | `npm run test:gateway` in the parent repository |

## CLI mirror regression tests

Run the native CLI subprocess suite after building the CLI:

```bash
NODE_OPTIONS=--max-old-space-size=3072 npm run build --workspace self-hosted-livesync-cli
cd src/apps/cli/testdeno
deno test -A --no-check test-mirror.ts
```

The expected result is seven passing steps. These cover storage-only and database-only files, database deletion, an ordinary local edit, incoming database content, an omitted Vault path, and local content with unknown provenance.

For an ordinary local edit, first reflect the database content into the Vault, confirm its bytes, and then edit that file. The next `mirror` must store the edit without a conflict. For unknown provenance, use `put` to seed only the database and independently create different local content with a newer modification time. The next `mirror` must preserve two independent non-deleted revisions. Read both with `cat-rev`, submit the same local bytes again to check that no additional revision appears, and use `resolve` to select the local content. Confirm that the conflict is gone and the selected content is reflected into the Vault.

`put` deliberately bypasses file provenance, whereas `push` records it. Substituting one for the other changes the scenario. The tests enable `writeDocumentsIfConflicted` for incoming reflection; this setting does not authorise an ordinary save to replace unrelated database content or resolve the conflict. Do not assume which independent root PouchDB selects as the winner.

## Multiple-device conflict regression tests

### Preparation and execution

The suite is [FileHandler.multidevice.integration.spec.ts](../src/serviceModules/FileHandler.multidevice.integration.spec.ts). It exercises the installed Commonlib package through LiveSync's shared file handler, the CLI `resolve` command dispatcher, and the shared conflict-resolution operations.

Use a disposable CouchDB service. To use the repository's Docker fixture, set the following values in `.test.env` and ensure `.env` exists. The fixture uses the container name `couchdb-test` and host port `5989`:

```dotenv
hostname=http://127.0.0.1:5989/
username=admin
password=testpassword
```

Start the fixture, then run the focused suite:

```bash
npm run test:docker-couchdb:start
NODE_OPTIONS=--max-old-space-size=3072 npm run test:integration -- src/serviceModules/FileHandler.multidevice.integration.spec.ts --maxWorkers=1
```

The expected result is seven passing tests. Each case creates a uniquely named remote database and removes it during teardown. Stop the fixture after the run, including when the test command fails:

```bash
npm run test:docker-couchdb:stop
```

When using an already running disposable CouchDB service, configure its endpoint and credentials in `.test.env` and run only the test command. The start and stop commands manage the repository's Docker fixture. This suite needs no Object Storage or Obsidian application.

### Scenarios and expected results

Each simulated device owns a separate real PouchDB database, `LiveSyncLocalDB` managers, file content, and provenance record. Devices first share one revision, edit while disconnected, and then replicate their Metadata and Chunks through real CouchDB. File reflection is deliberately delayed after replication to reproduce the interval in which the database has advanced but the file still contains older content. All edits use equal modification times, so the tests require revision and content checks rather than timestamp ordering.

| Case | Setup and action | Required result |
| --- | --- | --- |
| Three editing devices | Replicate three conflicting edits, reprocess unchanged files, select a non-winning revision through CLI `resolve`, and replicate the resolution before reprocessing the other files. | All three contents are initially readable on every replica. Unchanged saves make no database writes. After resolution, all files and replicas converge to the selected revision without creating revisions or restoring conflicts. |
| Four editing devices | Repeat the same sequence with four independently edited branches. | All four contents are initially preserved, and the same unchanged-save and convergence guarantees hold. |
| A genuine edit on a losing device | After three-way resolution reaches its DB, a device adds content to its still-unreflected losing file, then saves and replicates it. | The new revision extends that device's recorded branch. The selected result and the new edit remain readable on every replica. |
| Missing provenance | After four-way resolution, remove a losing device's provenance record and set its file to the original historical ancestor's content. Save, remove provenance again, and repeat the save. | The file becomes one fresh independent root, distinct from the historical root. Both contents remain readable after replication, and repeated saves create no duplicates. CLI `resolve` can select the independent root and propagate its resolution. |
| Compacted base with verified unchanged content | After four-way resolution, retain a losing device's content hash, compact its local DB, and confirm that its recorded revision body is unavailable. Process the unchanged file twice. | The selected content is reflected without adding a database revision or conflict, provenance advances to that revision, and all replicas retain only the selected branch. |
| Compacted base with legacy provenance | After four-way resolution, retain only the losing device's revision and observed modification time, compact its local DB, and confirm that the recorded revision body is unavailable. Save the remaining file, then repeat after removing provenance. | The file is preserved as one independent conflict. Both contents remain readable on every replica, repeated saves create no duplicates, and CLI `resolve` can select the independent root and propagate its resolution. |
| Compacted base with a genuine edit | After four-way resolution and local compaction, retain the losing device's content hash but edit its file without changing its byte length or modification time. | The changed content is preserved as one independent conflict, remains readable on every replica, and can be selected through CLI `resolve`. Repeated saves after provenance loss create no duplicates. |

### Coverage boundaries

This is a service integration test, not a CLI subprocess or Obsidian runtime test. The file and provenance stores are in-memory fixtures; automatic conflict callbacks are observed without running interactive or automatic merge policies. PouchDB revision creation, chunk storage and retrieval, local compaction, CouchDB replication, the CLI command dispatcher, and its resolution operations are real.

Argument parsing, persistent host stores, file watchers and dialogues are covered by the CLI procedure above and by the parent repository's real-client synchronisation regression (`npm run test:gateway`), which drives desktop Obsidian through the harness in `e2e-obsidian/runner/`.
