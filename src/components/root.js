import React from 'react';
import Clock from './clock';
import ItemsContainer from './items-container';
import FormsContainer from './form-container';

const Root = () => (
    <div>
        <Clock title="Yah World" />
        <FormsContainer />
        <ItemsContainer />
    </div>
);
export default Root;
