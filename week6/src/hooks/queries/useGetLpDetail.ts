import { useQuery } from "@tanstack/react-query";
import { RequestLpDTO } from "../../types/lp";
import { QUERY_KEY } from "../../constants/key";
import { getLpDetail } from "../../apis/lp";

function useGetLpDetail({lpId}: RequestLpDTO) {
    return useQuery({
        queryKey: [QUERY_KEY.lps, lpId],
        queryFn: () => getLpDetail({lpId}),
    });
}

export default useGetLpDetail;