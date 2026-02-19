# Repo audit — `circleci-example`

- **Link to the repository:** https://github.com/currents-dev/circleci-example :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest change: **Nov 17, 2023** — `chore: use currents images (#11)` :contentReference[oaicite:1]{index=1}  
- No bot/Dependabot commits appear on the commit history page for this repo, so **Nov 17, 2023** is the latest meaningful change. :contentReference[oaicite:2]{index=2}

## What is it for?
An example repo showing how to run **Cypress tests on CircleCI** and record/parallelize them to **Currents.dev** using `cypress-cloud`, including guidance for **alternative Cypress binaries** (Currents-hosted binaries / prebuilt images). :contentReference[oaicite:3]{index=3}

## How is it used?
1. Create a Currents account, get **ProjectId** + **Record Key**. :contentReference[oaicite:4]{index=4}  
2. In CircleCI, set `CURRENTS_RECORD_KEY` via a **Context** (recommended) or env var. :contentReference[oaicite:5]{index=5}  
3. Create `currents.config.js` with your `projectId` (repo has a sample but it’s hardcoded). :contentReference[oaicite:6]{index=6}  
4. Run CircleCI using one of the provided configurations (all run **3 parallel containers**) that call:
   - `npx cypress-cloud run --parallel --record --key $CURRENTS_RECORD_KEY` :contentReference[oaicite:7]{index=7}  
5. Choose how Cypress is installed:
   - **Use Currents prebuilt image** `currentsdev/cypress-included:12.17.4` :contentReference[oaicite:8]{index=8}  
   - **Explicit download** via `CYPRESS_DOWNLOAD_MIRROR=https://cy-cdn.currents.dev npx cypress install --force` :contentReference[oaicite:9]{index=9}  
   - **Cypress Orb** (`cypress-io/cypress@3`) with either the default executor or a custom executor that uses the Currents image. :contentReference[oaicite:10]{index=10}

## What examples are provided?
- **Bare CircleCI config (no orbs)**:
  - Using the Currents Docker image with preinstalled Cypress (`currentsdev/cypress-included:12.17.4`) :contentReference[oaicite:11]{index=11}
  - Using a base image and explicitly downloading the alternative Cypress binary (download mirror) :contentReference[oaicite:12]{index=12}
- **Cypress Orb examples**:
  - Orb install step with `post-install` to fetch the alternative Cypress binary, workspace persistence, then a parallel run job :contentReference[oaicite:13]{index=13}
  - Custom executor (`currents-executor`) pointing at `currentsdev/cypress-included:12.17.4` :contentReference[oaicite:14]{index=14}
- **Dependency baseline**:
  - `cypress@12.17.4`, `cypress-cloud`, and `typescript` in `package.json` :contentReference[oaicite:15]{index=15}
- **Currents config example**:
  - `currents.config.js` with `projectId` + `batchSize: 3` :contentReference[oaicite:16]{index=16}

## What changes need to be done to make the examples more accessible?
1. **Remove hardcoded `projectId`**
   - `currents.config.js` currently hardcodes `projectId: "Ij0RfK"`; switch to `process.env.CURRENTS_PROJECT_ID` and document it (and/or CircleCI Context vars). :contentReference[oaicite:17]{index=17}
2. **Provide a `.env.example` + “Required variables” table**
   - Explicitly list: `CURRENTS_RECORD_KEY` (secret), `CURRENTS_PROJECT_ID` (non-secret but should still be configurable), and optional `CURRENTS_CI_BUILD_ID` pattern (if you want consistent grouping). :contentReference[oaicite:18]{index=18}
3. **Format the repo files**
   - `.circleci/config.yml`, `package.json`, and `currents.config.js` are effectively one-liners; pretty-print them so users can copy/edit safely. :contentReference[oaicite:19]{index=19}
4. **Add a quickstart that maps to the 3 scenarios**
   - “Pick one: (A) prebuilt image, (B) explicit download, (C) Cypress Orb” with copy/paste snippets + where to set secrets in CircleCI. :contentReference[oaicite:20]{index=20}
5. **Make “alternative binaries” intent obvious**
   - README mentions Currents-hosted Cypress app/binaries and supported versions; add a short explanation of *why* you’d choose mirror vs image (speed, reliability, avoiding blocked downloads). :contentReference[oaicite:21]{index=21}
