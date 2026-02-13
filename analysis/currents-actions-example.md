# Repo audit — `currents-actions-example`

- **Link to the repository:** https://github.com/currents-dev/currents-actions-example (GitHub) :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest **automated** change: **Jul 22, 2025** (Dependabot bump) — excluded. :contentReference[oaicite:1]{index=1}
- Latest **non-bot** changes: **Dec 13, 2024** (multiple commits + merges by `twk3`, including “Rename rules to actions” and README updates). :contentReference[oaicite:2]{index=2}

## What is it for?
An example Playwright project showing how to use **Currents Actions** via **Currents Playwright fixtures** (“different ways to configure the Currents Playwright fixtures to apply Actions”). :contentReference[oaicite:3]{index=3}

## How is it used?
- Setup flow described in README:
  - `npm install`
  - update `playwright.config.ts` with Currents **record key** and **project id**
  - run `npm run test` to execute Playwright tests, apply Currents Actions, and send results to Currents. :contentReference[oaicite:4]{index=4}
- Actions themselves are created in the Currents Dashboard (README links to the Currents docs section on creating rules/actions). :contentReference[oaicite:5]{index=5}
- Currents Actions (docs): “Actions Engine” lets you trigger automated testing workflows (e.g., conditionally skip/quarantine tests). :contentReference[oaicite:6]{index=6}

## What examples are provided?
The repo README explicitly lists 3 runnable variants: :contentReference[oaicite:7]{index=7}
- `npm run test` — use `playwright test` with Currents loaded as a reporter
- `npm run test:pwc` — use `pwc`
- `npm run test:pwc-p` — orchestrated runs
Also, the repository layout shows:
- `.github/workflows/` (CI examples)
- `basic/` (likely the fixture/action examples)
- `playwright.config.ts` and `playwright.config.reporter.ts` (two configuration approaches). :contentReference[oaicite:8]{index=8}

## What changes need to be done to make the examples more accessible?
1. **Make the README a real README (it’s effectively one long line in raw form)**
   - The GitHub-rendered README is readable, but the raw file is near-unusable for copying/editing. Reformat with sections + fenced code blocks. :contentReference[oaicite:9]{index=9}
2. **Stop telling users to edit `playwright.config.ts` directly for secrets**
   - Provide `.env.example` + document env vars (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`, optional `CURRENTS_CI_BUILD_ID`), and read them in config. README currently instructs “Update playwright.config.ts with record key and project id”. :contentReference[oaicite:10]{index=10}
3. **Add explicit “Actions fixture wiring” snippet**
   - Link to Currents “Playwright Fixtures” docs and show the exact code users should copy to extend Playwright `test` with Currents fixtures for Actions. :contentReference[oaicite:11]{index=11}
4. **Document what’s inside `basic/`**
   - Add a short list of what `basic/` contains (fixture file names + what each example demonstrates) and how it maps to the 3 npm scripts. Right now users only see the folder exists. :contentReference[oaicite:12]{index=12}
5. **Expose CI workflows in the README**
   - The repo has `.github/workflows/` but README doesn’t link to specific workflow files. Add direct links + explain which workflow runs which variant. :contentReference[oaicite:13]{index=13}
6. **Add a “verify it works” checklist**
   - Example: “create one simple action in Currents (e.g., skip tagged tests), run locally, confirm in dashboard screenshot”. README already includes screenshots—just add a step-by-step verification path. :contentReference[oaicite:14]{index=14}
