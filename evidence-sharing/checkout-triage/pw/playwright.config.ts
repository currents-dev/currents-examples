import { defineConfig, devices } from "@playwright/test";
import { currentsReporter } from "@currents/playwright";

const port = Number(process.env.PORT ?? 4197);

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 0,
  expect: { timeout: 3_000 },
  reporter: [
    ["list"],
    currentsReporter(),
  ],
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: "on",
    video: "on",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "node ../server.mjs",
    url: `http://127.0.0.1:${port}/`,
    reuseExistingServer: false,
    env: { PORT: String(port) },
  },
});
