# Playwright Component testing with Currents

Run [Playwright Component testing](https://playwright.dev/docs/test-components) and report the results to [Currents](https://currents.dev/playwright)

> **Note November 2023:** Playwright support for Component testing is still experimental

The project contains simple component tests:

- `src/App.spec.jsx` - a passing test
- `src/AppFailing.spec.jsx` - a failing test

## Setup

- First run `npm i`
- Create an account and project at https://app.currents.dev
- Grab the following details:
  - `projectId`
  - `recordKey`

## Run

Run `pwc` command:

`npx pwc --key <recordKey> --project-id <projectId> --ci-build-id hello-currents`

- Explore `playwright-ct.config.js` and note that screenshots, videos and trace are activated
- Explore more about [CI Build Id](https://currents.dev/readme/guides/cypress-ci-build-id)

Running the command would produce an output that is similar to this:

![currents-2023-11-02-15 32 59@2x](https://github.com/currents-dev/currents-playwright-component-tests-example/assets/1637928/d270a5f0-2fb0-41e0-b2b0-667db7d6ee7e)

The results will be reported to Currents Dashboard:

![demo-currents-pw-ct](https://github.com/currents-dev/currents-playwright-component-tests-example/assets/1637928/a7b95888-416d-407e-bf00-833f893765a7)

## Explore `@currents/playwright` integration options

Follow our documentation to explore integration options:
https://currents.dev/readme/integration-with-playwright/currents-playwright

- Applying tags for better tests managing
- Create additional projects
- Explore
