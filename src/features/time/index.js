import moment from 'moment';
import React from 'react';

const creationTime = moment().format('LLLL');

const TimeComponent = props => (
    <div>
        <h1>{props.title}</h1>
        <p>Creation Time {props.time}</p>
    </div>
);

TimeComponent.defaultProps = {
    title: '',
    time: ''
};

TimeComponent.propTypes = {
    title: React.PropTypes.string,
    time: React.PropTypes.string
};

export const Time = () => <TimeComponent title="Async 2" time={creationTime} />;
export default Time;
