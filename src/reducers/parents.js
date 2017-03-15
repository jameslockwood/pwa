// @flow

import ACTION_TYPES from 'src/actions/types';
import type { Action } from 'src/types/core';

function changeFilter(state: boolean): boolean {
    return !state;
}

export default function filterReducer(state: boolean = false, action: Action): boolean {
    switch (action.type) {
    case ACTION_TYPES.TOGGLE_PARENTS:
        return changeFilter(state, action);
    default:
        return state;
    }
}
