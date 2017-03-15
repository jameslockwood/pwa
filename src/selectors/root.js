// @flow

import type { RootState } from 'src/types/core';
import * as peopleSelectors from './people';

export const getVisiblePeople = (state: RootState, filter: string) =>
    peopleSelectors.getVisiblePeople(state.people, filter);
