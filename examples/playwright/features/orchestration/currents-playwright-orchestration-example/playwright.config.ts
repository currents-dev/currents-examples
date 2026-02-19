import { defineConfig, devices } from "@playwright/test";

const config = defineConfig({
  timeout: 130 * 1000,
  fullyParallel: false,

  expect: {
    timeout: 5000,
  },

  retries: 0,
  workers: 2,

  use: {
    actionTimeout: 0,
  },

  projects: [
    {
      name: "chromim",
      testDir: "./tests",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "test-results/",
});

export default config;
