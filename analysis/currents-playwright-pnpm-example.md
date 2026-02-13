# Repo audit — `currents-playwright-pnpm-example`

- **Link to the repository:** https://github.com/currents-dev/currents-playwright-pnpm-example :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest commits are on **Mar 17, 2025** (all authored by `agoldis`; no bot/dependabot entries shown on the commits page). :contentReference[oaicite:1]{index=1}

## What is it for?
An example repo showing how to run **Playwright tests with Currents + Chromatic** using **pnpm** on **GitHub Actions**:
- Currents records the test run (via `pwc-p` / orchestration).
- Chromatic runs as a separate job to collect visual testing artifacts from Playwright outputs. :contentReference[oaicite:2]{index=2}

## How is it used?
- **Setup (local):** `pnpm install`. :contentReference[oaicite:3]{index=3}
- **Run locally (Currents Orchestration):**
  - `CURRENTS_RECORD_KEY=xxx CURRENTS_PROJECT_ID=yyy pnpm exec pwc-p` :contentReference[oaicite:4]{index=4}
- **GitHub Actions:**
  - Workflow uses `pnpm/action-setup@v4` (pnpm v9) + caching + installs Chromium. :contentReference[oaicite:5]{index=5}
  - Runs `pnpm exec pwc-p --reporter blob`, then merges blob results into an HTML report via `playwright merge-reports`. :contentReference[oaicite:6]{index=6}
  - Uploads artifacts, then a second job runs `chromaui/action@latest` with `playwright: true` using downloaded artifacts. :contentReference[oaicite:7]{index=7}
- **Config wiring:**
  - Playwright uses reporters `[["blob"], currentsReporter()]`. :contentReference[oaicite:8]{index=8}
  - Currents config reads `CURRENTS_PROJECT_ID` / `CURRENTS_RECORD_KEY`, sets `outputFile`, and enables orchestration `skipReporterInjection: true`. :contentReference[oaicite:9]{index=9}

## What examples are provided?
- **End-to-end GitHub Actions pipeline**
  - `.github/workflows/integration.yml` demonstrating:
    - orchestration via `pwc-p`
    - blob reporter + HTML merge
    - artifact upload/download between jobs
    - Chromatic job consuming Playwright artifacts :contentReference[oaicite:10]{index=10}
- **Minimal Playwright test suite**
  - `test-a.spec.ts` (and `test-b/c/d.spec.ts` in the repo) basic navigation/title assertions. :contentReference[oaicite:11]{index=11}
  - `base.ts` shows tests are using Chromatic’s Playwright wrapper (`@chromatic-com/playwright`). :contentReference[oaicite:12]{index=12}
- **Minimal configs**
  - `playwright.config.ts` (Chromium-only, artifacts on, blob + Currents reporters). :contentReference[oaicite:13]{index=13}
  - `currents.config.ts` (env-driven config, output JSON file). :contentReference[oaicite:14]{index=14}
- **Dependencies demonstrating the integration**
  - `@chromatic-com/playwright`, `chromatic`, `@currents/playwright`, `@playwright/test`. :contentReference[oaicite:15]{index=15}

## What changes need to be done to make the examples more accessible?
1. **Stop hardcoding `CURRENTS_PROJECT_ID` in CI**
   - Workflow currently sets `CURRENTS_PROJECT_ID: mdXsz8` inline; move it to repo secrets/variables and document it. :contentReference[oaicite:16]{index=16}
2. **Make `currents.config.ts` fail fast**
   - It defaults to `"xx"` / `"yy"` when env vars are missing; better to throw a clear error so users don’t “successfully” run with invalid IDs. :contentReference[oaicite:17]{index=17}
3. **Add proper pnpm scripts**
   - `package.json` still has a placeholder `test` script; add `test:pwc-p`, `test:shard`, `report:html`, etc. so users can copy/paste without reading CI YAML. :contentReference[oaicite:18]{index=18}
4. **Reformat the repo files**
   - README/configs/workflow are committed as single-line blobs (hard to read/edit); pretty-print them. :contentReference[oaicite:19]{index=19}
5. **Document the “why” of the two-job design**
   - Add a short README section explaining: `pwc-p` produces blobs → merge reports → upload artifacts → Chromatic consumes them, and what folder (`test-results/chromatic-archives`) is expected. :contentReference[oaicite:20]{index=20}
