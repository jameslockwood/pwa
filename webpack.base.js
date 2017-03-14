/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config.js');

const criticalPathCSSFilename = 'ignore_as_styles_inlined_in_html';
const criticalPathCSSRegex = /\bshell\b.(css|less|sass|scss)/;
const critialPathCSSPlugin = new ExtractTextPlugin(criticalPathCSSFilename);

module.exports = {
    context: path.resolve(__dirname, config.directories.source),
    entry: {
        shell: ['./shell.js']
    },
    output: {
        filename: '[name]-bundle.js',
        chunkFilename: '[name]-async-chunk.js',
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
            },
            {
                // responsbile for loading critical path css
                test: criticalPathCSSRegex,
                use: critialPathCSSPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                // responsible for loading the rest of our application css
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
                exclude: criticalPathCSSRegex
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
        new HtmlWebpackPlugin({ template: 'shell.html' }),

        // extracts our critical path css for StyleExtHtmlWebpackPlugin
        critialPathCSSPlugin,

        // inlines our critical path CSS into index.html
        new StyleExtHtmlWebpackPlugin(criticalPathCSSFilename)
    ]
};
