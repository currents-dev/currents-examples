# playwright-azure-devops-example

- **Framework:** `playwright`
- **Use case:** `ci/azure-devops`
- **Source repository:** https://github.com/currents-dev/playwright-azure-devops-example

## What this example does

This repository showcases running **Playwright** tests on **Azure DevOps Pipelines** while using **Currents** as the reporting dashboard.  
It demonstrates **parallelization with 3 containers** using Azure Pipelines’ **Matrix Execution Strategy** and **Playwright sharding**.

## How this example is used

High-level setup:
1. Create/choose an Azure Pipeline connected to a repo with Playwright tests.
2. Create a Currents org/project and get:
   - `CURRENTS_RECORD_KEY` (store as a **secret** in an Azure DevOps **Variable Group**)
   - `CURRENTS_PROJECT_ID` (set as an env var in the pipeline).
3. Use `@currents/playwright` + run tests via Currents wrapper (example uses `pwc`) and shard across matrix jobs.

Example pipeline behavior (from Currents docs):
- Uses a matrix with `shard: 1/3`, `2/3`, `3/3`
- Runs `npx pwc --shard=$(shard)` in `basic/`
- Passes `CURRENTS_PROJECT_ID` and `CURRENTS_RECORD_KEY` to each job.

## What scenarios are included

- **Two Azure pipeline examples**:
  - `azure-pipelines.yml`
  - `azure-pipelines-reporter.yml`
- A `basic/` folder containing Playwright tests (including **one intentionally failing test**), meant to be run in parallel across 3 containers.
- Documentation pointers and what artifacts Currents collects (console output, screenshots, videos, traces, timing, flaky tests, etc.).

## How to implement this in your own project

1. Start from the copied source markdown files in this folder and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the source docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the source docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Expand/format the README**
   - The raw `README.md` is basically a single-line stub; copy/paste UX is bad and it doesn’t include the actual “reproduce” steps that *are* visible on the rendered page.
2. **Remove hardcoded placeholders from docs/snippets**
   - The docs example uses a literal `CURRENTS_PROJECT_ID: '3W3DU4'`; make that explicitly a placeholder and recommend a variable/secret instead.
3. **Add a minimal “Quickstart” section**
   - Exact steps: create variable group, set secrets, run pipeline, “what success looks like” in Currents.
4. **Make the two pipeline styles explicit**
   - Explain what `azure-pipelines.yml` vs `azure-pipelines-reporter.yml` demonstrate (e.g., `pwc` wrapper vs reporter-only approach), and when to choose which. (Right now you have the files but not a clear comparison in README.)
5. **Make code/config files human-readable**
   - Several files in this org’s examples tend to be minified into single-line blobs; ensure YAML/JSON/TS files are properly formatted so users can learn from diffs and copy sections cleanly.

## Source markdown copied into this folder

- [`source__CODE_OF_CONDUCT.md`](source__CODE_OF_CONDUCT.md)
- [`source__README.md`](source__README.md)
- [`source__SECURITY.md`](source__SECURITY.md)

## Repository content copied into this folder

- Total tracked files copied: **31**
- Source `README.md` is saved as `README.upstream.md`.
- Path mapping: [`content-map.md`](content-map.md)
