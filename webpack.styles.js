/* eslint-disable import/no-extraneous-dependencies */

const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// name of critical path css output (injected into <head> in dev mode)
const criticalPathOutputFile = 'shell.css';
const appOutputFile = 'styles.css';

// critical path ENTRY POINT regex (i.e. shell.less)
const criticalPathEntryRegex = /\bshell\b.(css|less|sass|scss)/;

// plugin extracts critical path css
const critialPathPlugin = new ExtractTextPlugin(criticalPathOutputFile);

// plugin extracts appliction css
const applicationPlugin = new ExtractTextPlugin({
    filename: appOutputFile,
    allChunks: true
});

// plugin inlines critical path css into <head>
const inlinePlugin = new StyleExtHtmlWebpackPlugin(criticalPathOutputFile);

// app css (prod) - styles are injected into html from modules at runtime
const AppLoaderProd = {
    test: /\.(css|less)$/,
    use: ['style-loader', 'css-loader', 'less-loader'],
    exclude: criticalPathEntryRegex
};

// app css (dev) - styles extracted into stylesheet and inserted into <head>
const AppLoaderDev = {
    test: /\.(css|less)$/,
    use: applicationPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader']
    }),
    exclude: criticalPathEntryRegex
};

// critial path css loader (i.e. shell - barebones styles to load upfront)
const CriticalPathLoader = {
    test: criticalPathEntryRegex,
    use: critialPathPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader']
    })
};

module.exports = {
    // Dev:  All styles extracted into CSS files.
    // - extracts critical path and app styles into css files
    // - places links to css files in <head>
    dev: {
        module: {
            loaders: [CriticalPathLoader, AppLoaderDev]
        },
        plugins: [critialPathPlugin, applicationPlugin]
    },

    // Prod: No external CSS files.
    // - extracts critical path styles then inlines into <head>
    // - app styles NOT extracted - bundled with JS and injected into <head> at runtime
    prod: {
        module: {
            loaders: [CriticalPathLoader, AppLoaderProd]
        },
        plugins: [critialPathPlugin, inlinePlugin]
    }
};
