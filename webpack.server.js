/* eslint-disable import/no-extraneous-dependencies */

// applies server tooling to dev builds (browser sync and hot module reloading)

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const config = require('./config.js');
const path = require('path');

const serverEntry = [`webpack-dev-server/client?${config.scheme}://${config.host}:${config.port}/`];

module.exports = {
    useBrowserSync(webpackConfig) {
        return webpackMerge(webpackConfig, {
            entry: {
                [config.entryPointName]: serverEntry
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
                new BrowserSyncPlugin(
                    {
                        host: config.host,
                        port: 3000,

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
        });
    },
    useHotReloading(webpackConfig) {
        return webpackMerge(
            {
                entry: {
                    [config.entryPointName]: [...serverEntry, 'webpack/hot/only-dev-server']
                },
                plugins: [new webpack.HotModuleReplacementPlugin()]
            },
            webpackConfig
        );
    }
};
