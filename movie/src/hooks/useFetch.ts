import type { AxiosRequestConfig } from "axios"
import { useEffect, useState } from "react"
import { axiosClient } from "../apis/axiosClient";

const useFetch = <T>(url:string, options?: AxiosRequestConfig)=>{
    const [data, setData] = useState<T|null>(null);
    const [error, setError] = useState<string|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(()=>{
        const fetchData = async() =>{
            setIsLoading(true);
            try{
                console.log('API 요청 URL:', url);
                console.log('API 요청 옵션:', options);
                const response = await axiosClient.get(url,{
                    ...options,
                });
                console.log('API 응답:', response.data);

                setData(response.data);
            } catch(error){
                console.error('API 에러:', error);
                setError("데이터를 가져오는데 에러가 발생했습니다.");
            } finally{
                setIsLoading(false);
            }
        };
        fetchData();
    },[url, options]);

    return{
        data,
        error,
        isLoading,
    };


};
export default useFetch;