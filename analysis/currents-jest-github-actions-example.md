# Repo audit — `currents-jest-github-actions-example`

- **Link to the repository:** https://github.com/currents-dev/currents-jest-github-actions-example :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest commit is **Dependabot** on **Jul 22, 2025** (excluded). :contentReference[oaicite:1]{index=1}
- Latest **non-bot** changes are on **Jul 16, 2024** (multiple commits by `agoldis`, including “Change readme”, “Use CURRENTS_RECORD_KEY”, “Add README”). :contentReference[oaicite:2]{index=2}

## What is it for?
A minimal example showing how to report **Jest** test results to **Currents** and run Jest **in parallel** on GitHub Actions using Jest’s native `--shard` support (matrix with 2 shards/containers). :contentReference[oaicite:3]{index=3}

## How is it used?
1. Create a Currents account and get **Project Id** + **Record Key**. :contentReference[oaicite:4]{index=4}
2. Store `CURRENTS_RECORD_KEY` as a GitHub Actions **Repository Secret**. :contentReference[oaicite:5]{index=5}
3. Add `@currents/cmd` + `@currents/jest`, and configure `@currents/jest` as a Jest reporter (via `jest.config.js`). :contentReference[oaicite:6]{index=6}
4. GitHub Actions runs two shards:
   - `npx jest --shard=${{ matrix.shard }}/2` :contentReference[oaicite:7]{index=7}
5. Upload results to Currents:
   - `npx currents upload --project-id mdXsz8 --ci-build-id <repo>-<run_id>-<run_attempt>` (record key comes from `secrets.CURRENTS_RECORD_KEY`). :contentReference[oaicite:8]{index=8}

## What examples are provided?
- **GitHub Actions workflow** showing parallel shards + upload:
  - `.github/workflows/test.yml` :contentReference[oaicite:9]{index=9}
- **Jest reporter wiring**
  - `jest.config.js` exists and is referenced by the README as the place where `@currents/jest` is configured. :contentReference[oaicite:10]{index=10}
- **Code + tests scaffold**
  - `src/` and `tests/` folders exist in the repo. :contentReference[oaicite:11]{index=11}
- **README walkthrough**
  - Repo README explains the reproduction steps and points to the workflow file. :contentReference[oaicite:12]{index=12}

## What changes need to be done to make the examples more accessible?
1. **Stop hardcoding `--project-id mdXsz8` in the workflow**
   - Use `secrets.CURRENTS_PROJECT_ID` or GitHub “Variables”, and document it in the README. :contentReference[oaicite:13]{index=13}
2. **Reformat the README and workflow files**
   - The README is effectively a single-line blob in raw form, and the workflow YAML is also one line, making it hard to copy/modify. :contentReference[oaicite:14]{index=14}
3. **Make the “what gets uploaded” explicit**
   - Add 3–5 lines: where Jest output/report is generated, how `@currents/jest` emits results, and what `currents upload` expects (paths/outputs). (Right now it’s implied.) :contentReference[oaicite:15]{index=15}
4. **Add caching + `npm ci`**
   - Switch `npm install` → `npm ci` and add `actions/cache` for npm to speed up runs (common CI best-practice). :contentReference[oaicite:16]{index=16}
5. **Add a “Local run” section**
   - Show local env var usage (`CURRENTS_RECORD_KEY`, project id) and a one-command run (no Actions) so people can validate before pushing. :contentReference[oaicite:17]{index=17}
