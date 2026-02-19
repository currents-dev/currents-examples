const { defineConfig } = require("cypress");
const plugin = require("./cypress/plugins/");
module.exports = defineConfig({
  projectId: "Ij0RfK",
  e2e: {
    specPattern: "**/*.{feature,features}",
    setupNodeEvents(on, config) {
      plugin(on, config);
      // implement node event listeners here
    },
  },
});
