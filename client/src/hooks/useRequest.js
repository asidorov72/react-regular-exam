import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext.jsx";

const BASE_URL = "http://localhost:3030";

export default function useRequest(url, initialState) {
    const { user, isAuthenticated } = useContext(UserContext);

    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState(!!url);
    const [error, setError] = useState(null);

    const request = async (url, method = "GET", data, config = {}) => {
        let options = { method };

        if (data) {
            options.headers = { "Content-Type": "application/json" };
            options.body = JSON.stringify(data);
        }

        const token = config.accessToken || (isAuthenticated && user?.accessToken);
        if (token) {
            options.headers = { ...options.headers, "X-Authorization": token };
        }

        const response = await fetch(`${BASE_URL}${url}`, options);

        if (response.status === 204) return {};

        if (!response.ok) {
            let errorText;
            try {
                const errData = await response.json();
                errorText = errData.message || errData.error;
            } catch {
                errorText = response.statusText || `Error ${response.status}`;
            }
            throw new Error(errorText);
        }

        return await response.json();
    };

    useEffect(() => {
        if (!url) return;

        setLoading(true);
        setError(null);

        request(url)
            .then((result) => setData(result))
            .catch((err) => {
                setError(err);
                // alert(err.message);
            })
            .finally(() => setLoading(false));
    }, [url]);

    return {
        request,
        data,
        setData,
        loading,
        error,
    };
}
