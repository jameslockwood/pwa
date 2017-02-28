const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./common-config.js');
const webpackConfig = require('./webpack.config.js');

gulp.task('build', ['clean'], () => gulp
    .src('')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(`${config.directories.build}/`)
));

gulp.task('server', () => {
    const webpackConf = Object.create(webpackConfig);
    webpackConf.devtool = 'eval';
    webpackConf.entry.app.unshift(`webpack-dev-server/client?http://${config.host}:${config.port}/`);
    new WebpackDevServer(webpack(webpackConf), {
        publicPath: config.path
    })
        .listen(config.port, config.host, (err) => {
            if (err) {
                throw new gutil.PluginError('webpack-dev-server', err);
            }
        });
});

gulp.task('clean', () => del([
    `${config.directories.build}/**/*`
    // '!dist/foo.json'
]));

gulp.task('default', ['build']);
