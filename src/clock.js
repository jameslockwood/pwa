// @flow
import React from 'react';

type Props = {
  title: string
};

type State = {
    date: Date,
    clicked: bool,
    timerId: number
};

class Clock extends React.Component {

    props: Props;
    state: State;

    constructor(props: Object) {
        super(props);
        this.state = {
            clicked: false,
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

    foo = (e: Event) => {
        this.state.clicked = true;
        return e;
    }

    tick() {
        this.setState({date: new Date()});
    }

    render() {
        return (
            <div>
                <h1 onClick={this.foo}>{this.props.title}</h1>
                <p>The time is now {this.state.date.toLocaleTimeString()}</p>
            </div>
        );
    }

}

export default Clock;
