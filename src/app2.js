import moment from 'moment';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { makeStore } from './store';
import App from './components/root';

const store = makeStore('app2');

export const boot = (el) => {
    window.console.log('App loaded at', moment().toString());
    render(
        <Provider store={store}>
            <App title="Async 2" />
        </Provider>,
        el
    );
};
