var gulp = require('gulp');
var args = require('yargs').argv;
var jasmine = require('gulp-jasmine');
var concat = require('gulp-concat');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('exampleButtons', function() {
  browserify({
    entries: ['./examples/buttons/index.js'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('examples/buttons'));
});

// create a bundle that we can run docco against
gulp.task('dist', function() {
  return gulp.src([
    'base/base.js', 'base/emitter.js', 'mixins/delegates.js',
    'container/container.js', 'store/store.js', 'view/view.js'
  ])
  .pipe(concat('sudo.js'))
  .pipe(gulp.dest('dist/debug'));
});

gulp.task('jasmine', function() {
  // var str = 'lib/tests/${which}.js';
  // var data = { which: args.spec ? args.spec : '*' };
  // var path = expand(str, data);
  if (!args.spec) {
    // test all-the-things
    return gulp.src('*/spec/*.js')
      .pipe(jasmine({verbose: true}));
  }
  else return gulp.src(args.spec)
    .pipe(jasmine({verbose: true}));
});
