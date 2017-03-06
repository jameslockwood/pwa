// @flow

import ACTION_TYPES from 'src/actions/types';
import type { AddPersonAction } from 'src/actions/add-person';
import type { People, Action } from 'src/types/core';

function addPerson(state: People, action: AddPersonAction): People {
    const person = {
        ...action.payload,
        id: state.length
    };
    return [...state, person];
}

const reducers = {
    [ACTION_TYPES.ADD_PERSON]: addPerson
};

export default function peopleReducer(state: People, action: Action): People {
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    }
    return state;
}
