// @flow

import ACTION_TYPES from 'src/actions/types';
import type { Action } from 'src/types/core';

export default function offlineReducer(state: boolean = false, action: Action): boolean {
    switch (action.type) {
    case ACTION_TYPES.APPLICATION_OFFLINE:
        return true;
    case ACTION_TYPES.APPLICATION_ONLINE:
        return false;
    default:
        return state;
    }
}
