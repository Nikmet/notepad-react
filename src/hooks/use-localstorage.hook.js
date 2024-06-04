import { useEffect, useState } from "react";

export function useLocalStorage(key) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const res = JSON.parse(localStorage.getItem(key));
        if (res) {
            setData(res);
        }
    }, [setData, key]);

    const saveData = newData => {
        localStorage.setItem(key, JSON.stringify(data));
        setData(newData);
    };

    return [data, saveData];
}
