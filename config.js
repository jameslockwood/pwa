const pkg = require('./package.json');

module.exports = {
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

    // proxy requests to other destinations
    // see https://webpack.js.org/configuration/dev-server/#devserver-proxy
    proxy: {
        '/foo/bar': 'http://www.google.com'
    },

    // returns correct url scheme
    get scheme() {
        return this.https ? 'https' : 'http';
    }
};
