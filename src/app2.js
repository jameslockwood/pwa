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

import './styles.less';

const logger = createLogger();
const store = createStore(reducer, applyMiddleware(thunk, logger));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app-2')
);

store.dispatch(fetchPeopleAction());
store.dispatch(toggleParentsAction());

window.console.log('time is', moment());
