// @flow

import type { People, PeopleList } from 'src/types/core';

const getAllPeople = (state: People) => state.allIds.map(i => state.byId[i]);

export const getVisiblePeople = (people: People, filter: string): PeopleList => {
    const list = getAllPeople(people);
    if (filter.length) {
        return list.filter(i => i.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
    return list;
};
