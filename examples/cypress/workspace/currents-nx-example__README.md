# currents-nx-example

- **Framework:** `cypress`
- **Use case:** `workspace/nx`
- **Source repository:** https://github.com/currents-dev/currents-nx-example

## What this example does

An example Nx workspace showing how to use the **`@currents/nx` executor** to run **Cypress** tests and record/parallelize them with **Currents** (or alternatively **Sorry Cypress**).

## How this example is used

- The README walks you through creating an Nx workspace + web app, installing `@currents/nx`, then adding a new target using the `@currents/nx:currents` executor.
- In this repo, that target already exists as `frontend-e2e:currents` in `apps/frontend-e2e/project.json` and enables `record` + `parallel`, points to a Cypress config, and sets `devServerTarget`.
- You then run:
  - `nx run frontend-e2e:currents --record --key <key> --ci-build-id hello-currents-nx`
  - or (if options are set in config) omit flags and run with just `--ci-build-id`.
- Cypress itself is configured with `cypress-cloud/plugin` and includes a Currents `projectId`.

## What scenarios are included

- **Nx target configuration for Currents executor**
  - `apps/frontend-e2e/project.json` shows the `currents` target using `@currents/nx:currents` with `record: true`, `parallel: true`, and `devServerTarget: frontend:serve`.
- **Cypress configuration wired to cypress-cloud**
  - `apps/frontend-e2e/cypress.config.js` uses `cypress-cloud/plugin`, defines `specPattern`, and sets `projectId`.
- **Repo-level dependencies**
  - `package.json` includes `@currents/nx`, `cypress`, and `cypress-cloud`.
- **README “recreate the example” steps**
  - End-to-end instructions for creating the Nx workspace and adding the executor target.

## How to implement this in your own project

1. Start from the copied source markdown files in this folder and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the source docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the source docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Remove hardcoded / placeholder values**
   - `project.json` has `key` and `ciBuildId` set to **documentation URLs** (not usable values). Replace with env-var usage or omit these options and document the CLI flags.  
   - `cypress.config.js` hardcodes `projectId: 'Ij0RfK'`; make it env-driven and fail fast if missing.
2. **Fix typos / consistency**
   - README snippet references `cypres.config.ts` (typo) while this repo uses `apps/frontend-e2e/cypress.config.js`. Clean up the README example so it matches reality.
3. **Pretty-print the repo files**
   - Key files are committed as single-line blobs (`package.json`, `project.json`, `cypress.config.js`, README), which makes the example hard to learn from.
4. **Add a minimal CI workflow**
   - A small GitHub Actions example running `nx run frontend-e2e:currents ...` would make the “CI use case” copy/pasteable (this repo currently doesn’t surface a workflow in the README).
5. **Make “Currents vs Sorry Cypress” explicit**
   - README says it supports both, but doesn’t show the exact knob (`cloudServiceUrl` etc.). Add a short section + example config for Sorry Cypress mode and where to set it.

## Source markdown copied into this folder

- [`currents-nx-example__source__README.md`](currents-nx-example__source__README.md)

## Repository content copied into this folder

- Total files copied from `currents-nx-example`: **49**
- Mapping file: [`currents-nx-example__content-map.md`](currents-nx-example__content-map.md)
- All copied files use the prefix pattern `currents-nx-example__content__*`.
