/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.js');

module.exports = webpackMerge(baseWebpackConfig, {
    devtool: 'source-map',
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
