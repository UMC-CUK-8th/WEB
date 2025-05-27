import { useEffect, useRef, useState } from 'react';

function useThrottle<T>(value: T, delay = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);

  // Ref lastExcecuted: 마지막으로 실행된 시간을 기록하는 변수
  // useRef: 컴포넌트가 리렌더링되어도 값이 유지되고, 변경되어도 리렌더링을 유발하지 않음
  const lastExcecuted = useRef<number>(Date.now());

  useEffect(() => {
    // 현재 시각과 lastExcecuted.current에 저장된 시각 + delay를 비교
    // 충분한 시간이 지나면 업데이트

    // 현재 시간이 충분한 시간이 지난 시기일 경우, 현재 시간으로 lastExecuted 업데이트
    if (Date.now() >= lastExcecuted.current + delay) {
      lastExcecuted.current = Date.now();

      // 상태 업데이트하여 리렌더링
      setThrottledValue(value);
    }
    // 충분한 시간이 지나지 않은 경우, delay 시간이 지난 후 업데이트
    else {
      const timerId = setTimeout(() => {
        lastExcecuted.current = Date.now();
        setThrottledValue(value);
      }, delay);

      // 재실행되기 전에 타이머가 실행되지 않았다면 기존 타이머를 취소하여 중복 업데이트 방지
      return () => clearTimeout(timerId);
    }
  }, [value, delay]);

  return throttledValue;
}

export default useThrottle;
