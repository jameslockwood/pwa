// @flow

import ACTION_TYPES from './types';

export type BootAction = {
    type: string,
    payload: null
};

export function applicationLoadSuccess(): BootAction {
    return { type: ACTION_TYPES.APPLICATION_LOAD_SUCCESS, payload: null };
}

export function applicationLoadFailure(): BootAction {
    return { type: ACTION_TYPES.APPLICATION_LOAD_FAIL, payload: null };
}
