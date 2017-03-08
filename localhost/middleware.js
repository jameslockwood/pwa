// add middleware here (express app object injected)
// see https://webpack.js.org/configuration/dev-server/#devserver-setup

const peopleMock = require('./mocks/people.js');

module.exports = function createMiddleware(config) {
    return (app) => {
        app.get(`/${config.name}/api/people`, (req, res) => {
            setTimeout(() => res.json(peopleMock), Math.random() * 2000);
        });
    };
};
