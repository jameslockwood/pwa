// @flow

import ACTION_TYPES from 'src/actions/types';
import type { ActionToggleParents } from 'src/actions/toggle-parents';
import type { Action } from 'src/types/core';

function changeFilter(state: bool, action: ActionToggleParents): bool {
    return !action.payload.parentsOnly;
}

const reducers = {
    [ACTION_TYPES.TOGGLE_PARENTS]: changeFilter
};

export default function filterReducer(state: bool, action: Action): bool {
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    }
    return state;
}
