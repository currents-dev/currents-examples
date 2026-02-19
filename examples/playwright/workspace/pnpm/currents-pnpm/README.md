# currents-pnpm

- **Framework:** `playwright`
- **Use case:** `workspace/pnpm`
- **Source repository:** https://github.com/currents-dev/currents-pnpm

## What this example does

A minimal example repo demonstrating **Currents + Playwright + pnpm**: install deps with pnpm and run Playwright tests while reporting to Currents via `@currents/playwright`.

## How this example is used

- Install: `pnpm install`.
- Run tests with env vars:
  - `CURRENTS_RECORD_KEY=<record-key>`
  - `CURRENTS_PROJECT_ID=<project-id>`
  - then run Playwright (README shows `npx playwright test`).
- Reporting:
  - `playwright.config.ts` configures the Currents reporter with `reporter: [currentsReporter()]`.
  - `currents.config.ts` pulls `recordKey` and `projectId` from env.

## What scenarios are included

- **Currents Playwright wiring**
  - `playwright.config.ts` with Currents reporter + artifacts (trace/screenshot/video) enabled.
  - `currents.config.ts` env-driven Currents config.
- **pnpm lockfile** (`pnpm-lock.yaml`) and minimal dependencies showing required packages.
- A `test/` folder exists in the repo tree, intended to hold example Playwright tests, but GitHub’s page content didn’t expose the file list in this audit view.

## How to implement this in your own project

1. Start from the copied source markdown files in this folder and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the source docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the source docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Improve README into a real quickstart**
   - Add: prerequisites (Node/pnpm), where to get Currents keys, and exact commands (pnpm-first, not `npx`), plus what success looks like in Currents. Current README is extremely minimal.
2. **Add `package.json` scripts**
   - Provide `test`, `test:pwc`, `test:pwc-p` (if relevant) so users don’t need to remember commands. Current `package.json` has no scripts.
3. **Fail fast on missing env vars**
   - `currents.config.ts` defaults to empty strings; add a clear error message if `CURRENTS_RECORD_KEY` / `CURRENTS_PROJECT_ID` are missing.
4. **Reformat source files**
   - README/configs are committed as single-line blobs, which makes them hard to copy/edit.
5. **Make the example tests discoverable**
   - Ensure `test/` contains 1–2 very small specs and link them explicitly from the README (and/or rename to `tests/` to match common Playwright conventions).
6. **Add `.env.example`**
   - Provide a copy/paste template: `CURRENTS_RECORD_KEY=...` and `CURRENTS_PROJECT_ID=...`, and mention dotenv usage if you want local `.env` support.

## Source markdown copied into this folder

- [`source__README.md`](source__README.md)
