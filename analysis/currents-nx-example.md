# Repo audit — `currents-nx-example`

- **Link to the repository:** https://github.com/currents-dev/currents-nx-example :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest commits on **Nov 19, 2024** are a **Dependabot** update (and a merge of that PR), which I’m excluding as “automatic security/dependency updates.” :contentReference[oaicite:1]{index=1}  
- Latest **non-bot / non-dependabot** change is **Oct 30, 2023**: `chore: update examples`. :contentReference[oaicite:2]{index=2}

## What is it for?
An example Nx workspace showing how to use the **`@currents/nx` executor** to run **Cypress** tests and record/parallelize them with **Currents** (or alternatively **Sorry Cypress**). :contentReference[oaicite:3]{index=3}

## How is it used?
- The README walks you through creating an Nx workspace + web app, installing `@currents/nx`, then adding a new target using the `@currents/nx:currents` executor. :contentReference[oaicite:4]{index=4}
- In this repo, that target already exists as `frontend-e2e:currents` in `apps/frontend-e2e/project.json` and enables `record` + `parallel`, points to a Cypress config, and sets `devServerTarget`. :contentReference[oaicite:5]{index=5}
- You then run:
  - `nx run frontend-e2e:currents --record --key <key> --ci-build-id hello-currents-nx`
  - or (if options are set in config) omit flags and run with just `--ci-build-id`. :contentReference[oaicite:6]{index=6}
- Cypress itself is configured with `cypress-cloud/plugin` and includes a Currents `projectId`. :contentReference[oaicite:7]{index=7}

## What examples are provided?
- **Nx target configuration for Currents executor**
  - `apps/frontend-e2e/project.json` shows the `currents` target using `@currents/nx:currents` with `record: true`, `parallel: true`, and `devServerTarget: frontend:serve`. :contentReference[oaicite:8]{index=8}
- **Cypress configuration wired to cypress-cloud**
  - `apps/frontend-e2e/cypress.config.js` uses `cypress-cloud/plugin`, defines `specPattern`, and sets `projectId`. :contentReference[oaicite:9]{index=9}
- **Repo-level dependencies**
  - `package.json` includes `@currents/nx`, `cypress`, and `cypress-cloud`. :contentReference[oaicite:10]{index=10}
- **README “recreate the example” steps**
  - End-to-end instructions for creating the Nx workspace and adding the executor target. :contentReference[oaicite:11]{index=11}

## What changes need to be done to make the examples more accessible?
1. **Remove hardcoded / placeholder values**
   - `project.json` has `key` and `ciBuildId` set to **documentation URLs** (not usable values). Replace with env-var usage or omit these options and document the CLI flags. :contentReference[oaicite:12]{index=12}  
   - `cypress.config.js` hardcodes `projectId: 'Ij0RfK'`; make it env-driven and fail fast if missing. :contentReference[oaicite:13]{index=13}
2. **Fix typos / consistency**
   - README snippet references `cypres.config.ts` (typo) while this repo uses `apps/frontend-e2e/cypress.config.js`. Clean up the README example so it matches reality. :contentReference[oaicite:14]{index=14}
3. **Pretty-print the repo files**
   - Key files are committed as single-line blobs (`package.json`, `project.json`, `cypress.config.js`, README), which makes the example hard to learn from. :contentReference[oaicite:15]{index=15}
4. **Add a minimal CI workflow**
   - A small GitHub Actions example running `nx run frontend-e2e:currents ...` would make the “CI use case” copy/pasteable (this repo currently doesn’t surface a workflow in the README). :contentReference[oaicite:16]{index=16}
5. **Make “Currents vs Sorry Cypress” explicit**
   - README says it supports both, but doesn’t show the exact knob (`cloudServiceUrl` etc.). Add a short section + example config for Sorry Cypress mode and where to set it. :contentReference[oaicite:17]{index=17}
