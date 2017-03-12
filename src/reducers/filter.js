// @flow

import ACTION_TYPES from 'src/actions/types';
import type { ActionChangeFilter } from 'src/actions/change-filter';
import type { Action } from 'src/types/core';

function changeFilter(state: string, action: ActionChangeFilter): string {
    return action.payload.filter;
}

const reducers = {
    [ACTION_TYPES.CHANGE_FILTER]: changeFilter
};

export default function filterReducer(state: string = '', action: Action): string {
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    }
    return state;
}
