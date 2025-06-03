import { useShallow } from "zustand/shallow";
import { useCounterStore } from "../stores/counterStore"
import CounterButton from "./CounterButton";

export default function Counter() {
    const { count } = useCounterStore(
        useShallow((state) => ({
            count: state.count,
            increment: state.actions.increment,
            decrement: state.actions.decrement,
        }))
    );

    return (
        <div>
            <h1>{count}</h1>
            <CounterButton />
        </div>
  );
};
