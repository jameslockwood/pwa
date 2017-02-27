import React from 'react';

class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        this.timerId = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    instanceProperty = 'hey';

    foo = (e) => {
        this.instanceProperty += ' hey';
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
