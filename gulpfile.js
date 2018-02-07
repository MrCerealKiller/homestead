// ##############################
// ## !!! WORK IN PROGRESS !!! ##
// ##############################

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

// High-level ------------------------------------------------------------------

gulp.task('unitTest', ['unitFront', 'unitBack'], function() {
  return console.log('You need tests to actually perform unit tests...');
  process.exit(0);
});

gulp.task('integrationTest', ['integrateFront', 'integrateBack'], function() {
  return console.log('You need tests to actually perform integration tests...');
  process.exit(0);
});

// Test Suites  ----------------------------------------------------------------

gulp.task('unitFront', function() {
  process.exit(0);
});

gulp.task('unitBack', function() {
  process.exit(0);
});

gulp.task('integrateFront', function() {
  process.exit(0);
});

gulp.task('integrateBack', function() {
  process.exit(0);
});

// Utilities -------------------------------------------------------------------

gulp.task('clean', function() {
  return console.log('Clean is not yet implemented.');
  process.exit(0);
});

gulp.task('optimizeImg', function() {

});

gulp.task('watch', function() {
  return console.log('Watch is not yet implemented.');
  process.exit(0);
});
