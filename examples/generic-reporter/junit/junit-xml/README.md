# currents-junit-xml-example

- **Framework:** `generic-reporter`
- **Use case:** `junit`
- **Source repository:** https://github.com/currents-dev/currents-junit-xml-example

## What this example does

A monorepo of **JUnit XML → Currents** examples showing how to take JUnit XML produced by various test frameworks, **convert** it with `@currents/cmd` (`currents convert`), and **upload** it to Currents (`currents upload`).

## How this example is used

General workflow (per package/framework):
1) Run the framework to generate a JUnit XML file (e.g., `results.xml` / `report.xml`).  
2) Convert: `npx currents convert --input-format=junit --input-file=<file> --framework=<framework> --framework-version=<version>`  
3) Upload: `npx currents upload --key=<record-key> --project-id=<project-id>`  

Repo-level:
- Uses npm workspaces (`packages/*`) and depends on `@currents/cmd` at the root.

Framework-specific notes:
- **WebdriverIO**: generates **multiple** JUnit XML files (`results-*.xml`) and requires combining them into a single `combined-results.xml` via `scripts/combineResults.js` before converting/uploading.  
- **NodeJS test runner**: uses `node --test` with `@currents/node-test-reporter` to write `report.xml`, then converts with `--framework=node`.  
- **Vitest**: runs `vitest --outputFile.junit=./results.xml` and then converts using `--framework=vitest`.  
- The repo contains `.github/workflows/` (intended to show “Vitest - parallel runs on GitHub Actions”), but GitHub directory listing wasn’t readable in the rendered page during this audit.

## What scenarios are included

Root README links to these examples (each under `packages/`):
- **Postman (Newman)**: run `newman ... -r cli,junit --reporter-junit-export ./results.xml`, then convert with `--framework=postman --framework-version=v11.2.0`.
- **Vitest** (+ note about parallel runs on GitHub Actions): produces `results.xml` and converts with `--framework=vitest --framework-version=v3.4.0`.
- **WebdriverIO**: JUnit reporter output files in `./results`, combine with `scripts/combineResults.js`, then convert with `--framework=wdio`.
- **NodeJS Test Runner**: `npm run test` generates `report.xml`, `npm run convert`, then upload.

## How to implement this in your own project

1. Start from the copied source markdown files in this folder and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the source docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the source docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Format / readability**
   - Multiple READMEs and scripts are committed as single-line text, which makes them hard to follow/copy. (Root + package READMEs, combine script.)
2. **Add a real “Quickstart (end-to-end)” at the root**
   - Right now root README only says `npm install` + links. Add: required env vars, where to get them, and a single “pick one package and run these commands” flow.
3. **Standardize scripts per package**
   - Vitest package only has `test` script; NodeJS has `test` + `convert`; Postman/Wdio have no scripts. Add `test`, `convert`, `upload` scripts in each package so it’s consistent.
4. **Make WebdriverIO combine step clearer + safer**
   - README calls `node ../../scripts/combineResults.js` without args, while the script prints a usage message if args aren’t provided (even though it has defaults). Update README to show explicit `--reports-dir` / `--output-file` usage and explain expected input file naming (`results-*.xml`).
5. **Fix typos / polish**
   - Root: “variout”; Postman: “Postname”. These reduce trust when people copy the repo as a template.
6. **Expose the GitHub Actions example clearly**
   - Since the root README claims a GitHub Actions parallel Vitest example, link directly to the workflow file path and include a snippet in the vitest README. (Workflows folder exists but wasn’t inspectable in this view.)
7. **Add `.env.example`**
   - Provide `CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`, optional `CURRENTS_CI_BUILD_ID`, plus a note that `currents upload` can take args or env vars (show one consistent approach).

## Source markdown copied into this folder

- [`source__packages__nodejs-test-runner__README.md`](source__packages__nodejs-test-runner__README.md)
- [`source__packages__postman__README.md`](source__packages__postman__README.md)
- [`source__packages__vitest-sharded__README.md`](source__packages__vitest-sharded__README.md)
- [`source__packages__vitest__README.md`](source__packages__vitest__README.md)
- [`source__packages__wdio__README.md`](source__packages__wdio__README.md)
- [`source__README.md`](source__README.md)
- [`source__scripts__README.md`](source__scripts__README.md)

## Repository content copied into this folder

- Total tracked files copied: **53**
- Source `README.md` is saved as `README.upstream.md`.
- Path mapping: [`content-map.md`](content-map.md)
