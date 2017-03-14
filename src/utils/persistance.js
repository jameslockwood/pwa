function loadState(appKey) {
    try {
        const serialized = localStorage.getItem(`${appKey}.state`);
        if (serialized === null) {
            return undefined;
        }
        return JSON.parse(serialized);
    } catch (e) {
        return undefined;
    }
}

function saveState(appKey, state) {
    try {
        return localStorage.setItem(`${appKey}.state`, JSON.stringify(state));
    } catch (e) {
        return undefined;
    }
}

export default function persistanceFactory(appKey) {
    return {
        load() {
            return loadState(appKey);
        },
        save(state) {
            return saveState(appKey, state);
        }
    };
}
