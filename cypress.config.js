const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://sales.crowdstreet.com/",
    watchForFileChanges: false,
    chromeWebSecurity: false,
    viewportWidth: 1000,
    viewportHeight: 1600
  },
});
