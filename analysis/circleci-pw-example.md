# Repo audit — `circleci-pw-example`

- **Link to the repository:** https://github.com/currents-dev/circleci-pw-example :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest commits are on **Nov 5, 2023** (multiple commits by `agoldis`, including “chore: update README”). :contentReference[oaicite:1]{index=1}  
- No Dependabot/bot commits appear in the commit history page for this repo. :contentReference[oaicite:2]{index=2}

## What is it for?
An example showing how to run **Playwright tests on CircleCI using 3 parallel containers** and report results to **Currents** (via `pwc` / `@currents/playwright`). :contentReference[oaicite:3]{index=3}

## How is it used?
- CircleCI config enables **parallelism: 3** and uses CircleCI’s shard indexes to compute the Playwright shard:
  - `SHARD="$((${CIRCLE_NODE_INDEX}+1))"` and `--shard=${SHARD}/${CIRCLE_NODE_TOTAL}` when running `npx pwc ...` :contentReference[oaicite:4]{index=4}
- Users set:
  - `CURRENTS_RECORD_KEY` (recommended via CircleCI contexts)
  - `CURRENTS_PROJECT_ID` (from Currents project settings) :contentReference[oaicite:5]{index=5}
- The repo includes the CircleCI config file at `.circleci/config.yml`. :contentReference[oaicite:6]{index=6}

## What examples are provided?
- **CircleCI parallel Playwright run**
  - `.circleci/config.yml` demonstrating 3-way parallelization + sharding. :contentReference[oaicite:7]{index=7}
- **Playwright project scaffolding**
  - `playwright.config.ts`, `tests/`, and a Node project (`package.json`) exist in the repo. :contentReference[oaicite:8]{index=8}
- **README explanation**
  - Repo README describes the goal and points to the config file and `pwc` usage. :contentReference[oaicite:9]{index=9}
- **Official docs cross-link**
  - Currents docs explicitly reference this repo as the CircleCI Playwright example. :contentReference[oaicite:10]{index=10}

## What changes need to be done to make the examples more accessible?
1. **Pretty-print the files**
   - The raw `README.md`, `.circleci/config.yml`, and `package.json` render as single-line blobs, which makes copying/editing painful. :contentReference[oaicite:11]{index=11}
2. **Stop hardcoding `--project-id` in docs/snippets**
   - The docs snippet uses a concrete project id (`bnsqNa`) as an example; make it very explicit it’s a placeholder and recommend `CURRENTS_PROJECT_ID` via env/context. :contentReference[oaicite:12]{index=12}
3. **Add a “Quickstart” with exact steps**
   - (1) create project → (2) set CircleCI context vars → (3) run pipeline → (4) where to see results in Currents.
4. **Fail fast on missing env**
   - If `CURRENTS_RECORD_KEY` / `CURRENTS_PROJECT_ID` are missing, print a clear error and exit (instead of running a confusing “empty” run).
5. **Add caching + `npm ci`**
   - Show recommended CircleCI caching for node modules and use `npm ci` for deterministic installs (especially for examples people will copy).
