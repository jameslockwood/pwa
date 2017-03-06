// @flow
import type {
    ActionAddPerson,
    ActionChangeFilter,
    ActionToggleParents,
    ActionChangeDropdown
} from 'src/types/actions';

// enums
export const ADD_PERSON = 'ADD_PERSON';
export const TOGGLE_PARENTS_ONLY = 'TOGGLE_PARENTS_ONLY';
export const CHANGE_FILTER = 'CHANGE_FILTER';
export const CHANGE_DROPDOWN = 'CHANGE_DROPDOWN';
export const DROPDOWNS = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export type AvailableDropdowns = $Keys<typeof DROPDOWNS>;

// creators
export function addPerson(name: string, age: number, children: boolean): ActionAddPerson {
    return { type: ADD_PERSON, payload: { name, age, children } };
}
export function toggleParentsOnly(parentsOnly: boolean): ActionToggleParents {
    return { type: TOGGLE_PARENTS_ONLY, payload: { parentsOnly } };
}
export function changeFilter(filter: string): ActionChangeFilter {
    return { type: CHANGE_FILTER, payload: { filter } };
}
export function changeDropdown(filter: AvailableDropdowns): ActionChangeDropdown {
    return { type: CHANGE_DROPDOWN, payload: { filter } };
}
