import 'babel-polyfill';
import 'fetch-polyfill';
import './assets/shell.less';

// Application loading flow:
// 1 - critical path styles and javascript are loaded here to allow page to render quickly.
// 2 - main app then loaded asynchronously
// 3 - app then loads various views / features asynchronously

import('./app').then((app) => {
    app.boot(document.getElementById('app-bootstrap'));
});
