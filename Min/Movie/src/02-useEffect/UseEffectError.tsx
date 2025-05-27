import { useEffect, useState } from "react";

export default function UseEffectError() {
  const [counter, setCounter] = useState(0);

  const handleIncrease = () => {
    setCounter((counter) => counter + 1);
  };

  useEffect(() => {
    // 1. 초기 렌더링 시작(counter ++)
    setCounter((counter) => counter + 1);

    // 2. counter 값이 변경될 때마다 실행
  }, [counter]);
  // 1번과 2번 과정이 반복해서 일어나니까, 무한 렌더링 사태가 일어남.
 
  return (
    <div onClick={handleIncrease}>{counter}</div>
  )
}
