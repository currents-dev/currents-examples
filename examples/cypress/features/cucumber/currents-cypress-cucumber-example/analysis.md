# Repo audit — `currents-cypress-cucumber-example`

- **Link to the repository:** https://github.com/currents-dev/currents-cypress-cucumber-example :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest (non-bot) changes: **Mar 15, 2024** (“Update README.md”, “chore: init”). :contentReference[oaicite:1]{index=1}  
- I don’t see any Dependabot/bot commits on the history page (only 2 commits total). :contentReference[oaicite:2]{index=2}

## What is it for?
Example of running **Cypress + `cypress-cucumber-preprocessor` (feature files / tags)** while reporting/orchestrating via **Currents** using `@currents/cli` (so you can run `npx currents` instead of `npx cypress`). :contentReference[oaicite:3]{index=3}

## How is it used?
- Install dependencies (Cypress + cucumber preprocessor + `@currents/cli`). :contentReference[oaicite:4]{index=4}
- Configure Cypress:
  - `specPattern: "**/*.{feature,features}"` so Cypress discovers Gherkin feature specs.
  - uses `cypress-cucumber-preprocessor` as the `file:preprocessor` plugin. :contentReference[oaicite:5]{index=5}
- Patch requirement:
  - `cypress-cucumber-preprocessor` hardcodes the `cypress` binary for its `cypress-tags` command, so the repo includes a `patch-package` patch that replaces the binary with `currents` (so tags work when running through Currents). :contentReference[oaicite:6]{index=6}
- Credentials:
  - You need Currents **record key** and **project id** (README points to Currents app). :contentReference[oaicite:7]{index=7}

## What examples are provided?
- **Patch-package patch** that replaces the preprocessor’s internal executable from `cypress` → `currents`:
  - `patches/cypress-cucumber-preprocessor+4.3.1.patch` :contentReference[oaicite:8]{index=8}
- **Cypress config** showing:
  - feature-spec pattern
  - projectId configured (currently hardcoded)
  - cucumber preprocessor plugin wiring :contentReference[oaicite:9]{index=9}
- **Minimal cucumber plugin** (`cypress/plugins/index.js`) that hooks `file:preprocessor`. :contentReference[oaicite:10]{index=10}
- **README** describing why patching is needed and how to apply it. :contentReference[oaicite:11]{index=11}

## What changes need to be done to make the examples more accessible?
1. **Make the README readable + structured**
   - The raw README is basically 3 long lines; reformat into sections with fenced code blocks and a “Quickstart” flow. :contentReference[oaicite:12]{index=12}
2. **Add working scripts**
   - `package.json` currently has `"test": "echo \"Error: no test specified\" && exit 1"`. Add scripts like:
     - `postinstall: patch-package` (README recommends it but it’s not present)
     - `test:currents` (e.g., `currents run ...` / whatever the intended command is)
     - `tags` (e.g., `cypress-tags ...`) :contentReference[oaicite:13]{index=13}
3. **Stop hardcoding `projectId`**
   - `cypress.config.js` hardcodes `projectId: "Ij0RfK"`; switch to `process.env.CURRENTS_PROJECT_ID` (and fail fast if missing). :contentReference[oaicite:14]{index=14}
4. **Explain “how to run” explicitly**
   - README says “you can use `cypress-tags` as usual” but doesn’t show the exact command lines users should run (local + CI). Add copy/paste commands for:
     - running feature specs
     - running tagged subsets (using `cypress-tags`)
     - recording to Currents (record key / project id) :contentReference[oaicite:15]{index=15}
5. **Modernize the cucumber stack note**
   - This example uses `cypress-cucumber-preprocessor` + Cypress 10.11; add a short note about supported Cypress versions and alternatives if users are on newer Cypress where community preprocessors differ. (Right now it’s implied by deps only.) :contentReference[oaicite:16]{index=16}
6. **Pretty-print the code/config**
   - `package.json`, `cypress.config.js`, and the patch file are one-line blobs; format them so people can learn/copy easier. :contentReference[oaicite:17]{index=17}
