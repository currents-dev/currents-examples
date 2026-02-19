# Repo audit — `playwright-aws-codebuild-example`

- **Repository:** https://github.com/currents-dev/playwright-aws-codebuild-example 

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest **non-bot** changes landed on **Nov 15, 2023** (commits by `agoldis` that day).   
- There are later commits by **dependabot[bot]** (automated), e.g. **Jul 22, 2025**, which are excluded per your rule. 

## What is it for?
An example project showing how to run **Playwright tests** on **AWS CodeBuild** (including CodeBuild **batch/matrix** builds) and report results to **Currents** using the Currents Playwright reporter (`@currents/playwright`). 

## How is it used?
1. **Install & prep**
   - Uses Node + Playwright; installs deps via `npm ci`. 
2. **Configure Currents**
   - Provide `CURRENTS_RECORD_KEY` (recommended via AWS Secrets Manager in CodeBuild). 
3. **Run in CodeBuild as a matrix**
   - `buildspec.yml` runs a shard per worker using `--shard $WORKER/3` and sets a CI build id. 
4. **Playwright config**
   - Uses a shared config (`pw.config.shared.ts`) that sets `testDir` to `./basic`, configures artifacts, and starts a local web server for tests. 
5. **Reporting**
   - `playwright.config.reporter.ts` wires the Currents reporter, and `package.json` includes `@currents/playwright`. 

## What examples are provided?
- **AWS CodeBuild setup example**
  - `buildspec.yml` demonstrating CodeBuild batch/matrix workers + sharding. 
  - `aws-project-config-output.json` (sample project configuration output). 
- **Playwright + Currents reporter setup**
  - `playwright.config.reporter.ts` (Currents reporter configuration). 
  - `pw.config.shared.ts` (shared Playwright settings, artifacts, web server, testDir). 
  - `basic/` tests directory referenced by config. 
- **Local CodeBuild agent run**
  - README includes steps and references a helper script for local runs using the CodeBuild local agent image. 

## What changes would make the examples more accessible?
1. **Fix a README link inconsistency**
   - README links `buildspec.yml` to a different repo (`currents-dev/aws-codebuild-example`) instead of this repo. (Small but confusing.) 
2. **Add a “copy/paste Quickstart”**
   - Minimal vars (`CURRENTS_RECORD_KEY`, project id), exact CodeBuild batch settings, and the expected command line for sharding and CI build id.
3. **Add `.env.example` / `codebuild.env.example`**
   - Show the minimal env needed to run locally (even if real key should be injected via Secrets Manager in CI).
4. **Add a short “Troubleshooting” section**
   - Missing Playwright deps on Linux images, shard count mismatch, CI build id collisions, and where artifacts are stored.
5. **Make `buildspec.yml` easier to skim**
   - Add comments explaining the matrix variable (`WORKER`) and the shard formula, plus a note on changing worker count.

## Notes (when README is insufficient)
- README is present and explains the intent; code confirms key wiring:
  - `--shard $WORKER/3` in CodeBuild. 
  - `testDir: './basic'` and local `webServer` usage. 
  - Currents Playwright reporter dependency and config file. 
