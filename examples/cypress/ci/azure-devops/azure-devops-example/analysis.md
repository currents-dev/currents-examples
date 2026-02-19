# Repo audit — `azure-devops-example`

- **Link to the repository:** https://github.com/currents-dev/azure-devops-example :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest **non-bot** changes: **Dec 3, 2022** (e.g. “Update README.md”, “Update azure-pipelines.yml”). :contentReference[oaicite:1]{index=1}
- No Dependabot/bot commits are shown in the commit history. :contentReference[oaicite:2]{index=2}

## What is it for?
An example of running **Cypress** tests on **Azure DevOps Pipelines** using **Currents** as the orchestration/reporting service. The README explicitly positions it as “Running cypress tests using Currents dashboard in Azure DevOps”. :contentReference[oaicite:3]{index=3}

## How is it used?
- Azure DevOps pipeline runs **3 parallel jobs** via `strategy: parallel: 3`. :contentReference[oaicite:4]{index=4}
- It pulls secrets from an Azure DevOps **Variable Group** named `Currents` and maps the secret into `CURRENTS_RECORD_KEY`. :contentReference[oaicite:5]{index=5}
- It installs Node, caches npm + Cypress binary, runs `npm ci`, then runs:
  - `npx currents run --record --parallel --key $CURRENTS_RECORD_KEY --ci-build-id $BUILD_BUILDNUMBER` :contentReference[oaicite:6]{index=6}
- Cypress + Currents CLI are included as dependencies (`cypress` and `@currents/cli`). :contentReference[oaicite:7]{index=7}
- Currents’ official docs for Cypress+Azure DevOps describe the same goal (parallel execution + Currents dashboard) and link to this repo as the reference config. :contentReference[oaicite:8]{index=8}

## What examples are provided?
- **Pipeline config**: `azure-pipelines.yml` showing:
  - parallel strategy (3)
  - caching steps
  - Currents CLI run command + CI build id usage :contentReference[oaicite:9]{index=9}
- **Cypress config**: `cypress.config.js` showing:
  - `baseUrl: "https://en.wikipedia.org/"`
  - `specPattern: "cypress/integration/*.spec.js"`
  - `projectId: "Ij0RfK"`
  - video settings :contentReference[oaicite:10]{index=10}
- **Minimal README** that points to a “full guide”. :contentReference[oaicite:11]{index=11}

## What changes need to be done to make the examples more accessible?
1. **Stop hardcoding the Currents project id**
   - `projectId: "Ij0RfK"` is hardcoded in `cypress.config.js`. Switch to `process.env.CURRENTS_PROJECT_ID` and document it. :contentReference[oaicite:12]{index=12}
2. **Update the pipeline command to match current docs (or explain the difference)**
   - The docs’ Azure DevOps snippet uses `npx cypress-cloud run ...` :contentReference[oaicite:13]{index=13}
   - This repo uses `npx currents run ...` :contentReference[oaicite:14]{index=14}
   - Either is fine if supported, but the repo should explicitly state *why* it uses `currents run` and whether `cypress-cloud` is now the preferred approach.
3. **Add a real Quickstart section**
   - README is 1 line and assumes users click out. Add: prerequisites, required variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`), how to create the Variable Group, and what “success” looks like in Currents. :contentReference[oaicite:15]{index=15}
4. **Add `.env.example` + local run instructions**
   - Let users validate locally before CI: `CURRENTS_RECORD_KEY=... CURRENTS_PROJECT_ID=... npx currents run ...`.
5. **Pretty-print the files**
   - `azure-pipelines.yml`, `cypress.config.js`, and `package.json` are committed as single-line blobs, which makes them hard to read/copy. :contentReference[oaicite:16]{index=16}
6. **Add `package.json` scripts**
   - Current `scripts.test` is the default “no test specified”. Add scripts like `test:currents` / `test:cypress` so users can run by name. :contentReference[oaicite:17]{index=17}
