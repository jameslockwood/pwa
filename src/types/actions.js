// @flow
import type { Person } from './core';

// Standard Action - https://github.com/acdlite/flux-standard-action
export type Action = {
    type: string,
    payload?: any,
    error?: bool,
    metadata?: any
}
export type ActionAddPerson = {
    type: string,
    payload: Person
};
export type ActionToggleParents = {
    type: string,
    payload: {
        parentsOnly: boolean
    }
};
export type ActionChangeFilter = {
    type: string,
    payload: {
        filter: string
    }
};
export type ActionChangeDropdown = {
    type: string,
    payload: {
        filter: string
    }
};
