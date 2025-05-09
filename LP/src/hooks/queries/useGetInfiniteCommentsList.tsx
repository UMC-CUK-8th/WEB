import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentsList } from "../../apis/lp";
import { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";



function useGetInfiniteCommentsList(lpId:number,limit:number,order:PAGINATION_ORDER){
    return useInfiniteQuery({
        queryFn:({pageParam})=>getCommentsList({cursor:pageParam,lpId,limit,order}),
        queryKey:[QUERY_KEY.lps,order],
        initialPageParam:0,
        getNextPageParam:(lastPage)=>{

            return lastPage.data.hasNext ? lastPage.data.nextCursor:undefined;
        }
    })
}

export default useGetInfiniteCommentsList;