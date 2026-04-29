import { CurrentsConfig } from "@currents/playwright";

const config: CurrentsConfig = {
  projectId: process.env.CURRENTS_PROJECT_ID ?? "",
  recordKey: process.env.CURRENTS_RECORD_KEY ?? "",
};

export default config;
