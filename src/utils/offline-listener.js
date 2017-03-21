import { applicationOnlineAction, applicationOfflineAction } from 'src/actions/offline';

const dispatchOfflineEvents = (dispatch): void => {
    window.addEventListener('online', () => dispatch(applicationOnlineAction()));
    window.addEventListener('offline', () => dispatch(applicationOfflineAction()));
    return typeof navigator.onLine !== 'boolean' || navigator.onLine
        ? dispatch(applicationOnlineAction())
        : dispatch(applicationOfflineAction());
};

export default dispatchOfflineEvents;
