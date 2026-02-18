# gh-actions-example

- **Framework:** `cypress`
- **Use case:** `ci/github-actions`
- **Source repository:** https://github.com/currents-dev/gh-actions-example

## What this example does

An example repository showing how to run **Cypress tests on GitHub Actions** and record/parallelize them with **Currents.dev** (using `cypress-cloud`).

## How this example is used

- Configure GitHub Actions secret **`CURRENTS_RECORD_KEY`**.
- Set the Currents **`projectId`** in `currents.config.js` (currently hardcoded as `Ij0RfK`).
- Run the provided GitHub Actions workflow which:
  - runs **3 containers** in parallel,
  - disables cached Cypress binaries and installs **block-free Cypress binaries**,
  - uses a custom command to execute `cypress-cloud run --record --parallel ...` with a `--ci-build-id` derived from GitHub run metadata.

## What scenarios are included

- **GitHub Actions workflow example** (“workflow config file”) demonstrating 3-way parallel Cypress runs and a `cypress-cloud` command line you can customize (e.g. add `--group`).
- **Alternative Cypress binaries setup**: README section explaining why/when to disable cached binaries and how to run with the non-blocking binaries using `cypress-io/github-action`.
- **Currents project config sample** via `currents.config.js` containing a `projectId` field.

## How to implement this in your own project

1. Start from the copied source markdown files in this folder and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the source docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the source docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Remove hardcoded `projectId`**
   - Replace `currents.config.js` hardcoded `projectId: "Ij0RfK"` with env-based config (e.g. `process.env.CURRENTS_PROJECT_ID`) and document where to set it.
2. **Add `.env.example` + “Required inputs” section**
   - Make it explicit: `CURRENTS_RECORD_KEY` (secret) + `CURRENTS_PROJECT_ID` (config/env) + recommended `CURRENTS_CI_BUILD_ID` pattern.
3. **Reformat workflow + configs**
   - Several files are committed as single-line blobs (hard to read/copy). Pretty-print the YAML/TS/JSON.
4. **Make “block-free binaries” path copy/pasteable**
   - README explains the idea, but adding an explicit minimal workflow snippet (with the `install: false` + command block) right up top would reduce confusion.
5. **Add a “Run locally” section**
   - Provide a local command template using `npx cypress-cloud run ...` so users can validate before CI.

## Source markdown copied into this folder

- [`source__README.md`](source__README.md)
