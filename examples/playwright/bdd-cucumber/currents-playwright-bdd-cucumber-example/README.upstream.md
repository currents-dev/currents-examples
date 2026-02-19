# Playwright + Currents + playwright-bdd (Cucumber)

This repository showcases running [Playwright](https://playwright.dev) + [Currents](https://currents.dev) + [playwright-bdd](https://github.com/vitalets/playwright-bdd) to run BDD tests, while using [Currents](https://currents.dev) as the reporting dashboard.

<p align="center">
  <img width="830" src="https://static.currents.dev/currents-playwright-banner-gh.png" />
</p>

## Why?

`cucumber-js` is a mature and popular test runner, however, it is different from the native Playwright test runner - those are not compatible. To utilize the native Playwright test runner with BDD it is suggested to use [playwright-bdd](https://github.com/vitalets/playwright-bdd).

Read more at: https://www.cy2pw.com/cucumber.

## Documentation

The repo contains a few BDD tests with one test that always fails (intentionally):

- [features/homepage.feature](features/homepage.feature) - has intentionally failing test
- [features/todopage.feature](features/todopage.feature)

To reproduce the setup:

- Create an organization, get your **Record Key** and **Project Id** at https://app.currents.dev

- Clone repo
- Install dependencies

  ```sh
  npm install
  ```

- Install browsers

  ```sh
  npx playwright install
  ```

- Set **Record Key** and **Project Id** in `playwright.config.ts`

- Run tests

  ```sh
  npm test
  ```

  Output:

  ```plain
   ===============================================
   Uploading results to Currents.dev...
   Cloud Run Finished: https://app.currents.dev/run/1f2e431c6d46675e
   ================================================
  ```

Additional resources:

- Playwright Features on Currents: https://currents.dev/playwright
- Integration Documentation: https://currents.dev/readme/integration-with-playwright/currents-playwright
- CI Build ID Guide: https://currents.dev/readme/guides/ci-build-id

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
- tags for more convenient management of the tests:

![currents-2024-01-24-15 26 34@2x](https://github.com/currents-dev/currents-playwright-bdd-cucumber-example/assets/1637928/44e38f3c-56f4-469e-884e-71a528ee4dca)

![currents-2024-01-24-15 29 19@2x](https://github.com/currents-dev/currents-playwright-bdd-cucumber-example/assets/1637928/4ac06f8b-ff38-4f88-8ca0-b3d147d9dd96)


- 
