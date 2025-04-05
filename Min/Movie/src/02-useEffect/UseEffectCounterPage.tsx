import { useEffect, useState } from "react"

export default function Parent() {
  const [visible, seVisible] = useState(false);

  return (
    <>
        <h1>같이 배우는 리액트 #2 useEffect</h1>
        <button onClick={() => seVisible(!visible)}>
            {visible ? '숨기기' : '보이기'}
        </button>
        {visible && <Child/>}
    </>
  )
}

function Child() {
    useEffect(() => {
        let i = 0;
        const countInterval = setInterval(() => {
            console.log('Number => ' + i);
            i++;
        }, 1_000); // 1초마다 타이머가 동작하는 걸 볼 수 있다.
        
        return () => {
            console.log('언마운트 될 때 실행됩니다.');
            clearInterval(countInterval);
        }
    }, []);


    // 마진 20 텍스트 4xl
    return <div className='mt-20 text-4xl'>Child</div>
}
