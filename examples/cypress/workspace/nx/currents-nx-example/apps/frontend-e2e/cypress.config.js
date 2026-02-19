const { defineConfig } = require('cypress');
const { cloudPlugin } = require('cypress-cloud/plugin');
module.exports = defineConfig({
  e2e: {
    specPattern: './src/integration/*.spec.ts',
    supportFile: './src/support/e2e.ts',
    fileServerFolder: '.',
    modifyObstructiveCode: false,
    chromeWebSecurity: false,
    projectId: 'Ij0RfK',
    baseUrl: 'https://en.wikipedia.org/',
    setupNodeEvents: cloudPlugin,
  },
  screenshotsFolder: '../../dist/cypress/apps/frontend-e2e/screenshots',
  videosFolder: '../../dist/cypress/apps/frontend-e2e/videos',
  video: true,
  projectId: 'Ij0RfK',
  videoUploadOnPasses: false,
});
