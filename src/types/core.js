// @flow

export type Person = {
    name: string,
    age: number,
    children: boolean,
    id?: number,
    local?: boolean
};

export type PeopleList = Array<Person>;

export type BootState = {
    loading: boolean,
    loadSuccess: boolean
};

export type People = {
    list: PeopleList,
    loading: boolean
};

export type RootState = {
    boot: BootState,
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
