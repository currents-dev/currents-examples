# currents-nodejs-github-actions-example

- **Framework:** `generic-reporter`
- **Use case:** `junit`
- **Source repository:** https://github.com/currents-dev/currents-nodejs-github-actions-example

## What this example does

A minimal example showing how to report **Node.js test results** (Node’s built-in `node --test`) to **Currents** from **GitHub Actions** using `@currents/node-test-reporter` + `@currents/cmd`.

## How this example is used

- The intended flow is:
  1. Run Node tests with Currents’ Node test reporter outputting a JUnit XML file (`report.xml`).
  2. Convert JUnit into Currents format with `npx currents convert --input-format=junit --input-file=./report.xml --framework=node`.
  3. Upload to Currents with `npx currents upload` using `CURRENTS_RECORD_KEY` from GitHub Secrets.
- CI runs in **2 shards** using `node --test --test-shard=${{ matrix.shard }}/2 ... tests/**.test.mjs`.
- There’s also a Currents docs page pointing to this repo as the Node + GitHub Actions example.

## What scenarios are included

- **GitHub Actions workflow** demonstrating sharded runs + convert + upload:
  - `.github/workflows/test.yml`
- **Example scripts**
  - `npm run test` generates `report.xml` via Node’s test runner + Currents reporter.
  - `npm run convert` converts `report.xml` into Currents format.
- **Assets**
  - `image.png` (screenshot of a run in Currents UI) referenced in the README.
- **Test suite**
  - A `tests/` folder is present (workflow targets `tests/**.test.mjs`).

## How to implement this in your own project

1. Start from the copied source markdown files in this folder and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the source docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the source docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Stop hardcoding IDs / staging URLs in the workflow**
   - Workflow currently hardcodes `--project-id JOw2i3` and sets `CURRENTS_API_URL=https://cy-staging.currents.dev/`. Make these repo variables/secrets and default to production docs.
2. **Reformat the README + YAML + JSON**
   - README and workflow are essentially single-line in raw form, which is hard to read/copy. Break into sections + fenced blocks.
3. **Clarify where “Project Id” is set**
   - README tells users to obtain Project Id, but doesn’t clearly state it’s passed via `--project-id` in the workflow. Add an explicit note.
4. **Add a “Local run” section**
   - Example: how to set `CURRENTS_RECORD_KEY` locally, run `npm run test`, run `npm run convert`, then upload (and whether to use production vs staging).
5. **Make the “report” script safe**
   - `package.json` has a `report` script that uploads to staging without showing project id / build id args. Either remove it or make it a documented helper that requires env vars.

## Source markdown copied into this folder

- [`source__README.md`](source__README.md)

## Repository content copied into this folder

- Total tracked files copied: **16**
- Source `README.md` is saved as `README.upstream.md`.
- Path mapping: [`content-map.md`](content-map.md)
