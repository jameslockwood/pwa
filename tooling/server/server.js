/* eslint-disable import/no-extraneous-dependencies, no-plusplus, no-console */

const http = require('http');
const express = require('express');
const compression = require('compression');
const proxyMiddleware = require('http-proxy-middleware');
const proxy = require('./proxy.js');
const config = require('../../config.js');
const expressMiddleware = require('./middleware.js')(config);

const app = express();
app.use(compression())
app.use(config.path, express.static('dist'));
app.use('/', express.static('../'));

// use shared middleware that webpack-dev-server also uses
expressMiddleware(app);

// apply proxies
Object.keys(proxy).forEach(prop => app.use(prop, proxyMiddleware(proxy[prop])));

if (require.main === module) {
    const server = http.createServer(app);
    server.listen(config.ports.prod, () => {
        console.log(
            `Note:  This is a simple HTTP server serving content from ${config.directories.build}`
        );
        console.log(`Server running on http://localhost:${config.ports.prod}/${config.name}/`);
    });
}
