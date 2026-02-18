# currents-playwright-pnpm-example

- **Framework:** `playwright`
- **Use case:** `workspace/pnpm`
- **Source repository:** https://github.com/currents-dev/currents-playwright-pnpm-example

## What this example does

An example repo showing how to run **Playwright tests with Currents + Chromatic** using **pnpm** on **GitHub Actions**:
- Currents records the test run (via `pwc-p` / orchestration).
- Chromatic runs as a separate job to collect visual testing artifacts from Playwright outputs.

## How this example is used

- **Setup (local):** `pnpm install`.
- **Run locally (Currents Orchestration):**
  - `CURRENTS_RECORD_KEY=xxx CURRENTS_PROJECT_ID=yyy pnpm exec pwc-p`
- **GitHub Actions:**
  - Workflow uses `pnpm/action-setup@v4` (pnpm v9) + caching + installs Chromium.
  - Runs `pnpm exec pwc-p --reporter blob`, then merges blob results into an HTML report via `playwright merge-reports`.
  - Uploads artifacts, then a second job runs `chromaui/action@latest` with `playwright: true` using downloaded artifacts.
- **Config wiring:**
  - Playwright uses reporters `[["blob"], currentsReporter()]`.
  - Currents config reads `CURRENTS_PROJECT_ID` / `CURRENTS_RECORD_KEY`, sets `outputFile`, and enables orchestration `skipReporterInjection: true`.

## What scenarios are included

- **End-to-end GitHub Actions pipeline**
  - `.github/workflows/integration.yml` demonstrating:
    - orchestration via `pwc-p`
    - blob reporter + HTML merge
    - artifact upload/download between jobs
    - Chromatic job consuming Playwright artifacts
- **Minimal Playwright test suite**
  - `test-a.spec.ts` (and `test-b/c/d.spec.ts` in the repo) basic navigation/title assertions.
  - `base.ts` shows tests are using Chromatic’s Playwright wrapper (`@chromatic-com/playwright`).
- **Minimal configs**
  - `playwright.config.ts` (Chromium-only, artifacts on, blob + Currents reporters).
  - `currents.config.ts` (env-driven config, output JSON file).
- **Dependencies demonstrating the integration**
  - `@chromatic-com/playwright`, `chromatic`, `@currents/playwright`, `@playwright/test`.

## How to implement this in your own project

1. Start from the upstream markdown docs copied in this folder (`upstream/`) and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the upstream docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the upstream docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Stop hardcoding `CURRENTS_PROJECT_ID` in CI**
   - Workflow currently sets `CURRENTS_PROJECT_ID: mdXsz8` inline; move it to repo secrets/variables and document it.
2. **Make `currents.config.ts` fail fast**
   - It defaults to `"xx"` / `"yy"` when env vars are missing; better to throw a clear error so users don’t “successfully” run with invalid IDs.
3. **Add proper pnpm scripts**
   - `package.json` still has a placeholder `test` script; add `test:pwc-p`, `test:shard`, `report:html`, etc. so users can copy/paste without reading CI YAML.
4. **Reformat the repo files**
   - README/configs/workflow are committed as single-line blobs (hard to read/edit); pretty-print them.
5. **Document the “why” of the two-job design**
   - Add a short README section explaining: `pwc-p` produces blobs → merge reports → upload artifacts → Chromatic consumes them, and what folder (`test-results/chromatic-archives`) is expected.

## Upstream markdown copied into this folder

- [`upstream/README.md`](upstream/README.md)
