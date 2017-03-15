// @flow

import type { Person } from 'src/types/core';
import ACTION_TYPES from './types';

export type AddPersonAction = {
    type: string,
    payload: Person
};

export default function addPersonAction(
    name: string,
    age: number,
    children: boolean,
    local: boolean
): AddPersonAction {
    return { type: ACTION_TYPES.ADD_PERSON, payload: { name, age, children, local, id: 0 } };
}
