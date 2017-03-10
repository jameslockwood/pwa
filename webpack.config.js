const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const config = require('./config.js');

module.exports = {
    context: path.resolve(__dirname, config.directories.source),
    entry: {
        shell: ['./shell.js']
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
            src: path.resolve(__dirname, config.directories.source)
        },
        extensions: ['.js']
    },
    devtool: 'cheap-eval-source-map',
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                include: path.resolve(__dirname, config.directories.source),
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['syntax-dynamic-import']
                }
            },
            {
                test: /\.(css|less)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'node-modules-static',
        //     filename: 'node-modules-static.js',
        //     minChunks(module) {
        //         return module.context && module.context.indexOf('node_modules') !== -1;
        //     }
        // }),

        // catch all - anything used in more than one place
        new webpack.optimize.CommonsChunkPlugin({
            async: 'shared',
            minChunks(module, count) {
                return count >= 2;
            }
        }),
        new HtmlWebpackPlugin({ template: 'index.html' }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new BrowserSyncPlugin(
            {
                host: config.host,
                port: config.browserSync.port,

                // same as webpack dev server
                proxy: `${config.scheme}://${config.host}:${config.port + config.path}`,

                // prevent browser from opening automatically
                open: false
            },
            {
                // webpack dev server handles this
                reload: false
            }
        )
    ]
};
