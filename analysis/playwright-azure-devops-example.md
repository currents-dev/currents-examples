# Repo audit — `playwright-azure-devops-example`

- **Link to the repository:** https://github.com/currents-dev/playwright-azure-devops-example :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest **non-bot** change: **Mar 27, 2024** (merge PR #2 + update Currents Playwright to release version). :contentReference[oaicite:1]{index=1}  
- No Dependabot/bot commits show up in the commit list for this repo. :contentReference[oaicite:2]{index=2}

## What is it for?
This repository showcases running **Playwright** tests on **Azure DevOps Pipelines** while using **Currents** as the reporting dashboard. :contentReference[oaicite:3]{index=3}  
It demonstrates **parallelization with 3 containers** using Azure Pipelines’ **Matrix Execution Strategy** and **Playwright sharding**. :contentReference[oaicite:4]{index=4}

## How is it used?
High-level setup:
1. Create/choose an Azure Pipeline connected to a repo with Playwright tests. :contentReference[oaicite:5]{index=5}
2. Create a Currents org/project and get:
   - `CURRENTS_RECORD_KEY` (store as a **secret** in an Azure DevOps **Variable Group**)
   - `CURRENTS_PROJECT_ID` (set as an env var in the pipeline). :contentReference[oaicite:6]{index=6}
3. Use `@currents/playwright` + run tests via Currents wrapper (example uses `pwc`) and shard across matrix jobs. :contentReference[oaicite:7]{index=7}

Example pipeline behavior (from Currents docs):
- Uses a matrix with `shard: 1/3`, `2/3`, `3/3`
- Runs `npx pwc --shard=$(shard)` in `basic/`
- Passes `CURRENTS_PROJECT_ID` and `CURRENTS_RECORD_KEY` to each job. :contentReference[oaicite:8]{index=8}

## What examples are provided?
- **Two Azure pipeline examples**:
  - `azure-pipelines.yml`
  - `azure-pipelines-reporter.yml` :contentReference[oaicite:9]{index=9}
- A `basic/` folder containing Playwright tests (including **one intentionally failing test**), meant to be run in parallel across 3 containers. :contentReference[oaicite:10]{index=10}
- Documentation pointers and what artifacts Currents collects (console output, screenshots, videos, traces, timing, flaky tests, etc.). :contentReference[oaicite:11]{index=11}

## What changes need to be done to make the examples more accessible?
1. **Expand/format the README**
   - The raw `README.md` is basically a single-line stub; copy/paste UX is bad and it doesn’t include the actual “reproduce” steps that *are* visible on the rendered page. :contentReference[oaicite:12]{index=12}
2. **Remove hardcoded placeholders from docs/snippets**
   - The docs example uses a literal `CURRENTS_PROJECT_ID: '3W3DU4'`; make that explicitly a placeholder and recommend a variable/secret instead. :contentReference[oaicite:13]{index=13}
3. **Add a minimal “Quickstart” section**
   - Exact steps: create variable group, set secrets, run pipeline, “what success looks like” in Currents.
4. **Make the two pipeline styles explicit**
   - Explain what `azure-pipelines.yml` vs `azure-pipelines-reporter.yml` demonstrate (e.g., `pwc` wrapper vs reporter-only approach), and when to choose which. (Right now you have the files but not a clear comparison in README.) :contentReference[oaicite:14]{index=14}
5. **Make code/config files human-readable**
   - Several files in this org’s examples tend to be minified into single-line blobs; ensure YAML/JSON/TS files are properly formatted so users can learn from diffs and copy sections cleanly. :contentReference[oaicite:15]{index=15}
