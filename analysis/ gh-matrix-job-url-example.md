# Repo audit — `gh-matrix-job-url-example`

- **Link to the repository:** https://github.com/currents-dev/gh-matrix-job-url-example :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest commits are on **Jan 8, 2023** (no Dependabot/bot commits shown). :contentReference[oaicite:1]{index=1}

## What is it for?
A GitHub Actions + Cypress example that demonstrates how to **capture the current matrix job’s log URL** and expose it to the test run (for Currents / debugging / linking from reports). The README points to the matching Currents blog post: `github-actions-cypress-job-url`. :contentReference[oaicite:2]{index=2}

## How is it used?
- The workflow runs a **matrix of 3 parallel jobs**. :contentReference[oaicite:3]{index=3}
- It uses `Tiryoh/gha-jobid-action` to fetch the **current job’s HTML URL** (filtered by the matrix job name), then exports it as `MATRIX_JOB_URL` via `$GITHUB_ENV`. :contentReference[oaicite:4]{index=4}
- Cypress reads that environment variable and logs it on `before:spec`:
  - `console.log(\` GH Job URL: ${process.env.MATRIX_JOB_URL}\`)` :contentReference[oaicite:5]{index=5}
- Cypress is executed in GitHub Actions via `cypress-io/github-action@v2` and runs Currents via `currents run --record --parallel --key ...`. :contentReference[oaicite:6]{index=6}

## What examples are provided?
- **GitHub Actions workflow**: `.github/workflows/cypress.yml`
  - matrix parallelization (3 containers)
  - job URL lookup (`Tiryoh/gha-jobid-action`)
  - export `MATRIX_JOB_URL`
  - run Cypress + Currents :contentReference[oaicite:7]{index=7}
- **Cypress config hook**: `cypress.config.js` logs the `MATRIX_JOB_URL` per spec execution. :contentReference[oaicite:8]{index=8}
- **Baseline deps**: Cypress `12.3.0` + `@currents/cli` (beta) + TypeScript in `package.json`. :contentReference[oaicite:9]{index=9}
- **README**: only a pointer to the blog post (no setup steps). :contentReference[oaicite:10]{index=10}

## What changes need to be done to make the examples more accessible?
1. **Write a real README**
   - Add: required secrets/vars, how to run locally, what the matrix job URL is used for, and what “success” looks like in Currents. Current README is just a one-liner. :contentReference[oaicite:11]{index=11}
2. **Stop hardcoding Currents projectId**
   - `projectId: "Ij0RfK"` is hardcoded in `cypress.config.js`; switch to `process.env.CURRENTS_PROJECT_ID` and document it. :contentReference[oaicite:12]{index=12}
3. **Fix package manager mismatch**
   - The workflow runs `yarn currents run ...` but the repo includes `package-lock.json` (npm). Either:
     - add `yarn.lock` + install Yarn in CI, or
     - switch the workflow command to `npx currents run ...` / `npm run ...`. :contentReference[oaicite:13]{index=13}
4. **Fail fast if `MATRIX_JOB_URL` is missing**
   - Add a guard/log in workflow (and/or Cypress config) so users instantly see why it’s empty (job_name mismatch is a common failure mode). :contentReference[oaicite:14]{index=14}
5. **Update/pin Actions**
   - The workflow uses older major versions (`actions/checkout@v2`, `cypress-io/github-action@v2`). Pin to newer majors and document minimum permissions (it already sets `contents: read` + `actions: read`). :contentReference[oaicite:15]{index=15}
6. **Add copy/paste “secrets + vars” table**
   - At minimum: `CURRENTS_RECORD_KEY` (secret), `CURRENTS_PROJECT_ID` (var/secret), and a note on `GITHUB_TOKEN` usage (workflow uses `secrets.GITHUB_TOKEN`). :contentReference[oaicite:16]{index=16}
