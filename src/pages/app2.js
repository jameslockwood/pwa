import moment from 'moment';
import React from 'react';
import Root from 'src/components/root';

const creationTime = moment().year();
export const App = () => <Root title={`Async 2 ${creationTime}`} />;
export default App;
