# Repo audit — `currents-pnpm`

- **Link to the repository:** https://github.com/currents-dev/currents-pnpm ([github.com](https://github.com/currents-dev/currents-pnpm))

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest **non-bot** changes are on **Nov 15, 2024** (“Playwright example” + merge of PR #2). :contentReference[oaicite:0]{index=0}  
- I don’t see any Dependabot/bot commits in the history shown. :contentReference[oaicite:1]{index=1}

## What is it for?
A minimal example repo demonstrating **Currents + Playwright + pnpm**: install deps with pnpm and run Playwright tests while reporting to Currents via `@currents/playwright`. :contentReference[oaicite:2]{index=2}

## How is it used?
- Install: `pnpm install`. :contentReference[oaicite:3]{index=3}
- Run tests with env vars:
  - `CURRENTS_RECORD_KEY=<record-key>`
  - `CURRENTS_PROJECT_ID=<project-id>`
  - then run Playwright (README shows `npx playwright test`). :contentReference[oaicite:4]{index=4}
- Reporting:
  - `playwright.config.ts` configures the Currents reporter with `reporter: [currentsReporter()]`. :contentReference[oaicite:5]{index=5}
  - `currents.config.ts` pulls `recordKey` and `projectId` from env. :contentReference[oaicite:6]{index=6}

## What examples are provided?
- **Currents Playwright wiring**
  - `playwright.config.ts` with Currents reporter + artifacts (trace/screenshot/video) enabled. :contentReference[oaicite:7]{index=7}
  - `currents.config.ts` env-driven Currents config. :contentReference[oaicite:8]{index=8}
- **pnpm lockfile** (`pnpm-lock.yaml`) and minimal dependencies showing required packages. :contentReference[oaicite:9]{index=9}
- A `test/` folder exists in the repo tree, intended to hold example Playwright tests, but GitHub’s page content didn’t expose the file list in this audit view. :contentReference[oaicite:10]{index=10}

## What changes need to be done to make the examples more accessible?
1. **Improve README into a real quickstart**
   - Add: prerequisites (Node/pnpm), where to get Currents keys, and exact commands (pnpm-first, not `npx`), plus what success looks like in Currents. Current README is extremely minimal. :contentReference[oaicite:11]{index=11}
2. **Add `package.json` scripts**
   - Provide `test`, `test:pwc`, `test:pwc-p` (if relevant) so users don’t need to remember commands. Current `package.json` has no scripts. :contentReference[oaicite:12]{index=12}
3. **Fail fast on missing env vars**
   - `currents.config.ts` defaults to empty strings; add a clear error message if `CURRENTS_RECORD_KEY` / `CURRENTS_PROJECT_ID` are missing. :contentReference[oaicite:13]{index=13}
4. **Reformat source files**
   - README/configs are committed as single-line blobs, which makes them hard to copy/edit. :contentReference[oaicite:14]{index=14}
5. **Make the example tests discoverable**
   - Ensure `test/` contains 1–2 very small specs and link them explicitly from the README (and/or rename to `tests/` to match common Playwright conventions). :contentReference[oaicite:15]{index=15}
6. **Add `.env.example`**
   - Provide a copy/paste template: `CURRENTS_RECORD_KEY=...` and `CURRENTS_PROJECT_ID=...`, and mention dotenv usage if you want local `.env` support.

