const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./config.js');
const webpackConfigDev = require('./webpack.config.js');
const webpackConfigProd = require('./webpack.config.prod.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function createBuildTask(webpackConf) {
    gulp
        .src('')
        .pipe(webpackStream(webpackConf, webpack))
        .pipe(gulp.dest(`${config.directories.build}/`));
}

function createServerTask(webpackConfig, simulateProduction) {
    const wpConfig = Object.create(webpackConfig);
    if (!simulateProduction) {
        wpConfig.entry.shell.unshift(
            `webpack-dev-server/client?${config.scheme}://${config.host}:${config.port}/`
        );
    }
    new WebpackDevServer(webpack(wpConfig), {
        publicPath: config.path,
        https: config.https,
        proxy: config.proxy,
        setup: config.middleware
    }).listen(config.port, config.host, (err) => {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }
    });
}

gulp.task('build', ['clean'], () => createBuildTask(webpackConfigDev));
gulp.task('build-prod', ['clean'], () => createBuildTask(webpackConfigProd));
gulp.task('server', () => createServerTask(webpackConfigDev));
gulp.task('server-prod', () => createServerTask(webpackConfigProd, true));
gulp.task('analyze', ['clean'], () => {
    const webpackConf = Object.create(webpackConfigDev);
    webpackConf.plugins.push(new BundleAnalyzerPlugin());
    return createBuildTask(webpackConf);
});
gulp.task('clean', () => del([`${config.directories.build}/**/*`]));
gulp.task('serve', ['server']);
gulp.task('default', ['build']);
