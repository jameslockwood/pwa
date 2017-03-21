/* eslint-disable import/no-extraneous-dependencies */

// config applied to hot reload dev builds
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base.js');
const hotReloadStylesConfig = require('./webpack.styles.js').devHotReload;
const devHtmlConfig = require('./webpack.html.js').dev;

module.exports = webpackMerge(baseWebpackConfig, hotReloadStylesConfig, devHtmlConfig, {
    devtool: '#cheap-module-eval-source-map', // https://webpack.js.org/configuration/devtool/
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ]
});
