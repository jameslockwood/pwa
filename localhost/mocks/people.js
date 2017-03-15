/* eslint-disable import/no-extraneous-dependencies, no-plusplus */

const v4 = require('uuid').v4;
const faker = require('faker');

const people = [];

for (let i = 0; i < 10; i++) {
    const age = Math.floor(Math.random() * 90);
    people.push({
        name: faker.name.findName(),
        age,
        children: age > 16 && Math.random() > 0.5,
        id: v4(),
        local: false
    });
}

module.exports = people;
