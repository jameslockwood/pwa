import React from 'react';
import { Link } from 'react-router-dom';
import './header.less';

export const Header = (props: Object) => (
    <header className={props.offline ? 'offline' : ''}>
        <Link to="/">Async</Link>
        <Link to="/2">Time</Link>
        <Link to="/boxes">Boxes</Link>
    </header>
);

Header.defaultProps = {
    loading: true,
    loadSuccess: false,
    offline: false
};

Header.propTypes = {
    loading: React.PropTypes.bool.isRequired,
    loadSuccess: React.PropTypes.bool.isRequired,
    offline: React.PropTypes.bool
};

export default Header;
