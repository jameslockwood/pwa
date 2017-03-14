import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { makeStore } from './app-store';
import async from './utils/async';
import './app.less';

const store = makeStore('app');
const Module1 = async(() => import('./features/people/app').then(module => module.default));
const Module2 = async(() => import('./features/time/app').then(module => module.default));

Promise.all([Module1, Module2]).then(() => {
    window.console.log('--- modules have finished loading');
});

const App = () => (
    <BrowserRouter basename="/fx/">
        <div className="app-container">
            <p>Application Loaded</p>
            <Link to="/">App 1</Link>
            <Link to="/2">App 2</Link>
            <Route exact path="/" component={Module1} />
            <Route path="/2" component={Module2} />
        </div>
    </BrowserRouter>
);

export const boot = (el) => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        el
    );
};
