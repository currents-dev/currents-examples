# Repo audit — `blog-playwright-coverage-demo`

- **Link to the repository:** https://github.com/currents-dev/blog-playwright-coverage-demo (GitHub) :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- The repo has **1 commit**, “first commit”, on **Nov 15, 2025**, authored by `busybrainx99` (not a bot). :contentReference[oaicite:1]{index=1}

## What is it for?
A tiny demo project that accompanies the Currents blog post **“How To Measure Code Coverage in Playwright Tests”** and demonstrates collecting **JS + CSS coverage** using Playwright’s `page.coverage` APIs (Chromium-only). :contentReference[oaicite:2]{index=2}

## How is it used?
- Install deps: `npm install` (repo uses `@playwright/test`, `http-server`, `typescript`). :contentReference[oaicite:3]{index=3}
- Start a static server on port **5173**: `npm run dev` (runs `npx http-server -c-1 -p 5173 .`). :contentReference[oaicite:4]{index=4}
- Run tests (Chromium project): `npm test` (`playwright test --project=chromium`). :contentReference[oaicite:5]{index=5}
- The Playwright test writes raw coverage JSON files into `coverage/raw/` (e.g. `js.json`, `css.json`, plus `*-invalid.json` variants). :contentReference[oaicite:6]{index=6}

## What examples are provided?
- **Coverage test file**
  - `tests/coverage.spec.ts` contains **two flows**:
    - “happy path” (fills qty/price, calculates total, loads items) + writes `coverage/raw/js.json` + `coverage/raw/css.json`
    - “error path” (negative qty) + writes `js-invalid.json` + `css-invalid.json` :contentReference[oaicite:7]{index=7}
- **Minimal demo app code**
  - `src/app.js` wires DOM events, validation, calculation, and “load items” behavior. :contentReference[oaicite:8]{index=8}
  - `src/utils/math.js` includes deliberately uncovered branches (`qty === 0`) + an unused `legacyDiscount()` to show uncovered code. :contentReference[oaicite:9]{index=9}
  - `src/services/api.js` fetches `/api/items` (tests stub this route). :contentReference[oaicite:10]{index=10}
  - `src/ui/validate.js` validates numbers + negative inputs. :contentReference[oaicite:11]{index=11}
  - `styles.css` includes `.hidden` and `.error` to show CSS coverage. :contentReference[oaicite:12]{index=12}
- **Sample raw coverage outputs checked into the repo**
  - `coverage/raw/js.json` and `coverage/raw/css.json` are present and show the raw V8 coverage format produced by Playwright. :contentReference[oaicite:13]{index=13}
- **Config**
  - `playwright.config.ts` runs **only Chromium** because coverage APIs work only there. :contentReference[oaicite:14]{index=14}

## What changes need to be done to make the examples more accessible?
1. **Add a README**
   - Right now there’s no README in the repo root; without the blog post, it’s not self-explanatory. :contentReference[oaicite:15]{index=15}
2. **Make `npm test` “just work” by starting the server automatically**
   - Add Playwright `webServer` config (or a `start-server-and-test` script) so users don’t need two terminals or guess that port 5173 must be running. (Today tests assume `http://localhost:5173` is already up.) :contentReference[oaicite:16]{index=16}
3. **Add a “generate HTML coverage report” step**
   - The repo collects raw coverage JSON, but doesn’t include a script/tooling to convert it into HTML/LCOV (e.g., v8-to-istanbul + nyc) even though that’s the typical “next step” users expect. :contentReference[oaicite:17]{index=17}
4. **Reformat source files**
   - Many files are committed as single-line/minified (package.json, config, JS/TS), which makes copying/learning harder. :contentReference[oaicite:18]{index=18}
5. **Add a CI workflow**
   - A simple GitHub Actions workflow running Chromium tests would make it easier to validate the example and reuse it.
6. **(Optional) Clarify relation to Currents**
   - This repo is “for the blog article”; it doesn’t show uploading coverage to Currents. A README note like “this repo demonstrates collection; see X for Currents ingestion” would prevent confusion. :contentReference[oaicite:19]{index=19}
