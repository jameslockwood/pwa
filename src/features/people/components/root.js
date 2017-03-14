import React from 'react';
import Clock from './clock';
import ItemsContainer from './items-container';
import FormsContainer from './form-container';


const Root = props => (
    <div>
        <Clock title={props.title} />
        <FormsContainer />
        <ItemsContainer />
    </div>
)

Root.defaultProps = {
    title: 'Async'
};

Root.propTypes = {
    title: React.PropTypes.string
};

export default Root;
