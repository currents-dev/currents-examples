import {
  CurrentsFixtures,
  currentsReporter,
  CurrentsWorkerFixtures,
} from "@currents/playwright";
import { defineConfig, devices } from "@playwright/test";
import currentsConfig from "./currents.config";

export default defineConfig<CurrentsFixtures, CurrentsWorkerFixtures>({
  timeout: 10 * 1000,

  fullyParallel: true,

  expect: {
    timeout: 5000,
  },

  reporter: [currentsReporter()],

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  use: {
    actionTimeout: 0,
    trace: "on",
    video: "on",
    screenshot: "on",
    currentsConfigOptions: currentsConfig, // 👈🏻 add Currents configuration for fixtures

    // Disable Currents fixtures if project Currents Project Id is missing
    currentsFixturesEnabled: !!process.env.CURRENTS_PROJECT_ID,
  },

  projects: [
    {
      name: "chrome",
      retries: 0,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "test-results/",
});
