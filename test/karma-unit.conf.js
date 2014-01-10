module.exports = function(config) {
  config.set({
    files : [
      'app/components/lodash/dist/lodash.js',
      'app/components/pouchdb-nightly.min.js/index.js',
      'app/components/angular/angular.js',
      'app/components/angular-route/angular-route.js',
      'app/components/angular-pouchdb/angular-pouchdb.js',
      'app/components/angular-mocks/angular-mocks.js',
      'app/scripts/pages.js',
      'app/scripts/app.js',
      'test/unit/**/*.js'
    ],
    basePath: '../',
    frameworks: ['jasmine'],
    reporters: ['progress'],
    browsers: ['Chrome'],
    autoWatch: false,
    singleRun: true,
    colors: true
  });
};
