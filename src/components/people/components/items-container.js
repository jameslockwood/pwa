// @flow

import { connect } from 'react-redux';
import type { RootState } from 'src/types/core';
import { getVisiblePeople } from 'src/selectors/root';
import Items from './items';

const stateToProps = (state: RootState) => ({
    list: getVisiblePeople(state, state.filterString),
    loading: state.people.loading,
    parentsOnly: state.parentsOnly
});

const ItemsContainer = connect(stateToProps)(Items);

export default ItemsContainer;
