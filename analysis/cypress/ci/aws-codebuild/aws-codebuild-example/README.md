# aws-codebuild-example

- **Framework:** `cypress`
- **Use case:** `ci/aws-codebuild`
- **Source repository:** https://github.com/currents-dev/aws-codebuild-example

## What this example does

An example repo showing how to run **Cypress tests in parallel on AWS CodeBuild** and report them to **Currents** using `cypress-cloud`, specifically using CodeBuild **batch build + matrix mode** with **3 workers**.

## How this example is used

1. **Create a Currents project** and obtain:
   - `recordKey` (set as CodeBuild env var `CURRENTS_RECORD_KEY`)
   - `projectId` (set in `currents.config.js`)
2. **Run on AWS CodeBuild using batch/matrix**
   - `buildspec.yml` defines matrix `WORKERS: 1,2,3` and runs `npx cypress-cloud run --record --parallel --ci-build-id $CODEBUILD_INITIATOR`.
3. **Cypress configuration**
   - Uses `cloudPlugin` from `cypress-cloud/plugin`, sets `baseUrl` to TodoMVC, and looks for specs in `cypress/e2e/*.spec.js` with support file `cypress/support/e2e.ts`.
4. **CI Build ID behavior**
   - README notes it uses `CODEBUILD_INITIATOR` as the CI Build ID, and explains differences between interactive vs batch builds.

## What scenarios are included

- **CodeBuild batch/matrix parallelization**
  - `buildspec.yml` with 3 workers and a parallel Cypress Cloud run (`--parallel --record`).
- **Currents project configuration**
  - `currents.config.js` with a `projectId` field.
- **Cypress + Currents integration**
  - `cypress.config.ts` showing `cloudPlugin(...)`, video settings, baseUrl, and spec pattern.
- **Dependencies**
  - `package.json` includes `cypress` + `cypress-cloud` + `typescript`.

> Note: The repo clearly expects Cypress specs under `cypress/e2e/*.spec.js` but GitHub directory listing for `cypress/` didn’t render in the captured view, so I’m describing the tests based on the config rather than enumerating filenames.

## How to implement this in your own project

1. Start from the upstream markdown docs copied in this folder (`upstream/`) and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the upstream docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the upstream docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Reformat files (they’re currently effectively one-liners in raw view)**
   - README + `buildspec.yml` + `cypress.config.ts` are hard to scan because they render as long single lines; reformat into normal multiline files.
2. **Add a real “Quickstart”**
   - Explicit steps: create Currents project → set `CURRENTS_RECORD_KEY` → set `projectId` → run CodeBuild batch build.
   - Include copy/paste commands for local run (even if it’s not CodeBuild).
3. **Add `scripts` in `package.json`**
   - Example: `npm run cy:cloud` to run `cypress-cloud run --record --parallel ...` (right now there’s only a placeholder `test` script).
4. **Add `.env.example`**
   - Show required env vars and safe handling (avoid pasting keys into shell history).
5. **Make worker count configurable**
   - Right now sharding is implicitly “3 workers” via matrix; add a single place to change it (and document it).
6. **Include a sample CodeBuild Project JSON (optional but helpful)**
   - Similar to the Playwright CodeBuild example repo which includes a project config output; having that here would reduce AWS console guesswork.

## Upstream markdown copied into this folder

- [`upstream/README.md`](upstream/README.md)
