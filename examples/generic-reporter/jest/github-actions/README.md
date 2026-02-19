# Jest Reporting on GitHub Actions

- **Framework:** `generic-reporter`
- **Use case:** `jest`
- **Source repository:** https://github.com/currents-dev/currents-jest-github-actions-example

## What this example does

A minimal example showing how to report **Jest** test results to **Currents** and run Jest **in parallel** on GitHub Actions using Jest’s native `--shard` support (matrix with 2 shards/containers).

## How this example is used

1. Create a Currents account and get **Project Id** + **Record Key**.
2. Store `CURRENTS_RECORD_KEY` as a GitHub Actions **Repository Secret**.
3. Add `@currents/cmd` + `@currents/jest`, and configure `@currents/jest` as a Jest reporter (via `jest.config.js`).
4. GitHub Actions runs two shards:
   - `npx jest --shard=${{ matrix.shard }}/2`
5. Upload results to Currents:
   - `npx currents upload --project-id mdXsz8 --ci-build-id <repo>-<run_id>-<run_attempt>` (record key comes from `secrets.CURRENTS_RECORD_KEY`).

## What scenarios are included

- **GitHub Actions workflow** showing parallel shards + upload:
  - `.github/workflows/test.yml`
- **Jest reporter wiring**
  - `jest.config.js` exists and is referenced by the README as the place where `@currents/jest` is configured.
- **Code + tests scaffold**
  - `src/` and `tests/` folders exist in the repo.
- **README walkthrough**
  - Repo README explains the reproduction steps and points to the workflow file.

## How to implement this in your own project

1. Start from the copied source markdown files in this folder and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the source docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the source docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Stop hardcoding `--project-id mdXsz8` in the workflow**
   - Use `secrets.CURRENTS_PROJECT_ID` or GitHub “Variables”, and document it in the README.
2. **Reformat the README and workflow files**
   - The README is effectively a single-line blob in raw form, and the workflow YAML is also one line, making it hard to copy/modify.
3. **Make the “what gets uploaded” explicit**
   - Add 3–5 lines: where Jest output/report is generated, how `@currents/jest` emits results, and what `currents upload` expects (paths/outputs). (Right now it’s implied.)
4. **Add caching + `npm ci`**
   - Switch `npm install` → `npm ci` and add `actions/cache` for npm to speed up runs (common CI best-practice).
5. **Add a “Local run” section**
   - Show local env var usage (`CURRENTS_RECORD_KEY`, project id) and a one-command run (no Actions) so people can validate before pushing.

## Source markdown copied into this folder

- [`source__README.md`](source__README.md)

## Repository content copied into this folder

- Total tracked files copied: **10**
- Source `README.md` is saved as `README.upstream.md`.
- Path mapping: [`content-map.md`](content-map.md)
