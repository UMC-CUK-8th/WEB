import { useMemo, useState } from "react";
import TextInput from "../components/TextInput";
import { findPrimeNumbers } from "../utils/math";

function UseMemoPage() {
    console.log("rerender");

    const [limit, setLimit] = useState<number>(0);
    const [text, setText] = useState<string>("");

    const handleText = (text: string) => {
        setText(text);
    };

    const primes = useMemo(() => findPrimeNumbers(limit), [limit]);
    
    return (
        <div className="flex flex-col gap-4 h-dvh">
            <h1>같이 배우는 리액트 UseMemo</h1>
            <label>
                숫자 입력(소수 찾기) :
                <input 
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="border p-4 rounded-lg"
                />
            </label>

            <h2>소수 리스트 : </h2>
            <div className="flex flex-wrap">
                {primes.map((prime) => (
                    <div key={prime}>
                        {prime}&nbsp;
                    </div>
                ))}
            </div>

            <label>
                {text}
                다른 입력 텍스트 :
                <TextInput onChange={handleText} />
            </label>
        </div>
    );
}

export default UseMemoPage;