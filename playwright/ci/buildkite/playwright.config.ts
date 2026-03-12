import {
  CurrentsConfig,
  CurrentsFixtures,
  CurrentsWorkerFixtures,
  currentsReporter,
} from "@currents/playwright";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig<CurrentsFixtures, CurrentsWorkerFixtures>({
  timeout: 10 * 1000,

  fullyParallel: true,

  expect: {
    timeout: 5000,
  },

  forbidOnly: true,
  retries: 2,
  workers: 1,

  reporter: [currentsReporter()],

  use: {
    actionTimeout: 0,
    trace: "on",
    video: "on",
    screenshot: "on",
  },

  projects: [
    {
      name: "chromium",
      retries: 2,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],

  webServer: {
    command: "node ./server/index.js",
    port: 4346,
    reuseExistingServer: false,
    stdout: "ignore",
    stderr: "pipe",
  },

  outputDir: "test-results/",
});
