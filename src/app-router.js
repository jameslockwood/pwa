import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import { HeaderContainer } from './components/header';
import Boxes from './components/boxes';
import AsyncComponent from './utils/async';

const People = AsyncComponent(() => import('./components/people'));
const Time = AsyncComponent(() => import('./components/time'));

export const AppRouter = () => (
    <BrowserRouter basename="/fx/">
        <div className="app-container">
            <HeaderContainer />
            <div className="app-content-container">
                <Route exact path="/" component={People} />
                <Route path="/2" component={Time} />
                <Route path="/boxes" component={Boxes} />
            </div>
        </div>
    </BrowserRouter>
);

export default AppRouter;
