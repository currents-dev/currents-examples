# Currents Examples

Welcome to the **Currents Examples** directory. This collection showcases how to integrate [Currents](https://currents.dev) with various testing frameworks and CI/CD providers.

## 🎭 Playwright

Examples demonstrating Playwright integration with Currents, including sharding, orchestration, and CI setup.

| Example | Description | CI/Tool |
| :--- | :--- | :--- |
| [**AWS CodeBuild**](playwright/aws-codebuild/README.md) | Run Playwright tests in AWS CodeBuild | AWS CodeBuild |
| [**Azure DevOps**](playwright/azure-devops/README.md) | Integration with Azure DevOps pipelines | Azure DevOps |
| [**CircleCI**](playwright/circleci/README.md) | Run Playwright tests in CircleCI | CircleCI |
| [**GitHub Actions**](playwright/github-actions/README.md) | Comprehensive GitHub Actions workflow | GitHub Actions |
| [**Jenkins**](playwright/jenkins/jenkins-last-failed/README.md) | Advanced Jenkins setup with Docker, Sharding, and "Last Failed" rerun | Jenkins |
| [**BDD / Cucumber**](playwright/bdd-cucumber/README.md) | Using `playwright-bdd` with Currents | Cucumber |
| [**Component Testing**](playwright/component-testing/README.md) | Playwright Component Testing (React) | React |
| [**Code Coverage (Instrumented)**](playwright/coverage/instrumented-coverage/README.md) | Collecting and reporting instrumented code coverage | Coverage |
| [**Code Coverage (Raw V8)**](playwright/coverage/raw-v8-coverage/README.md) | Collecting and reporting raw V8 code coverage | Coverage |
| [**Orchestration**](playwright/orchestration/README.md) | Using Currents Orchestration for parallel execution | Orchestration |
| [**Nx Monorepo**](playwright/nx/README.md) | Playwright in an Nx workspace | Nx |
| [**pnpm**](playwright/pnpm/README.md) | Using pnpm package manager | pnpm |

## 🌲 Cypress

Examples demonstrating Cypress integration with Currents.

| Example | Description | CI/Tool |
| :--- | :--- | :--- |
| [**AWS CodeBuild**](cypress/aws-codebuild/README.md) | Run Cypress tests in AWS CodeBuild | AWS CodeBuild |
| [**Azure DevOps**](cypress/azure-devops/README.md) | Integration with Azure DevOps pipelines | Azure DevOps |
| [**CircleCI**](cypress/circleci/README.md) | Run Cypress tests in CircleCI | CircleCI |
| [**GitHub Actions**](cypress/github-actions/README.md) | Standard GitHub Actions workflow | GitHub Actions |
| [**Netlify**](cypress/netlify/README.md) | Integration with Netlify Build | Netlify |
| [**Cucumber**](cypress/cucumber/README.md) | Cypress with Cucumber preprocessor | Cucumber |
| [**Nx Monorepo**](cypress/nx/README.md) | Cypress in an Nx workspace | Nx |

## 📊 Generic Reporters

Examples for other test runners using Currents' generic reporters.

| Example | Description | Framework |
| :--- | :--- | :--- |
| [**Jest**](generic-reporter/jest/github-actions/README.md) | Reporting Jest results to Currents | Jest |
| [**JUnit XML**](generic-reporter/junit/junit-xml/README.md) | Uploading generic JUnit XML reports | JUnit |
| [**Node.js / JUnit**](generic-reporter/junit/nodejs-github-actions/README.md) | Node.js project reporting JUnit results | Node.js |
