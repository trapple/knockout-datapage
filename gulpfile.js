var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var jsbeautifier = require('gulp-jsbeautifier');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var header = require('gulp-header');

var package = require('./package.json');
var banner = ['/*',
' * <%= package.name %>',
' * <%= package.description %>',
' * <%= package.repository.url %>',
' * Copyright 2014 <%= package.author %>',
' * Version: <%= package.version %>',
' */'].join("\n") + "\n";

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
  return gulp.src('src/knockout-datapage.js')
    .pipe(header(banner, {package: package}))
    .pipe(gulp.dest('dist/'))
    .pipe(uglify())
    .pipe(rename({
      extname: ".min.js" 
    }))
    .pipe(gulp.dest('dist/'));
});

