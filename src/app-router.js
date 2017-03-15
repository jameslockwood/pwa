import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { HeaderContainer } from './features/header/header-container';
import { async } from './utils/async';

const People = async(() => import('./features/people').then(module => module.default));
const Time = async(() => import('./features/time').then(module => module.default));

export const App = () => (
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

export default App;
