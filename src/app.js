import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { makeStore } from './store';
import { AppRouter } from './app-router';
import './assets/app.less';

const store = makeStore();

const hideAndRemoveOverlay = (el) => {
    el.classList.add('invisible');
    setTimeout(() => el.parentNode.removeChild(el), 2000);
};

export const boot = (el) => {
    render(
        <Provider store={store}>
            <AppRouter />
        </Provider>,
        el
    );
    hideAndRemoveOverlay(document.getElementById('shell-loading-overlay'));
};
