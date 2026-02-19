import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { reporter } from '../../playwright.config';

const nxConf = nxE2EPreset(__filename);
export default defineConfig({
  ...nxConf,
  reporter,
  testDir: './src',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
