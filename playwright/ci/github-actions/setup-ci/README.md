# Basic CI Setup with Currents

This directory contains examples for setting up Playwright tests with Currents in GitHub Actions using basic sharding.

## GitHub Actions Workflows

| Workflow                                                                                            | Description                                | Method                            |
| :-------------------------------------------------------------------------------------------------- | :----------------------------------------- | :-------------------------------- |
| [`test-basic-pwc.yml`](../.github/workflows/test-basic-pwc.yml)                                     | Run tests using `pwc` CLI wrapper          | CLI (`npx pwc`)                   |
| [`test-basic-reporter.yml`](../.github/workflows/test-basic-reporter.yml)                           | Run tests using Playwright Reporter config | Reporter (`playwright.config.ts`) |
| [`test-basic-reporter-with-summary.yml`](../.github/workflows/test-basic-reporter-with-summary.yml) | Same as above + GitHub Summary             | Reporter                          |

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

- `playwright.config.ts` - standard Playwright config with Currents
- `playwright.config.argos.ts` - using Currents Orchestration together with Argos CI
