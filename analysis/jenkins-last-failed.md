# Repo audit — `jenkins-last-failed`

- **Link to the repository:** https://github.com/currents-dev/jenkins-last-failed :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest commits are **Dependabot** on **Jul 22, 2025** (excluded). :contentReference[oaicite:1]{index=1}
- Latest **non-bot** change is **Nov 14, 2024** (“fix: remove api request script”) by `miguelangarano`. :contentReference[oaicite:2]{index=2}

## What is it for?
An example repo showing how to run **Playwright on Jenkins** and use Currents’ **`--last-failed`** capability (rerun only previously failed tests), supporting both:
- **native shards** (`pwc --shard=...`)
- **Currents orchestration** (`pwc-p`) :contentReference[oaicite:3]{index=3}

## How is it used?
- You configure Jenkins credentials:
  - `CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`, and `CURRENTS_API_KEY`. :contentReference[oaicite:4]{index=4}
- The `Jenkinsfile` defines parameters:
  - `CI_BUILD_ID` (if set, it reruns last-failed for that run)
  - `IS_ORCHESTRATION` (choose orchestration vs shards). :contentReference[oaicite:5]{index=5}
- If `CI_BUILD_ID != 'none'`, it first generates a `.last-run.json` file by calling:
  - `npx currents api get-run --api-key ... --project-id ... --ci-build-id ... --pw-last-run --output .last-run.json` :contentReference[oaicite:6]{index=6}
  This matches Currents docs: `--last-failed` needs an API key and uses `@currents/cmd` to generate `.last-run.json` for the target CI build id. :contentReference[oaicite:7]{index=7}
- It then runs either:
  - **Shards:** `npx pwc --shard=i/N` (or `--last-failed --output ...`) across `TOTAL_SHARDS` in parallel :contentReference[oaicite:8]{index=8}
  - **Orchestration:** `npx pwc-p` (or `--last-failed --output ...`) across `PARALLEL_JOBS` in parallel :contentReference[oaicite:9]{index=9}

## What examples are provided?
- **Jenkins Pipeline** example with:
  - parameters (CI_BUILD_ID, orchestration toggle)
  - dependency install + Playwright install
  - generation of `.last-run.json` from Currents API
  - parallel execution strategy for shards vs orchestration
  - copying `.last-run.json` into per-shard/per-parallel output folders. :contentReference[oaicite:10]{index=10}
- **Playwright project config**:
  - `testDir: "./tests"`, artifacts enabled (`trace/video/screenshot`), outputDir `test-results/`, Currents reporter. :contentReference[oaicite:11]{index=11}
- **Node deps** include:
  - `@currents/cmd` and `@currents/playwright` plus Playwright packages. :contentReference[oaicite:12]{index=12}
- `tests/` directory exists (the suite the pipeline runs). :contentReference[oaicite:13]{index=13}

## What changes need to be done to make the examples more accessible?
1. **Remove hardcoded Currents keys from `playwright.config.ts`**
   - It currently hardcodes `recordKey` and `projectId` in source. Use env vars and fail-fast if missing (and keep secrets out of git). :contentReference[oaicite:14]{index=14}
2. **Rewrite the README as a real setup guide**
   - Right now it’s a short note + plugin list, and it’s also hard to read in raw form. Add:
     - required Jenkins credentials IDs
     - how to trigger “normal run” vs “last-failed run”
     - how to find the CI Build ID to paste into `CI_BUILD_ID`. :contentReference[oaicite:15]{index=15}
3. **Clarify the CI build id logic**
   - `CURRENTS_CI_BUILD_ID` is set to `reporter-${JOB_NAME}-${BUILD_ID}-${BUILD_NUMBER}`, but the “last failed” lookup uses the user-supplied `CI_BUILD_ID`. Explain that relationship and show an example of a value that should be used. :contentReference[oaicite:16]{index=16}
4. **Make shard/orchestration counts configurable**
   - `TOTAL_SHARDS=3`, `PARALLEL_JOBS=4` are hardcoded. Expose as Jenkins parameters (with defaults) and document how to choose them. :contentReference[oaicite:17]{index=17}
5. **Add artifact archiving**
   - The pipeline writes outputs under `test-results/...`; add a post step to archive these so users can view artifacts directly in Jenkins.
6. **Provide a “local reproduction” path**
   - Minimal steps to run:
     - `npx pwc --shard=1/3` and
     - `npx currents api get-run ... --pw-last-run` + `npx pwc --last-failed ...`
     so people can validate before wiring Jenkins. :contentReference[oaicite:18]{index=18}
