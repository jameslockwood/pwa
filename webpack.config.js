const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src'),
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
        include: path.resolve(__dirname, './src'),
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: '[name].bundle.js',
      minChunks: 2
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new ExtractTextPlugin('[name].css'),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080/', // same as webpack dev server
        open: false // prevent browser from opening automatically,
      },
      {
        reload: false // webpack dev server handles this
      }
    )
  ]
};
