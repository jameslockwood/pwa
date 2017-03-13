import 'babel-polyfill';
import './styles.less';

// Application loading flow:
// 1 - load barebones here in the shell (basic html, css)
// 2 - main application then asynchronously
// 3 - from here, application loads different pages async depending on routing.

import('./app').then((app) => {
    app.boot(document.getElementById('app'));
});
