# Currents Examples

Welcome to the **Currents Examples** directory. This collection showcases how to integrate [Currents](https://currents.dev) with various testing frameworks and CI/CD providers.

## 🎭 Playwright

Examples demonstrating Playwright integration with Currents, including sharding, orchestration, and CI setup.

| Example | Description | CI/Tool |
| :--- | :--- | :--- |
| [**AWS CodeBuild**](playwright/aws-codebuild/playwright-aws-codebuild-example/README.md) | Run Playwright tests in AWS CodeBuild | AWS CodeBuild |
| [**Azure DevOps**](playwright/azure-devops/playwright-azure-devops-example/README.md) | Integration with Azure DevOps pipelines | Azure DevOps |
| [**CircleCI**](playwright/circleci/circleci-pw-example/README.md) | Run Playwright tests in CircleCI | CircleCI |
| [**GitHub Actions**](playwright/github-actions/playwright-gh-actions-demo/README.md) | Comprehensive GitHub Actions workflow | GitHub Actions |
| [**GitHub Actions (Basic)**](playwright/actions/currents-actions-example/README.md) | Simple GitHub Actions setup | GitHub Actions |
| [**Jenkins**](playwright/jenkins/jenkins-last-failed/README.md) | Advanced Jenkins setup with Docker, Sharding, and "Last Failed" rerun | Jenkins |
| [**BDD / Cucumber**](playwright/bdd-cucumber/currents-playwright-bdd-cucumber-example/README.md) | Using `playwright-bdd` with Currents | Cucumber |
| [**Component Testing**](playwright/component-testing/currents-playwright-component-tests-example/README.md) | Playwright Component Testing (React) | React |
| [**Code Coverage**](playwright/coverage/currents-playwright-coverage-example/README.md) | Collecting and reporting code coverage | Coverage |
| [**Code Coverage (Blog Demo)**](playwright/coverage/blog-playwright-coverage-demo/README.md) | Demo for the Code Coverage blog post | Coverage |
| [**Orchestration**](playwright/orchestration/currents-playwright-orchestration-example/README.md) | Using Currents Orchestration for parallel execution | Orchestration |
| [**Nx Monorepo**](playwright/nx/currents-playwright-nx-example/README.md) | Playwright in an Nx workspace | Nx |
| [**pnpm**](playwright/pnpm/currents-playwright-pnpm-example/README.md) | Using pnpm package manager | pnpm |
| [**pnpm (Basic)**](playwright/pnpm/currents-pnpm/README.md) | Basic pnpm setup | pnpm |

## 🌲 Cypress

Examples demonstrating Cypress integration with Currents.

| Example | Description | CI/Tool |
| :--- | :--- | :--- |
| [**AWS CodeBuild**](cypress/aws-codebuild/aws-codebuild-example/README.md) | Run Cypress tests in AWS CodeBuild | AWS CodeBuild |
| [**Azure DevOps**](cypress/azure-devops/azure-devops-example/README.md) | Integration with Azure DevOps pipelines | Azure DevOps |
| [**CircleCI**](cypress/circleci/circleci-example/README.md) | Run Cypress tests in CircleCI | CircleCI |
| [**GitHub Actions**](cypress/github-actions/gh-actions-example/README.md) | Standard GitHub Actions workflow | GitHub Actions |
| [**GitHub Matrix Strategy**](cypress/github-actions/gh-matrix-job-url-example/README.md) | Using GitHub Matrix strategy for parallelization | GitHub Actions |
| [**Netlify**](cypress/netlify/currents-netlify-example/README.md) | Integration with Netlify Build | Netlify |
| [**Cucumber**](cypress/cucumber/currents-cypress-cucumber-example/README.md) | Cypress with Cucumber preprocessor | Cucumber |
| [**Nx Monorepo**](cypress/nx/currents-nx-example/README.md) | Cypress in an Nx workspace | Nx |

## 📊 Generic Reporters

Examples for other test runners using Currents' generic reporters.

| Example | Description | Framework |
| :--- | :--- | :--- |
| [**Jest**](generic-reporter/jest/currents-jest-github-actions-example/README.md) | Reporting Jest results to Currents | Jest |
| [**JUnit XML**](generic-reporter/junit/currents-junit-xml-example/README.md) | Uploading generic JUnit XML reports | JUnit |
| [**Node.js / JUnit**](generic-reporter/junit/currents-nodejs-github-actions-example/README.md) | Node.js project reporting JUnit results | Node.js |
