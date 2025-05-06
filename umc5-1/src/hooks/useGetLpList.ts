import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { PaginationDto } from "../../types/common";
import { useQuery} from "@tanstack/react-query"

function useGetLpList({cursor, search, order, limit}:PaginationDto){
    return useQuery({
        queryKey:[QUERY_KEY.lps,search, order],
        queryFn:()=>
        getLpList({
            cursor,
            search,
            order,
            limit,
        }),
        staleTime : 1000*60*5, // 이 시간 동안은 캐시된 데이터를 그대로 사용(컴포넌트가 마운트 되거나 창에 포커스 들어오는 경우도 재요청 x)
        gcTime : 100*60*10, //비활성 상태인 쿼리 데이터가 캐시에 남아있는 시간

    });
}

export default useGetLpList;