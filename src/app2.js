import 'babel-polyfill';
import moment from 'moment';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers/root';
import App from './components/root';
import fetchPeopleAction from './actions/fetch-people';
import toggleParentsAction from './actions/toggle-parents';

const logger = createLogger();
const store = createStore(reducer, applyMiddleware(thunk, logger));

export const boot = (el) => {
    window.console.log('the time is', moment().toString());
    store.dispatch(fetchPeopleAction());
    store.dispatch(toggleParentsAction());
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        el
    );
};
