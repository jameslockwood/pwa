import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { makeStore } from './store';
import App from './components/root';

const store = makeStore();

export const boot = (el) => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        el
    );
};
