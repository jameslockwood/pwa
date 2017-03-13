// @flow

import React from 'react';

const Form = (props: Object) => {
    const onFilterChange = (e) => {
        e.preventDefault();
        props.onFilterChange(e.target.value);
    };
    const onParentsChange = () => {
        props.onParentsToggle();
    };
    const onInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = e.target.value;
            if (!val) {
                return;
            }
            props.onAddPerson(val);
        }
    };
    return (
        <form className={props.loading ? 'form--loading' : ''}>
            <label htmlFor="f1">
                Filter
                <input id="f1" value={props.filter} title="f1" onChange={onFilterChange} />
            </label>
            <label htmlFor="parents">
                Parents Only
                <input
                    type="checkbox"
                    name="parents"
                    checked={props.parentsOnly}
                    title="Parents Only"
                    onChange={onParentsChange}
                />
            </label>
            <br />
            <label htmlFor="personToAdd">
                Add Person
                <input onKeyPress={onInputKeyPress} />
            </label>
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
