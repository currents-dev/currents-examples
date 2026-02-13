# Repo audit — `currents-playwright-component-tests-example`

- **Repository:** https://github.com/currents-dev/currents-playwright-component-tests-example :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest (and effectively latest overall) commits are on **Nov 2, 2023** (by `agoldis` and earlier commits by `miguelangarano`). :contentReference[oaicite:1]{index=1}  
- There are Dependabot dependency PRs visible in the repo, but those are automated and excluded by your rule. :contentReference[oaicite:2]{index=2}  

➡️ **Answer:** **Nov 2, 2023** :contentReference[oaicite:3]{index=3}

## What is it for?
A minimal example showing **Playwright Component Testing (React)** reported to **Currents** (using the `pwc` command / Currents Playwright integration). It explicitly notes that Playwright component testing support was **experimental (Nov 2023)**. :contentReference[oaicite:4]{index=4}

## How is it used?
1. **Install**
   - `npm i` :contentReference[oaicite:5]{index=5}
2. **Create Currents project**
   - Create a project in Currents and obtain `projectId` + `recordKey`. :contentReference[oaicite:6]{index=6}
3. **Run via `pwc`**
   - Example command: `npx pwc --key <recordKey> --project-id <projectId> --ci-build-id hello-currents` :contentReference[oaicite:7]{index=7}
4. **Run component tests locally**
   - `npm run test-ct` runs `playwright test -c playwright-ct.config.js`. :contentReference[oaicite:8]{index=8}
5. **Artifacts enabled**
   - The CT config enables `trace: "on"`, `video: "on"`, `screenshot: "on"` and sets `ctPort: 3100`. :contentReference[oaicite:9]{index=9}

## What examples are provided?
- **Two simple component tests**
  - `src/App.spec.jsx` (passes, expects “Learn React”). :contentReference[oaicite:10]{index=10}
  - `src/AppFailing.spec.jsx` (intentionally fails, expects “Dont Learn React”). :contentReference[oaicite:11]{index=11}
- **A minimal React app scaffold (Create React App)**
  - `src/App.js` renders the “Learn React” link/text. :contentReference[oaicite:12]{index=12}
- **Playwright Component Testing configuration**
  - `playwright-ct.config.js` demonstrates CT setup + artifact capture. :contentReference[oaicite:13]{index=13}
- **Currents integration dependency**
  - Uses `@currents/playwright` in `package.json`. :contentReference[oaicite:14]{index=14}

## What changes would make the example more accessible?
1. **Make the README readable in raw form**
   - It’s effectively one long line in the raw file, which makes it harder to scan/copy. Reformat into sections + fenced code blocks. :contentReference[oaicite:15]{index=15}
2. **Provide a copy/paste “Quickstart” with env vars**
   - Add `.env.example` and show both styles:
     - `npx pwc --key ... --project-id ...`
     - and/or `CURRENTS_RECORD_KEY=... CURRENTS_PROJECT_ID=... npx pwc ...` (whatever the tool supports) so people don’t paste secrets into shell history.
3. **Clarify what `pwc` is**
   - Add one sentence: “`pwc` is the Currents Playwright CLI wrapper that records results to Currents,” plus a link to the official docs (the README already links docs, but doesn’t define `pwc`). :contentReference[oaicite:16]{index=16}
4. **Add a CI snippet**
   - Even a tiny GitHub Actions example (Node install + `npm run test-ct` + `npx pwc ...`) would reduce guesswork for real usage.
5. **Pin/upgrade versions or add a compatibility note**
   - Since CT was experimental in Nov 2023, add a note about the Playwright CT version expected (repo uses `@playwright/experimental-ct-react` `^1.39.0`). :contentReference[oaicite:17]{index=17}
