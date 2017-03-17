const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./config.js');
const webpackConfigDev = require('./webpack.config.dev.js');
const webpackConfigDevHot = require('./webpack.config.dev.hot.js');
const webpackConfigProd = require('./webpack.config.prod.js');
const webpackServer = require('./webpack.server.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function createBuildTask(webpackConf) {
    gulp
        .src('')
        .pipe(webpackStream(webpackConf, webpack))
        .pipe(gulp.dest(`${config.directories.build}/`));
}

function createServerTask(webpackConfig, hotReload, port) {
    const wpConfig = Object.create(webpackConfig);
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
    });
}

// default vanilla server
gulp.task('server', () => createServerTask(webpackConfigDev));

// server-hot enforces enforces hot module reloading
gulp.task('server-hot', () =>
    createServerTask(webpackServer.useHotReloading(webpackConfigDevHot), true));

// server-sync enforces browsersync (server runs on a different port - see webpack.server.js)
gulp.task('server-sync', () => createServerTask(webpackServer.useBrowserSync(webpackConfigDev)));

// server-prod applies full minifaction and sourcemaps
gulp.task('server-prod', () => createServerTask(webpackConfigProd, false, config.ports.prod));

gulp.task('build', ['clean'], () => createBuildTask(webpackConfigDev));
gulp.task('build-prod', ['clean'], () => createBuildTask(webpackConfigProd));
gulp.task('analyze', ['clean'], () => {
    const webpackConf = Object.create(webpackConfigDev);
    webpackConf.plugins.push(new BundleAnalyzerPlugin());
    return createBuildTask(webpackConf);
});
gulp.task('clean', () => del([`${config.directories.build}/**/*`]));
gulp.task('serve', ['server']);
gulp.task('default', ['build']);
