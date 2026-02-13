# Repo audit — `playwright-gh-actions-demo`

- **Repository:** https://github.com/currents-dev/playwright-gh-actions-demo :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest commit on `main` is **Jan 8, 2026** (“chore: remove CODE_OF_CONDUCT.md and SECURITY.md files”), by `agoldis`. :contentReference[oaicite:1]{index=1}  
- I did **not** see Dependabot/bot commits on the commits page (no “dependabot”/“bot” entries), so the latest change appears to be human-authored. :contentReference[oaicite:2]{index=2}

## What is it for?
A demo repo showing how to run **Playwright tests on GitHub Actions in parallel** and report results to **Currents**, including:
- basic sharding with `pwc`
- reporter-based setup (`playwright.config.*`)
- Currents **Orchestration** (`pwc-p`)
- “rerun only failed tests” workflows :contentReference[oaicite:3]{index=3}

## How is it used?
1. Create a Currents org + project and get **Record Key** + **Project Id**. :contentReference[oaicite:4]{index=4}  
2. Add GitHub Actions secret `CURRENTS_RECORD_KEY`. :contentReference[oaicite:5]{index=5}  
3. Pick a workflow in `.github/workflows/` (examples below) and run it:
   - Most workflows use a **matrix** (multiple shards) and run in the Playwright Docker image. :contentReference[oaicite:6]{index=6}  
4. Tests live under `./basic` and are executed with either:
   - `npx pwc --shard=.../...` (Currents CLI wrapper), or
   - `npx playwright test --shard=.../... --config ./playwright.config.reporter.ts` (explicit reporter config). :contentReference[oaicite:7]{index=7}

## What examples are provided?
From the README’s “Examples” section (each is a workflow file): :contentReference[oaicite:8]{index=8}

### Parallel runs
- `test-basic-pwc.yml` — 3 shards using `pwc`. :contentReference[oaicite:9]{index=9}  
- `test-basic-reporter.yml` — 3 shards using reporter config (`playwright.config.*`). :contentReference[oaicite:10]{index=10}  
- `test-basic-reporter-with-summary.yml` — 2 shards + prints a summary (listed in README). :contentReference[oaicite:11]{index=11}  

### Orchestration (better balancing than native sharding)
- `test-or8n.yml` — orchestration using `pwc-p` + blob reporter + `merge-reports`. :contentReference[oaicite:12]{index=12}  
- `argos-example.yml` — orchestration + Argos CI (listed in README). :contentReference[oaicite:13]{index=13}  

### Rerun only failed tests
- `rerun-shards-pwc.yml` — uses `currents-dev/playwright-last-failed@v1` to compute extra flags, then runs `npx pwc ...`. :contentReference[oaicite:14]{index=14}  
- `rerun-shards-reporter.yml`, `reruns-or8n.yml` — listed in README. :contentReference[oaicite:15]{index=15}  

### Repo-level config examples
- `currents.config.ts` — example Currents config (includes orchestration hook that uploads/finalizes Argos). :contentReference[oaicite:16]{index=16}  
- `basic/playwright.config.reporter.ts` + `basic/pw.config.shared.ts` — shared Playwright config + Currents reporter configuration. :contentReference[oaicite:17]{index=17}  
- `package.json` includes `@currents/playwright` and `@playwright/test`. :contentReference[oaicite:18]{index=18}

## What changes would make the examples more accessible?
1. **Stop hardcoding `CURRENTS_PROJECT_ID` in workflows**
   - Example workflows set `CURRENTS_PROJECT_ID: bnsqNa` inline. Make it a secret (`secrets.CURRENTS_PROJECT_ID`) or repository variable, and document it once. :contentReference[oaicite:19]{index=19}
2. **Reformat the workflow YAML files**
   - The raw workflow files are effectively one-line YAML, which is painful to read/reuse. Re-indent to standard YAML formatting. :contentReference[oaicite:20]{index=20}
3. **Add a “Which workflow should I pick?” table in README**
   - A quick mapping like: “basic sharding” vs “reporter config” vs “orchestration” vs “rerun failed” with required secrets (e.g., `ARGOS_TOKEN`). :contentReference[oaicite:21]{index=21}
4. **Make CI Build ID guidance consistent**
   - Some workflows set `CURRENTS_CI_BUILD_ID`, some rely on defaults; add a short recommended template and apply it across examples. :contentReference[oaicite:22]{index=22}
5. **Document the `PWTEST_BLOB_DO_NOT_REMOVE` and blob workflow**
   - `test-or8n.yml` uses blob reporting + merge step; add 3–5 lines in README explaining why and where artifacts go. :contentReference[oaicite:23]{index=23}
6. **Make defaults in config safer**
   - `currents.config.ts` and `playwright.config.reporter.ts` fall back to `"xx"`/`"yy"` when env vars are missing; better to fail fast with a clear error message. :contentReference[oaicite:24]{index=24}
