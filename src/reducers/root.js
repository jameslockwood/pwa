// @flow

import type { RootState, Action } from 'src/types/core';
import peopleReducer from './people';
import filterReducer from './filter';
import parentsReducer from './parents';

const initialState: RootState = {
    people: {
        list: [],
        loading: false
    },
    filterString: '',
    parentsOnly: false
};

export default function reducer(state: RootState = initialState, action: Action): RootState {
    return {
        people: peopleReducer(state.people, action),
        filterString: filterReducer(state.filterString, action),
        parentsOnly: parentsReducer(state.parentsOnly, action)
    };
}
