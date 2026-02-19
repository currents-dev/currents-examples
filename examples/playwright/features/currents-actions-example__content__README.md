# Currents Actions with Playwright

[Currents Actions](https://docs.currents.dev/guides/currents-actions) for Playwright.

This is a simple example Playwright test project, that shows the different ways to configure the Currents Playwright fixtures to apply Actions.


## Setup

- Install dependencies with `npm install`
- Update `playwright.config.ts` with Currents [record key](https://docs.currents.dev/guides/record-key) and [project id](https://docs.currents.dev/dashboard/projects/project-settings)
- Run `npm run test` for running tests, behind the scenes:
  - runs playwright tests
  - applied Currents Actions during the run
  - sends results to the Currents dashboard
 
## Actions Creation

Actions are created in the Currents Dashboard (see https://docs.currents.dev/guides/automation-rules#creating-rules-in-currents for more info)

![actions-show](https://github.com/user-attachments/assets/24b16c4a-cf77-42fd-a91d-eda8cb93e88d)

![create-action](https://github.com/user-attachments/assets/64c53638-0bee-4257-b521-ef840e525ae7)

## Examples

- Run `npm run test` for using [`playwight test`](https://docs.currents.dev/getting-started/playwright/you-first-playwright-run#using-reporter-configuration) command with Currents loaded as a reporter
- Run `npm run test:pwc` for using [`pwc`](https://docs.currents.dev/getting-started/playwright/you-first-playwright-run#using-the-cli) command
- Run `npm run test:pwc-p` for [orchestrated](https://docs.currents.dev/guides/parallelization-guide/pw-parallelization/playwright-orchestration) runs

## Licence

MIT License
