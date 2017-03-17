import './assets/shell.less';
import serviceWorkerReg from './service-worker-reg';

// Application loading flow:
// 1 - critical path styles and javascript are loaded here to allow page to render quickly.
// 2 - main app then loaded asynchronously
// 3 - app then loads various views / features asynchronously

if (process.env.NODE_ENV === 'production') {
    serviceWorkerReg();
}

const removeOverlay = () => {
    const el = document.getElementById('shell-overlay');
    el.classList.add('invisible');
    setTimeout(() => el.parentNode.removeChild(el), 2000);
};

import('./app').then((app) => {
    const hostElement = document.getElementById('app-bootstrap');
    app.boot(hostElement).then(removeOverlay);
});
