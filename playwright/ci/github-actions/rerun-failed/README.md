# Rerun Failed Tests

This directory shows how to rerun only the tests that failed in the previous CI run, saving time and resources.

## Workflows

| Workflow | Description |
| :--- | :--- |
| [`rerun-shards-pwc.yml`](../.github/workflows/rerun-shards-pwc.yml) | Rerun failed tests using `pwc` |
| [`rerun-shards-reporter.yml`](../.github/workflows/rerun-shards-reporter.yml) | Rerun failed tests using Reporter |
| [`reruns-or8n.yml`](../.github/workflows/reruns-or8n.yml) | Rerun failed tests with Orchestration |

## How it works

These workflows use the [`currents-dev/playwright-last-failed`](https://github.com/currents-dev/playwright-last-failed) action.

1.  **Identify Failures**: The action fetches the list of failed tests from the previous run using Currents API.
2.  **Generate Flags**: It constructs the CLI flags (e.g., `--grep` or file list) to run only those tests.
3.  **Execute**: The workflow runs Playwright with the generated flags.
