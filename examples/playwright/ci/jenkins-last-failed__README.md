# jenkins-last-failed

- **Framework:** `playwright`
- **Use case:** `ci/jenkins`
- **Source repository:** https://github.com/currents-dev/jenkins-last-failed

## What this example does

An example repo showing how to run **Playwright on Jenkins** and use Currents’ **`--last-failed`** capability (rerun only previously failed tests), supporting both:
- **native shards** (`pwc --shard=...`)
- **Currents orchestration** (`pwc-p`)

## How this example is used

- You configure Jenkins credentials:
  - `CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`, and `CURRENTS_API_KEY`.
- The `Jenkinsfile` defines parameters:
  - `CI_BUILD_ID` (if set, it reruns last-failed for that run)
  - `IS_ORCHESTRATION` (choose orchestration vs shards).
- If `CI_BUILD_ID != 'none'`, it first generates a `.last-run.json` file by calling:
  - `npx currents api get-run --api-key ... --project-id ... --ci-build-id ... --pw-last-run --output .last-run.json`
  This matches Currents docs: `--last-failed` needs an API key and uses `@currents/cmd` to generate `.last-run.json` for the target CI build id.
- It then runs either:
  - **Shards:** `npx pwc --shard=i/N` (or `--last-failed --output ...`) across `TOTAL_SHARDS` in parallel
  - **Orchestration:** `npx pwc-p` (or `--last-failed --output ...`) across `PARALLEL_JOBS` in parallel

## What scenarios are included

- **Jenkins Pipeline** example with:
  - parameters (CI_BUILD_ID, orchestration toggle)
  - dependency install + Playwright install
  - generation of `.last-run.json` from Currents API
  - parallel execution strategy for shards vs orchestration
  - copying `.last-run.json` into per-shard/per-parallel output folders.
- **Playwright project config**:
  - `testDir: "./tests"`, artifacts enabled (`trace/video/screenshot`), outputDir `test-results/`, Currents reporter.
- **Node deps** include:
  - `@currents/cmd` and `@currents/playwright` plus Playwright packages.
- `tests/` directory exists (the suite the pipeline runs).

## How to implement this in your own project

1. Start from the copied source markdown files in this folder and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the source docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the source docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Remove hardcoded Currents keys from `playwright.config.ts`**
   - It currently hardcodes `recordKey` and `projectId` in source. Use env vars and fail-fast if missing (and keep secrets out of git).
2. **Rewrite the README as a real setup guide**
   - Right now it’s a short note + plugin list, and it’s also hard to read in raw form. Add:
     - required Jenkins credentials IDs
     - how to trigger “normal run” vs “last-failed run”
     - how to find the CI Build ID to paste into `CI_BUILD_ID`.
3. **Clarify the CI build id logic**
   - `CURRENTS_CI_BUILD_ID` is set to `reporter-${JOB_NAME}-${BUILD_ID}-${BUILD_NUMBER}`, but the “last failed” lookup uses the user-supplied `CI_BUILD_ID`. Explain that relationship and show an example of a value that should be used.
4. **Make shard/orchestration counts configurable**
   - `TOTAL_SHARDS=3`, `PARALLEL_JOBS=4` are hardcoded. Expose as Jenkins parameters (with defaults) and document how to choose them.
5. **Add artifact archiving**
   - The pipeline writes outputs under `test-results/...`; add a post step to archive these so users can view artifacts directly in Jenkins.
6. **Provide a “local reproduction” path**
   - Minimal steps to run:
     - `npx pwc --shard=1/3` and
     - `npx currents api get-run ... --pw-last-run` + `npx pwc --last-failed ...`
     so people can validate before wiring Jenkins.

## Source markdown copied into this folder

- [`jenkins-last-failed__source__README.md`](jenkins-last-failed__source__README.md)
