const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://en.wikipedia.org/",
    specPattern: "cypress/integration/*.spec.js",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      on("before:spec", () => {
        console.log(`  GH Job URL: ${process.env.MATRIX_JOB_URL}`);
      });
      return config;
    },
  },
  projectId: "Ij0RfK",
  video: true,
  videoUploadOnPasses: false,
});
