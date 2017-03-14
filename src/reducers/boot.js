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

const reducers = {
    [ACTION_TYPES.APPLICATION_LOAD_SUCCESS]: appLoadSuccess,
    [ACTION_TYPES.APPLICATION_LOAD_FAIL]: appLoadFailure
};

const defaultState: BootState = {
    loading: true,
    loadSuccess: false
};

export default function bootReducer(state: BootState = defaultState, action: Action): BootState {
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    }
    return state;
}
