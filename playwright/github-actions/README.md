# Playwright on GitHub Actions

Examples demonstrating how to run Playwright tests on GitHub Actions with Currents.

## Examples

| Example | Description | Folder |
| :--- | :--- | :--- |
| [**Basic Setup**](setup-ci/README.md) | Standard CI setup with sharding and reporting | [`setup-ci/`](setup-ci/) |
| [**Orchestration**](orchestration/README.md) | Optimized parallel execution with load balancing | [`orchestration/`](orchestration/) |
| [**Rerun Failed**](rerun-failed/README.md) | Workflow to rerun only failed tests from previous build | [`rerun-failed/`](rerun-failed/) |
| [**Visual Testing**](argos/README.md) | Integration with Argos for visual regression testing | [`argos/`](argos/) |

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
