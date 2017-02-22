import _ from 'lodash';
import time from './time';

function component() {
  var element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack', time.now()], ' ');
  return element;
}

document.body.appendChild(component());
