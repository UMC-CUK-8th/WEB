import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // delay, value 값이 바뀔 때마다 실행되도록 함
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    // value값이 변경되면 기존 타이머를 지워서 업데이트 취소 -> 값이 계속 바뀔 때마다 마지막에 멈춘 값만 업데이트됨
    return () => clearTimeout(handler);
  }, [value, delay]);

  // 최종적으로 debounced된 값(잠시 기다린 후의 값) 반환
  return debouncedValue;
}

export default useDebounce;
