/**
 * Currents configuration
 *
 * This needs to be passed to both
 * - the Currents reporter
 * - and the fixtures `currentsConfigOptions` property
 *
 * (see "report" and "use" sections below)
 */
export default {
  recordKey: process.env.CURRENTS_RECORD_KEY || "", // 📖 https://currents.dev/readme/guides/record-key
  projectId: process.env.CURRENTS_PROJECT_ID || "", // get one at https://app.currents.dev
};
