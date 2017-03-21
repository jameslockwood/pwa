/* eslint-disable import/no-extraneous-dependencies */

// config applied to dev builds
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base.js');
const devStylesConfig = require('./webpack.styles.js').dev;
const devHtmlConfig = require('./webpack.html.js').dev;

module.exports = webpackMerge(baseWebpackConfig, devStylesConfig, devHtmlConfig, {
    // https://webpack.js.org/configuration/devtool/
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ]
});
