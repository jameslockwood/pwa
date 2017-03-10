const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./config.js');
const webpackConfig = require('./webpack.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function build(webpackConf) {
    gulp
        .src('')
        .pipe(webpackStream(webpackConf, webpack))
        .pipe(gulp.dest(`${config.directories.build}/`));
}

gulp.task('build', ['clean'], () => build(webpackConfig));

gulp.task('analyze', ['clean'], () => {
    const webpackConf = Object.create(webpackConfig);
    webpackConf.plugins.push(new BundleAnalyzerPlugin());
    return build(webpackConf);
});

gulp.task('server', () => {
    const webpackConf = Object.create(webpackConfig);
    webpackConf.devtool = 'eval';
    webpackConf.entry.main.unshift(
        `webpack-dev-server/client?${config.scheme}://${config.host}:${config.port}/`
    );
    new WebpackDevServer(webpack(webpackConf), {
        publicPath: config.path,
        https: config.https,
        proxy: config.proxy,
        setup: config.middleware
    }).listen(config.port, config.host, (err) => {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }
    });
});

gulp.task('clean', () =>
    del([
        `${config.directories.build}/**/*`
        // '!dist/foo.json'
    ]));

// aliases
gulp.task('serve', ['server']);
gulp.task('default', ['build']);
