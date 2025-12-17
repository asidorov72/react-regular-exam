import {useState} from "react";

export default function usePersistedState(initialState, key) {
    const [state, setState] = useState(() => {
        const storageData = localStorage.getItem(key);

        if (!storageData) {
            return initialState;
        }
        return JSON.parse(storageData);
    });

    const setPersistedState = (input) => {
        let value = input;

        if (typeof input === 'function') {
            value = input(state);
        }

        localStorage.setItem(key, JSON.stringify(value));
        setState(value);
    }

    return [
        state,
        setPersistedState
    ];
}