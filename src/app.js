import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { makeStore } from './store';
import { AppRouter } from './app-router';
import offlineListener from './utils/offline-listener';

import './assets/app.less';

const store = makeStore();
offlineListener(store.dispatch);

const createRoot = RootElement => (
    <Provider store={store}>
        <RootElement />
    </Provider>
);

export const boot = hostElement =>
    new Promise((resolve) => {
        render(createRoot(AppRouter), hostElement, resolve);

        // hode module loading.  require used here due to browsersync bug
        return module.hot &&
            module.hot.accept('./app-router', () => {
                render(createRoot(require('./app-router').default), hostElement); // eslint-disable-line global-require
            });
    });
