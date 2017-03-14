import React from 'react';
import { Link } from 'react-router-dom';

export const Header = props => 
    // if (props.loading) {
    //     return <p>Still Loading...</p>;
    // }
    // if (!props.loading && !props.loadSuccess) {
    //     return <p>Failed to load</p>;
    // }
     (
        <div>
            <Link to="/">App 1</Link> | <Link to="/2">App 2</Link>
        </div>
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
