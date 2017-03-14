import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { HeaderContainer } from './features/header/header-container';
import loadComponentAsync from './utils/async';

const People = loadComponentAsync(import('./features/people'));
const Time = loadComponentAsync(import('./features/time'));

export const App = () => (
    <BrowserRouter basename="/fx/">
        <div className="app-container">
            <HeaderContainer />
            <Route exact path="/" component={People} />
            <Route path="/2" component={Time} />
        </div>
    </BrowserRouter>
);

export default App;
