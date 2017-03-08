// @flow

export type Person = {
    name: string,
    age: number,
    children: boolean,
    id?: number
};

export type PeopleList = Array<Person>;

export type People = {
    list: PeopleList,
    loading: boolean
};

export type RootState = {
    people: People,
    filterString: string,
    parentsOnly: boolean
};

export type Action = {
    type: string,
    payload?: any,
    error?: boolean,
    metadata?: any
};
