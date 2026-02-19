import { CurrentsConfig, CurrentsFixtures, currentsReporter, CurrentsWorkerFixtures } from "@currents/playwright";
import { defineConfig, devices } from "@playwright/test";

/**
 * Currents configuration
 * 
 * This needs to be passed to both 
 * - the Currents reporter 
 * - and the fixtures `currentsConfigOptions` property 
 * 
 * (see "report" and "use" sections below)
 */
const currentsConfig: CurrentsConfig = {
  recordKey: process.env.CURRENTS_RECORD_KEY || "", // 📖 https://currents.dev/readme/guides/record-key
  projectId: process.env.CURRENTS_PROJECT_ID || "", // get one at https://app.currents.dev
};

export default defineConfig<CurrentsFixtures, CurrentsWorkerFixtures>({
  timeout: 10 * 1000,

  fullyParallel: true,

  expect: {
    timeout: 5000,
  },

  reporter: process.env.CURRENTS_PROJECT_ID ? [currentsReporter(currentsConfig)] :  undefined, // 👈🏻 add Currents reporter when Currents project ID is present

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  use: {
    actionTimeout: 0,
    trace: "on",
    video: "on",
    screenshot: "on",
    currentsConfigOptions: currentsConfig, // 👈🏻 add Currents configuration for fixtures

    // We can disable Currents fixtures if Currents project ID is missing
    currentsFixturesEnabled: !!process.env.CURRENTS_PROJECT_ID,
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
