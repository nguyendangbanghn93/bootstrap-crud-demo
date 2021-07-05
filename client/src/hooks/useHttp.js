import { useState, useCallback } from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData) => {

        setIsLoading(true);
        setError(null);
        const defaultConfig = {
            url: 'http://url',
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            body: ''
        }

        const config = { ...defaultConfig, ...requestConfig }
        try {

           
            const response = await fetch(config.url,
                {
                    method: config.method,
                    headers: config.headers,
                    body: config.body?JSON.stringify(config.body):null
                }
            );
            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();
            applyData(data);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useHttp;
