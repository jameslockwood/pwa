import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { makeStore } from './store';
import async from './components/async';

const store = makeStore('app');
const App1 = async(() => import('./pages/app1').then(module => module.default));
const App2 = async(() => import('./pages/app2').then(module => module.default));

const App = () => (
    <BrowserRouter basename="/fx/">
        <div>
            <Link to="/">App 1</Link>
            <Link to="/2">App 2</Link>
            <Route exact path="/" component={App1} />
            <Route path="/2" component={App2} />
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
