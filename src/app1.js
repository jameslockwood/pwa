import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers/root';
import App from './components/root';
import fetchPeopleAction from './actions/fetch-people';

const logger = createLogger();
const store = createStore(reducer, applyMiddleware(thunk, logger));

export const boot = (el) => {
    store.dispatch(fetchPeopleAction());
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        el
    );
};
