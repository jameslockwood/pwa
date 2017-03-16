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

function createServerTask(webpackConfig, hotReload) {
    const wpConfig = Object.create(webpackConfig);
    new WebpackDevServer(webpack(wpConfig), {
        publicPath: config.path,
        https: config.https,
        proxy: config.proxy,
        setup: config.middleware,
        historyApiFallback: true,
        hot: !!hotReload
    }).listen(config.port, config.host, (err) => {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }
    });
}

// enforces hot reloading by default
gulp.task('server', () => createServerTask(webpackConfigDev));

// server-sync enforces browsersync (runs on a different port - see webpack.server.js)
gulp.task('server-hot', () => createServerTask(webpackServer.useHotReloading(webpackConfigDevHot), true));

// server-sync enforces browsersync (runs on a different port - see webpack.server.js)
gulp.task('server-sync', () => createServerTask(webpackServer.useBrowserSync(webpackConfigDev)));

// server-prod enforces full minifaction and sourcemaps
gulp.task('server-prod', () => createServerTask(webpackConfigProd));

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
