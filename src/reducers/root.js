// @flow

import type { RootState, Action } from 'src/types/core';
import boot from './boot';
import people from './people/root';
import filter from './filter';
import parents from './parents';
import offline from './offline';

export default function reducer(state: Object = {}, action: Action): RootState {
    return {
        boot: boot(state.boot, action),
        people: people(state.people, action),
        filterString: filter(state.filterString, action),
        parentsOnly: parents(state.parentsOnly, action),
        offline: offline(state.offline, action)
    };
}
