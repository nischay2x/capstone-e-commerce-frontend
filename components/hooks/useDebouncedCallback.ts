import { useState, useEffect, useCallback } from 'react';

const useDebouncedCallback = <T extends (...args: any[]) => void>(
    callback: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const debouncedCallback = useCallback(
        (...args: Parameters<T>) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            const id = setTimeout(() => {
                callback(...args);
            }, delay);

            setTimeoutId(id);
        },
        [callback, delay, timeoutId]
    );

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    return debouncedCallback;
};

export default useDebouncedCallback;
