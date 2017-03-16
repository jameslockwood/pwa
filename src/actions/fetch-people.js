// @flow

import ACTION_TYPES from './types';

export type FetchPeopleAction = {
    type: string,
    payload: any
};

function fetchPeopleRequestAction(): FetchPeopleAction {
    return {
        type: ACTION_TYPES.FETCH_PEOPLE_REQUEST,
        payload: {}
    };
}

function fetchPeopleFailureAction(error: Error): FetchPeopleAction {
    return {
        type: ACTION_TYPES.FETCH_PEOPLE_FAILURE,
        payload: error
    };
}

function fetchPeopleSuccessAction(response: Object): FetchPeopleAction {
    return {
        type: ACTION_TYPES.FETCH_PEOPLE_SUCCESS,
        payload: response
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
