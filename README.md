# Currents Examples

Welcome to the **Currents Examples** directory. This collection showcases how to integrate [Currents](https://currents.dev) with various testing frameworks and CI/CD providers.

## 🎭 Playwright

Examples demonstrating Playwright integration with Currents, including sharding, orchestration, and CI setup.

### CI

| Example                                                   | Description                                                           |
| :-------------------------------------------------------- | :-------------------------------------------------------------------- |
| [**AWS CodeBuild**](playwright/ci/aws-codebuild/)         | Run Playwright tests in AWS CodeBuild                                 |
| [**Azure DevOps**](playwright/ci/azure-devops/)           | Integration with Azure DevOps pipelines                               |
| [**Buildkite**](playwright/ci/buildkite/)                 | Run Playwright tests in Buildkite                                     |
| [**CircleCI**](playwright/ci/circleci/)                   | Run Playwright tests in CircleCI                                      |
| [**GitHub Actions**](playwright/ci/github-actions/)       | Comprehensive GitHub Actions workflow                                 |
| [**GitHub Actions — Basic Setup**](playwright/ci/github-actions/setup-ci/)       | Standard CI setup with sharding and reporting            |
| [**GitHub Actions — Orchestration**](playwright/ci/github-actions/orchestration/) | Optimized parallel execution with load balancing         |
| [**GitHub Actions — Rerun Failed**](playwright/ci/github-actions/rerun-failed/)   | Rerun only failed tests from a previous build            |
| [**GitHub Actions — Visual Testing**](playwright/ci/github-actions/argos/)        | Integration with Argos for visual regression testing     |
| [**Jenkins**](playwright/ci/jenkins/jenkins-last-failed/) | Advanced Jenkins setup with Docker, Sharding, and "Last Failed" rerun |
| [**Nx Monorepo**](playwright/ci/nx/)                      | Playwright in an Nx workspace                                         |

### Features

| Example                                                                             | Description                                         |
| :---------------------------------------------------------------------------------- | :-------------------------------------------------- |
| [**BDD / Cucumber**](playwright/bdd-cucumber/)                                      | Using `playwright-bdd` with Currents                |
| [**Component Testing**](playwright/component-testing/)                              | Playwright Component Testing (React)                |
| [**Code Coverage (Instrumented)**](playwright/code-coverage/instrumented-coverage/) | Collecting and reporting instrumented code coverage |
| [**Code Coverage (Raw V8)**](playwright/code-coverage/raw-v8-coverage/)             | Collecting and reporting raw V8 code coverage       |
| [**Orchestration**](playwright/orchestration/)                                      | Using Currents Orchestration for parallel execution |
| [**pnpm**](playwright/pnpm/)                                                        | Using pnpm package manager                          |

## 🌲 Cypress

Examples demonstrating Cypress integration with Currents.

| Example                                       | Description                             |
| :-------------------------------------------- | :-------------------------------------- |
| [**AWS CodeBuild**](cypress/aws-codebuild/)   | Run Cypress tests in AWS CodeBuild      |
| [**Azure DevOps**](cypress/azure-devops/)     | Integration with Azure DevOps pipelines |
| [**CircleCI**](cypress/circleci/)             | Run Cypress tests in CircleCI           |
| [**GitHub Actions**](cypress/github-actions/) | Standard GitHub Actions workflow        |
| [**Netlify**](cypress/netlify/)               | Integration with Netlify Build          |
| [**Cucumber**](cypress/cucumber/)             | Cypress with Cucumber preprocessor      |
| [**Nx Monorepo**](cypress/nx/)                | Cypress in an Nx workspace              |

## 📊 Generic Reporters

Examples for other test runners using Currents' generic reporters.

| Example                                                              | Description                             |
| :------------------------------------------------------------------- | :-------------------------------------- |
| [**Jest**](generic-reporter/jest/github-actions/)                    | Reporting Jest results to Currents      |
| [**JUnit XML**](generic-reporter/junit/junit-xml/)                   | Uploading generic JUnit XML reports     |
| [**Node.js / JUnit**](generic-reporter/junit/nodejs-github-actions/) | Node.js project reporting JUnit results |
