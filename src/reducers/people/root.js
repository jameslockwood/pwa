// @flow

import type { People, Action } from 'src/types/core';
import loading from './loading';
import allIds from './all-ids';
import byId from './by-id';

const defaultState: People = {
    loading: false,
    allIds: [],
    byId: {}
};

export default function reducer(state: People = defaultState, action: Action): People {
    return {
        loading: loading(state.loading, action),
        allIds: allIds(state.allIds, action),
        byId: byId(state.byId, action)
    };
}
