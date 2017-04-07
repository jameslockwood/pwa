// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { RootState, Dispatch } from 'src/types/core';
import * as selectors from 'src/selectors/root';
import fetchPeople from 'src/actions/fetch-people';
import Items from './items';

class Container extends Component {
    static propTypes = {
        fetchPeople: React.PropTypes.func.isRequired
    };
    componentDidMount() {
        this.props.fetchPeople();
    }
    render() {
        return <Items {...this.props} />;
    }
}

const stateToProps = (state: RootState) => ({
    list: selectors.getVisiblePeople(state),
    loading: selectors.getPeopleIsLoading(state),
    parentsOnly: state.parentsOnly
});

const dispatchToProps = (dispatch: Dispatch) => ({
    fetchPeople: () => {
        dispatch(fetchPeople());
    }
});

const ItemsContainer = connect(stateToProps, dispatchToProps)(Container);

export default ItemsContainer;
