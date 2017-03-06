// @flow

import type { RootState } from 'src/types/core';
import type {
    Action,
    ActionAddPerson,
    ActionChangeFilter,
    ActionToggleParents
} from './types/actions';
import { ADD_PERSON, TOGGLE_PARENTS_ONLY, CHANGE_FILTER } from './actions';

const initialState: RootState = {
    people: [],
    filterString: '',
    parentsOnly: false
};

function addPerson(state: RootState, action: ActionAddPerson): RootState {
    const person = {
        ...action.payload,
        id: state.people.length
    };
    return {
        ...state,
        people: [...state.people, person]
    };
}

function toggleParentsOnly(state: RootState, action: ActionToggleParents): RootState {
    return {
        ...state,
        parentsOnly: action.payload.parentsOnly
    };
}

function changeFilter(state: RootState, action: ActionChangeFilter): RootState {
    return {
        ...state,
        filterString: action.payload.filter
    };
}

export default function(state: RootState = initialState, action: Action) {
    const map = {
        [ADD_PERSON]: addPerson,
        [TOGGLE_PARENTS_ONLY]: toggleParentsOnly,
        [CHANGE_FILTER]: changeFilter
    };
    const fn = map[action.type] || (() => state);
    return fn(state, action);
}
