const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

gulp.task('default', function() {
  let config = require('./webpack.config.js');
  return gulp.src('')
    .pipe(webpackStream(config, webpack))
    .pipe(gulp.dest('dist/'));
});
