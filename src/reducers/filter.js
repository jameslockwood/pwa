// @flow

import ACTION_TYPES from 'src/actions/types';
import type { ActionChangeFilter } from 'src/actions/change-filter';
import type { Action } from 'src/types/core';

function changeFilter(state: string, action: ActionChangeFilter): string {
    return action.payload.filter;
}

export default function filterReducer(state: string = '', action: Action): string {
    switch (action.type) {
    case ACTION_TYPES.CHANGE_FILTER:
        return changeFilter(state, action);
    default:
        return state;
    }
}
