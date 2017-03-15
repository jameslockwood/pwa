// @flow

import ACTION_TYPES from 'src/actions/types';
import type { AddPersonAction } from 'src/actions/add-person';
import type { FetchPeopleAction } from 'src/actions/fetch-people';
import type { Action, IdList } from 'src/types/core';

function addPerson(state: IdList, action: AddPersonAction): IdList {
    const person = action.payload;
    return [...state, person.id];
}

function populateList(state: IdList, action: FetchPeopleAction): IdList {
    return [...state, ...action.payload.response.map(i => i.id)];
}

export default function peopleReducer(state: IdList = [], action: Action): IdList {
    switch (action.type) {
    case ACTION_TYPES.ADD_PERSON:
        return addPerson(state, action);
    case ACTION_TYPES.FETCH_PEOPLE_SUCCESS:
        return populateList(state, action);
    default:
        return state;
    }
}
