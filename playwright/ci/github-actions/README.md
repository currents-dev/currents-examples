# Playwright on GitHub Actions

<p align="center">
  <img width="830" src="https://static.currents.dev/currents-playwright-banner-gh.png" />
</p>

Examples demonstrating how to run Playwright tests on GitHub Actions with Currents.

## Examples

| Example                                      | Description                                             | Folder                             |
| :------------------------------------------- | :------------------------------------------------------ | :--------------------------------- |
| [**Basic Setup**](setup-ci/README.md)        | Standard CI setup with sharding and reporting           | [`setup-ci/`](setup-ci/)           |
| [**Orchestration**](orchestration/README.md) | Optimized parallel execution with load balancing        | [`orchestration/`](orchestration/) |
| [**Rerun Failed**](rerun-failed/README.md)   | Workflow to rerun only failed tests from previous build | [`rerun-failed/`](rerun-failed/)   |
| [**Visual Testing**](argos/README.md)        | Integration with Argos for visual regression testing    | [`argos/`](argos/)                 |

## Prerequisites

1.  **Currents Account**: Get your `Record Key` and `Project ID` from [Currents Dashboard](https://app.currents.dev).
2.  **GitHub Secrets**: Set `CURRENTS_RECORD_KEY` in your repository secrets.
3.  **Project ID**: Update the workflows or environment variables with your Project ID (or use `CURRENTS_PROJECT_ID` secret).

## Directory Structure

- `.github/workflows/`: Contains all the YAML workflow files.
- `setup-ci/`: Basic test suite and configuration.
- `orchestration/`: Configuration for orchestration.
- `rerun-failed/`: Documentation for rerun workflows.
- `argos/`: Dedicated test suite for visual testing.

## Results

The results are being reported to Currents for more efficient troubleshooting, and monitoring test suite flakiness and performance.

Currents will collect the following information:

- console output
- screenshots
- videos
- trace files
- timing
- outcomes
- flaky tests
- error details
- tags for more convenient management of the tests

### Currents Dashboard Results

Here's how the results are being displayed in Currents dashboard.

https://github.com/currents-dev/playwright-gh-actions-demo/assets/1637928/3a95c8d5-a4c1-44a6-be59-24fefb79b354

### PR Comment and Git Commit Status

Currents will add inline information to GitHub Pull Request.

- a comment containing run results summary
  ![gh-actions-comment](https://github.com/currents-dev/playwright-gh-actions-demo/assets/1637928/6e9c11d3-8f92-4e2c-a70d-391bc04d2d52)

- git commit status check for each detected project
  ![gh-actions-status](https://github.com/currents-dev/playwright-gh-actions-demo/assets/1637928/d2a54c2d-befa-42d6-ac0a-96cbd387fc53)

## Additional Resources

- [Playwright Features on Currents](https://currents.dev/playwright)
- [Integration Documentation](https://currents.dev/readme/integration-with-playwright/currents-playwright)
- [CI Build ID Guide](https://docs.currents.dev/guides/parallelization-guide/ci-build-id)
