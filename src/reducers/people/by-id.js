// @flow

import ACTION_TYPES from 'src/actions/types';
import type { AddPersonAction } from 'src/actions/add-person';
import type { FetchPeopleAction } from 'src/actions/fetch-people';
import type { Action, PeopleMapById } from 'src/types/core';

function addPerson(state: PeopleMapById, action: AddPersonAction): PeopleMapById {
    const person = action.payload;
    return {
        ...state,
        [person.id]: person
    };
}

function populateList(state: PeopleMapById, action: FetchPeopleAction): PeopleMapById {
    const byId = {};
    const people = action.payload;
    people.forEach((person) => {
        byId[person.id] = person;
    });
    return byId;
}

export default function peopleReducer(state: PeopleMapById = {}, action: Action): PeopleMapById {
    switch (action.type) {
    case ACTION_TYPES.ADD_PERSON:
        return addPerson(state, action);
    case ACTION_TYPES.FETCH_PEOPLE_SUCCESS:
        return populateList(state, action);
    default:
        return state;
    }
}
