# Evidence sharing: a checkout bug, before and after

A one-page checkout with a bug no test covers: a discount code typed in lowercase (`save10`) throws in the click handler, and the Apply button stays on "Applying…". This example records the bug and the fix as Currents sessions and shares them as links that open without a Currents login.

An agent does the same with the Playwright MCP server and the [`browser-evidence`](https://docs.currents.dev/ai/evidence-sharing) skill. Here a Playwright script stands in for the agent's browser, so you can run it yourself.

## What you get

- A session page per capture: status, error, screenshot, video, the trace and the accessibility tree, read-only and with no login.
- Trace links an agent or a reviewer can read as text: a digest of the actions, console errors and failed requests, a filmstrip, and the accessibility tree at any moment.
- A markdown version of each page, for pasting into a pull request, an issue or Slack.

## Requirements

- Node.js 20 or later
- A Currents API key with write access: Dashboard → Organization settings → API keys
- A Currents project ID
- Public share links turned on for the organization: Organization settings → AI and data

## Run it

```bash
npm install
npx playwright install chromium
npm run serve            # serves the page on http://localhost:4173
```

In another terminal:

```bash
export CURRENTS_API_KEY=<api key>

# 1. Record the bug
npx currents session start --project-id <project id> \
  --title "Lowercase discount code freezes checkout" \
  --status failed --error "Apply stays on Applying… after save10"
node capture.mjs before
npx currents session attach evidence/before --caption "before"
npx currents session share --expires-in-days 7

# 2. Fix app.js, then record the fix
npx currents session start --project-id <project id> \
  --title "Lowercase discount code applies 10% off" --status passed
node capture.mjs after
npx currents session attach evidence/after --caption "after"
npx currents session share --expires-in-days 7
```

`session start` records the commit and branch of the repository you run it in. Add `--pr <url>` to link the session to a pull request.

`session share` prints the page link and a markdown link. Post the page link, and diff the two accessibility files to show what changed:

```bash
diff evidence/before/before-a11y.txt evidence/after/after-a11y.txt
```

## Without the CLI: the Currents MCP server

An agent connected to the [Currents MCP server](https://docs.currents.dev/ai/mcp-server) records the same session with tools instead of commands:

1. `currents-create-session` with the project ID, title, status and one entry per file (name, content type, type, size). It returns an upload URL per file.
2. Upload each file to its URL.
3. `currents-create-evidence-links` with the session ID and the trace's attachment ID returns the trace digest, filmstrip and animation links.
4. `currents-create-share-link` with the session ID returns the page link.

`currents-add-attachments` adds files to a session that already exists.
