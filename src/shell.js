import './styles.less';

import('./app1')
    .then(() => {
        window.console.log('loaded app 1');
    })
    .catch((err) => {
        window.console.log('Failed to load app 1', err);
    });

import('./app2')
    .then(() => {
        window.console.log('loaded app 2');
    })
    .catch((err) => {
        window.console.log('Failed to load app 2', err);
    });
