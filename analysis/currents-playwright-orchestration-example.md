# Repo audit — `currents-playwright-orchestration-example`

- **Link to the repository:** https://github.com/currents-dev/currents-playwright-orchestration-example :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest **automated** changes are Dependabot bumps in **Jul–Sep 2025** (excluded). :contentReference[oaicite:1]{index=1}
- Latest **non-bot** change is **May 14, 2025** (multiple commits by `agoldis`, including a benchmark + README updates + `@currents/playwright@1.13.0`). :contentReference[oaicite:2]{index=2}

## What is it for?
An example repo that demonstrates how **Currents Orchestration** (batched orchestration) can reduce Playwright CI time versus **native Playwright sharding**, using a synthetic suite with mixed test durations and reporting the benchmark numbers in the README. :contentReference[oaicite:3]{index=3}

## How is it used?
- Configure Currents with environment variables:
  - `CURRENTS_RECORD_KEY`
  - `CURRENTS_PROJECT_ID`
  - Optional orchestration batch size via `CURRENTS_BATCH_SIZE` (or CLI `--pwc-batch-size`, or config file). :contentReference[oaicite:4]{index=4}
- Run Playwright with **native sharding** (baseline) using the Playwright config (`workers: 2`, tests under `./tests`). :contentReference[oaicite:5]{index=5}
- Run using **Currents Orchestration** with a chosen batch size (README recommends `batchSize = workers`; config defaults to `batchSize: 2`). :contentReference[oaicite:6]{index=6}  
  (Orchestration conceptually pulls/dispatches tests dynamically; Currents docs recommend using blob reporter + merging when runs are fragmented.) :contentReference[oaicite:7]{index=7}

## What examples are provided?
- **Benchmark comparison (documented in README):**
  - Native sharding: workers=2, machines=5, duration **15m 38s**
  - Batched orchestration: batch size=2, workers=2, machines=5, duration **9m 17s** (~41% faster) :contentReference[oaicite:8]{index=8}
- **Currents config example** with orchestration settings:
  - `currents.config.ts` shows `orchestration.batchSize: 2` and reads keys from env. :contentReference[oaicite:9]{index=9}
- **Playwright config example:**
  - `playwright.config.ts` sets `timeout`, `workers: 2`, `testDir: ./tests`, outputDir `test-results/`. :contentReference[oaicite:10]{index=10}
- **Synthetic suite generator scripts:**
  - `generate-tests.mjs` generates **100** specs with randomized durations (20 long, 30 mid, 50 short) into `./tests`. :contentReference[oaicite:11]{index=11}
  - `generate-tests-edge-case.mjs` generates an “edge case” suite into `./edge-case-tests` (40 long + 40 short). :contentReference[oaicite:12]{index=12}
- **Dependencies** pinned to demonstrate the setup:
  - `@currents/playwright` and `@playwright/test` are included. :contentReference[oaicite:13]{index=13}

## What changes need to be done to make the examples more accessible?
1. **Add a real Quickstart section**
   - Right now README is only benchmarks + batch size notes; add exact commands for:
     - generating tests
     - native sharding run
     - orchestration run (include `pwc-p` command, `CURRENTS_CI_BUILD_ID`, etc.). :contentReference[oaicite:14]{index=14}
2. **Add `npm` scripts**
   - `package.json` has only the placeholder `test` script; add `gen`, `run:shard`, `run:or8n` scripts so users can copy/paste. :contentReference[oaicite:15]{index=15}
3. **Fix small correctness issues**
   - README references `currents.confg.ts` (typo) and Playwright project name is `"chromim"` (typo). :contentReference[oaicite:16]{index=16}
4. **Show the CI workflow(s) explicitly**
   - There’s a `.github/workflows` folder, but README doesn’t list files or explain how “machines=5” is achieved; include a minimal GitHub Actions matrix example in README. :contentReference[oaicite:17]{index=17}
5. **Reformat files**
   - README/configs/scripts are committed as single-line files, which makes learning/copying harder—format them normally. :contentReference[oaicite:18]{index=18}
6. **Explain orchestration reporting implications**
   - Add a short note: orchestration may run multiple Playwright processes per machine, so recommend blob + merge (with links) and show the exact config snippet. :contentReference[oaicite:19]{index=19}
