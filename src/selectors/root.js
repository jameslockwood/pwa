// @flow
// selectors - compute derived data from the store.

import type { RootState } from 'src/types/core';
import * as peopleSelectors from './people';

export const getVisiblePeople = (state: RootState) =>
    peopleSelectors.getVisiblePeople(state.people, state.filterString);

export const getPeopleIsLoading = (state: RootState) =>
    peopleSelectors.getPeopleIsLoading(state.people);
