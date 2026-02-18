# 🎭 Currents - Playwright - Azure DevOps

This repository showcases running [Playwright](https://playwright.dev/) tests on Azure DevOps, while using [Currents](https://currents.dev) as the reporting dashboard.

<p align="center">
  <img width="830" src="https://static.currents.dev/currents-playwright-banner-gh.png" />
</p>

## Documentation

The repo contains a few Playwright tests with one test that always fails (intentionally). The example configuration files use [Matrix Execution Strategy](https://learn.microsoft.com/en-us/azure/devops/pipelines/yaml-schema/jobs-job-strategy?view=azure-pipelines#strategy-matrix-maxparallel) to run 3 containers for parallelization.

To reproduce the setup:

- Connect a new/existing Azure Pipeline to a repository containing your Playwright tests
- Create an organization, get your **Record Key** and **Project Id** at https://app.currents.dev
- Create or modify an existing [Variable Group](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops&tabs=yaml), and add a new secret variable called `CURRENTS_RECORD_KEY` with your **Record Key**.
- Include your **Project Id** in an env variable called `CURRENTS_PROJECT_ID` in your pipeline configuration

See the example Azure pipeline configuration:

- [azure-pipelines.yml](azure-pipelines.yml)
- [azure-pipelines-reporter.yml](azure-pipelines-reporter.yml)

Additional resources:

- Playwright Features on Currents: https://currents.dev/playwright
- Integration Documentation: https://currents.dev/readme/integration-with-playwright/currents-playwright
- CI Build ID Guide: https://currents.dev/readme/guides/cypress-ci-build-id

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
