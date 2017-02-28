const pkg = require('./package.json');

module.exports = {

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
    }

};
