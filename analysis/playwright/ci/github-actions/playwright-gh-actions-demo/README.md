# playwright-gh-actions-demo

- **Framework:** `playwright`
- **Use case:** `ci/github-actions`
- **Source repository:** https://github.com/currents-dev/playwright-gh-actions-demo

## What this example does

A demo repo showing how to run **Playwright tests on GitHub Actions in parallel** and report results to **Currents**, including:
- basic sharding with `pwc`
- reporter-based setup (`playwright.config.*`)
- Currents **Orchestration** (`pwc-p`)
- “rerun only failed tests” workflows

## How this example is used

1. Create a Currents org + project and get **Record Key** + **Project Id**.  
2. Add GitHub Actions secret `CURRENTS_RECORD_KEY`.  
3. Pick a workflow in `.github/workflows/` (examples below) and run it:
   - Most workflows use a **matrix** (multiple shards) and run in the Playwright Docker image.  
4. Tests live under `./basic` and are executed with either:
   - `npx pwc --shard=.../...` (Currents CLI wrapper), or
   - `npx playwright test --shard=.../... --config ./playwright.config.reporter.ts` (explicit reporter config).

## What scenarios are included

From the README’s “Examples” section (each is a workflow file):

### Parallel runs
- `test-basic-pwc.yml` — 3 shards using `pwc`.  
- `test-basic-reporter.yml` — 3 shards using reporter config (`playwright.config.*`).  
- `test-basic-reporter-with-summary.yml` — 2 shards + prints a summary (listed in README).  

### Orchestration (better balancing than native sharding)
- `test-or8n.yml` — orchestration using `pwc-p` + blob reporter + `merge-reports`.  
- `argos-example.yml` — orchestration + Argos CI (listed in README).  

### Rerun only failed tests
- `rerun-shards-pwc.yml` — uses `currents-dev/playwright-last-failed@v1` to compute extra flags, then runs `npx pwc ...`.  
- `rerun-shards-reporter.yml`, `reruns-or8n.yml` — listed in README.  

### Repo-level config examples
- `currents.config.ts` — example Currents config (includes orchestration hook that uploads/finalizes Argos).  
- `basic/playwright.config.reporter.ts` + `basic/pw.config.shared.ts` — shared Playwright config + Currents reporter configuration.  
- `package.json` includes `@currents/playwright` and `@playwright/test`.

## How to implement this in your own project

1. Start from the upstream markdown docs copied in this folder (`upstream/`) and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the upstream docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the upstream docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Stop hardcoding `CURRENTS_PROJECT_ID` in workflows**
   - Example workflows set `CURRENTS_PROJECT_ID: bnsqNa` inline. Make it a secret (`secrets.CURRENTS_PROJECT_ID`) or repository variable, and document it once.
2. **Reformat the workflow YAML files**
   - The raw workflow files are effectively one-line YAML, which is painful to read/reuse. Re-indent to standard YAML formatting.
3. **Add a “Which workflow should I pick?” table in README**
   - A quick mapping like: “basic sharding” vs “reporter config” vs “orchestration” vs “rerun failed” with required secrets (e.g., `ARGOS_TOKEN`).
4. **Make CI Build ID guidance consistent**
   - Some workflows set `CURRENTS_CI_BUILD_ID`, some rely on defaults; add a short recommended template and apply it across examples.
5. **Document the `PWTEST_BLOB_DO_NOT_REMOVE` and blob workflow**
   - `test-or8n.yml` uses blob reporting + merge step; add 3–5 lines in README explaining why and where artifacts go.
6. **Make defaults in config safer**
   - `currents.config.ts` and `playwright.config.reporter.ts` fall back to `"xx"`/`"yy"` when env vars are missing; better to fail fast with a clear error message.

## Upstream markdown copied into this folder

- [`upstream/.github/ISSUE_TEMPLATE/testing-scenario-idea-template.md`](upstream/.github/ISSUE_TEMPLATE/testing-scenario-idea-template.md)
- [`upstream/README.md`](upstream/README.md)
