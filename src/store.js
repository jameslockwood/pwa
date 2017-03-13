// @flow

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import type { RootState } from 'src/types/core';
import reducer from './reducers/root';
import fetchPeopleAction from './actions/fetch-people';
import persistanceFactory from './persistance';


export const makeStore = (appName: string) => {
    const logger = createLogger();
    const persistance = persistanceFactory(appName);
    const initialState = persistance.load();
    const store = createStore(reducer, initialState, applyMiddleware(thunk, logger));
    store.dispatch(fetchPeopleAction());
    store.subscribe(() => {
        const state: RootState = store.getState();
        persistance.save({
            filterString: state.filterString,
            parentsOnly: state.parentsOnly
        });
    })
    return store;
};

export default makeStore;
