module.exports = function(config) {
  config.set({
    files : [
      'bower_components/lodash/dist/lodash.js',
      'bower_components/pouchdb-nightly.min.js/index.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-pouchdb/angular-pouchdb.js',
      'bower_components/angular-mocks/angular-mocks.js',
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
