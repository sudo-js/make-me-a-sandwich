var gulp = require('gulp');
var args = require('yargs').argv;
var jasmine = require('gulp-jasmine');
var browserify = require("browserify");
var babelify = require("babelify");
var source = require('vinyl-source-stream');

// create the browser compat sudo.js bundle
gulp.task('view-test', function() {
  browserify({
    entries: ['./view/test/index.js'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./view/test'));
});

gulp.task('jasmine', function() {
  // var str = 'lib/tests/${which}.js';
  // var data = { which: args.spec ? args.spec : '*' };
  // var path = expand(str, data);
  if (!args.spec) return console.log('Path to spec required: "--spec foo/bar.spec.js"');
  return gulp.src(args.spec)
    .pipe(jasmine({verbose: true}));
});
