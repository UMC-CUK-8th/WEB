import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getMyInfo } from "../../apis/auth";
import { ResponseMyInfoDto } from "../../types/auth";


function useGetMyInfo(accessToken:string|null){
    return useQuery<ResponseMyInfoDto>({
        queryKey:[QUERY_KEY.info],
        queryFn:getMyInfo,
        staleTime:1000*60*5, //5분 
        gcTime:1000*60*10,//10분 
        enabled:!!accessToken, //accessToken이 있는 경우에만 
    });
}

export default useGetMyInfo;