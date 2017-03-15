// @flow

import type { People, PeopleList } from 'src/types/core';

export const getVisiblePeople = (people: People, filter: string): PeopleList => {
    if (filter.length) {
        return people.list.filter(i => i.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
    return people.list;
};
