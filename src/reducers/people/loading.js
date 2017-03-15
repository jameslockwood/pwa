// @flow

import ACTION_TYPES from 'src/actions/types';
import type { Action } from 'src/types/core';

function populateListRequest(): boolean {
    return true;
}

function populateList(): boolean {
    return false;
}

export default function peopleReducer(state: boolean = false, action: Action): boolean {
    switch (action.type) {
    case ACTION_TYPES.FETCH_PEOPLE_REQUEST:
        return populateListRequest(state, action);
    case ACTION_TYPES.FETCH_PEOPLE_SUCCESS:
        return populateList(state, action);
    default:
        return state;
    }
}
