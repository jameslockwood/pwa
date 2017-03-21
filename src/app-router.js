import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import { HeaderContainer } from './components/header';
import { async } from './utils/async';

const People = async(() => import('./components/people').then(module => module.default));
const Time = async(() => import('./components/time').then(module => module.default));

export const AppRouter = () => (
    <BrowserRouter basename="/fx/">
        <div className="app-container">
            <HeaderContainer />
            <div className="app-content-container">
                <Route exact path="/" component={People} />
                <Route path="/2" component={Time} />
            </div>
        </div>
    </BrowserRouter>
);

export default AppRouter;
