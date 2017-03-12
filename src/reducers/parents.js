// @flow

import ACTION_TYPES from 'src/actions/types';
import type { Action } from 'src/types/core';

function changeFilter(state: bool): bool {
    return !state;
}

const reducers = {
    [ACTION_TYPES.TOGGLE_PARENTS]: changeFilter
};

export default function filterReducer(state: bool = false, action: Action): bool {
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    }
    return state;
}
