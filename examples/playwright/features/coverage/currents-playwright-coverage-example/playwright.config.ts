import {
  CurrentsFixtures,
  currentsReporter,
  CurrentsWorkerFixtures,
} from "@currents/playwright";
import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

const baseURL = "http://localhost:3000";

const currentsConfig = {
  recordKey: process.env.CURRENTS_RECORD_KEY ?? "your-record-key",
  projectId: process.env.CURRENTS_PROJECT_ID ?? "your-project-id",
  coverage: {
    projects: true,
  },
};

const config = defineConfig<CurrentsFixtures, CurrentsWorkerFixtures>({
  timeout: 10 * 1000,

  use: {
    baseURL,
    actionTimeout: 0,
    screenshot: "off",
    video: "off",
    trace: "off",
    currentsConfigOptions: currentsConfig,
  },

  reporter: [currentsReporter(currentsConfig)],
  projects: [
    {
      name: "chromium",
      retries: 2,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "firefox",
      retries: 2,
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "webkit",
      retries: 2,
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],

  outputDir: "test-results/",
});

export default config;
