import { CurrentsConfig } from "@currents/playwright";

const currentsConfig: CurrentsConfig = {
  projectId: process.env.CURRENTS_PROJECT_ID ?? "bnsqNa",
  recordKey: process.env.CURRENTS_RECORD_KEY ?? "yy",
  outputFile: "currents-report.json",
};

export default currentsConfig;
