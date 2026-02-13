# Repo audit — `currents-netlify-example`

- **Link to the repository:** https://github.com/currents-dev/currents-netlify-example ([github.com](https://github.com/currents-dev/currents-netlify-example))

## Last time a change was introduced (excluding automated security/dependency updates)
- Latest (and only) changes are **Nov 12, 2022**:
  - “Initial commit”
  - “Update netlify.toml” (both authored by `agoldis`). :contentReference[oaicite:0]{index=0}  
- I don’t see any Dependabot/bot commits here (only 2 commits total). :contentReference[oaicite:1]{index=1}

## What is it for?
An example Netlify-deployed Astro site template that includes a **Netlify Build Plugin** configuration for **`netlify-plugin-currents`** via `netlify.toml`. :contentReference[oaicite:2]{index=2}

> Note: The README describes this as an “Astro Quickstart Template” (Netlify template) and does **not** explain Currents; the Currents-specific part is in `netlify.toml`. :contentReference[oaicite:3]{index=3}

## How is it used?
- Deploy the Astro template to Netlify (README gives standard “Deploy to Netlify” / CLI deploy instructions). :contentReference[oaicite:4]{index=4}
- Netlify build will use:
  - `[build] command = "astro build"` and `publish = "dist"` :contentReference[oaicite:5]{index=5}
  - A plugin block that references `package = "netlify-plugin-currents"` and enables it in `postBuild`. :contentReference[oaicite:6]{index=6}

## What examples are provided?
- **Astro quickstart project structure** (`src/`, `public/`, `astro.config.mjs`). :contentReference[oaicite:7]{index=7}
- **Cypress E2E** included as a dependency + config:
  - `cypress` dependency in `package.json` :contentReference[oaicite:8]{index=8}
  - `cypress.config.ts` configured with baseUrl `http://localhost:3000/` :contentReference[oaicite:9]{index=9}
  - `cypress/e2e/` folder present :contentReference[oaicite:10]{index=10}
- **Netlify deploy config**:
  - `netlify.toml` sets build/publish and includes the `netlify-plugin-currents` plugin entry. :contentReference[oaicite:11]{index=11}

## What changes need to be done to make the examples more accessible?
1. **Explain the Currents part in the README**
   - Add a “Currents on Netlify” section: what `netlify-plugin-currents` does, what it expects (env vars, artifacts, etc.), and a minimal `netlify.toml` snippet. Right now the README doesn’t mention Currents at all. :contentReference[oaicite:12]{index=12}
2. **Fix / clarify plugin config correctness**
   - `netlify.toml` has both `[plugins.inputs.postBuild]` and `[plugin.inputs]` (singular `plugin`) on the same line, which looks like a typo/misconfig. Reformat and verify the correct Netlify TOML schema. :contentReference[oaicite:13]{index=13}
3. **Add an `.env.example` (or Netlify UI env var list)**
   - If the plugin requires tokens/keys, document them explicitly and point users to Netlify environment variables setup.
4. **Pretty-print committed files**
   - `package.json`, `cypress.config.ts`, and `netlify.toml` are single-line blobs; format them for readability/copying. :contentReference[oaicite:14]{index=14}
5. **Make the example “Currents-first”**
   - If this repo is meant to demonstrate Currents on Netlify, consider renaming/rewriting the README so it’s not primarily a generic Astro template, and include a minimal “verify it worked” checklist (what to look for in Netlify logs / Currents UI).
