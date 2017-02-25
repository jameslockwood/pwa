import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock';
import './styles.css';

ReactDOM.render(
  <div>
    <Clock />
    <Clock />
    <Clock />
  </div>,
  document.getElementById('root')
);
