import './styles.less';

import('./app1').then((app) => {
    app.boot(document.getElementById('app-1'));
});

import('./app2').then((app) => {
    app.boot(document.getElementById('app-2'));
});
