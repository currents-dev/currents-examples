# Repo audit — `currents-nodejs-github-actions-example`

- **Link to the repository:** https://github.com/currents-dev/currents-nodejs-github-actions-example :contentReference[oaicite:0]{index=0}

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest **non-bot** changes are on **Apr 30, 2025** (commits by `ynahmany`, e.g. “adding image as an example”, “fixing readme…”). :contentReference[oaicite:1]{index=1}  
- Newer commits on **Jul 22, 2025** and **Nov 19, 2025** are by **dependabot[bot]** and are excluded. :contentReference[oaicite:2]{index=2}

## What is it for?
A minimal example showing how to report **Node.js test results** (Node’s built-in `node --test`) to **Currents** from **GitHub Actions** using `@currents/node-test-reporter` + `@currents/cmd`. :contentReference[oaicite:3]{index=3}

## How is it used?
- The intended flow is:
  1. Run Node tests with Currents’ Node test reporter outputting a JUnit XML file (`report.xml`). :contentReference[oaicite:4]{index=4}
  2. Convert JUnit into Currents format with `npx currents convert --input-format=junit --input-file=./report.xml --framework=node`. :contentReference[oaicite:5]{index=5}
  3. Upload to Currents with `npx currents upload` using `CURRENTS_RECORD_KEY` from GitHub Secrets. :contentReference[oaicite:6]{index=6}
- CI runs in **2 shards** using `node --test --test-shard=${{ matrix.shard }}/2 ... tests/**.test.mjs`. :contentReference[oaicite:7]{index=7}
- There’s also a Currents docs page pointing to this repo as the Node + GitHub Actions example. :contentReference[oaicite:8]{index=8}

## What examples are provided?
- **GitHub Actions workflow** demonstrating sharded runs + convert + upload:
  - `.github/workflows/test.yml` :contentReference[oaicite:9]{index=9}
- **Example scripts**
  - `npm run test` generates `report.xml` via Node’s test runner + Currents reporter. :contentReference[oaicite:10]{index=10}
  - `npm run convert` converts `report.xml` into Currents format. :contentReference[oaicite:11]{index=11}
- **Assets**
  - `image.png` (screenshot of a run in Currents UI) referenced in the README. :contentReference[oaicite:12]{index=12}
- **Test suite**
  - A `tests/` folder is present (workflow targets `tests/**.test.mjs`). :contentReference[oaicite:13]{index=13}

## What changes need to be done to make the examples more accessible?
1. **Stop hardcoding IDs / staging URLs in the workflow**
   - Workflow currently hardcodes `--project-id JOw2i3` and sets `CURRENTS_API_URL=https://cy-staging.currents.dev/`. Make these repo variables/secrets and default to production docs. :contentReference[oaicite:14]{index=14}
2. **Reformat the README + YAML + JSON**
   - README and workflow are essentially single-line in raw form, which is hard to read/copy. Break into sections + fenced blocks. :contentReference[oaicite:15]{index=15}
3. **Clarify where “Project Id” is set**
   - README tells users to obtain Project Id, but doesn’t clearly state it’s passed via `--project-id` in the workflow. Add an explicit note. :contentReference[oaicite:16]{index=16}
4. **Add a “Local run” section**
   - Example: how to set `CURRENTS_RECORD_KEY` locally, run `npm run test`, run `npm run convert`, then upload (and whether to use production vs staging). :contentReference[oaicite:17]{index=17}
5. **Make the “report” script safe**
   - `package.json` has a `report` script that uploads to staging without showing project id / build id args. Either remove it or make it a documented helper that requires env vars. :contentReference[oaicite:18]{index=18}
