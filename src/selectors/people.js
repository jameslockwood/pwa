// @flow

import type { People, PeopleList } from 'src/types/core';

export const getVisiblePeople = (people: People, filter: string): PeopleList => {
    const list = people.ids.map(i => people.peopleById[i]);
    if (filter.length) {
        return list.filter(i => i.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
    return list;
};
