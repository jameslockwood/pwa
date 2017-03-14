import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { makeStore } from './app-store';
import { App } from './app-router';
import './app.less';

const store = makeStore();

export const boot = (el) => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        el
    );
};
