// @flow

import React from 'react';

const Form = (props: Object) => {
    let filterInput;
    let addInput;
    const onFilterChange = (e) => {
        e.preventDefault();
        props.onFilterChange(filterInput.value);
    };
    const onParentsChange = () => {
        props.onParentsToggle();
    };
    const onAddPerson = (e) => {
        e.preventDefault();
        const val = addInput.value;
        if (!val) {
            return;
        }
        props.onAddPerson(val);
        addInput.value = '';
    };
    return (
        <form className={props.loading ? 'form--loading' : ''}>
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
            <br />
            <label htmlFor="personToAdd">
                Person To Add
                <input
                    ref={(node) => {
                        addInput = node;
                    }}
                />
            </label>
            <button onClick={onAddPerson}>Add Person</button>
        </form>
    );
};

Form.defaultProps = {
    filter: '',
    parentsOnly: false,
    loading: false,
    personToAdd: '',
    onFilterChange: () => {},
    onParentsToggle: () => {},
    onAddPerson: () => {}
};

Form.propTypes = {
    filter: React.PropTypes.string.isRequired,
    parentsOnly: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    personToAdd: React.PropTypes.string.isRequired,
    onFilterChange: React.PropTypes.func.isRequired,
    onParentsToggle: React.PropTypes.func.isRequired,
    onAddPerson: React.PropTypes.func.isRequired
};

export default Form;
