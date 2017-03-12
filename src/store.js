import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers/root';
import fetchPeopleAction from './actions/fetch-people';


export const makeStore = () => {
    const logger = createLogger();
    const store = createStore(reducer, applyMiddleware(thunk, logger));
    store.dispatch(fetchPeopleAction());
    return store;
};

export default makeStore;
