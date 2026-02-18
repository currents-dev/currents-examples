# Currents Coverage with Playwright

Playwright [code coverage](https://docs.currents.dev/guides/coverage) for Currents.

This is a simple NextJS application. It uses Babel and Instanbul for instrumentating the code, then Playwright runs a set of e2e tests and send the results to Currents for post-processing.

![currents-2024-11-21-16 21 20@2x](https://github.com/user-attachments/assets/2e2fb1da-31fa-43a7-b84e-670ce1b88c09)

## Setup

- Install dependencies with `npm install`
- Update `playwright.config.ts` with Currents [record key](https://docs.currents.dev/guides/record-key) and [project id](https://docs.currents.dev/dashboard/projects/project-settings)
- Run `npm run test` for running tests, behind the scenes:

  - starts NextJS in dev mode
  - runs playwright tests
  - send coverage reports to Currents for post-processing

## Examples

- Run `npm run test:e2e` for using [`pwc`](https://docs.currents.dev/getting-started/playwright/you-first-playwright-run#using-the-cli) command
- Run `npm run test:e2e:pwc-p` for [orchestrated](https://docs.currents.dev/guides/parallelization-guide/pw-parallelization/playwright-orchestration) runs

## Licence

MIT License
