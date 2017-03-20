/* eslint-disable import/no-extraneous-dependencies, no-plusplus, no-console */

const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const WebpackDevServer = require('webpack-dev-server');
const swPrecache = require('sw-precache');
const config = require('./config.js');

exports.createBuildTask = function createBuildTask(webpackConf) {
    return (done) => {
        gulp
            .src('')
            .pipe(webpackStream(webpackConf, webpack))
            .pipe(gulp.dest(`${config.directories.build}/`))
            .on('end', done);
    };
};

exports.createServiceWorker = function createServiceWorker(done) {
    const rootDir = config.directories.build;
    const workerConfig = {
        cacheId: config.name,
        runtimeCaching: [
            {
                handler: 'networkFirst',
                urlPattern: /fx\/api\//
            }
        ],
        staticFileGlobs: [`${rootDir}/**/*.css`, `${rootDir}/**/*.html`, `${rootDir}/**/*.js`],
        stripPrefix: `${rootDir}/`,
        verbose: true
    };
    swPrecache.write(path.join(rootDir, config.serviceWorkerFilename), workerConfig, done);
};

exports.createServerTask = function createServerTask(webpackConfig, hotReload, port) {
    const wpConfig = Object.create(webpackConfig);
    return (done) => {
        new WebpackDevServer(webpack(wpConfig), {
            publicPath: config.path,
            https: config.https,
            proxy: config.proxy,
            setup: config.middleware,
            historyApiFallback: true,
            hot: !!hotReload
        }).listen(port || config.ports.dev, config.host, (err) => {
            if (err) {
                throw new gutil.PluginError('webpack-dev-server', err);
            }
            done();
        });
    };
};