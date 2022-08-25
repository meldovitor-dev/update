const gulp = require('gulp');
const gzip = require('gulp-gzip');
const htmlmin = require('gulp-htmlmin');

gulp.task('compress', function() {
  return gulp.src(['./www/**/*.*'])
      .pipe(gzip())
      .pipe(gulp.dest('./output'));
});

// Gulp task to minify HTML files
gulp.task('seo', function () {
    return gulp.src(['./seo/*.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest('./www'));
});
gulp.task('no-support', function () {
  return gulp.src(['./no-support/*.html'])
      .pipe(htmlmin({
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true
      }))
      .pipe(gulp.dest('./www'));
});
// Gulp task to minify all files
gulp.task('default', function () {
  runSequence(
    'seo',
    'no-support'
  );
});
