const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');

gulp.task('build', ['clean'], () => gulp
    .src('')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('dist/')));

gulp.task('server', () => {
  const config = Object.create(webpackConfig);
  config.devtool = 'eval';
  config.entry.app.unshift(
    'webpack-dev-server/client?http://localhost:8080/' // inline reloads
  );
  new WebpackDevServer(webpack(config))
    .listen(8080, 'localhost', (err) => {
      if (err) {
        throw new gutil.PluginError('webpack-dev-server', err);
      }
    });
});

gulp.task('clean', () => del([
  'dist/**/*'
  // '!dist/foo.json'
]));

gulp.task('default', ['build']);
