import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext.jsx";

const BASE_URL = "http://localhost:3030";

export default function useRequest(url, initialState) {
    const { user, isAuthenticated } = useContext(UserContext);

    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState(!!url);
    const [error, setError] = useState(null);

    const request = async (url, method = "GET", data, config = {}) => {
        const options = {
            method,
            signal: config.signal, // AbortController signal
        };

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

        const controller = new AbortController();

        setLoading(true);
        setError(null);

        request(url, "GET", null, { signal: controller.signal })
            .then((result) => setData(result))
            .catch((err) => {
                if (err.name === "AbortError") {
                    console.log("Request aborted.");
                    return;
                }
                setError(err);
            })
            .finally(() => {
                // if the request was aborted, don't set loading to false'
                if (controller.signal.aborted) return;
                setLoading(false);
            });

        // cleanup: abort the request when the url or component unmounts
        // Steps:
        // 1. В cleanup вызывается abort
        // 2. controller.signal.aborted === true
        // 3. fetch «слушает» signal
        // 4. браузер немедленно прерывает сетевой запрос
        // 5. fetch Promise reject’ится
        // 6. Эта ошибка попадает в .catch(err => …) и становится "AbortError"
        // Очень важно: AbortError — это НЕ ошибка приложения
        // Это нормальный сценарий управления жизненным циклом.
        return () => controller.abort();
    }, [url]);

    return {
        request,
        data,
        setData,
        loading,
        error,
    };
}
