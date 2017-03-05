// @flow

// enums
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const VISIBILITY_FILTERS = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

// types
type ActionAddToDo = {
    type: string,
    text: string
};
type ActionToggleTodo = {
    type: string,
    index: number
};
type ActionSetVisiblity = {
    type: string,
    filter: string
};
type VisiblityFilter = $Keys<typeof VISIBILITY_FILTERS>;

// creators
export function addTodo(text: string): ActionAddToDo {
    return { type: ADD_TODO, text };
}
export function toggleTodo(index: number): ActionToggleTodo {
    return { type: TOGGLE_TODO, index };
}
export function setVisibilityFilter(filter: VisiblityFilter): ActionSetVisiblity {
    return { type: SET_VISIBILITY_FILTER, filter };
}
