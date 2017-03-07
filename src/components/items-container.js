// @flow

import { connect } from 'react-redux';
import type { RootState, People } from 'src/types/core';
import Items from './items';

const getPeople = (people: People, filter: string): People => {
    if (filter.length) {
        return people.filter(
            i => i.name.toLowerCase().indexOf(filter.toLowerCase()
        ) !== -1);
    }
    return people;
};

const stateToProps = (state: RootState) => ({
    list: getPeople(state.people, state.filterString),
    parentsOnly: state.parentsOnly
});

const dispatchToProps = () => ({});

const ItemsContainer = connect(stateToProps, dispatchToProps)(Items);

export default ItemsContainer;
