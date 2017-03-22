// @flow

const ACTION_TYPES = {
    ADD_PERSON: 'ADD_PERSON',
    CHANGE_DROPDOWN: 'CHANGE_DROPDOWN',
    CHANGE_FILTER: 'CHANGE_FILTER',
    TOGGLE_PARENTS: 'TOGGLE_PARENTS',
    FETCH_PEOPLE_REQUEST: 'FETCH_PEOPLE_REQUEST',
    FETCH_PEOPLE_FAILURE: 'FETCH_PEOPLE_FAILURE',
    FETCH_PEOPLE_SUCCESS: 'FETCH_PEOPLE_SUCCESS',
    APPLICATION_LOAD_SUCCESS: 'APPLICATION_LOAD_SUCCESS',
    APPLICATION_LOAD_FAIL: 'APPLICATION_LOAD_FAIL',
    APPLICATION_OFFLINE: 'APPLICATION_OFFLINE',
    APPLICATION_ONLINE: 'APPLICATION_ONLINE',
    NEW_CONTENT_AVAILABLE: 'NEW_CONTENT_AVAILABLE',
    SERVICE_WORKER_INSTALL_SUCCESS: 'SERVICE_WORKER_INSTALL_SUCCESS',
    SERVICE_WORKER_ACTIVE: 'SERVICE_WORKER_ACTIVE'
}

export default ACTION_TYPES;
