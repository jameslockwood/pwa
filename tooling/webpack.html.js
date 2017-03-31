/* eslint-disable import/no-extraneous-dependencies, no-unused-vars */

// provides css configuration for dev, dev + hot reload, and production builds.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const shellEntry = 'shell.html';
const commonHtmlPlugins = [
    // 'asyncs' our initial shell scripts
    new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'async'
    }),

    // preloads our chunk scripts
    // https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/
    new PreloadWebpackPlugin({
        rel: 'preload',
        as: 'script',
        include: 'asyncChunks'
    })
];

module.exports = {
    dev: {
        plugins: [
            new HtmlWebpackPlugin({
                template: shellEntry
            }),
            ...commonHtmlPlugins
        ]
    },
    prod: {
        plugins: [
            new HtmlWebpackPlugin({
                template: shellEntry,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            }),
            ...commonHtmlPlugins
        ]
    }
};
