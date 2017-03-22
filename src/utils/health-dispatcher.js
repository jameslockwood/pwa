// @flow

import * as env from 'src/actions/environment';

type Dispatch = () => {};

// dispatches events when app goes offline and online
const setupOfflineDispatch = (dispatch) => {
    if (typeof navigator.onLine !== 'boolean' || navigator.onLine) {
        dispatch(env.applicationOnlineAction());
    } else {
        dispatch(env.applicationOfflineAction());
    }
    window.addEventListener('online', () => dispatch(env.applicationOnlineAction()));
    window.addEventListener('offline', () => dispatch(env.applicationOfflineAction()));
};

const healthDispatch = (dispatch: Dispatch): Object => {
    setupOfflineDispatch(dispatch);
    return {
        emitNewContentAvailable: () => dispatch(env.newContentAvailable()),
        emitServiceWorkerInstalled: () => dispatch(env.serviceWorkerInstalled()),
        emitServiceWorkerActive: () => dispatch(env.serviceWorkerActive())
    };
};

export default healthDispatch;
