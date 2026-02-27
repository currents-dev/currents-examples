import type { CurrentsConfig } from "@currents/playwright";

const config: CurrentsConfig = {
  projectId: process.env.CURRENTS_PROJECT_ID ?? "xx",
  recordKey: process.env.CURRENTS_RECORD_KEY ?? "yy",
  ciBuildId: Date.now().toString(),
  outputFile: "currents-report.json",
  orchestration: {
    skipReporterInjection: true,
  },
};

export default config;
