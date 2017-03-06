// @flow

export type Person = {
    name: string,
    age: number,
    children: bool,
    id?: number
};

export type RootState = {
    people: Array<Person>,
    filterString: string,
    parentsOnly: bool
};
