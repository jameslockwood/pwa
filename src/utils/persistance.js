function loadState() {
    try {
        const serialized = localStorage.getItem('state');
        if (serialized === null) {
            return undefined;
        }
        return JSON.parse(serialized);
    } catch (e) {
        return undefined;
    }
}

function saveState(state) {
    try {
        return localStorage.setItem('state', JSON.stringify(state));
    } catch (e) {
        return undefined;
    }
}

export default function persistanceFactory() {
    return {
        load() {
            return loadState();
        },
        save(state) {
            return saveState(state);
        }
    };
}
