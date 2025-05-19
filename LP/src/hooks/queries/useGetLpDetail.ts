import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";


function useGetLpDetail({lpId}:{lpId:number}){
    return useQuery({
        queryKey:[QUERY_KEY.detail,lpId],
        queryFn:()=>
            getLpDetail({lpId}),
       
        
        
    });
}

export default useGetLpDetail;