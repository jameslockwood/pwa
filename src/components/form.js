// @flow

import React from 'react';

const Form = (props: Object) => {

    let filterInput;
    const onFilterChange = (e) => {
        e.preventDefault();
        props.onFilterChange(filterInput.value);
    };
    const onParentsChange = () => {
        props.onParentsToggle();
    };

    return (
        <form>
            <label htmlFor="filter">
                Filter
                <input
                    id="filter"
                    value={props.filter}
                    title="filter"
                    onChange={onFilterChange}
                    ref={(node) => {
                        filterInput = node;
                    }}
                />
            </label>
            <label htmlFor="parents">
                Parents Only
                <input
                    type="checkbox"
                    id="parents"
                    checked={props.parentsOnly}
                    title="Parents Only"
                    onChange={onParentsChange}
                />
            </label>
        </form>
    );
};

Form.defaultProps = {
    filter: '',
    parentsOnly: false,
    onFilterChange: () => {},
    onParentsToggle: () => {}
};

Form.propTypes = {
    filter: React.PropTypes.string.isRequired,
    parentsOnly: React.PropTypes.bool.isRequired,
    onFilterChange: React.PropTypes.func.isRequired,
    onParentsToggle: React.PropTypes.func.isRequired
};

export default Form;
