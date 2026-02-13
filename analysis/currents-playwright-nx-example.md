# Repo audit — `currents-playwright-nx-example`

- **Link to the repository:** https://github.com/currents-dev/currents-playwright-nx-example :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- The most recent commits in 2025 are dependency bumps and Dependabot-related merges (excluded). :contentReference[oaicite:1]{index=1}  
- Latest clearly **non-Dependabot / non-automated** change: **Nov 26, 2024** (merge PR adding the “single project orchestration” work, immediately preceded by the feature commit on **Nov 25, 2024**). :contentReference[oaicite:2]{index=2}

## What is it for?
An example Nx monorepo showing how to run **Playwright E2E tests in Nx** while reporting results to **Currents** using `@currents/playwright` as the Playwright reporter. :contentReference[oaicite:3]{index=3}

## How is it used?
### Standard Nx E2E (2 projects in parallel)
Run Nx `run-many` for the `e2e` target across multiple projects, passing Currents env vars:
- `CURRENTS_RECORD_KEY`
- `CURRENTS_PROJECT_ID`
- `CURRENTS_CI_BUILD_ID` :contentReference[oaicite:4]{index=4}

Command shown in README:
- `nx run-many -t e2e --parallel=2 --verbose` :contentReference[oaicite:5]{index=5}

Each project’s `e2e` target uses the Nx Playwright executor and overrides the output directory:
- executor: `@nx/playwright:playwright`
- output: `{workspaceRoot}/playwright-report/{projectName}`
- config: `{projectRoot}/playwright.config.ts` :contentReference[oaicite:6]{index=6}

### Single-project orchestration (pwc-p)
There’s a third project (`e2e-03`) that uses a different Nx target (`or8n`) that runs `npx pwc-p` (Currents orchestration command) via `nx:run-commands`. :contentReference[oaicite:7]{index=7}

README command:
- `nx run-many -t or8n` (single project, no `--parallel` needed) :contentReference[oaicite:8]{index=8}

A GitHub Actions workflow example exists for running the `or8n` target across shards. :contentReference[oaicite:9]{index=9}

## What examples are provided?
- **Nx + Playwright + Currents reporter wiring**
  - Root reporter: `currentsReporter(currents.config)` and exported `reporter`. :contentReference[oaicite:10]{index=10}
  - Per-project Playwright configs use `nxE2EPreset(__filename)` and import the shared `reporter`. :contentReference[oaicite:11]{index=11}
- **Multiple Nx Playwright projects**
  - `apps/e2e-01` + `apps/e2e-02` with `e2e` target configured via `@nx/playwright:playwright`. :contentReference[oaicite:12]{index=12}
  - `apps/e2e-03` with `or8n` target running `npx pwc-p`. :contentReference[oaicite:13]{index=13}
- **Output directory pattern**
  - Example output folder layout under `playwright-report/{projectName}` including `.last-run.json`. :contentReference[oaicite:14]{index=14}
- **“Last failed” passthrough**
  - Shows Nx passes unknown args to targets (e.g., `--last-failed`). :contentReference[oaicite:15]{index=15}
- **GitHub Actions workflow for orchestration**
  - `.github/workflows/or8n.yml` runs `nx run-many -t or8n` with a shard matrix. :contentReference[oaicite:16]{index=16}

## What changes need to be done to make the examples more accessible?
1. **Reformat the files for readability**
   - Many files render as single-line (README, JSON, configs). Re-indent + add code fences so the repo is skimmable. :contentReference[oaicite:17]{index=17}
2. **Make CI config “production-safe” by default**
   - The workflow sets `CURRENTS_API_URL: https://cy-staging.currents.dev`. Make this optional (documented), default to production, or use a repo variable. :contentReference[oaicite:18]{index=18}
3. **Add `.env.example` + a single “Quickstart” block**
   - Explicitly list required env vars and provide copy/paste commands for:
     - `nx run-many -t e2e ...`
     - `nx run-many -t or8n ...` :contentReference[oaicite:19]{index=19}
4. **Explain what `pwc-p` is and when to use it**
   - README mentions it briefly; add a short “Why orchestration vs Nx/Playwright sharding” section and link to Currents Nx docs. :contentReference[oaicite:20]{index=20}
5. **Add a second workflow for the “normal” e2e target**
   - Right now the repo explicitly references `or8n.yml` for GitHub Actions; add a `e2e.yml` to show the standard `@nx/playwright:playwright` flow too. :contentReference[oaicite:21]{index=21}
6. **Add minimal npm scripts**
   - Even if Nx is the focus, scripts like `npm run e2e` / `npm run or8n` reduce friction for newcomers. (Current `package.json` has no scripts.) :contentReference[oaicite:22]{index=22}
