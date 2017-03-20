// add middleware here (express app object injected)
// see https://webpack.js.org/configuration/dev-server/#devserver-setup

const peopleMock = require('./mocks/people.js');
const path = require('path');

module.exports = function createMiddleware(config) {
    return (app) => {
        app.get(`/${config.name}/api/people`, (req, res) => {
            setTimeout(() => res.json(peopleMock()), Math.random() * 1000);
        });
        // allows service worker to be served during dev (as not tracked by webpack dev server)
        app.get(`/${config.name}/${config.serviceWorkerFilename}`, (req, res) => {
            res.sendFile(
                path.join(__dirname, `../${config.directories.build}`, config.serviceWorkerFilename)
            );
        });
    };
};
