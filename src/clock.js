// @flow

import React from 'react';

class Clock extends React.Component {

    timerId: number = 0;
    state: Object;

    constructor(props: Object) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        this.timerId = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    foo = (e: Event) => {
        window.console.log(e);
    }

    tick() {
        this.setState({date: new Date()});
    }

    render() {
        return (
            <div>
                <h1 onClick={this.foo}>Hello World</h1>
                <p>The time is now {this.state.date.toLocaleTimeString()}</p>
            </div>
        );
    }

}

export default Clock;
