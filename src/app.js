import React from 'react';
import ReactDOM from 'react-dom';
import People from './people';
import store from './store';
import './styles.less';

const list = [
    { id: 0, value: 'Wendy', children: false, age: 40 },
    { id: 1, value: 'James', children: false, age: 31 },
    { id: 2, value: 'Joanne', children: true, age: 33 },
    { id: 3, value: 'John', children: true, age: 72 },
    { id: 4, value: 'Jack', children: false, age: 2 },
    { id: 5, value: 'Susan', children: true, age: 61 },
    { id: 6, value: 'John', children: true, age: 35}
];

ReactDOM.render(
    <People list={list} />,
    document.getElementById('root')
);
