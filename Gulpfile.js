var gulp = require('gulp'),
    exec = require('gulp-exec'),
    protractor = require("gulp-protractor"),
    lr = require('tiny-lr'),
    livereload = require('gulp-livereload'),
    server = lr(),
    sourceStream = require('vinyl-source-stream'),
    browserify = require('browserify'),
    concat = require('gulp-concat');

var env = gulp.env.prod ? 'prod' : 'local';

var scripts = [
  'app/scripts/sha1.js',
  'app/components/lodash/dist/lodash.js',
  'app/components/pouchdb-nightly/index.js',
  'app/components/angular/angular.js',
  'app/components/angular-route/angular-route.js',
  'app/components/angular-sanitize/angular-sanitize.js',
  'app/scripts/services.js',
  'app/scripts/directives.js',
  'app/assets/app.js'
];
var styles = [
  'app/components/normalize-css/normalize.css',
  'app/styles/app.css'
]

gulp.task('browserify', function() {
  return browserify('./app/scripts/app.js').bundle()
  .pipe(sourceStream('app.js'))
  .pipe(gulp.dest('app/assets/app.js'));
});

gulp.task('concat', function() {
  gulp.src(scripts)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('app/assets/'));
  gulp.src(styles)
    .pipe(concat('app.css'))
    .pipe(gulp.dest('app/assets/'));
});

gulp.task('push', function() {
  return gulp.src('couchapp')
    .pipe(exec('erica push <%= file.path %> <%= options.env %>', {env: env}))
    .pipe(livereload(server))
});

// no concat (dev mode)
gulp.task('watch', function() {
  server.listen(7777, function (err) {
    if (err) return console.log(err);
    gulp.watch('couchapp/**/*', function(event) {
      console.log('File '+event.path+' was '+event.type+', pushing');
      gulp.run('push');
    });
  });
});

gulp.task('test', function() {
  gulp.src(["./tests/e2e"])
    .pipe(protractor.protractor({
      configFile: "test/protractor.conf.js"
    }))
});

gulp.task('autotest', function() {
  gulp.watch(['couchapp/**/*', 'test/e2e/**/*.js'], function(event) {
    console.log('File '+event.path+' was '+event.type+', running tests...');
    gulp.src(["./test/e2e"])
      .pipe(exec('NODE_ENV=auto node_modules/.bin/protractor test/protractor.conf.js'));
  });
});





