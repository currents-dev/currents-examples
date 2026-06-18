import { currentsReporter } from "@currents/playwright";
import { devices, PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "tests",
  retries: 0,
  workers: 3,

  timeout: 15000,
  fullyParallel: true,

  expect: {
    timeout: 500,
  },
  reporter: [["blob"], currentsReporter()],
  use: {
    screenshot: "on",
    video: "retain-on-failure",
    trace: "retain-on-failure-and-retries",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "test-results/",
};

export default config;
