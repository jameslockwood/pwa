// @flow

export type Person = {
    name: string,
    age: number,
    children: bool,
    id?: number
};

export type People = Array<Person>;

export type RootState = {
    people: People,
    filterString: string,
    parentsOnly: bool
};

export type Action = {
    type: string,
    payload?: any,
    error?: bool,
    metadata?: any
}
