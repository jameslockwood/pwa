// @flow
import type { Dispatch as DispatchFunction } from 'redux'

export type Dispatch = DispatchFunction<any>;
export type Person = {
    name: string,
    age: number,
    children: boolean,
    id: number | string,
    local?: boolean
};
export type PeopleList = Array<Person>;
export type IdList = Array<string | number>;
export type PeopleMapById = {
    [id: number | string]: Person
};
export type People = {
    byId: PeopleMapById,
    allIds: IdList,
    loading: boolean
};
export type BootState = {
    loading: boolean,
    loadSuccess: boolean
};
export type RootState = {
    boot: BootState,
    people: People,
    filterString: string,
    parentsOnly: boolean,
    offline: boolean
};
export type Action = {
    type: string,
    payload: any,
    error?: boolean,
    metadata?: any
};
