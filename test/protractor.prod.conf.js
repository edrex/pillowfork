// A reference configuration file.
exports.config = {
  sauceUser: 'pdxhub',
  sauceKey: "16de625e-dec1-452a-b36f-11ee9a368fc4",

  specs: [
    './e2e/*.js'
  ],

  capabilities: {
    // browserName: 'chrome',
    browserName: 'iPhone'
    // browserName: 'android'
    // browserName: 'firefox'
    // browserName: 'safari'
    // browserName: 'internet explorer',
    // version: '10'
  },

  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://pillowfork.com',

  // Selector for the element housing the angular app - this defaults to
  // body, but is necessary if ng-app is on a descendant of <body>  
  rootElement: 'html',
};
