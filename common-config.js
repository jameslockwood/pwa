const pkg = require('./package.json');

module.exports = {
    host: 'localhost',
    path: `/${pkg.name}/`,
    port: 8080,
    browserSync: {
        port: 3000
    },
    directories: {
        source: './src',
        build: './dist',
    }
};
