// @flow

import React from 'react';

export const Wrapper = (props: Object) => (
    <div className={`app-container ${props.offline ? 'offline' : ''}`}>
        {props.children}
    </div>
);

Wrapper.defaultProps = {
    offline: false,
    children: []
};

Wrapper.propTypes = {
    offline: React.PropTypes.bool,
    children: React.PropTypes.node
};

export default Wrapper;
