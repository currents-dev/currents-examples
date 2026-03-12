# Playwright on Buildkite

Example for running Playwright tests with Currents on Buildkite.

**Public Pipeline:** https://buildkite.com/andrew-goldis/currents-buildkite

## How it works

The pipeline demonstrates how to:
1. Run tests inside the official Playwright Docker image.
2. Install dependencies and Chromium browser.
3. Run tests in parallel using Buildkite's `parallelism` feature (3 shards).
4. Report results to Currents via the reporter configured in `playwright.config.ts`.

### Sharding

Buildkite provides `BUILDKITE_PARALLEL_JOB` (0-indexed) and `BUILDKITE_PARALLEL_JOB_COUNT` environment variables. Since Playwright shards are 1-indexed, the pipeline computes `BUILDKITE_PARALLEL_JOB + 1` for the shard index:

```bash
npx playwright test --shard=$((BUILDKITE_PARALLEL_JOB + 1))/$BUILDKITE_PARALLEL_JOB_COUNT
```

## Configuration

- `playwright.config.ts`: Playwright config with Currents reporter enabled.
- `.buildkite/pipeline.yml`: Buildkite pipeline definition.

## Environment Variables

Set `CURRENTS_RECORD_KEY` using [Buildkite Secrets](https://buildkite.com/docs/pipelines/security/secrets/buildkite-secrets).
