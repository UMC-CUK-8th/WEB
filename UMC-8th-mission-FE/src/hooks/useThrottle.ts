import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay = 500):T {
    const [throttledValue, setThrottledValue] = useState<T>(value);
    const lastExecuted = useRef<number>(Date.now());

    useEffect(() => {
        if (Date.now() >= lastExecuted.current + delay) {
            lastExecuted.current = Date.now();
            setThrottledValue(value);
        } else {
            const timerId = setTimeout(() => {
                lastExecuted.current = Date.now();
                setThrottledValue(value);
            }, delay);

            return () => {
                clearTimeout(timerId);
            };
        }
    }, [value, delay]);

    return throttledValue;
}

export default useThrottle;