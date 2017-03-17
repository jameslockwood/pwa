/* eslint-disable import/no-extraneous-dependencies */

// config applied to dev builds

const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base.js');
const devStylesConfig = require('./webpack.styles.js').dev;

module.exports = webpackMerge(baseWebpackConfig, devStylesConfig, {
    devtool: '#cheap-module-eval-source-map' // https://webpack.js.org/configuration/devtool/
});
