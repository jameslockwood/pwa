// @flow

import ACTION_TYPES from './types';

export type ActionToggleParents = {
    type: string,
    payload: {
        parentsOnly?: boolean
    }
};

export default function toggleParentsAction(): ActionToggleParents {
    return { type: ACTION_TYPES.TOGGLE_PARENTS, payload: {} };
}
