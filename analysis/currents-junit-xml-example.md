# Repo audit — `currents-junit-xml-example`

- **Link to the repository:** https://github.com/currents-dev/currents-junit-xml-example (GitHub) :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest **automated** change: **Jul 22, 2025** (Dependabot bump) — excluded. :contentReference[oaicite:1]{index=1}
- Latest **non-bot** change: **Apr 30, 2025** (merge + “adding node js example”). :contentReference[oaicite:2]{index=2}

## What is it for?
A monorepo of **JUnit XML → Currents** examples showing how to take JUnit XML produced by various test frameworks, **convert** it with `@currents/cmd` (`currents convert`), and **upload** it to Currents (`currents upload`). :contentReference[oaicite:3]{index=3}

## How is it used?
General workflow (per package/framework):
1) Run the framework to generate a JUnit XML file (e.g., `results.xml` / `report.xml`). :contentReference[oaicite:4]{index=4}  
2) Convert: `npx currents convert --input-format=junit --input-file=<file> --framework=<framework> --framework-version=<version>` :contentReference[oaicite:5]{index=5}  
3) Upload: `npx currents upload --key=<record-key> --project-id=<project-id>` :contentReference[oaicite:6]{index=6}  

Repo-level:
- Uses npm workspaces (`packages/*`) and depends on `@currents/cmd` at the root. :contentReference[oaicite:7]{index=7}

Framework-specific notes:
- **WebdriverIO**: generates **multiple** JUnit XML files (`results-*.xml`) and requires combining them into a single `combined-results.xml` via `scripts/combineResults.js` before converting/uploading. :contentReference[oaicite:8]{index=8}  
- **NodeJS test runner**: uses `node --test` with `@currents/node-test-reporter` to write `report.xml`, then converts with `--framework=node`. :contentReference[oaicite:9]{index=9}  
- **Vitest**: runs `vitest --outputFile.junit=./results.xml` and then converts using `--framework=vitest`. :contentReference[oaicite:10]{index=10}  
- The repo contains `.github/workflows/` (intended to show “Vitest - parallel runs on GitHub Actions”), but GitHub directory listing wasn’t readable in the rendered page during this audit. :contentReference[oaicite:11]{index=11}

## What examples are provided?
Root README links to these examples (each under `packages/`): :contentReference[oaicite:12]{index=12}
- **Postman (Newman)**: run `newman ... -r cli,junit --reporter-junit-export ./results.xml`, then convert with `--framework=postman --framework-version=v11.2.0`. :contentReference[oaicite:13]{index=13}
- **Vitest** (+ note about parallel runs on GitHub Actions): produces `results.xml` and converts with `--framework=vitest --framework-version=v3.4.0`. :contentReference[oaicite:14]{index=14}
- **WebdriverIO**: JUnit reporter output files in `./results`, combine with `scripts/combineResults.js`, then convert with `--framework=wdio`. :contentReference[oaicite:15]{index=15}
- **NodeJS Test Runner**: `npm run test` generates `report.xml`, `npm run convert`, then upload. :contentReference[oaicite:16]{index=16}

## What changes need to be done to make the examples more accessible?
1. **Format / readability**
   - Multiple READMEs and scripts are committed as single-line text, which makes them hard to follow/copy. (Root + package READMEs, combine script.) :contentReference[oaicite:17]{index=17}
2. **Add a real “Quickstart (end-to-end)” at the root**
   - Right now root README only says `npm install` + links. Add: required env vars, where to get them, and a single “pick one package and run these commands” flow. :contentReference[oaicite:18]{index=18}
3. **Standardize scripts per package**
   - Vitest package only has `test` script; NodeJS has `test` + `convert`; Postman/Wdio have no scripts. Add `test`, `convert`, `upload` scripts in each package so it’s consistent. :contentReference[oaicite:19]{index=19}
4. **Make WebdriverIO combine step clearer + safer**
   - README calls `node ../../scripts/combineResults.js` without args, while the script prints a usage message if args aren’t provided (even though it has defaults). Update README to show explicit `--reports-dir` / `--output-file` usage and explain expected input file naming (`results-*.xml`). :contentReference[oaicite:20]{index=20}
5. **Fix typos / polish**
   - Root: “variout”; Postman: “Postname”. These reduce trust when people copy the repo as a template. :contentReference[oaicite:21]{index=21}
6. **Expose the GitHub Actions example clearly**
   - Since the root README claims a GitHub Actions parallel Vitest example, link directly to the workflow file path and include a snippet in the vitest README. (Workflows folder exists but wasn’t inspectable in this view.) :contentReference[oaicite:22]{index=22}
7. **Add `.env.example`**
   - Provide `CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`, optional `CURRENTS_CI_BUILD_ID`, plus a note that `currents upload` can take args or env vars (show one consistent approach).
