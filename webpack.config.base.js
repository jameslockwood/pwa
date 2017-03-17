/* eslint-disable import/no-extraneous-dependencies */

// base config - applied to all builds
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config.js');

const polyfills = ['babel-polyfill', 'fetch-polyfill'];

module.exports = {
    context: path.resolve(__dirname, config.directories.source),
    entry: {
        shell: [...polyfills, './shell.js']
    },
    output: {
        filename: '[name]-bundle-[hash].js',
        chunkFilename: '[name]-async-chunk-[hash].js',
        path: path.resolve(__dirname, config.directories.build),
        sourceMapFilename: '[file].map'
    },
    resolve: {
        alias: {
            // allows us to import/require 'src/whatever'
            src: path.resolve(__dirname, config.directories.source)
        },
        extensions: ['.js']
    },
    module: {
        loaders: [
            {
                // responsible for loading/transpiling our js assets
                loader: 'babel-loader',
                test: /\.js$/,
                include: path.resolve(__dirname, config.directories.source),
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['syntax-dynamic-import']
                }
            }
        ]
    },
    plugins: [
        // bundles any files used in more than one place
        new webpack.optimize.CommonsChunkPlugin({
            async: 'shared', // prefixes common async chunk files
            minChunks(module, count) {
                return count >= 2;
            }
        }),

        // creates our base html tempalte, injects assets
        new HtmlWebpackPlugin({ template: 'shell.html' })
    ]
};