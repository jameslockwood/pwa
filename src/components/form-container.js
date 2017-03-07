// @flow

import { connect } from 'react-redux';
import type { RootState } from 'src/types/core';
import changeFilter from 'src/actions/change-filter';
import toggleParents from 'src/actions/toggle-parents';
import Form from './form';

const stateToProps = (state: RootState) => ({
    filter: state.filterString,
    parentsOnly: state.parentsOnly
});

const dispatchToProps = dispatch => ({
    onFilterChange: (filter) => {
        dispatch(changeFilter(filter));
    },
    onParentsToggle: () => {
        dispatch(toggleParents());
    }
});

const FormsContainer = connect(stateToProps, dispatchToProps)(Form);

export default FormsContainer;
