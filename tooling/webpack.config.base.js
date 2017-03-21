/* eslint-disable import/no-extraneous-dependencies */

// base config - applied to all builds
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const config = require('../config.js');

const polyfills = ['babel-polyfill', 'fetch-polyfill'];

module.exports = {
    context: path.resolve(__dirname, '../', config.directories.source),
    entry: {
        [config.entryPointName]: [...polyfills, './shell.js']
    },
    output: {
        filename: '[name]-bundle.js',
        chunkFilename: '[name]-chunk.js',
        path: path.resolve(__dirname, config.directories.build),
        sourceMapFilename: '[file].map'
    },
    resolve: {
        alias: {
            // allows us to import/require 'src/whatever'
            src: path.resolve(__dirname, '../', config.directories.source)
        },
        extensions: ['.js']
    },
    module: {
        loaders: [
            {
                // responsible for loading/transpiling our js assets
                loader: 'babel-loader',
                test: /\.js$/,
                include: path.resolve(__dirname, '../', config.directories.source),
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['syntax-dynamic-import']
                }
            },
            {
                // handles our images
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[hash].[ext]'
                }
            },
            {
                // our web-app manifest file
                test: /web-manifest.json$/,
                loader: ['file-loader?name=[name].[ext]', 'web-app-manifest-loader']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                SERVICE_WORKER_FILENAME: JSON.stringify(config.serviceWorkerFilename)
            }
        }),

        // bundles any files used in more than one place
        new webpack.optimize.CommonsChunkPlugin({
            async: 'shared', // prefixes common async chunk files
            minChunks(module, count) {
                return count >= 2;
            }
        }),

        // creates our base html tempalte, injects assets
        new HtmlWebpackPlugin({ template: 'shell.html' }),

        // 'asyncs' our initial shell scripts
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async'
        })
    ]
};
