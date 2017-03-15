import React from 'react';
import { Link } from 'react-router-dom';
import './header.less';

export const Header = () => (
    <header>
        <Link to="/">App 1</Link><Link to="/2">App 2</Link>
    </header>
);

Header.defaultProps = {
    loading: true,
    loadSuccess: false
};

Header.propTypes = {
    loading: React.PropTypes.bool.isRequired,
    loadSuccess: React.PropTypes.bool.isRequired
};

export default Header;
