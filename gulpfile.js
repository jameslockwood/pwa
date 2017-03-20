const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const shell = require('gulp-shell');
const helpers = require('./gulpfile.helpers.js');
const config = require('./config.js');
const webpackConfigDev = require('./webpack.config.dev.js');
const webpackConfigDevHot = require('./webpack.config.dev.hot.js');
const webpackConfigProd = require('./webpack.config.prod.js');
const webpackServer = require('./webpack.server.js');

// vanilla server for development
gulp.task('server', helpers.createServerTask(webpackConfigDev));

// enforces enforces hot module reloading
gulp.task(
    'server-hot',
    helpers.createServerTask(webpackServer.useHotReloading(webpackConfigDevHot), true)
);

// enforces browsersync (server runs on a different port - see webpack.server.js)
gulp.task('server-sync', helpers.createServerTask(webpackServer.useBrowserSync(webpackConfigDev)));

// applies full minifaction and sourcemaps.  it does NOT use webpack dev server, so no reloading.
gulp.task('server-prod', ['build-prod'], shell.task('node ./localhost/server.js'));

// creates a dev build - assets optimised for quicker builds and developer convenience (debugging)
gulp.task('build', ['clean'], helpers.createBuildTask(webpackConfigDev));

// creates a prod build - assets optimised for file size (minified), service worker included
gulp.task('build-prod', done => runSequence('build-prod-assets', 'build-prod-svc-worker', done));
gulp.task('build-prod-assets', ['clean'], helpers.createBuildTask(webpackConfigProd));
gulp.task('build-prod-svc-worker', done => helpers.createServiceWorker(done));

// provides in depth ananlysis of a builds various bundles and chunk sizes
gulp.task('analyze', ['clean'], helpers.analyze(webpackConfigDev));
gulp.task('analyze-prod', ['clean'], helpers.analyze(webpackConfigProd));

// cleans the build folder
gulp.task('clean', () => del([`${config.directories.build}/**/*`]));

// common aliases
gulp.task('serve', ['server']);
gulp.task('default', ['build']);
