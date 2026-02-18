# currents-playwright-orchestration-example

- **Framework:** `playwright`
- **Use case:** `features/orchestration`
- **Source repository:** https://github.com/currents-dev/currents-playwright-orchestration-example

## What this example does

An example repo that demonstrates how **Currents Orchestration** (batched orchestration) can reduce Playwright CI time versus **native Playwright sharding**, using a synthetic suite with mixed test durations and reporting the benchmark numbers in the README.

## How this example is used

- Configure Currents with environment variables:
  - `CURRENTS_RECORD_KEY`
  - `CURRENTS_PROJECT_ID`
  - Optional orchestration batch size via `CURRENTS_BATCH_SIZE` (or CLI `--pwc-batch-size`, or config file).
- Run Playwright with **native sharding** (baseline) using the Playwright config (`workers: 2`, tests under `./tests`).
- Run using **Currents Orchestration** with a chosen batch size (README recommends `batchSize = workers`; config defaults to `batchSize: 2`).  
  (Orchestration conceptually pulls/dispatches tests dynamically; Currents docs recommend using blob reporter + merging when runs are fragmented.)

## What scenarios are included

- **Benchmark comparison (documented in README):**
  - Native sharding: workers=2, machines=5, duration **15m 38s**
  - Batched orchestration: batch size=2, workers=2, machines=5, duration **9m 17s** (~41% faster)
- **Currents config example** with orchestration settings:
  - `currents.config.ts` shows `orchestration.batchSize: 2` and reads keys from env.
- **Playwright config example:**
  - `playwright.config.ts` sets `timeout`, `workers: 2`, `testDir: ./tests`, outputDir `test-results/`.
- **Synthetic suite generator scripts:**
  - `generate-tests.mjs` generates **100** specs with randomized durations (20 long, 30 mid, 50 short) into `./tests`.
  - `generate-tests-edge-case.mjs` generates an “edge case” suite into `./edge-case-tests` (40 long + 40 short).
- **Dependencies** pinned to demonstrate the setup:
  - `@currents/playwright` and `@playwright/test` are included.

## How to implement this in your own project

1. Start from the copied source markdown files in this folder and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the source docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the source docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Add a real Quickstart section**
   - Right now README is only benchmarks + batch size notes; add exact commands for:
     - generating tests
     - native sharding run
     - orchestration run (include `pwc-p` command, `CURRENTS_CI_BUILD_ID`, etc.).
2. **Add `npm` scripts**
   - `package.json` has only the placeholder `test` script; add `gen`, `run:shard`, `run:or8n` scripts so users can copy/paste.
3. **Fix small correctness issues**
   - README references `currents.confg.ts` (typo) and Playwright project name is `"chromim"` (typo).
4. **Show the CI workflow(s) explicitly**
   - There’s a `.github/workflows` folder, but README doesn’t list files or explain how “machines=5” is achieved; include a minimal GitHub Actions matrix example in README.
5. **Reformat files**
   - README/configs/scripts are committed as single-line files, which makes learning/copying harder—format them normally.
6. **Explain orchestration reporting implications**
   - Add a short note: orchestration may run multiple Playwright processes per machine, so recommend blob + merge (with links) and show the exact config snippet.

## Source markdown copied into this folder

- [`source__README.md`](source__README.md)
