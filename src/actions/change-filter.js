// @flow

import ACTION_TYPES from './types';

export type ActionChangeFilter = {
    type: string,
    payload: {
        filter: string
    }
};

export default function changeFilterAction(filter: string): ActionChangeFilter {
    return { type: ACTION_TYPES.CHANGE_FILTER, payload: { filter } };
}
