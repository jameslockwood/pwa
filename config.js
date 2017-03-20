const pkg = require('./package.json');
const middleware = require('./tooling/server/middleware.js');
const proxy = require('./tooling/server/proxy.js');

const config = {
    // project name
    name: pkg.name,

    // serve over http or https
    https: false,

    // local host
    host: 'localhost',

    // name of base bundle
    entryPointName: 'shell',

    // path at which app will served from during development
    path: `/${pkg.name}/`,

    ports: {
        dev: 8080, // local dev port
        prod: 8081 // prod port (different to stop svc worker conflicts)
    },

    // build and source directories
    directories: {
        source: './src',
        build: './dist',
        test: './test'
    },

    serviceWorkerFilename: 'service-worker.js',

    proxy,

    // returns correct url scheme
    get scheme() {
        return config.https ? 'https' : 'http';
    }
};

config.middleware = middleware(config);

module.exports = config;
