# Playwright on Buildkite

Examples for running Playwright tests with Currents on Buildkite.

## Pipeline Steps

| Step | Description | Method |
| :--- | :--- | :--- |
| `Playwright Tests - pwc` | Run tests using `pwc` CLI wrapper | CLI (`npx pwc`) |
| `Playwright Tests - Reporter` | Run tests using Playwright Reporter config | Reporter (`playwright.config.ts`) |

## How it works

The pipeline demonstrates how to:
1. Install dependencies (Playwright, browsers).
2. Run tests in parallel using Buildkite's `parallelism` feature.
3. Report results to Currents.

### Sharding

Buildkite provides `BUILDKITE_PARALLEL_JOB` (0-indexed) and `BUILDKITE_PARALLEL_JOB_COUNT` environment variables. Since Playwright shards are 1-indexed, the pipeline computes `BUILDKITE_PARALLEL_JOB + 1` for the shard index:

```bash
npx pwc --shard=$((BUILDKITE_PARALLEL_JOB + 1))/$BUILDKITE_PARALLEL_JOB_COUNT
```

## Configuration

- `playwright.config.ts`: Playwright config with Currents reporter enabled.

## Environment Variables

Set `CURRENTS_RECORD_KEY` as a pipeline-level secret in your Buildkite dashboard or via the Buildkite Secrets plugin.
