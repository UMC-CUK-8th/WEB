import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay:number) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        // delay 이후에 실행
        const handler = setTimeout(() => setDebouncedValue(value), delay)
        // value가 변경되면 기존 타이머를 지워서 업데이트 취소
        return () => clearTimeout(handler);
    },[value, delay]);

    return debouncedValue;
}

export default useDebounce;