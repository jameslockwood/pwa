// @flow

import { connect } from 'react-redux';
import type { RootState } from 'src/types/core';
import { Header } from './header';

const stateToProps = (state: RootState) => ({
    loading: state.boot.loading,
    loadSuccess: state.boot.loadSuccess,
    offline: state.offline
});

export const HeaderContainer = connect(stateToProps)(Header);

export default HeaderContainer;
