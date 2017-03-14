import moment from 'moment';
import React from 'react';

const Time = props => (
    <div>
        <h1>{props.title}</h1>
        <p>Creation Time {props.time}</p>
    </div>
);

Time.defaultProps = {
    title: '',
    time: ''
};

Time.propTypes = {
    title: React.PropTypes.string,
    time: React.PropTypes.string
};

const creationTime = moment().format('LLLL');
export const App = () => <Time title="Async 2" time={creationTime} />;
export default App;
