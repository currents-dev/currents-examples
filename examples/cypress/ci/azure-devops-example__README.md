# azure-devops-example

- **Framework:** `cypress`
- **Use case:** `ci/azure-devops`
- **Source repository:** https://github.com/currents-dev/azure-devops-example

## What this example does

An example of running **Cypress** tests on **Azure DevOps Pipelines** using **Currents** as the orchestration/reporting service. The README explicitly positions it as “Running cypress tests using Currents dashboard in Azure DevOps”.

## How this example is used

- Azure DevOps pipeline runs **3 parallel jobs** via `strategy: parallel: 3`.
- It pulls secrets from an Azure DevOps **Variable Group** named `Currents` and maps the secret into `CURRENTS_RECORD_KEY`.
- It installs Node, caches npm + Cypress binary, runs `npm ci`, then runs:
  - `npx currents run --record --parallel --key $CURRENTS_RECORD_KEY --ci-build-id $BUILD_BUILDNUMBER`
- Cypress + Currents CLI are included as dependencies (`cypress` and `@currents/cli`).
- Currents’ official docs for Cypress+Azure DevOps describe the same goal (parallel execution + Currents dashboard) and link to this repo as the reference config.

## What scenarios are included

- **Pipeline config**: `azure-pipelines.yml` showing:
  - parallel strategy (3)
  - caching steps
  - Currents CLI run command + CI build id usage
- **Cypress config**: `cypress.config.js` showing:
  - `baseUrl: "https://en.wikipedia.org/"`
  - `specPattern: "cypress/integration/*.spec.js"`
  - `projectId: "Ij0RfK"`
  - video settings
- **Minimal README** that points to a “full guide”.

## How to implement this in your own project

1. Start from the copied source markdown files in this folder and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the source docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the source docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Stop hardcoding the Currents project id**
   - `projectId: "Ij0RfK"` is hardcoded in `cypress.config.js`. Switch to `process.env.CURRENTS_PROJECT_ID` and document it.
2. **Update the pipeline command to match current docs (or explain the difference)**
   - The docs’ Azure DevOps snippet uses `npx cypress-cloud run ...`
   - This repo uses `npx currents run ...`
   - Either is fine if supported, but the repo should explicitly state *why* it uses `currents run` and whether `cypress-cloud` is now the preferred approach.
3. **Add a real Quickstart section**
   - README is 1 line and assumes users click out. Add: prerequisites, required variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`), how to create the Variable Group, and what “success” looks like in Currents.
4. **Add `.env.example` + local run instructions**
   - Let users validate locally before CI: `CURRENTS_RECORD_KEY=... CURRENTS_PROJECT_ID=... npx currents run ...`.
5. **Pretty-print the files**
   - `azure-pipelines.yml`, `cypress.config.js`, and `package.json` are committed as single-line blobs, which makes them hard to read/copy.
6. **Add `package.json` scripts**
   - Current `scripts.test` is the default “no test specified”. Add scripts like `test:currents` / `test:cypress` so users can run by name.

## Source markdown copied into this folder

- [`azure-devops-example__source__README.md`](azure-devops-example__source__README.md)

## Repository content copied into this folder

- Total files copied from `azure-devops-example`: **52**
- Mapping file: [`azure-devops-example__content-map.md`](azure-devops-example__content-map.md)
- All copied files use the prefix pattern `azure-devops-example__content__*`.
