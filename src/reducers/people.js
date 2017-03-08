// @flow

import ACTION_TYPES from 'src/actions/types';
import type { AddPersonAction } from 'src/actions/add-person';
import type { FetchPeopleAction } from 'src/actions/fetch-people';
import type { Person, People, Action } from 'src/types/core';

function addPerson(state: People, action: AddPersonAction): People {
    const person: Person = {
        ...action.payload,
        id: state.list.length
    };
    return {
        ...state,
        list: [...state.list, person]
    };
}

function populateListRequest(state: People): People {
    return {
        ...state,
        loading: true
    };
}

function populateList(state: People, action: FetchPeopleAction): People {
    return {
        loading: false,
        list: action.payload.response
    };
}

const reducers = {
    [ACTION_TYPES.ADD_PERSON]: addPerson,
    [ACTION_TYPES.FETCH_PEOPLE_REQUEST]: populateListRequest,
    [ACTION_TYPES.FETCH_PEOPLE_SUCCESS]: populateList
};

export default function peopleReducer(state: People, action: Action): People {
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    }
    return state;
}
