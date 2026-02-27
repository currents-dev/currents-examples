# Currents Examples

Welcome to the **Currents Examples** directory. This collection showcases how to integrate [Currents](https://currents.dev) with various testing frameworks and CI/CD providers.

## 🎭 Playwright

Examples demonstrating Playwright integration with Currents, including sharding, orchestration, and CI setup.

| Example | Description | CI/Tool |
| :--- | :--- | :--- |
| [**AWS CodeBuild**](playwright/aws-codebuild/) | Run Playwright tests in AWS CodeBuild | AWS CodeBuild |
| [**Azure DevOps**](playwright/azure-devops/) | Integration with Azure DevOps pipelines | Azure DevOps |
| [**CircleCI**](playwright/circleci/) | Run Playwright tests in CircleCI | CircleCI |
| [**GitHub Actions**](playwright/github-actions/) | Comprehensive GitHub Actions workflow | GitHub Actions |
| [**Jenkins**](playwright/jenkins/jenkins-last-failed/) | Advanced Jenkins setup with Docker, Sharding, and "Last Failed" rerun | Jenkins |
| [**BDD / Cucumber**](playwright/bdd-cucumber/) | Using `playwright-bdd` with Currents | Cucumber |
| [**Component Testing**](playwright/component-testing/) | Playwright Component Testing (React) | React |
| [**Code Coverage (Instrumented)**](playwright/coverage/instrumented-coverage/) | Collecting and reporting instrumented code coverage | Coverage |
| [**Code Coverage (Raw V8)**](playwright/coverage/raw-v8-coverage/) | Collecting and reporting raw V8 code coverage | Coverage |
| [**Orchestration**](playwright/orchestration/) | Using Currents Orchestration for parallel execution | Orchestration |
| [**Nx Monorepo**](playwright/nx/) | Playwright in an Nx workspace | Nx |
| [**pnpm**](playwright/pnpm/) | Using pnpm package manager | pnpm |

## 🌲 Cypress

Examples demonstrating Cypress integration with Currents.

| Example | Description | CI/Tool |
| :--- | :--- | :--- |
| [**AWS CodeBuild**](cypress/aws-codebuild/) | Run Cypress tests in AWS CodeBuild | AWS CodeBuild |
| [**Azure DevOps**](cypress/azure-devops/) | Integration with Azure DevOps pipelines | Azure DevOps |
| [**CircleCI**](cypress/circleci/) | Run Cypress tests in CircleCI | CircleCI |
| [**GitHub Actions**](cypress/github-actions/) | Standard GitHub Actions workflow | GitHub Actions |
| [**Netlify**](cypress/netlify/) | Integration with Netlify Build | Netlify |
| [**Cucumber**](cypress/cucumber/) | Cypress with Cucumber preprocessor | Cucumber |
| [**Nx Monorepo**](cypress/nx/) | Cypress in an Nx workspace | Nx |

## 📊 Generic Reporters

Examples for other test runners using Currents' generic reporters.

| Example | Description | Framework |
| :--- | :--- | :--- |
| [**Jest**](generic-reporter/jest/github-actions/) | Reporting Jest results to Currents | Jest |
| [**JUnit XML**](generic-reporter/junit/junit-xml/) | Uploading generic JUnit XML reports | JUnit |
| [**Node.js / JUnit**](generic-reporter/junit/nodejs-github-actions/) | Node.js project reporting JUnit results | Node.js |
