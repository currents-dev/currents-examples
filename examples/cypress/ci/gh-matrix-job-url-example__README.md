# gh-matrix-job-url-example

- **Framework:** `cypress`
- **Use case:** `ci/github-actions`
- **Source repository:** https://github.com/currents-dev/gh-matrix-job-url-example

## What this example does

A GitHub Actions + Cypress example that demonstrates how to **capture the current matrix job’s log URL** and expose it to the test run (for Currents / debugging / linking from reports). The README points to the matching Currents blog post: `github-actions-cypress-job-url`.

## How this example is used

- The workflow runs a **matrix of 3 parallel jobs**.
- It uses `Tiryoh/gha-jobid-action` to fetch the **current job’s HTML URL** (filtered by the matrix job name), then exports it as `MATRIX_JOB_URL` via `$GITHUB_ENV`.
- Cypress reads that environment variable and logs it on `before:spec`:
  - `console.log(\` GH Job URL: ${process.env.MATRIX_JOB_URL}\`)`
- Cypress is executed in GitHub Actions via `cypress-io/github-action@v2` and runs Currents via `currents run --record --parallel --key ...`.

## What scenarios are included

- **GitHub Actions workflow**: `.github/workflows/cypress.yml`
  - matrix parallelization (3 containers)
  - job URL lookup (`Tiryoh/gha-jobid-action`)
  - export `MATRIX_JOB_URL`
  - run Cypress + Currents
- **Cypress config hook**: `cypress.config.js` logs the `MATRIX_JOB_URL` per spec execution.
- **Baseline deps**: Cypress `12.3.0` + `@currents/cli` (beta) + TypeScript in `package.json`.
- **README**: only a pointer to the blog post (no setup steps).

## How to implement this in your own project

1. Start from the copied source markdown files in this folder and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the source docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the source docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Write a real README**
   - Add: required secrets/vars, how to run locally, what the matrix job URL is used for, and what “success” looks like in Currents. Current README is just a one-liner.
2. **Stop hardcoding Currents projectId**
   - `projectId: "Ij0RfK"` is hardcoded in `cypress.config.js`; switch to `process.env.CURRENTS_PROJECT_ID` and document it.
3. **Fix package manager mismatch**
   - The workflow runs `yarn currents run ...` but the repo includes `package-lock.json` (npm). Either:
     - add `yarn.lock` + install Yarn in CI, or
     - switch the workflow command to `npx currents run ...` / `npm run ...`.
4. **Fail fast if `MATRIX_JOB_URL` is missing**
   - Add a guard/log in workflow (and/or Cypress config) so users instantly see why it’s empty (job_name mismatch is a common failure mode).
5. **Update/pin Actions**
   - The workflow uses older major versions (`actions/checkout@v2`, `cypress-io/github-action@v2`). Pin to newer majors and document minimum permissions (it already sets `contents: read` + `actions: read`).
6. **Add copy/paste “secrets + vars” table**
   - At minimum: `CURRENTS_RECORD_KEY` (secret), `CURRENTS_PROJECT_ID` (var/secret), and a note on `GITHUB_TOKEN` usage (workflow uses `secrets.GITHUB_TOKEN`).

## Source markdown copied into this folder

- [`gh-matrix-job-url-example__source__README.md`](gh-matrix-job-url-example__source__README.md)
