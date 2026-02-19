# currents-playwright-component-tests-example

- **Framework:** `playwright`
- **Use case:** `features/component-testing`
- **Source repository:** https://github.com/currents-dev/currents-playwright-component-tests-example

## What this example does

A minimal example showing **Playwright Component Testing (React)** reported to **Currents** (using the `pwc` command / Currents Playwright integration). It explicitly notes that Playwright component testing support was **experimental (Nov 2023)**.

## How this example is used

1. **Install**
   - `npm i`
2. **Create Currents project**
   - Create a project in Currents and obtain `projectId` + `recordKey`.
3. **Run via `pwc`**
   - Example command: `npx pwc --key <recordKey> --project-id <projectId> --ci-build-id hello-currents`
4. **Run component tests locally**
   - `npm run test-ct` runs `playwright test -c playwright-ct.config.js`.
5. **Artifacts enabled**
   - The CT config enables `trace: "on"`, `video: "on"`, `screenshot: "on"` and sets `ctPort: 3100`.

## What scenarios are included

- **Two simple component tests**
  - `src/App.spec.jsx` (passes, expects “Learn React”).
  - `src/AppFailing.spec.jsx` (intentionally fails, expects “Dont Learn React”).
- **A minimal React app scaffold (Create React App)**
  - `src/App.js` renders the “Learn React” link/text.
- **Playwright Component Testing configuration**
  - `playwright-ct.config.js` demonstrates CT setup + artifact capture.
- **Currents integration dependency**
  - Uses `@currents/playwright` in `package.json`.

## How to implement this in your own project

1. Start from the copied source markdown files in this folder and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the source docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the source docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Make the README readable in raw form**
   - It’s effectively one long line in the raw file, which makes it harder to scan/copy. Reformat into sections + fenced code blocks.
2. **Provide a copy/paste “Quickstart” with env vars**
   - Add `.env.example` and show both styles:
     - `npx pwc --key ... --project-id ...`
     - and/or `CURRENTS_RECORD_KEY=... CURRENTS_PROJECT_ID=... npx pwc ...` (whatever the tool supports) so people don’t paste secrets into shell history.
3. **Clarify what `pwc` is**
   - Add one sentence: “`pwc` is the Currents Playwright CLI wrapper that records results to Currents,” plus a link to the official docs (the README already links docs, but doesn’t define `pwc`).
4. **Add a CI snippet**
   - Even a tiny GitHub Actions example (Node install + `npm run test-ct` + `npx pwc ...`) would reduce guesswork for real usage.
5. **Pin/upgrade versions or add a compatibility note**
   - Since CT was experimental in Nov 2023, add a note about the Playwright CT version expected (repo uses `@playwright/experimental-ct-react` `^1.39.0`).

## Source markdown copied into this folder

- [`currents-playwright-component-tests-example__source__README.md`](currents-playwright-component-tests-example__source__README.md)
