import React from 'react';

class Form extends React.Component {

    onFilterChange = (e) => {
        this.props.onFilterChange(e.target.value);
    }

    onParentsToggle = (e) => {
        this.props.onParentsOnlyChange(e.target.checked);
    }

    render() {
        return (
            <form>
                <label htmlFor="filter">
                    Filter
                    <input id="filter" value={this.props.filter} title="filter" onChange={this.onFilterChange} />
                </label>
                <label htmlFor="gender">
                      Parents Only
                    <input
                        type="checkbox"
                        defaultChecked={this.props.parentsOnly}
                        title="Parents Only"
                        onChange={this.onParentsToggle}
                    />
                </label>
            </form>
        );
    }

}

Form.defaultProps = {
    filter: '',
    parentsOnly: false,
    onFilterChange: () => {},
    onParentsOnlyChange: () => {}
};

Form.propTypes = {
    filter: React.PropTypes.string,
    parentsOnly: React.PropTypes.bool,
    onFilterChange: React.PropTypes.func,
    onParentsOnlyChange: React.PropTypes.func
};

export default Form;
