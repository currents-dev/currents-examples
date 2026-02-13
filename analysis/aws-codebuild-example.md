# Repo audit — `aws-codebuild-example`

- **Repository:** https://github.com/currents-dev/aws-codebuild-example :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest commit is **Dependabot** on **Jul 22, 2025** (“Bump word-wrap…”) — automated, excluded. :contentReference[oaicite:1]{index=1}
- Latest **non-bot** change is **May 24, 2023** (“Update README.md”) by `agoldis`. :contentReference[oaicite:2]{index=2}

➡️ **Answer:** **May 24, 2023** :contentReference[oaicite:3]{index=3}

## What is it for?
An example repo showing how to run **Cypress tests in parallel on AWS CodeBuild** and report them to **Currents** using `cypress-cloud`, specifically using CodeBuild **batch build + matrix mode** with **3 workers**. :contentReference[oaicite:4]{index=4}

## How is it used?
1. **Create a Currents project** and obtain:
   - `recordKey` (set as CodeBuild env var `CURRENTS_RECORD_KEY`) :contentReference[oaicite:5]{index=5}
   - `projectId` (set in `currents.config.js`) :contentReference[oaicite:6]{index=6}
2. **Run on AWS CodeBuild using batch/matrix**
   - `buildspec.yml` defines matrix `WORKERS: 1,2,3` and runs `npx cypress-cloud run --record --parallel --ci-build-id $CODEBUILD_INITIATOR`. :contentReference[oaicite:7]{index=7}
3. **Cypress configuration**
   - Uses `cloudPlugin` from `cypress-cloud/plugin`, sets `baseUrl` to TodoMVC, and looks for specs in `cypress/e2e/*.spec.js` with support file `cypress/support/e2e.ts`. :contentReference[oaicite:8]{index=8}
4. **CI Build ID behavior**
   - README notes it uses `CODEBUILD_INITIATOR` as the CI Build ID, and explains differences between interactive vs batch builds. :contentReference[oaicite:9]{index=9}

## What examples are provided?
- **CodeBuild batch/matrix parallelization**
  - `buildspec.yml` with 3 workers and a parallel Cypress Cloud run (`--parallel --record`). :contentReference[oaicite:10]{index=10}
- **Currents project configuration**
  - `currents.config.js` with a `projectId` field. :contentReference[oaicite:11]{index=11}
- **Cypress + Currents integration**
  - `cypress.config.ts` showing `cloudPlugin(...)`, video settings, baseUrl, and spec pattern. :contentReference[oaicite:12]{index=12}
- **Dependencies**
  - `package.json` includes `cypress` + `cypress-cloud` + `typescript`. :contentReference[oaicite:13]{index=13}

> Note: The repo clearly expects Cypress specs under `cypress/e2e/*.spec.js` but GitHub directory listing for `cypress/` didn’t render in the captured view, so I’m describing the tests based on the config rather than enumerating filenames. :contentReference[oaicite:14]{index=14}

## What changes would make the example more accessible?
1. **Reformat files (they’re currently effectively one-liners in raw view)**
   - README + `buildspec.yml` + `cypress.config.ts` are hard to scan because they render as long single lines; reformat into normal multiline files. :contentReference[oaicite:15]{index=15}
2. **Add a real “Quickstart”**
   - Explicit steps: create Currents project → set `CURRENTS_RECORD_KEY` → set `projectId` → run CodeBuild batch build.
   - Include copy/paste commands for local run (even if it’s not CodeBuild).
3. **Add `scripts` in `package.json`**
   - Example: `npm run cy:cloud` to run `cypress-cloud run --record --parallel ...` (right now there’s only a placeholder `test` script). :contentReference[oaicite:16]{index=16}
4. **Add `.env.example`**
   - Show required env vars and safe handling (avoid pasting keys into shell history).
5. **Make worker count configurable**
   - Right now sharding is implicitly “3 workers” via matrix; add a single place to change it (and document it). :contentReference[oaicite:17]{index=17}
6. **Include a sample CodeBuild Project JSON (optional but helpful)**
   - Similar to the Playwright CodeBuild example repo which includes a project config output; having that here would reduce AWS console guesswork.

## Link
- https://github.com/currents-dev/aws-codebuild-example :contentReference[oaicite:18]{index=18}
