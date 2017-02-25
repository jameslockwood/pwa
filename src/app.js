import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock';
import Items from './items';
import './styles.css';

const list = [
  { id: 1, value: 'James' },
  { id: 2, value: 'Joanne' },
  { id: 3, value: 'John' },
  { id: 4, value: 'Jack' },
  { id: 5, value: 'Susan' },
  { id: 6, value: 'John' }
];

ReactDOM.render(
  <div>
    <Clock />
    <hr />
    <Items list={list} />
  </div>,
  document.getElementById('root')
);
