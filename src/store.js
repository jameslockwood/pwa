// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import type { RootState } from 'src/types/core';
import reducer from './reducers/root';
import persistanceFactory from './utils/persistance';

export const makeStore = (appName: string) => {
    const logger = createLogger();
    const persistance = persistanceFactory(appName);
    const initialState = persistance.load();
    const middleware = [promise, thunk, logger];
    const store = createStore(reducer, initialState, applyMiddleware(...middleware));

    store.subscribe(() => {
        const state: RootState = store.getState();
        persistance.save({
            filterString: state.filterString,
            parentsOnly: state.parentsOnly
        });
    });

    return store;
};

export default makeStore;
