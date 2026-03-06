# Playwright Instrumented Coverage

- **Framework:** `playwright`
- **Use case:** `features/coverage`
- **Source repository:** https://github.com/currents-dev/currents-playwright-coverage-example

## What this example does

A Next.js + Playwright example that demonstrates **collecting code coverage** (instrumented via Babel/Istanbul) and **sending coverage + test results to Currents** for post-processing.

## How this example is used

- Install deps: `npm install`.
- Provide Currents credentials (recommended via env vars):
  - `CURRENTS_RECORD_KEY`
  - `CURRENTS_PROJECT_ID`
- Run one of the provided scripts:
  - `npm test` → starts Next dev server + runs `playwright test`.
  - `npm run test:e2e` → starts Next dev server + runs `pwc`.
  - `npm run test:e2e:pwc-p` → starts Next dev server + runs `pwc-p` (orchestrated).
- Coverage plumbing:
  - App is instrumented through Babel with `babel-plugin-istanbul`.
  - Playwright config uses Currents reporter + Currents fixtures config (`currentsConfigOptions`) and enables coverage with `coverage: { projects: true }`.
  - Docs describe using Currents “coverage fixtures” in Playwright tests to attach coverage to runs.

## What scenarios are included

- **Runnable scripts** showing 3 execution modes:
  - `playwright`, `pwc`, and `pwc-p` (all via `start-server-and-test` against `http://localhost:3000`).
- **Instrumentation configs**
  - `babel.config.js` uses the `istanbul` plugin.
  - `nyc.config.js` shows a minimal NYC config (exclude Next build output, report formats).
- **Currents + Playwright wiring**
  - `playwright.config.ts` includes `dotenv` loading, Currents reporter, and Currents coverage config.
- **Project structure indicating what’s included**
  - Next.js app folders (`app/`, `content/`, `public/`) plus `tests/e2e/` in the repo tree.
- **Docs-backed reference**
  - Currents documentation points to this repo as the “NextJS + Babel Example” for Playwright coverage.

## How to implement this in your own project

1. Start from the copied source markdown files in this folder and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the source docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the source docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Stop telling users to edit `playwright.config.ts` for secrets**
   - README says “Update `playwright.config.ts` with record key and project id”, but the config already supports env vars; switch README to env-only and add `.env.example`.
2. **Fail fast instead of using placeholders**
   - Current defaults fall back to `"your-record-key"` / `"your-project-id"`, which can silently send confusing runs; throw a clear error if missing.
3. **Reformat files**
   - Several key files are committed as single-line blobs (config/scripts), making copying/learning harder; pretty-print `playwright.config.ts`, `package.json`, etc.
4. **Add a “Coverage flow” section (local + CI)**
   - Explicitly document: where coverage is collected (`window.__coverage__` / fixtures), what gets uploaded, and how to view coverage in Currents (link the docs section).
5. **Provide a CI workflow**
   - Add a minimal GitHub Actions example that runs `npm test` (or `test:e2e:pwc-p`) with required secrets; most users will copy from CI-first examples.
6. **Clarify browser expectations**
   - The config runs Chromium/Firefox/WebKit; coverage instrumentation can behave differently across browsers—call out the intended supported matrix (or restrict to the supported one for coverage if needed).

## Source markdown copied into this folder

- [`source__README.md`](source__README.md)

## Repository content copied into this folder

- Total tracked files copied: **55**
- Source `README.md` is saved as `README.upstream.md`.
- Path mapping: [`content-map.md`](content-map.md)


![currents-2024-11-21-16 21 20@2x](https://github.com/user-attachments/assets/2e2fb1da-31fa-43a7-b84e-670ce1b88c09)
