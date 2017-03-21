import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { makeStore } from './store';
import { AppRouter } from './app-router';
import createHealthDispatcher from './utils/health-dispatcher';

import './assets/app.less';

const store = makeStore();
const healthDispatcher = createHealthDispatcher(store.dispatch);

const createRoot = RootElement => (
    <Provider store={store}>
        <RootElement />
    </Provider>
);

// returned to the shell once the app has initially rendered
const api = {
    invalidate: healthDispatcher.emitNewContentAvailable
};

export const boot = hostElement =>
    new Promise((resolve) => {
        render(createRoot(AppRouter), hostElement, () => resolve(api));

        // hode module loading.  require used here due to browsersync bug
        if (module.hot && process.env.NODE_ENV !== 'production') {
            module.hot.accept('./app-router', () => {
                render(createRoot(require('./app-router').default), hostElement); // eslint-disable-line global-require
            });
        }
    });
