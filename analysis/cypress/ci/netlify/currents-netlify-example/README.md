# currents-netlify-example

- **Framework:** `cypress`
- **Use case:** `ci/netlify`
- **Source repository:** https://github.com/currents-dev/currents-netlify-example

## What this example does

An example Netlify-deployed Astro site template that includes a **Netlify Build Plugin** configuration for **`netlify-plugin-currents`** via `netlify.toml`.

> Note: The README describes this as an “Astro Quickstart Template” (Netlify template) and does **not** explain Currents; the Currents-specific part is in `netlify.toml`.

## How this example is used

- Deploy the Astro template to Netlify (README gives standard “Deploy to Netlify” / CLI deploy instructions).
- Netlify build will use:
  - `[build] command = "astro build"` and `publish = "dist"`
  - A plugin block that references `package = "netlify-plugin-currents"` and enables it in `postBuild`.

## What scenarios are included

- **Astro quickstart project structure** (`src/`, `public/`, `astro.config.mjs`).
- **Cypress E2E** included as a dependency + config:
  - `cypress` dependency in `package.json`
  - `cypress.config.ts` configured with baseUrl `http://localhost:3000/`
  - `cypress/e2e/` folder present
- **Netlify deploy config**:
  - `netlify.toml` sets build/publish and includes the `netlify-plugin-currents` plugin entry.

## How to implement this in your own project

1. Start from the upstream markdown docs copied in this folder (`upstream/`) and identify the exact config files/scripts used.
2. Create or reuse a Currents project, then configure credentials through environment variables (`CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`).
3. Replicate the framework + CI integration pattern shown in the upstream docs for this use case (reporter/plugin wiring, CI command, and build ID strategy).
4. Run the same local commands from the upstream docs first, then execute the CI variant to confirm dashboard reporting works end-to-end.
5. After validation, adapt the pattern to your repository structure while keeping secrets in env vars and preserving the same reporting/orchestration flow.

### Implementation notes from the audit

1. **Explain the Currents part in the README**
   - Add a “Currents on Netlify” section: what `netlify-plugin-currents` does, what it expects (env vars, artifacts, etc.), and a minimal `netlify.toml` snippet. Right now the README doesn’t mention Currents at all.
2. **Fix / clarify plugin config correctness**
   - `netlify.toml` has both `[plugins.inputs.postBuild]` and `[plugin.inputs]` (singular `plugin`) on the same line, which looks like a typo/misconfig. Reformat and verify the correct Netlify TOML schema.
3. **Add an `.env.example` (or Netlify UI env var list)**
   - If the plugin requires tokens/keys, document them explicitly and point users to Netlify environment variables setup.
4. **Pretty-print committed files**
   - `package.json`, `cypress.config.ts`, and `netlify.toml` are single-line blobs; format them for readability/copying.
5. **Make the example “Currents-first”**
   - If this repo is meant to demonstrate Currents on Netlify, consider renaming/rewriting the README so it’s not primarily a generic Astro template, and include a minimal “verify it worked” checklist (what to look for in Netlify logs / Currents UI).

## Upstream markdown copied into this folder

- [`upstream/README.md`](upstream/README.md)
