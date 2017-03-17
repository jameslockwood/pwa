/* eslint-disable import/no-extraneous-dependencies */

// config applied to production builds

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base.js');
const prodStylesConfig = require('./webpack.styles.js').prod;

module.exports = webpackMerge(baseWebpackConfig, prodStylesConfig, {
    devtool: 'source-map', // https://webpack.js.org/configuration/devtool/
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
});
