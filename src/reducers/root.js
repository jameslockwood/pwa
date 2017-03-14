// @flow

import type { RootState, Action } from 'src/types/core';
import bootReducer from './boot';
import peopleReducer from './people';
import filterReducer from './filter';
import parentsReducer from './parents';

export default function reducer(state: Object = {}, action: Action): RootState {
    return {
        boot: bootReducer(state.boot, action),
        people: peopleReducer(state.people, action),
        filterString: filterReducer(state.filterString, action),
        parentsOnly: parentsReducer(state.parentsOnly, action)
    };
}
