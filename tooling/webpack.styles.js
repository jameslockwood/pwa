/* eslint-disable import/no-extraneous-dependencies, no-unused-vars, global-require */

// provides css configuration for dev, dev + hot reload, and production builds.

const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// name of critical path css output (injected into <head> in dev mode)
const criticalPathOutputFile = 'shell.css';
const appOutputFile = 'styles.css';

// critical path ENTRY POINT regex (i.e. shell.less)
const criticalPathEntryRegex = /\bshell\b.\b(css|less|sass|scss)\b/;
const criticalPathEntryRegexModular = /\bshell\b.\b(m)(css|less|sass|scss)\b/;

// post CSS loader which adds our prefixes
const LOADERS = {
    fallback: 'style-loader',
    less: 'less-loader',
    css: 'css-loader',
    cssModular: {
        loader: 'css-loader',
        options: {
            modules: true
        }
    },
    postCss: {
        loader: 'postcss-loader',
        options: {
            plugins() {
                return [
                    require('autoprefixer')({
                        flexbox: 'no-2009', // prevent old
                        browsers: ['ie >= 11', 'Chrome >= 45', 'Firefox >= 40']
                    })
                ];
            }
        }
    }
};

const defaultLoaders = [LOADERS.css, LOADERS.postCss, LOADERS.less];
const modularLoaders = [LOADERS.cssModular, LOADERS.postCss, LOADERS.less];
const defaultLoadersWithFallback = [LOADERS.fallback, ...defaultLoaders];
const modularLoadersWithFallback = [LOADERS.fallback, ...modularLoaders];
const stylesRegex = /\.\b(css|less)\b$/;
const modularStylesRegex = /\.\b(m)(css|less)\b$/;

// plugin extracts critical path css
const critialPathPlugin = new ExtractTextPlugin(criticalPathOutputFile);

// plugin extracts appliction css
const applicationPlugin = new ExtractTextPlugin({
    filename: appOutputFile,
    allChunks: true
});

// plugin inlines critical path css into <head>
const inlinePlugin = new StyleExtHtmlWebpackPlugin(criticalPathOutputFile);

// *All* styles extracted simply injected at runtime
function getHotLoaders() {
    const vanilla = {
        test: stylesRegex,
        use: defaultLoadersWithFallback
    };
    const modular = {
        test: modularStylesRegex,
        use: modularLoadersWithFallback
    };
    return [vanilla, modular];
}

// app css - styles are injected into html from modules at runtime
function getAppLoaders() {
    const vanilla = {
        test: stylesRegex,
        use: defaultLoadersWithFallback,
        exclude: criticalPathEntryRegex
    };
    const modular = {
        test: modularStylesRegex,
        use: modularLoadersWithFallback,
        exclude: criticalPathEntryRegex
    };
    return [vanilla, modular];
}

// shell css loader (critial path - barebones styles to load upfront)
function getShellLoaders() {
    const vanilla = {
        test: criticalPathEntryRegex,
        use: critialPathPlugin.extract({
            fallback: LOADERS.fallback,
            use: defaultLoaders
        })
    };
    const modular = {
        test: criticalPathEntryRegexModular,
        use: critialPathPlugin.extract({
            fallback: LOADERS.fallback,
            use: modularLoaders
        })
    };
    return [vanilla, modular];
}

function getLoaders() {
    const shell = getShellLoaders();
    const application = getAppLoaders();
    return [...shell, ...application];
}

module.exports = {
    // default dev
    // - extracts critical path styles then inlines into <head>
    // - app styles NOT extracted - bundled with JS and injected into <head> at runtime
    dev: {
        module: {
            loaders: getLoaders()
        },
        plugins: [critialPathPlugin, inlinePlugin]
    },

    // dev (for hot reload):  All styles extracted & simply injected using JS at runtime
    devHotReload: {
        module: {
            loaders: getHotLoaders()
        }
    },

    // Prod: No external CSS files.
    // - extracts critical path styles then inlines into <head>
    // - app styles NOT extracted - bundled with JS and injected into <head> at runtime
    prod: {
        module: {
            loaders: getLoaders()
        },
        plugins: [critialPathPlugin, inlinePlugin]
    }
};
