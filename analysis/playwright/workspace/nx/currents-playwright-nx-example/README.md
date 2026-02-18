# currents-playwright-nx-example

- **Framework:** `playwright`
- **Use case:** `workspace/nx`
- **Source repository:** https://github.com/currents-dev/currents-playwright-nx-example

## What this example does

An example Nx monorepo showing how to run **Playwright E2E tests in Nx** while reporting results to **Currents** using `@currents/playwright` as the Playwright reporter.

## How this example is used

### Standard Nx E2E (2 projects in parallel)
Run Nx `run-many` for the `e2e` target across multiple projects, passing Currents env vars:
- `CURRENTS_RECORD_KEY`
- `CURRENTS_PROJECT_ID`
- `CURRENTS_CI_BUILD_ID`

Command shown in README:
- `nx run-many -t e2e --parallel=2 --verbose`

Each project’s `e2e` target uses the Nx Playwright executor and overrides the output directory:
- executor: `@nx/playwright:playwright`
- output: `{workspaceRoot}/playwright-report/{projectName}`
- config: `{projectRoot}/playwright.config.ts`

### Single-project orchestration (pwc-p)
There’s a third project (`e2e-03`) that uses a different Nx target (`or8n`) that runs `npx pwc-p` (Currents orchestration command) via `nx:run-commands`.

README command:
- `nx run-many -t or8n` (single project, no `--parallel` needed)

A GitHub Actions workflow example exists for running the `or8n` target across shards.

## What scenarios are included

- **Nx + Playwright + Currents reporter wiring**
  - Root reporter: `currentsReporter(currents.config)` and exported `reporter`.
  - Per-project Playwright configs use `nxE2EPreset(__filename)` and import the shared `reporter`.
- **Multiple Nx Playwright projects**
  - `apps/e2e-01` + `apps/e2e-02` with `e2e` target configured via `@nx/playwright:playwright`.
  - `apps/e2e-03` with `or8n` target running `npx pwc-p`.
- **Output directory pattern**
  - Example output folder layout under `playwright-report/{projectName}` including `.last-run.json`.
- **“Last failed” passthrough**
  - Shows Nx passes unknown args to targets (e.g., `--last-failed`).
- **GitHub Actions workflow for orchestration**
  - `.github/workflows/or8n.yml` runs `nx run-many -t or8n` with a shard matrix.

## How to implement this in your own project

1. Start from the upstream markdown docs copied in this folder (`upstream/`) and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the upstream docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the upstream docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Reformat the files for readability**
   - Many files render as single-line (README, JSON, configs). Re-indent + add code fences so the repo is skimmable.
2. **Make CI config “production-safe” by default**
   - The workflow sets `CURRENTS_API_URL: https://cy-staging.currents.dev`. Make this optional (documented), default to production, or use a repo variable.
3. **Add `.env.example` + a single “Quickstart” block**
   - Explicitly list required env vars and provide copy/paste commands for:
     - `nx run-many -t e2e ...`
     - `nx run-many -t or8n ...`
4. **Explain what `pwc-p` is and when to use it**
   - README mentions it briefly; add a short “Why orchestration vs Nx/Playwright sharding” section and link to Currents Nx docs.
5. **Add a second workflow for the “normal” e2e target**
   - Right now the repo explicitly references `or8n.yml` for GitHub Actions; add a `e2e.yml` to show the standard `@nx/playwright:playwright` flow too.
6. **Add minimal npm scripts**
   - Even if Nx is the focus, scripts like `npm run e2e` / `npm run or8n` reduce friction for newcomers. (Current `package.json` has no scripts.)

## Upstream markdown copied into this folder

- [`upstream/README.md`](upstream/README.md)
