import './assets/shell.less';
import serviceWorkerReg from './utils/service-worker-reg';

// Application loading flow:
// 1 - critical path styles and javascript are loaded here to allow page to render quickly.
// 2 - service worker is installed (if not already)
// 3 - main app then loaded asynchronously
// 4 - app then loads various views / features asynchronously

const worker = serviceWorkerReg(process.env.SERVICE_WORKER_FILENAME);

const removeLoadingOverlay = () => {
    const el = document.getElementById('shell-overlay');
    el.classList.add('invisible');
    setTimeout(() => el.parentNode.removeChild(el), 2000);
};

import('./app').then((app) => {
    const hostElement = document.getElementById('app-bootstrap');
    app.boot(hostElement).then((api) => {
        removeLoadingOverlay();
        worker.onNewContentAvailable(api.invalidate)
    });
});
