const config = require('./config.js');

// add middleware here (express app object injected)
// see https://webpack.js.org/configuration/dev-server/#devserver-setup
const middleware = (app) => {
    app.get(`/${config.name}/api/people`, (req, res) => {
        setTimeout(
            () => res.json([
                {
                    name: 'James Lockwood',
                    age: 31,
                    parent: false
                },
                {
                    name: 'Wendy Musique',
                    age: 40,
                    parent: false
                },
                {
                    name: 'John Lockwood',
                    age: 72,
                    parent: true
                },
                {
                    name: 'Susan Lockwood',
                    age: 61,
                    parent: true
                },
                {
                    name: 'John Woolley',
                    age: 35,
                    parent: true
                },
                {
                    name: 'Joanne Woolley',
                    age: 33,
                    parent: true
                },
                {
                    name: 'Jack Woolley',
                    age: 1,
                    parent: false
                }
            ]),
            Math.random() * 2000
        );
    });
};

module.exports = {
    middleware
};
