import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/root';
import App from './components/root';
import addPerson from './actions/add-person'; // remove

import './styles.less';

const store = createStore(reducer);
store.dispatch(addPerson('James Lockwood', 31, false));
store.dispatch(addPerson('Wendy Musique', 40, false));
store.dispatch(addPerson('John Lockwood', 72, true));
store.dispatch(addPerson('Susan Lockwood', 61, true));
store.dispatch(addPerson('John Woolley', 35, true));
store.dispatch(addPerson('Joanne Woolley', 33, true));
store.dispatch(addPerson('Jack Woolley', 1, false));
store.subscribe(() => window.console.log(store.getState()));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
