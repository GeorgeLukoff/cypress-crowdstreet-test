const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://sales.crowdstreet.com/",
    watchForFileChanges: false,
    chromeWebSecurity: false,
  },
});
