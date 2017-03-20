import './assets/shell.less';
import serviceWorkerReg from './utils/service-worker-reg';

// Application loading flow:
// 1 - critical path styles and javascript are loaded here to allow page to render quickly.
// 2 - service worker is installed (if not already) 
// 3 - main app then loaded asynchronously
// 4 - app then loads various views / features asynchronously

if (process.env.NODE_ENV === 'production') {
    serviceWorkerReg('service-worker.js');
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

// handle when user is online/offline here
const updateOnlineStatus = () => console.log(`user is ${navigator.onLine ? 'online' : 'offline'}`);
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
