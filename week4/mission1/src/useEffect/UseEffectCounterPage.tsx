import { useEffect, useState } from "react";

function Parent() {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <h1>같이 배우는 리액트 #2 useEffect</h1>
            <button onClick={() : void => setVisible(!visible)}>
                {visible ? '숨기기' : '보이기'}
            </button>
            {visible && <Child/>}
        </>
    );
}

function Child() {
    useEffect(() : () => void => {
        let i = 0;
        const counterInterval = setInterval(() : void => {
            console.log('Number => ' + i);
            i++;
        }, 1_000);

        return () : void => {
            console.log('언마운트 될 때 실행됩니다.');
            clearInterval(counterInterval);
        };
    }, []);

    return <div className="mt-20 text-4xl">Child</div>
}

export default Parent;