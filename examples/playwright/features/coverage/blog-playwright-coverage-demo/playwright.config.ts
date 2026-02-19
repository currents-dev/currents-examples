// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  // Run only on Chromium so page.coverage works
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  // Optional: stricter test discovery
  // testMatch: /.*\.spec\.ts/,
});