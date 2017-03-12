import 'babel-polyfill';
import moment from 'moment';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { makeStore } from './store';
import App from './components/root';

const store = makeStore();

export const boot = (el) => {
    window.console.log('the time is', moment().toString());
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        el
    );
};
