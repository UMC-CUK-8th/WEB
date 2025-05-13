import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getMyInfo } from "../../apis/auth";
import { ResponseMyInfoDto } from "../../types/auth";


function useGetMyInfo(){
    return useQuery<ResponseMyInfoDto>({
        queryKey:[QUERY_KEY.info],
        queryFn:getMyInfo,
        staleTime:1000*60*5, //5분 
        gcTime:1000*60*10,//10분 
        
    });
}

export default useGetMyInfo;