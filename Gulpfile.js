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
var src = './app/',
    dest = './couchapp/_attachments/';

var scripts = [
  src+'components/lodash/dist/lodash.js',
  src+'components/pouchdb-nightly/index.js',
  src+'components/angular/angular.js',
  src+'components/angular-route/angular-route.js',
  src+'components/angular-sanitize/angular-sanitize.js',
  src+'assets/app.js'
];
var styles = [
  src+'components/normalize-css/normalize.css',
  src+'styles/app.css'
]

gulp.task('browserify', function() {
  return browserify(src+'scripts/app.js').bundle()
  .pipe(sourceStream('app.js'))
  .pipe(gulp.dest(dest+'assets/app.js'));
});

gulp.task('concat', function() {
  gulp.src(scripts)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(dest+'assets/'));
  gulp.src(styles)
    .pipe(concat('app.css'))
    .pipe(gulp.dest(dest+'assets/'));
});

gulp.task('push', function() {
  return gulp.src('./couchapp/')
    .pipe(exec('erica push <%= file.path %> <%= options.env %>', {env: env}))
    .pipe(livereload(server))
});

// no concat (dev mode)
gulp.task('watch', function() {
  server.listen(7777, function (err) {
    if (err) return console.log(err);
    gulp.watch('couchapp/**/*', ['push']);
  });
});

gulp.task('autotest', function() {
  gulp.watch(['couchapp/**/*', 'test/e2e/**/*.js'], function(event) {
    console.log('File '+event.path+' was '+event.type+', running tests...');
    gulp.src(["./test/e2e"])
      .pipe(exec('NODE_ENV=auto node_modules/.bin/protractor test/protractor.conf.js'));
  });
});





