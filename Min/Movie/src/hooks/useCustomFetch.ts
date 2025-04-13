import axios from "axios";
import { useEffect, useState } from "react";

interface ApiResponse<T> { // 제네릭 T
    data: T | null; // data에 대한 타입은 우리가 줄게! (T 또는 null이 될 수도 있으니까)
    isPending: boolean;
    isError: boolean;
}

type Language = "ko-KR" | "en-US";

function useCustomFetch<T>(url:string, language: Language = 'en-US'): ApiResponse<T> {
    const [data, setData] = useState<T | null>(null); // Movie[]에 대한 타입은 제네릭 타입으로 넣어준다고 했으므로 T 타입을 넣어준다. 
    // 다른 화면에서도 공용으로 쓸 수 있는 data로 정의를 해줌.

    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);

            try {
                const { data } = await axios.get<T>(url, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    },
                    params: {
                        language,
                    },
                });
                setData(data);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };
        fetchData();
    }, [url, language]);

    return { data, isPending, isError }; // 이것만 쓸거야!
} 
// const {data, isPending, isError} = useCustomFetch("http://"); 형태를 따르기 위해서.
// 제네릭 T를 받아보기 위해서 useCustomFetch에도 T를 정의를 해줘야 한다.  

export default useCustomFetch;