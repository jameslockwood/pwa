/* eslint-disable import/no-extraneous-dependencies, no-plusplus, no-console */

const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const WebpackDevServer = require('webpack-dev-server');
const swPrecache = require('sw-precache');
const jsMinify = require('gulp-minify');
const jsonMinify = require('gulp-jsonminify');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('../config.js');

exports.createBuildTask = function createBuildTask(webpackConf) {
    return (done) => {
        gulp
            .src('')
            .pipe(webpackStream(webpackConf, webpack))
            .pipe(gulp.dest(`${config.directories.build}/`))
            .on('end', done);
    };
};

exports.analyze = function analyze(webpackConfig) {
    return (done) => {
        const webpackConf = Object.create(webpackConfig);
        webpackConf.plugins.push(new BundleAnalyzerPlugin());
        return exports.createBuildTask(webpackConf)(done);
    };
};

// minifies assets which webpack does not control
exports.minifyServiceWorker = function minifyServiceWorker() {
    const buildDir = config.directories.build;
    return (done) => {
        gulp
            .src([`${buildDir}/${config.serviceWorkerFilename}`])
            .pipe(
                jsMinify({
                    ext: {
                        src: '-debug.js',
                        min: '.js'
                    },
                    noSource: true
                })
            )
            .pipe(gulp.dest(buildDir))
            .on('end', done);
    };
};

exports.minifyJson = function minifyJson() {
    const buildDir = config.directories.build;
    return (done) => {
        gulp
            .src([`${buildDir}/**/*.json`])
            .pipe(jsonMinify())
            .pipe(gulp.dest(buildDir))
            .on('end', done);
    };
};

exports.createServiceWorker = function createServiceWorker() {
    const buildDir = config.directories.build;
    const workerConfig = {
        cacheId: config.name,
        runtimeCaching: [
            {
                handler: 'networkFirst',
                urlPattern: /fx\/api\//
            }
        ],
        staticFileGlobs: [
            `${buildDir}/**/*.css`,
            `${buildDir}/**/*.html`,
            `${buildDir}/**/*.js`,
            `${buildDir}/**/*.json`
        ],
        stripPrefix: `${buildDir}/`,
        verbose: true
    };
    return (done) => {
        swPrecache.write(path.join(buildDir, config.serviceWorkerFilename), workerConfig, done);
    };
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
