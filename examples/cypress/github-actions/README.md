# GitHub Actions Examples

This directory contains examples of running Cypress tests with Currents on GitHub Actions. It combines two different scenarios:

1.  **Basic GitHub Actions Setup**: Demonstrates how to run Cypress tests in parallel on GitHub Actions using `cypress-cloud`.
2.  **Matrix Job URL Capture**: Demonstrates how to capture the GitHub Actions Job URL and expose it to Cypress tests for debugging purposes.

## Prerequisites

Before running these examples, ensure you have:

-   A [Currents](https://currents.dev) account.
-   A Project ID from Currents.
-   A Record Key from Currents.

## 1. Basic GitHub Actions Setup

This example shows a standard setup for running Cypress tests in parallel using GitHub Actions matrix strategy and `cypress-cloud` for orchestration and recording.

### Key Features

-   **Parallelization**: Runs 3 parallel containers using GitHub Actions matrix strategy.
-   **Orchestration**: Uses `cypress-cloud` to distribute tests across containers.
-   **Browser**: Runs tests in Chrome.
-   **Cancellation**: Includes a step to cancel the run on Currents if the workflow is cancelled.
-   **Custom Build ID**: Generates a unique build ID based on the repository, run ID, and run attempt.

### Configuration Files

-   **Workflow**: `.github/workflows/currents.yml`
-   **Cypress Config**: `cypress.config.ts`
-   **Test Files**: `cypress/e2e/*.spec.js`

### How it Works

1.  The workflow triggers on `push`.
2.  It defines a matrix strategy with `containers: [1, 2, 3]`.
3.  It installs dependencies using `npx ci`.
4.  It installs a "block-free" version of Cypress to avoid potential blocking issues.
5.  It runs `cypress-cloud` with the `--parallel` flag.
6.  `cypress-cloud` communicates with Currents to receive the list of specs to run for each container.

### Running Locally

To run this example locally (without parallelization):

```bash
npx cypress-cloud run --record --key <YOUR_RECORD_KEY> --config-file cypress.config.ts
```

## 2. Matrix Job URL Capture

This example demonstrates how to capture the specific URL of the GitHub Actions job running the tests and expose it as an environment variable (`MATRIX_JOB_URL`). This is useful for linking back to the CI logs from the Currents dashboard or for debugging failures.

### Key Features

-   **Job URL Capture**: Uses `Tiryoh/gha-jobid-action` to fetch the current job's HTML URL.
-   **Environment Variable**: Sets `MATRIX_JOB_URL` for use in tests.
-   **Custom Config**: Uses a separate configuration file `cypress.matrix.config.js` to log the captured URL.

### Configuration Files

-   **Workflow**: `.github/workflows/matrix-job-url.yml`
-   **Cypress Config**: `cypress.matrix.config.js`
-   **Test Files**: `cypress/integration/*.spec.js`

### How it Works

1.  The workflow triggers on `push`.
2.  It defines a matrix strategy with `containers: [1, 2, 3]`.
3.  It uses the `Tiryoh/gha-jobid-action` to get the job ID and constructs the URL.
4.  It exports the URL as `MATRIX_JOB_URL`.
5.  It runs `npx currents run` pointing to `cypress.matrix.config.js`.
6.  The `cypress.matrix.config.js` file has a `before:spec` hook that logs the `MATRIX_JOB_URL` to the console.

### Running Locally

To run this example locally (without the job URL, as it's CI-specific):

```bash
npx currents run --record --key <YOUR_RECORD_KEY> --config-file cypress.matrix.config.js
```

## Setup & Usage

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Configure Secrets**:
    Add the following secrets to your GitHub repository:
    -   `CURRENTS_RECORD_KEY`: Your Currents Record Key.
    -   `CURRENTS_API_KEY`: Your Currents API Key (required for the cancellation step in the basic example).

3.  **Update Project ID**:
    Update the `projectId` in `currents.config.js` (for the basic example) and `cypress.matrix.config.js` (for the matrix example) to match your Currents project ID.

    **currents.config.js**:
    ```javascript
    module.exports = {
      projectId: "YOUR_PROJECT_ID", // Update this
    };
    ```

    **cypress.matrix.config.js**:
    ```javascript
    module.exports = defineConfig({
      // ...
      projectId: "YOUR_PROJECT_ID", // Update this
      // ...
    });
    ```
