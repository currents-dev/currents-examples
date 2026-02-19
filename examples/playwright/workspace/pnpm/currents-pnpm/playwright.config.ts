import { currentsReporter } from "@currents/playwright";
import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  timeout: 10 * 1000,

  expect: {
    timeout: 2000,
  },

  reporter: [currentsReporter()],

  fullyParallel: false,
  retries: 0,
  workers: 1,

  use: {
    actionTimeout: 0,
    trace: "on",
    screenshot: "on",
    video: "on",
  },

  projects: [
    {
      name: "chromium",
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "test-results/",
};

export default config;
