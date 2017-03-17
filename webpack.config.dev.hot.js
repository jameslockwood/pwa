/* eslint-disable import/no-extraneous-dependencies */

// config applied to hot reload dev builds

const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base.js');
const hotReloadStylesConfig = require('./webpack.styles.js').devHotReload;

module.exports = webpackMerge(baseWebpackConfig, hotReloadStylesConfig, {
    devtool: '#cheap-module-eval-source-map' // https://webpack.js.org/configuration/devtool/
});
