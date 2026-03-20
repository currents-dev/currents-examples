# Raw V8 coverage — developer notes (Currents)

Use this folder to exercise Playwright’s Chromium `page.coverage` flow alongside **Currents [code coverage](https://docs.currents.dev/guides/coverage)**. The app is served as static files; tests assume `http://localhost:5173`.

## Prerequisites

- Node.js and npm
- A Currents project with [record key](https://docs.currents.dev/guides/record-key) and [project ID](https://docs.currents.dev/dashboard/projects/project-settings) (only if you are sending results to Currents)

## Run locally (coverage files only)

1. `npm install`
2. In one terminal: `npm run dev` (serves the app on port **5173**)
3. In another: `npm test` (`playwright test --project=chromium`)

On success, the spec writes raw V8 payloads under `coverage/raw/` (e.g. `js.json`, `css.json`; invalid-path cases may emit `*-invalid.json`). Checked-in files in that directory are sample output, not a required step.

**Note:** `playwright.config.ts` is Chromium-only on purpose (`page.coverage` is not available on Firefox/WebKit).

## Wire up Currents (not included in this minimal config)

This example ships with plain Playwright. To report to Currents, mirror the setup in [`../instrumented-coverage/`](../instrumented-coverage/):

1. Add `@currents/playwright` (and `dotenv` if you load env from a file).
2. Set `CURRENTS_RECORD_KEY` and `CURRENTS_PROJECT_ID` in the environment (or `.env` for local runs).
3. Extend `defineConfig` with `CurrentsFixtures` / `CurrentsWorkerFixtures`, register `currentsReporter(...)`, and pass `currentsConfigOptions` including `coverage` (e.g. `coverage: { projects: true }` as in the instrumented example).
4. Set `use.baseURL` to `http://localhost:5173` so it matches `npm run dev`.

For CLI/orchestrated runs, use the same `pwc` / `pwc-p` patterns described in the instrumented example README and the [Playwright + Currents](https://docs.currents.dev/getting-started/playwright/you-first-playwright-run) docs.

## CI

- Export `CURRENTS_RECORD_KEY` and `CURRENTS_PROJECT_ID` as protected variables or secrets.
- Start the static server before tests (same as local two-terminal flow), or add a `webServer` block in `playwright.config.ts` that runs `npm run dev` and waits on port 5173 so a single `playwright test` (or `pwc`) command is enough.

## Reference

- [Code coverage guide](https://docs.currents.dev/guides/coverage)
- Sibling example with Currents already wired: [`playwright/code-coverage/instrumented-coverage`](../instrumented-coverage/)

## Licence

MIT License
