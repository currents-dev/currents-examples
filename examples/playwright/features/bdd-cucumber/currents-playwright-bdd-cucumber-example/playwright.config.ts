import { currentsReporter } from "@currents/playwright";
import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const testDir = defineBddConfig({
  importTestFrom: "steps/fixtures.ts",
  paths: ["./features"],
  require: ["steps/*.ts"],
  quotes: "backtick",
  featuresRoot: "./features",
});

export default defineConfig({
  testDir,
  reporter: [
    currentsReporter({
      recordKey: "you-record-key-here",
      projectId: "you-project-id-here",
      ciBuildId: Date.now().toString(),
    }),
  ],
  use: {
    trace: "on",
    screenshot: "only-on-failure",
    baseURL: "http://localhost:3000",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],
});
