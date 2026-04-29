import { currentsReporter } from "@currents/playwright";
import config from "./playwright.config";
export default {
  ...config,
  reporter: [
    currentsReporter(),
    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI only.
        uploadToArgos: true,
        // Set your Argos token (required if not using GitHub Actions).
        token: process.env.ARGOS_TOKEN,
      },
    ],
  ],
};
