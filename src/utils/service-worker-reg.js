/* eslint-disable no-param-reassign, no-console */

const EVENT_ACTIVE = 'EVENT_ACTIVE';
const EVENT_INSTALLED = 'EVENT_INSTALLED';
const EVENT_STALE = 'EVENT_STALE';
const eventEmitter = (() => {
    const handlers = {};
    const emitted = {};
    return {
        addHandler: (key, fn) => {
            handlers[key] = handlers[key] || [];
            handlers[key].push(fn);
        },
        notifyHandlers: (key) => {
            emitted[key] = true;
            (handlers[key] || []).forEach(i => i());
        },
        hasEmitted: key => !!emitted[key]
    };
})();

const registerServiceWorker = (serviceWorkerFilename) => {
    const useServiceWorker = process.env.NODE_ENV === 'production';
    if ('serviceWorker' in navigator && useServiceWorker) {
        navigator.serviceWorker
            .register(serviceWorkerFilename)
            .then((reg) => {
                if (reg.active) {
                    eventEmitter.notifyHandlers(EVENT_ACTIVE);
                }
                // updatefound is fired if service-worker.js changes.
                reg.onupdatefound = () => {
                    // The updatefound event implies that reg.installing is set; see
                    // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
                    const installingWorker = reg.installing;

                    installingWorker.onstatechange = () => {
                        switch (installingWorker.state) {
                        case 'installed':
                            if (navigator.serviceWorker.controller) {
                                    // New or updated content is available
                                eventEmitter.notifyHandlers(EVENT_STALE);
                            } else {
                                    // Worker installed.  Content now available offline
                                eventEmitter.notifyHandlers(EVENT_INSTALLED);
                            }
                            break;
                        case 'redundant':
                            console.error('The installing service worker became redundant.');
                            break;
                        default:
                            break;
                        }
                    };
                };
            })
            .catch((e) => {
                console.error('Error during service worker registration:', e);
            });
    }

    const addHandler = (key, fn) => {
        if (eventEmitter.hasEmitted(key)) {
            return fn();
        }
        return eventEmitter.addHandler(key, fn);
    };

    return {
        onNewContentAvailable: fn => addHandler(EVENT_STALE, fn),
        onInstalled: fn => addHandler(EVENT_INSTALLED, fn),
        onActive: fn => addHandler(EVENT_ACTIVE, fn)
    };
};

export default registerServiceWorker;
