# Repo audit — `gh-actions-example`

- **Link to the repository:** https://github.com/currents-dev/gh-actions-example :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest commits are on **Nov 17, 2023** (e.g. “Update README.md”, plus merges). No Dependabot/bot commits appear in the commit history page. :contentReference[oaicite:1]{index=1}

➡️ **Answer:** **Nov 17, 2023** :contentReference[oaicite:2]{index=2}

## What is it for?
An example repository showing how to run **Cypress tests on GitHub Actions** and record/parallelize them with **Currents.dev** (using `cypress-cloud`). :contentReference[oaicite:3]{index=3}

## How is it used?
- Configure GitHub Actions secret **`CURRENTS_RECORD_KEY`**. :contentReference[oaicite:4]{index=4}
- Set the Currents **`projectId`** in `currents.config.js` (currently hardcoded as `Ij0RfK`). :contentReference[oaicite:5]{index=5}
- Run the provided GitHub Actions workflow which:
  - runs **3 containers** in parallel,
  - disables cached Cypress binaries and installs **block-free Cypress binaries**,
  - uses a custom command to execute `cypress-cloud run --record --parallel ...` with a `--ci-build-id` derived from GitHub run metadata. :contentReference[oaicite:6]{index=6}

## What examples are provided?
- **GitHub Actions workflow example** (“workflow config file”) demonstrating 3-way parallel Cypress runs and a `cypress-cloud` command line you can customize (e.g. add `--group`). :contentReference[oaicite:7]{index=7}
- **Alternative Cypress binaries setup**: README section explaining why/when to disable cached binaries and how to run with the non-blocking binaries using `cypress-io/github-action`. :contentReference[oaicite:8]{index=8}
- **Currents project config sample** via `currents.config.js` containing a `projectId` field. :contentReference[oaicite:9]{index=9}

## What changes need to be done to make the examples more accessible?
1. **Remove hardcoded `projectId`**
   - Replace `currents.config.js` hardcoded `projectId: "Ij0RfK"` with env-based config (e.g. `process.env.CURRENTS_PROJECT_ID`) and document where to set it. :contentReference[oaicite:10]{index=10}
2. **Add `.env.example` + “Required inputs” section**
   - Make it explicit: `CURRENTS_RECORD_KEY` (secret) + `CURRENTS_PROJECT_ID` (config/env) + recommended `CURRENTS_CI_BUILD_ID` pattern. :contentReference[oaicite:11]{index=11}
3. **Reformat workflow + configs**
   - Several files are committed as single-line blobs (hard to read/copy). Pretty-print the YAML/TS/JSON. :contentReference[oaicite:12]{index=12}
4. **Make “block-free binaries” path copy/pasteable**
   - README explains the idea, but adding an explicit minimal workflow snippet (with the `install: false` + command block) right up top would reduce confusion. :contentReference[oaicite:13]{index=13}
5. **Add a “Run locally” section**
   - Provide a local command template using `npx cypress-cloud run ...` so users can validate before CI. :contentReference[oaicite:14]{index=14}
