# playwright-jenkins-example

- **Framework:** `playwright`
- **Use case:** `ci/jenkins`
- **Source repository:** https://github.com/currents-dev/playwright-jenkins-example

## What this example does

A minimal example of running **Playwright tests in Jenkins Pipeline** using the official Playwright Docker image, executing **two parallel shards**, and reporting results to **Currents** via the `pwc` CLI.

## How this example is used

- Jenkins pipeline (`Jenkinsfile`) uses:
  - `agent { docker { image 'mcr.microsoft.com/playwright:v1.34.0-jammy' } }`
  - Jenkins credentials for `CURRENTS_RECORD_KEY` and `CURRENTS_PROJECT_ID`
  - Two parallel stages (“tester A/B”) running:
    - `npx pwc ... --ci-build-id ${env.BRANCH_NAME}-${env.BUILD_ID} --shard 1/2` and `--shard 2/2`
- Repo has `@playwright/test` dependency but no actual test scripts in `package.json` (it’s a pipeline-focused snippet repo).

## What scenarios are included

- **Jenkins declarative pipeline example**:
  - Docker-based agent using Playwright image
  - Two parallel workers
  - Currents credentials integration
  - Sharding flags + output directories per shard
- **Minimal Node project scaffold** with `package.json` (only `@playwright/test` declared).

## How to implement this in your own project

1. Start from the copied source markdown files in this folder and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the source docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the source docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Add a proper README**
   - Explain: prerequisites (Jenkins + Docker), required Jenkins credentials IDs, how to create Currents project, and how to run/verify results in Currents. (Currently there is no README in repo root.)
2. **Fix correctness issues in `Jenkinsfile`**
   - Typo: installs `@currents/plawyright` (should be `@currents/playwright`).  
   - `--project-id` is incorrectly set to the record key (`--project-id ${env.CURRENTS_RECORD_KEY}`); should use `CURRENTS_PROJECT_ID`.
3. **Use reproducible installs**
   - Prefer `npm ci` and define dependencies in `package.json` (instead of installing in pipeline step).
4. **Include actual Playwright tests + config**
   - Add a minimal `playwright.config.ts` and at least 1–2 example tests so users can run locally and in Jenkins and see artifacts.
5. **Make shard count configurable**
   - Instead of hardcoding `1/2` and `2/2`, define `SHARDS=2` and compute shard index, or generate parallel stages dynamically (or document “copy this block N times”).
6. **Improve output/artifacts handling**
   - Archive `test-results/` as Jenkins artifacts, and optionally add HTML report publishing.
7. **Pin the Playwright Docker image version to match the repo dependency**
   - Repo depends on `@playwright/test ^1.39.0` while Jenkins uses `mcr.microsoft.com/playwright:v1.34.0-jammy`; either align or document why it’s okay.

## Source markdown copied into this folder

- No source markdown files were found for this repository.
