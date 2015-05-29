// An example configuration file.
exports.config = {
  // Do not start a Selenium Standalone sever - only run this using chrome.
  chromeOnly: true,
  chromeDriver: '../node_modules/protractor/selenium/chromedriver',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['test/e2e/**/*spec.js'],
  baseUrl: 'http://localhost:3001/',

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    includeStackTrace: true,
    isVerbose: true,
    defaultTimeoutInterval: 30000,
    silent: true
  },

  onPrepare : function() {
      require('jasmine-spec-reporter');
      // add jasmine spec reporter
      jasmine.getEnv().addReporter(new jasmine.SpecReporter({displayStacktrace: true}));
   }
};
