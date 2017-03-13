import 'babel-polyfill';
import './styles.less';

// dynamic import used so we can code-split both apps and load async

import('./app1').then((app) => {
    app.boot(document.getElementById('app-1'));
});

import('./app2').then((app) => {
    app.boot(document.getElementById('app-2'));
});
