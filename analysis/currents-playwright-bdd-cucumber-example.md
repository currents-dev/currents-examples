# Repo audit — `currents-playwright-bdd-cucumber-example`

- **Link to the repository:** https://github.com/currents-dev/currents-playwright-bdd-cucumber-example ([github.com](https://github.com/currents-dev/currents-playwright-bdd-cucumber-example))

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest **non-bot** changes are on **Jan 24, 2024** (“Update README.md” + “Add documentation”). ([github.com](https://github.com/currents-dev/currents-playwright-bdd-cucumber-example/commits/main/))

## What is it for?
A working example of **Playwright + BDD (Gherkin/Cucumber-style)** using **playwright-bdd**, with results reported to **Currents** via `@currents/playwright`. ([raw.githubusercontent.com](https://raw.githubusercontent.com/currents-dev/currents-playwright-bdd-cucumber-example/main/README.md))

## How is it used?
1. Create a Currents org/project and obtain **Record Key** + **Project Id**. ([raw.githubusercontent.com](https://raw.githubusercontent.com/currents-dev/currents-playwright-bdd-cucumber-example/main/README.md))
2. Install dependencies and browsers:
   - `npm install`
   - `npx playwright install` ([raw.githubusercontent.com](https://raw.githubusercontent.com/currents-dev/currents-playwright-bdd-cucumber-example/main/README.md))
3. Configure Currents reporting in `playwright.config.ts` (currently includes placeholders for `recordKey` and `projectId`). ([raw.githubusercontent.com](https://raw.githubusercontent.com/currents-dev/currents-playwright-bdd-cucumber-example/main/playwright.config.ts))
4. Run:
   - `npm test` (runs `bddgen` then `playwright test`). ([raw.githubusercontent.com](https://raw.githubusercontent.com/currents-dev/currents-playwright-bdd-cucumber-example/main/package.json))

## What examples are provided?
### BDD feature files
- `features/homepage.feature` (includes an intentionally failing assertion: expects “Oh no!” title on API reference). ([raw.githubusercontent.com](https://raw.githubusercontent.com/currents-dev/currents-playwright-bdd-cucumber-example/main/features/homepage.feature))
- `features/todopage.feature` (todo flow scenarios; includes a screenshot comparison step). ([raw.githubusercontent.com](https://raw.githubusercontent.com/currents-dev/currents-playwright-bdd-cucumber-example/main/features/todopage.feature))

### Currents + Playwright wiring
- `playwright.config.ts`:
  - uses `@currents/playwright` reporter
  - enables artifacts (trace/screenshot on failure)
  - defines Chromium + Firefox projects
  - uses `defineBddConfig` to generate tests from feature files. ([raw.githubusercontent.com](https://raw.githubusercontent.com/currents-dev/currents-playwright-bdd-cucumber-example/main/playwright.config.ts))

### Useful scripts
- `test`, `test:todo` (tag-based), `test:chromium`, watch mode, and `steps` export. ([raw.githubusercontent.com](https://raw.githubusercontent.com/currents-dev/currents-playwright-bdd-cucumber-example/main/package.json))

### Tag → browser behavior
- `steps/fixtures.ts` skips tests tagged `@firefox` unless the current Playwright project is Firefox. ([raw.githubusercontent.com](https://raw.githubusercontent.com/currents-dev/currents-playwright-bdd-cucumber-example/main/steps/fixtures.ts))

## What changes need to be done to make the examples more accessible?
1. **Move secrets to env vars**
   - Replace placeholders in `playwright.config.ts` with `process.env.CURRENTS_RECORD_KEY` / `process.env.CURRENTS_PROJECT_ID`.
   - Add `.env.example` and document it. ([raw.githubusercontent.com](https://raw.githubusercontent.com/currents-dev/currents-playwright-bdd-cucumber-example/main/playwright.config.ts))
2. **Make CI build ID deterministic in CI**
   - `ciBuildId: Date.now().toString()` is fine locally, but in CI it’s better to use the CI run/build id when available (GitHub Actions / Jenkins / etc.). ([raw.githubusercontent.com](https://raw.githubusercontent.com/currents-dev/currents-playwright-bdd-cucumber-example/main/playwright.config.ts))
3. **Clarify the intentional failure**
   - README says one test fails intentionally; add which scenario and why, so users don’t think setup is broken. ([raw.githubusercontent.com](https://raw.githubusercontent.com/currents-dev/currents-playwright-bdd-cucumber-example/main/README.md))
4. **Add a copy/paste Quickstart**
   - Install → set env vars → run `npm test` → where to see results in Currents.
5. **Clarify `baseURL` expectations**
   - Config sets `baseURL: http://localhost:3000`; add a note about what should be running there (or adjust baseURL to match the intended demo target). ([raw.githubusercontent.com](https://raw.githubusercontent.com/currents-dev/currents-playwright-bdd-cucumber-example/main/playwright.config.ts))
