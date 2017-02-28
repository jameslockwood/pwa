const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const config = require('./common-config.js');

module.exports = {
    context: path.resolve(__dirname, config.directories.source),
    entry: {
        app: ['./app.js']
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: './',
        sourceMapFilename: '[file].map'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                include: path.resolve(__dirname, config.directories.source),
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'commons', filename: '[name].bundle.js', minChunks: 2}),
        new HtmlWebpackPlugin({template: 'index.html'}),
        new ExtractTextPlugin('[name].css'),
        new BrowserSyncPlugin({
            host: config.host,
            port: config.browserSync.port,

            // same as webpack dev server
            proxy: `http://${config.host}:${config.port + config.path}`,

            // prevent browser from opening automatically
            open: false
        }, {
            // webpack dev server handles this
            reload: false
        })
    ]
};
