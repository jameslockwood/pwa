const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const path = require('path');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const WebpackDevServer = require('webpack-dev-server');
const swPrecache = require('sw-precache');
const runSequence = require('run-sequence');
const shell = require('gulp-shell');
const config = require('./config.js');
const webpackConfigDev = require('./webpack.config.dev.js');
const webpackConfigDevHot = require('./webpack.config.dev.hot.js');
const webpackConfigProd = require('./webpack.config.prod.js');
const webpackServer = require('./webpack.server.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function createBuildTask(webpackConf) {
    return (done) => {
        gulp
            .src('')
            .pipe(webpackStream(webpackConf, webpack))
            .pipe(gulp.dest(`${config.directories.build}/`))
            .on('end', done);
    };
}

function writeServiceWorkerFile(handleFetch, callback) {
    const rootDir = config.directories.build;
    const conf = {
        cacheId: config.name,
        handleFetch,
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

    swPrecache.write(path.join(rootDir, 'service-worker.js'), conf, callback);
}

function createServerTask(webpackConfig, hotReload, port) {
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
}

// default vanilla server
gulp.task('server', createServerTask(webpackConfigDev));

// server-hot enforces enforces hot module reloading
gulp.task('server-hot', createServerTask(webpackServer.useHotReloading(webpackConfigDevHot), true));

// server-sync enforces browsersync (server runs on a different port - see webpack.server.js)
gulp.task('server-sync', createServerTask(webpackServer.useBrowserSync(webpackConfigDev)));

// server-prod applies full minifaction and sourcemaps.  it does NOT use webpack dev server.
gulp.task('server-prod', ['build-prod'], shell.task('node ./localhost/server.js'));

gulp.task('exec', ['clean'], shell.task('node ./localhost/server.js'));

// creates a dev build - optimised for quicker builds and developer convenience (debugging)
gulp.task('build', ['clean'], createBuildTask(webpackConfigDev));

// creates a prod build - optimised for file size (minified), service worker included
gulp.task('build-prod', callback =>
    runSequence('build-prod-assets', 'build-prod-svc-worker', callback));
gulp.task('build-prod-assets', ['clean'], createBuildTask(webpackConfigProd));
gulp.task('build-prod-svc-worker', done => writeServiceWorkerFile(true, done));

// provides in depth ananlysis of a builds various bundles and chunk sizes
gulp.task('analyze', ['clean'], () => {
    const webpackConf = Object.create(webpackConfigDev);
    webpackConf.plugins.push(new BundleAnalyzerPlugin());
    return createBuildTask(webpackConf);
});

// cleans the build folder
gulp.task('clean', () => del([`${config.directories.build}/**/*`]));

// common aliases
gulp.task('serve', ['server']);
gulp.task('default', ['build']);
