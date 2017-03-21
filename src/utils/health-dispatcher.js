import * as env from 'src/actions/environment';

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

const healthDispatch = (dispatch): void => {
    setupOfflineDispatch(dispatch);
    return {
        emitNewContentAvailable: () => dispatch(env.newContentAvailable())
    };
};

export default healthDispatch;
