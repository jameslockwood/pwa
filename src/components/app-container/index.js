// @flow

import { connect } from 'react-redux';
import type { RootState } from 'src/types/core';
import { Wrapper } from './wrapper';

const stateToProps = (state: RootState) => ({
    offline: state.offline
});

export const AppContainer = connect(stateToProps)(Wrapper);

export default AppContainer;
