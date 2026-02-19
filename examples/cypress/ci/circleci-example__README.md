# circleci-example

- **Framework:** `cypress`
- **Use case:** `ci/circleci`
- **Source repository:** https://github.com/currents-dev/circleci-example

## What this example does

An example repo showing how to run **Cypress tests on CircleCI** and record/parallelize them to **Currents.dev** using `cypress-cloud`, including guidance for **alternative Cypress binaries** (Currents-hosted binaries / prebuilt images).

## How this example is used

1. Create a Currents account, get **ProjectId** + **Record Key**.  
2. In CircleCI, set `CURRENTS_RECORD_KEY` via a **Context** (recommended) or env var.  
3. Create `currents.config.js` with your `projectId` (repo has a sample but it’s hardcoded).  
4. Run CircleCI using one of the provided configurations (all run **3 parallel containers**) that call:
   - `npx cypress-cloud run --parallel --record --key $CURRENTS_RECORD_KEY`  
5. Choose how Cypress is installed:
   - **Use Currents prebuilt image** `currentsdev/cypress-included:12.17.4`  
   - **Explicit download** via `CYPRESS_DOWNLOAD_MIRROR=https://cy-cdn.currents.dev npx cypress install --force`  
   - **Cypress Orb** (`cypress-io/cypress@3`) with either the default executor or a custom executor that uses the Currents image.

## What scenarios are included

- **Bare CircleCI config (no orbs)**:
  - Using the Currents Docker image with preinstalled Cypress (`currentsdev/cypress-included:12.17.4`)
  - Using a base image and explicitly downloading the alternative Cypress binary (download mirror)
- **Cypress Orb examples**:
  - Orb install step with `post-install` to fetch the alternative Cypress binary, workspace persistence, then a parallel run job
  - Custom executor (`currents-executor`) pointing at `currentsdev/cypress-included:12.17.4`
- **Dependency baseline**:
  - `cypress@12.17.4`, `cypress-cloud`, and `typescript` in `package.json`
- **Currents config example**:
  - `currents.config.js` with `projectId` + `batchSize: 3`

## How to implement this in your own project

1. Start from the copied source markdown files in this folder and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the source docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the source docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Remove hardcoded `projectId`**
   - `currents.config.js` currently hardcodes `projectId: "Ij0RfK"`; switch to `process.env.CURRENTS_PROJECT_ID` and document it (and/or CircleCI Context vars).
2. **Provide a `.env.example` + “Required variables” table**
   - Explicitly list: `CURRENTS_RECORD_KEY` (secret), `CURRENTS_PROJECT_ID` (non-secret but should still be configurable), and optional `CURRENTS_CI_BUILD_ID` pattern (if you want consistent grouping).
3. **Format the repo files**
   - `.circleci/config.yml`, `package.json`, and `currents.config.js` are effectively one-liners; pretty-print them so users can copy/edit safely.
4. **Add a quickstart that maps to the 3 scenarios**
   - “Pick one: (A) prebuilt image, (B) explicit download, (C) Cypress Orb” with copy/paste snippets + where to set secrets in CircleCI.
5. **Make “alternative binaries” intent obvious**
   - README mentions Currents-hosted Cypress app/binaries and supported versions; add a short explanation of *why* you’d choose mirror vs image (speed, reliability, avoiding blocked downloads).

## Source markdown copied into this folder

- [`circleci-example__source__README.md`](circleci-example__source__README.md)

## Repository content copied into this folder

- Total files copied from `circleci-example`: **24**
- Mapping file: [`circleci-example__content-map.md`](circleci-example__content-map.md)
- All copied files use the prefix pattern `circleci-example__content__*`.
