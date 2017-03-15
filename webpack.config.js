/* eslint-disable import/no-extraneous-dependencies */

const webpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const config = require('./config.js');
const baseWebpackConfig = require('./webpack.base.js');
const devStylesConfig = require('./webpack.styles.js').dev;

module.exports = webpackMerge(baseWebpackConfig, devStylesConfig, {
    devtool: '#cheap-module-eval-source-map', // https://webpack.js.org/configuration/devtool/
    plugins: [
        // for dev only - syncs page over multiple devices during development
        new BrowserSyncPlugin(
            {
                host: config.host,
                port: config.browserSync.port,

                // same as webpack dev server
                proxy: `${config.scheme}://${config.host}:${config.port + config.path}`,

                // prevent browser from opening automatically
                open: false
            },
            {
                // webpack dev server handles this
                reload: false
            }
        )
    ]
});
