# Repo audit — `currents-playwright-coverage-example`

- **Link to the repository:** https://github.com/currents-dev/currents-playwright-coverage-example (GitHub) :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest **automated** change is a Dependabot bump on **Jul 22, 2025** (excluded). :contentReference[oaicite:1]{index=1}
- Latest **non-bot** change is **Feb 12, 2025** (merge + fixes like “install dotenv” / “update config file according to documentation”). :contentReference[oaicite:2]{index=2}

## What is it for?
A Next.js + Playwright example that demonstrates **collecting code coverage** (instrumented via Babel/Istanbul) and **sending coverage + test results to Currents** for post-processing. :contentReference[oaicite:3]{index=3}

## How is it used?
- Install deps: `npm install`. :contentReference[oaicite:4]{index=4}
- Provide Currents credentials (recommended via env vars):
  - `CURRENTS_RECORD_KEY`
  - `CURRENTS_PROJECT_ID` :contentReference[oaicite:5]{index=5}
- Run one of the provided scripts:
  - `npm test` → starts Next dev server + runs `playwright test`. :contentReference[oaicite:6]{index=6}
  - `npm run test:e2e` → starts Next dev server + runs `pwc`. :contentReference[oaicite:7]{index=7}
  - `npm run test:e2e:pwc-p` → starts Next dev server + runs `pwc-p` (orchestrated). :contentReference[oaicite:8]{index=8}
- Coverage plumbing:
  - App is instrumented through Babel with `babel-plugin-istanbul`. :contentReference[oaicite:9]{index=9}
  - Playwright config uses Currents reporter + Currents fixtures config (`currentsConfigOptions`) and enables coverage with `coverage: { projects: true }`. :contentReference[oaicite:10]{index=10}
  - Docs describe using Currents “coverage fixtures” in Playwright tests to attach coverage to runs. :contentReference[oaicite:11]{index=11}

## What examples are provided?
- **Runnable scripts** showing 3 execution modes:
  - `playwright`, `pwc`, and `pwc-p` (all via `start-server-and-test` against `http://localhost:3000`). :contentReference[oaicite:12]{index=12}
- **Instrumentation configs**
  - `babel.config.js` uses the `istanbul` plugin. :contentReference[oaicite:13]{index=13}
  - `nyc.config.js` shows a minimal NYC config (exclude Next build output, report formats). :contentReference[oaicite:14]{index=14}
- **Currents + Playwright wiring**
  - `playwright.config.ts` includes `dotenv` loading, Currents reporter, and Currents coverage config. :contentReference[oaicite:15]{index=15}
- **Project structure indicating what’s included**
  - Next.js app folders (`app/`, `content/`, `public/`) plus `tests/e2e/` in the repo tree. :contentReference[oaicite:16]{index=16}
- **Docs-backed reference**
  - Currents documentation points to this repo as the “NextJS + Babel Example” for Playwright coverage. :contentReference[oaicite:17]{index=17}

## What changes need to be done to make the examples more accessible?
1. **Stop telling users to edit `playwright.config.ts` for secrets**
   - README says “Update `playwright.config.ts` with record key and project id”, but the config already supports env vars; switch README to env-only and add `.env.example`. :contentReference[oaicite:18]{index=18}
2. **Fail fast instead of using placeholders**
   - Current defaults fall back to `"your-record-key"` / `"your-project-id"`, which can silently send confusing runs; throw a clear error if missing. :contentReference[oaicite:19]{index=19}
3. **Reformat files**
   - Several key files are committed as single-line blobs (config/scripts), making copying/learning harder; pretty-print `playwright.config.ts`, `package.json`, etc. :contentReference[oaicite:20]{index=20}
4. **Add a “Coverage flow” section (local + CI)**
   - Explicitly document: where coverage is collected (`window.__coverage__` / fixtures), what gets uploaded, and how to view coverage in Currents (link the docs section). :contentReference[oaicite:21]{index=21}
5. **Provide a CI workflow**
   - Add a minimal GitHub Actions example that runs `npm test` (or `test:e2e:pwc-p`) with required secrets; most users will copy from CI-first examples.
6. **Clarify browser expectations**
   - The config runs Chromium/Firefox/WebKit; coverage instrumentation can behave differently across browsers—call out the intended supported matrix (or restrict to the supported one for coverage if needed). :contentReference[oaicite:22]{index=22}
