// @flow

import type { RootState, Action } from 'src/types/core';
import boot from './boot';
import people from './people/root';
import filterString from './filter';
import parentsOnly from './parents';

export default function reducer(state: Object = {}, action: Action): RootState {
    return {
        boot: boot(state.boot, action),
        people: people(state.people, action),
        filterString: filterString(state.filterString, action),
        parentsOnly: parentsOnly(state.parentsOnly, action)
    };
}
