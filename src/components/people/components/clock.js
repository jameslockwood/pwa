// @flow
import React, { Component } from 'react';

type Props = {
    title: string
};

type State = {
    date: Date,
    timerId: number
};

class Clock extends Component {

    props: Props;
    state: State;

    constructor(props: Object) {
        super(props);
        this.state = {
            date: new Date(),
            timerId: 0
        };
    }

    componentDidMount() {
        this.state.timerId = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.state.timerId);
    }

    tick() {
        this.setState({date: new Date()});
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>The time is now {this.state.date.toLocaleTimeString()}</p>
            </div>
        );
    }

}

export default Clock;
