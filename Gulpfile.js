var gulp = require('gulp'),
    exec = require('gulp-exec'),
    protractor = require("gulp-protractor"),
    lr = require('tiny-lr'),
    livereload = require('gulp-livereload'),
    server = lr();


var env = gulp.env.prod ? 'prod' : 'local';

// BUILD
gulp.task('push', function() { gulp.src('couchapp')
  .pipe(exec('erica push <%= file.path %> <%= options.env %>', {env: env}))
  .pipe(livereload(server))
});

gulp.task('watch:couchapp', function() {
  server.listen(7777, function (err) {
    if (err) return console.log(err);

    gulp.watch('couchapp/**/*', function(event) {
      console.log('File '+event.path+' was '+event.type+', running tasks...');
      gulp.run('push');
    });
  });
});

gulp.task('dev', function() {
  gulp.run('watch:couchapp');
});

// TEST
gulp.task('webdriver', protractor.webdriver);

gulp.task('test', function() {
  gulp.src(["./tests/e2e"])
    .pipe(protractor.protractor({
      configFile: "test/protractor."+env+".conf.js"
    })) 
});

gulp.task('autotest', function() {
  if (env == 'local') {
    gulp.run('webdriver');
  }
  gulp.watch(['couchapp/**/*', 'test/e2e/**/*.js'], function(event) {
    console.log('File '+event.path+' was '+event.type+', running tests...');
    gulp.src(["./tests/e2e"])
      .pipe(protractor.protractor({
        configFile: "test/protractor.auto.conf.js"
      })) 
  });
});




// var concat = require('gulp-concat');

// gulp.task('scripts', function() {
//   gulp.src('./lib/*.js')
//     .pipe(concat("all.js"))
//     .pipe(gulp.dest('./dist/'))
// });