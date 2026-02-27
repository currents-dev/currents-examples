# Basic CI Setup with Currents

This directory contains examples for setting up Playwright tests with Currents in GitHub Actions using basic sharding.

## Workflows

| Workflow | Description | Method |
| :--- | :--- | :--- |
| [`test-basic-pwc.yml`](../.github/workflows/test-basic-pwc.yml) | Run tests using `pwc` CLI wrapper | CLI (`npx pwc`) |
| [`test-basic-reporter.yml`](../.github/workflows/test-basic-reporter.yml) | Run tests using Playwright Reporter config | Reporter (`playwright.config.reporter.ts`) |
| [`test-basic-reporter-with-summary.yml`](../.github/workflows/test-basic-reporter-with-summary.yml) | Same as above + GitHub Summary | Reporter |

## How it works

These workflows demonstrate how to:
1.  Install dependencies (Playwright, browsers).
2.  Run tests in parallel using GitHub Actions Matrix strategy.
3.  Report results to Currents.

### Sharding
The workflows use `shard: [1, 2, 3]` matrix to split tests across 3 machines.
- **CLI Mode**: `npx pwc --shard=${{ matrix.shard }}/${{ strategy.job-total }}`
- **Reporter Mode**: `npx playwright test --shard=${{ matrix.shard }}/${{ strategy.job-total }}`

## Configuration
Tests are located in this directory (`setup-ci`).
- `playwright.config.ts`: Standard Playwright config.
- `playwright.config.reporter.ts`: Config with Currents reporter enabled.
