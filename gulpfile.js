var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var jsbeautifier = require('gulp-jsbeautifier');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('build', function() {
  return gulp.src('src/*.js')
    .pipe(transform(function(filename) {
      return browserify(filename).bundle();
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(uglify())
    .pipe(rename({
      extname: ".min.js"
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('jshint', function() {
return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('mocha', function() {
  return gulp.src('test/**/*', {
    read: false
  }).pipe(mocha({
    bail: true,
    reporter: 'Spec'
  }));
});

gulp.task('default', function() {
  gulp.watch(['gulpfile.js', 'src/**/*', 'test/**/*'], ['jshint', 'mocha']);
});

gulp.task('build', function () {
  return gulp.src('src/*.js')
    .pipe(gulp.dest('dist/'))
    .pipe(uglify())
    .pipe(rename({
      extname: ".min.js" 
    }))
    .pipe(gulp.dest('dist/'));
});

