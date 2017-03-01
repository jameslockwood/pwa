import React from 'react';
import Clock from './clock';
import Items from './items';
import Form from './form';

class People extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            parentsOnly: false
        };
    }

    onFilterChange = (val) => {
        this.setState({
            filter: val
        });
    }

    onParentsToggle = (val) => {
        this.setState({
            parentsOnly: val
        });
    }

    render() {
        return (
            <div>
                <Clock />
                <Form
                    filter={this.state.filter}
                    parentsOnly={this.state.parentsOnly}
                    onFilterChange={this.onFilterChange}
                    onParentsOnlyChange={this.onParentsToggle}
                />
                <Items
                    list={this.props.list}
                    filter={this.state.filter}
                    parentsOnly={this.state.parentsOnly}
                />
            </div>
        );
    }

}

People.defaultProps = {
    list: []
};

People.propTypes = {
    list: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default People;
