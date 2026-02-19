# Currents Examples

Organized by **framework** and **category** with a maximum folder depth of 2 under `/examples`.

Each example is represented by repo-prefixed files in its category folder:

- `<repo>__README.md`: detailed explanation (what it does, how it is used, implementation guidance, and import summary).
- `<repo>__source__*.md`: markdown files copied from the source repository.
- `<repo>__content__*`: full tracked repository files copied from the source repository.
- `<repo>__content-map.md`: mapping of original paths to copied file names.
- `<repo>__analysis.md`: local audit notes preserved for reference.

## Organization for review

| Repository | Framework | Category | Original use case | Main file | Source `.md` files copied | Total repo files copied |
| --- | --- | --- | --- | --- | ---: | ---: |
| `aws-codebuild-example` | `cypress` | `ci` | `ci/aws-codebuild` | [`aws-codebuild-example__README.md`](cypress/ci/aws-codebuild-example__README.md) | 1 | 25 |
| `azure-devops-example` | `cypress` | `ci` | `ci/azure-devops` | [`azure-devops-example__README.md`](cypress/ci/azure-devops-example__README.md) | 1 | 52 |
| `circleci-example` | `cypress` | `ci` | `ci/circleci` | [`circleci-example__README.md`](cypress/ci/circleci-example__README.md) | 1 | 24 |
| `currents-netlify-example` | `cypress` | `ci` | `ci/netlify` | [`currents-netlify-example__README.md`](cypress/ci/currents-netlify-example__README.md) | 1 | 17 |
| `gh-actions-example` | `cypress` | `ci` | `ci/github-actions` | [`gh-actions-example__README.md`](cypress/ci/gh-actions-example__README.md) | 1 | 24 |
| `gh-matrix-job-url-example` | `cypress` | `ci` | `ci/github-actions` | [`gh-matrix-job-url-example__README.md`](cypress/ci/gh-matrix-job-url-example__README.md) | 1 | 54 |
| `currents-cypress-cucumber-example` | `cypress` | `features` | `features/cucumber` | [`currents-cypress-cucumber-example__README.md`](cypress/features/currents-cypress-cucumber-example__README.md) | 1 | 14 |
| `currents-nx-example` | `cypress` | `workspace` | `workspace/nx` | [`currents-nx-example__README.md`](cypress/workspace/currents-nx-example__README.md) | 1 | 49 |
| `currents-jest-github-actions-example` | `generic-reporter` | `jest` | `jest` | [`currents-jest-github-actions-example__README.md`](generic-reporter/jest/currents-jest-github-actions-example__README.md) | 1 | 10 |
| `currents-junit-xml-example` | `generic-reporter` | `junit` | `junit` | [`currents-junit-xml-example__README.md`](generic-reporter/junit/currents-junit-xml-example__README.md) | 7 | 53 |
| `currents-nodejs-github-actions-example` | `generic-reporter` | `junit` | `junit` | [`currents-nodejs-github-actions-example__README.md`](generic-reporter/junit/currents-nodejs-github-actions-example__README.md) | 1 | 16 |
| `circleci-pw-example` | `playwright` | `ci` | `ci/circleci` | [`circleci-pw-example__README.md`](playwright/ci/circleci-pw-example__README.md) | 1 | 12 |
| `jenkins-last-failed` | `playwright` | `ci` | `ci/jenkins` | [`jenkins-last-failed__README.md`](playwright/ci/jenkins-last-failed__README.md) | 1 | 11 |
| `playwright-aws-codebuild-example` | `playwright` | `ci` | `ci/aws-codebuild` | [`playwright-aws-codebuild-example__README.md`](playwright/ci/playwright-aws-codebuild-example__README.md) | 1 | 28 |
| `playwright-azure-devops-example` | `playwright` | `ci` | `ci/azure-devops` | [`playwright-azure-devops-example__README.md`](playwright/ci/playwright-azure-devops-example__README.md) | 3 | 31 |
| `playwright-gh-actions-demo` | `playwright` | `ci` | `ci/github-actions` | [`playwright-gh-actions-demo__README.md`](playwright/ci/playwright-gh-actions-demo__README.md) | 2 | 53 |
| `playwright-jenkins-example` | `playwright` | `ci` | `ci/jenkins` | [`playwright-jenkins-example__README.md`](playwright/ci/playwright-jenkins-example__README.md) | 0 | 4 |
| `blog-playwright-coverage-demo` | `playwright` | `features` | `features/coverage` | [`blog-playwright-coverage-demo__README.md`](playwright/features/blog-playwright-coverage-demo__README.md) | 0 | 17 |
| `currents-actions-example` | `playwright` | `features` | `features/actions` | [`currents-actions-example__README.md`](playwright/features/currents-actions-example__README.md) | 1 | 14 |
| `currents-playwright-bdd-cucumber-example` | `playwright` | `features` | `features/bdd-cucumber` | [`currents-playwright-bdd-cucumber-example__README.md`](playwright/features/currents-playwright-bdd-cucumber-example__README.md) | 1 | 16 |
| `currents-playwright-component-tests-example` | `playwright` | `features` | `features/component-testing` | [`currents-playwright-component-tests-example__README.md`](playwright/features/currents-playwright-component-tests-example__README.md) | 1 | 22 |
| `currents-playwright-coverage-example` | `playwright` | `features` | `features/coverage` | [`currents-playwright-coverage-example__README.md`](playwright/features/currents-playwright-coverage-example__README.md) | 1 | 55 |
| `currents-playwright-orchestration-example` | `playwright` | `features` | `features/orchestration` | [`currents-playwright-orchestration-example__README.md`](playwright/features/currents-playwright-orchestration-example__README.md) | 1 | 90 |
| `currents-playwright-nx-example` | `playwright` | `workspace` | `workspace/nx` | [`currents-playwright-nx-example__README.md`](playwright/workspace/currents-playwright-nx-example__README.md) | 1 | 34 |
| `currents-playwright-pnpm-example` | `playwright` | `workspace` | `workspace/pnpm` | [`currents-playwright-pnpm-example__README.md`](playwright/workspace/currents-playwright-pnpm-example__README.md) | 1 | 12 |
| `currents-pnpm` | `playwright` | `workspace` | `workspace/pnpm` | [`currents-pnpm__README.md`](playwright/workspace/currents-pnpm__README.md) | 1 | 11 |
