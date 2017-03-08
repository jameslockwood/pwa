// @flow

import { connect } from 'react-redux';
import type { RootState, PeopleList } from 'src/types/core';
import Items from './items';

const getPeopleList = (people: PeopleList, filter: string): PeopleList => {
    if (filter.length) {
        return people.filter(
            i => i.name.toLowerCase().indexOf(filter.toLowerCase()
        ) !== -1);
    }
    return people;
};

const stateToProps = (state: RootState) => ({
    list: getPeopleList(state.people.list, state.filterString),
    loading: state.people.loading,
    parentsOnly: state.parentsOnly
});

const dispatchToProps = () => ({});

const ItemsContainer = connect(stateToProps, dispatchToProps)(Items);

export default ItemsContainer;
