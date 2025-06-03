import { useCounterActions } from "../stores/counterStore";

export default function CounterButton() {
  // const increment = useCounterStore((state) => state.actions.increment);
  // const decrement = useCounterStore((state) => state.actions.decrement);
  
  // 가독성 Good, 서비스 규모가 커지면 분리하는 게 좋다. 
  const { increment, decrement } = useCounterActions();

  return (
    <div>
        <button onClick={increment}>증가</button>
        <button onClick={decrement}>감소</button>
    </div>
  )
}
