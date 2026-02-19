# circleci-pw-example

- **Framework:** `playwright`
- **Use case:** `ci/circleci`
- **Source repository:** https://github.com/currents-dev/circleci-pw-example

## What this example does

An example showing how to run **Playwright tests on CircleCI using 3 parallel containers** and report results to **Currents** (via `pwc` / `@currents/playwright`).

## How this example is used

- CircleCI config enables **parallelism: 3** and uses CircleCI’s shard indexes to compute the Playwright shard:
  - `SHARD="$((${CIRCLE_NODE_INDEX}+1))"` and `--shard=${SHARD}/${CIRCLE_NODE_TOTAL}` when running `npx pwc ...`
- Users set:
  - `CURRENTS_RECORD_KEY` (recommended via CircleCI contexts)
  - `CURRENTS_PROJECT_ID` (from Currents project settings)
- The repo includes the CircleCI config file at `.circleci/config.yml`.

## What scenarios are included

- **CircleCI parallel Playwright run**
  - `.circleci/config.yml` demonstrating 3-way parallelization + sharding.
- **Playwright project scaffolding**
  - `playwright.config.ts`, `tests/`, and a Node project (`package.json`) exist in the repo.
- **README explanation**
  - Repo README describes the goal and points to the config file and `pwc` usage.
- **Official docs cross-link**
  - Currents docs explicitly reference this repo as the CircleCI Playwright example.

## How to implement this in your own project

1. Start from the copied source markdown files in this folder and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the source docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the source docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Pretty-print the files**
   - The raw `README.md`, `.circleci/config.yml`, and `package.json` render as single-line blobs, which makes copying/editing painful.
2. **Stop hardcoding `--project-id` in docs/snippets**
   - The docs snippet uses a concrete project id (`bnsqNa`) as an example; make it very explicit it’s a placeholder and recommend `CURRENTS_PROJECT_ID` via env/context.
3. **Add a “Quickstart” with exact steps**
   - (1) create project → (2) set CircleCI context vars → (3) run pipeline → (4) where to see results in Currents.
4. **Fail fast on missing env**
   - If `CURRENTS_RECORD_KEY` / `CURRENTS_PROJECT_ID` are missing, print a clear error and exit (instead of running a confusing “empty” run).
5. **Add caching + `npm ci`**
   - Show recommended CircleCI caching for node modules and use `npm ci` for deterministic installs (especially for examples people will copy).

## Source markdown copied into this folder

- [`circleci-pw-example__source__README.md`](circleci-pw-example__source__README.md)
