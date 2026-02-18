# currents-cypress-cucumber-example

- **Framework:** `cypress`
- **Use case:** `features/cucumber`
- **Source repository:** https://github.com/currents-dev/currents-cypress-cucumber-example

## What this example does

Example of running **Cypress + `cypress-cucumber-preprocessor` (feature files / tags)** while reporting/orchestrating via **Currents** using `@currents/cli` (so you can run `npx currents` instead of `npx cypress`).

## How this example is used

- Install dependencies (Cypress + cucumber preprocessor + `@currents/cli`).
- Configure Cypress:
  - `specPattern: "**/*.{feature,features}"` so Cypress discovers Gherkin feature specs.
  - uses `cypress-cucumber-preprocessor` as the `file:preprocessor` plugin.
- Patch requirement:
  - `cypress-cucumber-preprocessor` hardcodes the `cypress` binary for its `cypress-tags` command, so the repo includes a `patch-package` patch that replaces the binary with `currents` (so tags work when running through Currents).
- Credentials:
  - You need Currents **record key** and **project id** (README points to Currents app).

## What scenarios are included

- **Patch-package patch** that replaces the preprocessor’s internal executable from `cypress` → `currents`:
  - `patches/cypress-cucumber-preprocessor+4.3.1.patch`
- **Cypress config** showing:
  - feature-spec pattern
  - projectId configured (currently hardcoded)
  - cucumber preprocessor plugin wiring
- **Minimal cucumber plugin** (`cypress/plugins/index.js`) that hooks `file:preprocessor`.
- **README** describing why patching is needed and how to apply it.

## How to implement this in your own project

1. Start from the upstream markdown docs copied in this folder (`upstream/`) and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the upstream docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the upstream docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Make the README readable + structured**
   - The raw README is basically 3 long lines; reformat into sections with fenced code blocks and a “Quickstart” flow.
2. **Add working scripts**
   - `package.json` currently has `"test": "echo \"Error: no test specified\" && exit 1"`. Add scripts like:
     - `postinstall: patch-package` (README recommends it but it’s not present)
     - `test:currents` (e.g., `currents run ...` / whatever the intended command is)
     - `tags` (e.g., `cypress-tags ...`)
3. **Stop hardcoding `projectId`**
   - `cypress.config.js` hardcodes `projectId: "Ij0RfK"`; switch to `process.env.CURRENTS_PROJECT_ID` (and fail fast if missing).
4. **Explain “how to run” explicitly**
   - README says “you can use `cypress-tags` as usual” but doesn’t show the exact command lines users should run (local + CI). Add copy/paste commands for:
     - running feature specs
     - running tagged subsets (using `cypress-tags`)
     - recording to Currents (record key / project id)
5. **Modernize the cucumber stack note**
   - This example uses `cypress-cucumber-preprocessor` + Cypress 10.11; add a short note about supported Cypress versions and alternatives if users are on newer Cypress where community preprocessors differ. (Right now it’s implied by deps only.)
6. **Pretty-print the code/config**
   - `package.json`, `cypress.config.js`, and the patch file are one-line blobs; format them so people can learn/copy easier.

## Upstream markdown copied into this folder

- [`upstream/README.md`](upstream/README.md)
