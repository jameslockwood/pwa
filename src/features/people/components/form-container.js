// @flow

import { connect } from 'react-redux';
import type { RootState } from 'src/types/core';
import changeFilter from 'src/actions/change-filter';
import toggleParents from 'src/actions/toggle-parents';
import addPerson from 'src/actions/add-person';
import Form from './form';

const stateToProps = (state: RootState) => ({
    filter: state.filterString,
    parentsOnly: state.parentsOnly,
    loading: state.people.loading
});

const dispatchToProps = dispatch => ({
    onFilterChange: (filter) => {
        dispatch(changeFilter(filter));
    },
    onParentsToggle: () => {
        dispatch(toggleParents());
    },
    onAddPerson: (name) => {
        const randomAge = Math.floor(Math.random() * 90);
        dispatch(addPerson(name, randomAge, false, true));
    }
});

const FormsContainer = connect(stateToProps, dispatchToProps)(Form);

export default FormsContainer;
