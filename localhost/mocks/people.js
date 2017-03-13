const faker = require('faker'); // eslint-disable-line import/no-extraneous-dependencies

const people = [];

for (let i = 0; i < 10; i++) {
    const age = Math.floor(Math.random() * 90);
    people.push({
        name: faker.name.findName(),
        age,
        children: age > 16 && Math.random() > 0.5,
        id: i,
        local: false
    });
}

module.exports = people;
