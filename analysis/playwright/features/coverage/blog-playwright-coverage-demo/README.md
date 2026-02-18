# blog-playwright-coverage-demo

- **Framework:** `playwright`
- **Use case:** `features/coverage`
- **Source repository:** https://github.com/currents-dev/blog-playwright-coverage-demo

## What this example does

A tiny demo project that accompanies the Currents blog post **“How To Measure Code Coverage in Playwright Tests”** and demonstrates collecting **JS + CSS coverage** using Playwright’s `page.coverage` APIs (Chromium-only).

## How this example is used

- Install deps: `npm install` (repo uses `@playwright/test`, `http-server`, `typescript`).
- Start a static server on port **5173**: `npm run dev` (runs `npx http-server -c-1 -p 5173 .`).
- Run tests (Chromium project): `npm test` (`playwright test --project=chromium`).
- The Playwright test writes raw coverage JSON files into `coverage/raw/` (e.g. `js.json`, `css.json`, plus `*-invalid.json` variants).

## What scenarios are included

- **Coverage test file**
  - `tests/coverage.spec.ts` contains **two flows**:
    - “happy path” (fills qty/price, calculates total, loads items) + writes `coverage/raw/js.json` + `coverage/raw/css.json`
    - “error path” (negative qty) + writes `js-invalid.json` + `css-invalid.json`
- **Minimal demo app code**
  - `src/app.js` wires DOM events, validation, calculation, and “load items” behavior.
  - `src/utils/math.js` includes deliberately uncovered branches (`qty === 0`) + an unused `legacyDiscount()` to show uncovered code.
  - `src/services/api.js` fetches `/api/items` (tests stub this route).
  - `src/ui/validate.js` validates numbers + negative inputs.
  - `styles.css` includes `.hidden` and `.error` to show CSS coverage.
- **Sample raw coverage outputs checked into the repo**
  - `coverage/raw/js.json` and `coverage/raw/css.json` are present and show the raw V8 coverage format produced by Playwright.
- **Config**
  - `playwright.config.ts` runs **only Chromium** because coverage APIs work only there.

## How to implement this in your own project

1. Start from the upstream markdown docs copied in this folder (`upstream/`) and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the upstream docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the upstream docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Add a README**
   - Right now there’s no README in the repo root; without the blog post, it’s not self-explanatory.
2. **Make `npm test` “just work” by starting the server automatically**
   - Add Playwright `webServer` config (or a `start-server-and-test` script) so users don’t need two terminals or guess that port 5173 must be running. (Today tests assume `http://localhost:5173` is already up.)
3. **Add a “generate HTML coverage report” step**
   - The repo collects raw coverage JSON, but doesn’t include a script/tooling to convert it into HTML/LCOV (e.g., v8-to-istanbul + nyc) even though that’s the typical “next step” users expect.
4. **Reformat source files**
   - Many files are committed as single-line/minified (package.json, config, JS/TS), which makes copying/learning harder.
5. **Add a CI workflow**
   - A simple GitHub Actions workflow running Chromium tests would make it easier to validate the example and reuse it.
6. **(Optional) Clarify relation to Currents**
   - This repo is “for the blog article”; it doesn’t show uploading coverage to Currents. A README note like “this repo demonstrates collection; see X for Currents ingestion” would prevent confusion.

## Upstream markdown copied into this folder

- No upstream markdown files were found for this repository.
