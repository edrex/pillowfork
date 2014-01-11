// A reference configuration file.
exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  chromeDriver: '../node_modules/protractor/selenium/chromedriver',
  seleniumArgs: [],
  specs: [
    './e2e/*.js'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: 'http://localhost:5984/dev/',
  rootElement: 'html',
};
