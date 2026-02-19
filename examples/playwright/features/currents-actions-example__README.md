# currents-actions-example

- **Framework:** `playwright`
- **Use case:** `features/actions`
- **Source repository:** https://github.com/currents-dev/currents-actions-example

## What this example does

An example Playwright project showing how to use **Currents Actions** via **Currents Playwright fixtures** (“different ways to configure the Currents Playwright fixtures to apply Actions”).

## How this example is used

- Setup flow described in README:
  - `npm install`
  - update `playwright.config.ts` with Currents **record key** and **project id**
  - run `npm run test` to execute Playwright tests, apply Currents Actions, and send results to Currents.
- Actions themselves are created in the Currents Dashboard (README links to the Currents docs section on creating rules/actions).
- Currents Actions (docs): “Actions Engine” lets you trigger automated testing workflows (e.g., conditionally skip/quarantine tests).

## What scenarios are included

The repo README explicitly lists 3 runnable variants:
- `npm run test` — use `playwright test` with Currents loaded as a reporter
- `npm run test:pwc` — use `pwc`
- `npm run test:pwc-p` — orchestrated runs
Also, the repository layout shows:
- `.github/workflows/` (CI examples)
- `basic/` (likely the fixture/action examples)
- `playwright.config.ts` and `playwright.config.reporter.ts` (two configuration approaches).

## How to implement this in your own project

1. Start from the copied source markdown files in this folder and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the source docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the source docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Make the README a real README (it’s effectively one long line in raw form)**
   - The GitHub-rendered README is readable, but the raw file is near-unusable for copying/editing. Reformat with sections + fenced code blocks.
2. **Stop telling users to edit `playwright.config.ts` directly for secrets**
   - Provide `.env.example` + document env vars (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`, optional `CURRENTS_CI_BUILD_ID`), and read them in config. README currently instructs “Update playwright.config.ts with record key and project id”.
3. **Add explicit “Actions fixture wiring” snippet**
   - Link to Currents “Playwright Fixtures” docs and show the exact code users should copy to extend Playwright `test` with Currents fixtures for Actions.
4. **Document what’s inside `basic/`**
   - Add a short list of what `basic/` contains (fixture file names + what each example demonstrates) and how it maps to the 3 npm scripts. Right now users only see the folder exists.
5. **Expose CI workflows in the README**
   - The repo has `.github/workflows/` but README doesn’t link to specific workflow files. Add direct links + explain which workflow runs which variant.
6. **Add a “verify it works” checklist**
   - Example: “create one simple action in Currents (e.g., skip tagged tests), run locally, confirm in dashboard screenshot”. README already includes screenshots—just add a step-by-step verification path.

## Source markdown copied into this folder

- [`currents-actions-example__source__README.md`](currents-actions-example__source__README.md)

## Repository content copied into this folder

- Total files copied from `currents-actions-example`: **14**
- Mapping file: [`currents-actions-example__content-map.md`](currents-actions-example__content-map.md)
- All copied files use the prefix pattern `currents-actions-example__content__*`.
