// @flow

import { createStore } from 'redux';
import reducer from './reducers/root';
import addPerson from './actions/add-person';
import changeFilter from './actions/change-filter';
import toggleParents from './actions/toggle-parents';

const store = createStore(reducer);

// Log the initial state
window.console.log(store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => window.console.log(store.getState()));

// Dispatch some actions
store.dispatch(addPerson('James Lockwood', 31, false));
store.dispatch(addPerson('Wendy Musique', 40, false));
store.dispatch(addPerson('John Lockwood', 72, true));
store.dispatch(addPerson('Susan Lockwood', 61, true));
store.dispatch(addPerson('John Woolley', 35, true));
store.dispatch(addPerson('Joanne Woolley', 33, true));
store.dispatch(addPerson('Jack Woolley', 1, false));
store.dispatch(changeFilter('foo fighters'));
store.dispatch(toggleParents());
store.dispatch(toggleParents());

// Stop listening to state updates
unsubscribe();

export default store;
