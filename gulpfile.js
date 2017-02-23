const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');

gulp.task('build', ['clean'], () => {
  return gulp.src('')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('dist/'));
});

gulp.task('server', callback => {

  let config = Object.create(webpackConfig);
  config.devtool = 'eval';
  // following required for inline reloads
  config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/');

  new WebpackDevServer(webpack(config))
    .listen(8080, 'localhost', function(err) {
      if (err) {
        throw new gutil.PluginError('webpack-dev-server', err);
      }
    });
});

gulp.task('clean', () => {
  return del([
    'dist/**/*'
  // '!dist/foo.json'
  ]);
});

gulp.task('default', ['build']);
