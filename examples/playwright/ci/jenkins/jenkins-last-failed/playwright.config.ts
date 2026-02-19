import { CurrentsConfig, currentsReporter } from "@currents/playwright";
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const currentsConfig: CurrentsConfig = {
  recordKey: "KPEvZL0LDYzcZH3U", // 📖 https://currents.dev/readme/guides/record-key
  projectId: "LrO7nE", // get one at https://app.currents.dev
};

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  // fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [currentsReporter(currentsConfig)],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
    video: "on",
    screenshot: "on",
  },
  outputDir: "test-results/",

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      metadata: {
        pwc: {
          tags: ["project:setup"],
        },
      },
    }
  ],
});
