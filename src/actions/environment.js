// @flow

import ACTION_TYPES from './types';

export type EnvironmentAction = {
    type: string
};

export function applicationOfflineAction(): EnvironmentAction {
    return { type: ACTION_TYPES.APPLICATION_OFFLINE };
}

export function applicationOnlineAction(): EnvironmentAction {
    return { type: ACTION_TYPES.APPLICATION_ONLINE };
}

export function newContentAvailable(): EnvironmentAction {
    return { type: ACTION_TYPES.NEW_CONTENT_AVAILABLE };
}

export function serviceWorkerInstalled(): EnvironmentAction {
    return { type: ACTION_TYPES.SERVICE_WORKER_INSTALL_SUCCESS };
}

export function serviceWorkerActive(): EnvironmentAction {
    return { type: ACTION_TYPES.SERVICE_WORKER_ACTIVE };
}
