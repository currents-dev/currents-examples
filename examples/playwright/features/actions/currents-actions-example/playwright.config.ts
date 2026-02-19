import { CurrentsFixtures, CurrentsWorkerFixtures } from "@currents/playwright";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig<CurrentsFixtures, CurrentsWorkerFixtures>({
  timeout: 10 * 1000,

  fullyParallel: true,

  expect: {
    timeout: 5000,
  },

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  use: {
    actionTimeout: 0,
    trace: "on",
    video: "on",
    screenshot: "on",
    // We can optionally disable Currents fixtures. (defaults to enabled)
    // currentsFixturesEnabled: false,
  },

  projects: [
    {
      name: "Project A",
      retries: 2,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "Project B",
      retries: 2,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "test-results/",
});
