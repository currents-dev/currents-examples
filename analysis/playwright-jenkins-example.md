# Repo audit — `playwright-jenkins-example`

- **Link to the repository:** https://github.com/currents-dev/playwright-jenkins-example :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest commits are **Jan 29, 2025** (merge PR + “fix: Add shard information to jenkins example”), with the initial commit on Nov 5, 2023. :contentReference[oaicite:1]{index=1}  
- I don’t see Dependabot/bot commits in this repo’s commit history (only human commits), so **Jan 29, 2025** is the latest meaningful change. :contentReference[oaicite:2]{index=2}

## What is it for?
A minimal example of running **Playwright tests in Jenkins Pipeline** using the official Playwright Docker image, executing **two parallel shards**, and reporting results to **Currents** via the `pwc` CLI. :contentReference[oaicite:3]{index=3}

## How is it used?
- Jenkins pipeline (`Jenkinsfile`) uses:
  - `agent { docker { image 'mcr.microsoft.com/playwright:v1.34.0-jammy' } }` :contentReference[oaicite:4]{index=4}
  - Jenkins credentials for `CURRENTS_RECORD_KEY` and `CURRENTS_PROJECT_ID` :contentReference[oaicite:5]{index=5}
  - Two parallel stages (“tester A/B”) running:
    - `npx pwc ... --ci-build-id ${env.BRANCH_NAME}-${env.BUILD_ID} --shard 1/2` and `--shard 2/2` :contentReference[oaicite:6]{index=6}
- Repo has `@playwright/test` dependency but no actual test scripts in `package.json` (it’s a pipeline-focused snippet repo). :contentReference[oaicite:7]{index=7}

## What examples are provided?
- **Jenkins declarative pipeline example**:
  - Docker-based agent using Playwright image
  - Two parallel workers
  - Currents credentials integration
  - Sharding flags + output directories per shard :contentReference[oaicite:8]{index=8}
- **Minimal Node project scaffold** with `package.json` (only `@playwright/test` declared). :contentReference[oaicite:9]{index=9}

## What changes need to be done to make the examples more accessible?
1. **Add a proper README**
   - Explain: prerequisites (Jenkins + Docker), required Jenkins credentials IDs, how to create Currents project, and how to run/verify results in Currents. (Currently there is no README in repo root.) :contentReference[oaicite:10]{index=10}
2. **Fix correctness issues in `Jenkinsfile`**
   - Typo: installs `@currents/plawyright` (should be `@currents/playwright`). :contentReference[oaicite:11]{index=11}  
   - `--project-id` is incorrectly set to the record key (`--project-id ${env.CURRENTS_RECORD_KEY}`); should use `CURRENTS_PROJECT_ID`. :contentReference[oaicite:12]{index=12}
3. **Use reproducible installs**
   - Prefer `npm ci` and define dependencies in `package.json` (instead of installing in pipeline step). :contentReference[oaicite:13]{index=13}
4. **Include actual Playwright tests + config**
   - Add a minimal `playwright.config.ts` and at least 1–2 example tests so users can run locally and in Jenkins and see artifacts.
5. **Make shard count configurable**
   - Instead of hardcoding `1/2` and `2/2`, define `SHARDS=2` and compute shard index, or generate parallel stages dynamically (or document “copy this block N times”).
6. **Improve output/artifacts handling**
   - Archive `test-results/` as Jenkins artifacts, and optionally add HTML report publishing.
7. **Pin the Playwright Docker image version to match the repo dependency**
   - Repo depends on `@playwright/test ^1.39.0` while Jenkins uses `mcr.microsoft.com/playwright:v1.34.0-jammy`; either align or document why it’s okay. :contentReference[oaicite:14]{index=14}
