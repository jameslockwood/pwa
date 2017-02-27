import React from 'react';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            gender: 'bloke'
        };
    }

    onNameChange = (e) => {
        this.setState({name: e.target.value});
    }

    onSexChange = (e) => {
        this.setState({gender: e.target.value});
    }

    render() {
        return (
            <form>
                <label htmlFor="name">
                    Name
                    <input id="name" value={this.state.name} title="name" onChange={this.onNameChange} />
                </label>
                <label htmlFor="gender">
                    Gender
                    <select id="gender" value={this.state.gender} onChange={this.onSexChange}>
                        <option value="lass">Lass</option>
                        <option value="bloke">Bloke</option>
                        <option value="unsure">Unsure</option>
                        <option value="both">Both</option>
                    </select>
                </label>
            </form>
        );
    }

}

Form.defaultProps = {
    name: ''
};

Form.propTypes = {
    name: React.PropTypes.string
};

export default Form;
