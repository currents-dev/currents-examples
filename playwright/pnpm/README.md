# Playwright with pnpm

- **Framework:** `playwright`
- **Use case:** `workspace/pnpm`
- **Source repository:** Consolidated from `currents-playwright-pnpm-example` and `currents-pnpm`

## What this example does

This example demonstrates how to use **Currents** with **Playwright** in a **pnpm** workspace. It includes two sets of tests:
1.  **Basic Tests** (`tests/basic/`): Standard Playwright tests demonstrating basic usage and visual diffs (some tests are designed to fail for demonstration).
2.  **Chromatic Integration** (`tests/chromatic/`): Tests demonstrating integration with **Chromatic** for visual testing alongside Currents.

## Key Features

- **Currents Orchestration**: Uses `pwc-p` for orchestrating tests.
- **GitHub Actions Integration**: Includes a workflow `.github/workflows/integration.yml` for CI execution.
- **Visual Testing**:
    - Standard Playwright visual snapshots (in `tests/basic`).
    - Chromatic visual testing (in `tests/chromatic`).
- **Artifacts**: Configured to upload artifacts (screenshots, videos, traces).

## Usage

### Setup
```bash
pnpm install
```

### Run Tests Locally

**Run all tests:**
```bash
pnpm test
```

**Run basic tests only:**
```bash
pnpm run test:basic
```

**Run Chromatic tests only:**
```bash
pnpm run test:chromatic
```

**Run with Currents Orchestration:**
```bash
export CURRENTS_RECORD_KEY=<your_key>
export CURRENTS_PROJECT_ID=<your_project_id>
pnpm run pwc-p
```

### GitHub Actions

The included workflow `.github/workflows/integration.yml` demonstrates:
- Installing dependencies with pnpm.
- Running tests with `pwc-p` and the blob reporter.
- Merging blob reports into an HTML report.
- Uploading artifacts.
- Running Chromatic visual tests in a separate job.

## Configuration

- **playwright.config.ts**: Configured to look for tests in the `tests/` directory.
- **currents.config.ts**: Configures Currents project ID and record key from environment variables.

## Notes

- The `tests/basic` directory contains tests that may fail intentionally (e.g., `failing test`) to demonstrate reporting capabilities.
- The `tests/chromatic` directory requires Chromatic configuration if you want to use the visual testing features fully.
