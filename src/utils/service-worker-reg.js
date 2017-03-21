/* eslint-disable no-param-reassign */

const registerServiceWorker = (serviceWorkerFilename) => {
    let workerIsOld = false;
    const useServiceWorker = process.env.NODE_ENV === 'production';
    const handlers = [];
    const notifyStaleHandlers = () => handlers.forEach(i => i());

    if ('serviceWorker' in navigator && useServiceWorker) {
        navigator.serviceWorker
            .register(serviceWorkerFilename)
            .then((reg) => {
                // updatefound is fired if service-worker.js changes.
                reg.onupdatefound = () => {
                    // The updatefound event implies that reg.installing is set; see
                    // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
                    const installingWorker = reg.installing;

                    installingWorker.onstatechange = () => {
                        switch (installingWorker.state) {
                        case 'installed':
                            if (navigator.serviceWorker.controller) {
                                window.console.log('New or updated content is available.');
                                workerIsOld = true;
                                notifyStaleHandlers();
                            } else {
                                window.console.log('Content is now available offline!');
                            }
                            break;
                        case 'redundant':
                            window.console.error('The installing service worker became redundant.');
                            break;
                        default:
                            break;
                        }
                    };
                };
            })
            .catch((e) => {
                window.console.error('Error during service worker registration:', e);
            });
    }

    return {
        onNewContentAvailable(fn) {
            if (workerIsOld) {
                return fn();
            }
            return handlers.push(fn);
        }
    };
};

export default registerServiceWorker;
