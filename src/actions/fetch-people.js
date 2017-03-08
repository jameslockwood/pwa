// @flow

import ACTION_TYPES from './types';

export type FetchPeopleAction = {
    type: string,
    payload: {
        fetching: boolean,
        error: boolean,
        response: any
    }
};

export function fetchPeopleRequestAction(): FetchPeopleAction {
    return {
        type: ACTION_TYPES.FETCH_PEOPLE_REQUEST,
        payload: {
            fetching: true,
            error: false,
            response: null
        }
    };
}

export function fetchPeopleFailureAction(error: Error): FetchPeopleAction {
    return {
        type: ACTION_TYPES.FETCH_PEOPLE_FAILURE,
        payload: {
            fetching: false,
            error: true,
            response: error
        }
    };
}

export function fetchPeopleSuccessAction(response: Object): FetchPeopleAction {
    return {
        type: ACTION_TYPES.FETCH_PEOPLE_SUCCESS,
        payload: {
            fetching: false,
            error: false,
            response
        }
    };
}

export default function fetchPeopleAction() {
    return function fetchPeopleDispatch(dispatch: any) {
        dispatch(fetchPeopleRequestAction());
        return fetch('/fx/api/people')
            .then(response => response.json())
            .then(json => dispatch(fetchPeopleSuccessAction(json)))
            .catch(e => dispatch(fetchPeopleFailureAction(e)));
    };
}
