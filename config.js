const pkg = require('./package.json');
const middleware = require('./localhost/middleware.js');
const proxy = require('./localhost/proxy.js');

const config = {
    // project name
    name: pkg.name,

    // serve over http or https
    https: false,

    // local host
    host: 'localhost',

    // path at which app will served from during development
    path: `/${pkg.name}/`,

    // local dev port
    port: 8080,

    // browsersync options
    browserSync: {
        port: 3000
    },

    // build and source directories
    directories: {
        source: './src',
        build: './dist',
        test: './test'
    },

    proxy,

    // returns correct url scheme
    get scheme() {
        return config.https ? 'https' : 'http';
    }
};

config.middleware = middleware(config);

module.exports = config;
