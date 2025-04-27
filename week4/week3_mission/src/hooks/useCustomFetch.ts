import axios from "axios";
import { useEffect, useState } from "react";

interface ApiResponse<T>{
    data:T|null; // movie에서는 <Movie[]>를 디테일페이지에서는 <MovieDetail>을 받기 때문에 둘이 타입이 달라서 제네릭 타입을 선언해서 원하는 타입으로 지정가능 
    isPending:boolean;
    isError:boolean;
}
type Language="ko-KR" | "en-US";
function useCustomFetch<T>(url : string, language:Language='en-US'):ApiResponse<T> {
const [data, setData] = useState<T|null>(null);

const [isPending,setIsPending]=useState(false);

const [isError,setIsError]=useState(false);

useEffect(()=>{
    const fetchData=async()=>{
        setIsPending(true);

        try{
            const {data}= await axios.get<T>(url,{
                headers:{
                    Authorization:`Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                },
                params:{
                    language,
                }
            });
            setData(data);
        }catch{
            setIsError(true);
        }finally{
            setIsPending(false);
        }

    }
    fetchData();
},[url,language]);

    return {data, isPending,isError};
}
export default useCustomFetch;