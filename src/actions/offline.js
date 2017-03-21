// @flow

import ACTION_TYPES from './types';

export type ActionOffline = {
    type: string
};

export function applicationOfflineAction(): ActionOffline {
    return { type: ACTION_TYPES.APPLICATION_OFFLINE };
}

export function applicationOnlineAction(): ActionOffline {
    return { type: ACTION_TYPES.APPLICATION_ONLINE };
}
