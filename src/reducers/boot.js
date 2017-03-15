// @flow

import ACTION_TYPES from 'src/actions/types';
import type { BootState, Action } from 'src/types/core';

function appLoadSuccess(): BootState {
    return {
        loading: false,
        loadSuccess: true
    };
}

function appLoadFailure(): BootState {
    return {
        loading: false,
        loadSuccess: false
    };
}

const defaultState: BootState = {
    loading: true,
    loadSuccess: false
};

export default function bootReducer(state: BootState = defaultState, action: Action): BootState {
    switch (action.type) {
    case ACTION_TYPES.APPLICATION_LOAD_SUCCESS:
        return appLoadSuccess(state, action);
    case ACTION_TYPES.APPLICATION_LOAD_FAIL:
        return appLoadFailure(state, action);
    default:
        return state;
    }
}
