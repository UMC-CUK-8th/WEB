import { useQuery } from "@tanstack/react-query";
import { PaginationDTO } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";
import { getLpList } from "../../apis/lp";

function useGetLpList({cursor, search, order, limit}: PaginationDTO) {
    
    return useQuery({
        queryKey: [QUERY_KEY.lps, search, order],
        queryFn: () => getLpList({cursor, search, order, limit}),

        // 데이터가 신선하다고 간주하는 시간
        staleTime: 1000 * 60 * 5, // 5분

        gcTime: 1000 * 60 * 10, // 10분,
    });
}

export default useGetLpList;