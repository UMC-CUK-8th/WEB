import { useRef, useCallback } from "react";

export const useThrottle = (callback: (...args: any[]) => void, delay: number) => {
    const lastCalled = useRef(0);

    const throttledFn = useCallback((...args: any[]) => {
        const now = Date.now();
        if (now - lastCalled.current >= delay) {
        lastCalled.current = now;
        callback(...args);
        }
    }, [callback, delay]);

    return throttledFn;
};
