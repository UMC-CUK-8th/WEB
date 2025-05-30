import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CounterActions {
    increment: () => void;
    decrement: () => void;
    random: () => void;
}

// 상태에 대한 정의
interface CounterState {
    // count
    // => value
    count: number;
    // increment: () => void;
    // decrement: () => void;
    // randomNumber
    randomNumber: number;
    // random(): void;

    // action
    actions: CounterActions;
};

export const useCounterStore = create<CounterState>()(
    devtools((set) => ({
        // inital state를 설정해야 함.
        count: 0,
        randomNumber: 0,

        actions: {
            increment: () => 
                // set(partialOrUpdater, shouldReplace = false, actionName)
                set((state) => ({ 
                    count: state.count + 1,
                }),
                    false,
                    'increment'
                ),
            decrement: () => {
                return set((state) => ({ 
                    count: state.count - 1 
                }),
                    false,
                    'decrement'
                );
            },
            random: () => {
                set(() => ({ 
                    randomNumber: Math.floor(Math.random() * 100),
                }),
                    false,
                    'random'
                );
            },
        },
        name: 'counterStore', // devtools에서 사용할 이름
    }))
);

// actions에 관한 훅을 하나 만들 수 있다. 
export const useCounterActions = () => 
    useCounterStore((state) => state.actions);
 // 이 객체만 구독한다. 

// Atomic Selector => 모든 값은 개별로 꺼내야한다는 규칙.

// actions의 객체는 한번 정의했기에 -> 함수의 참소(reference)가 바뀌지 않아.
// 컴포넌트가 항상 동일한 객체를 바라보기 때문에 렌더링에 문제가 없음. 

// 테스트 용이
// 재사용성도 좋아짐.


