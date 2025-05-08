import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";
import { ResponseLpDetailDto } from "../../types/lp";

const QUERY_KEY_LP_DETAIL = "lpDetail";

export const useGetLpDetail = (lpId: number) => {
  return useQuery<ResponseLpDetailDto>({
    queryKey: [QUERY_KEY_LP_DETAIL, lpId],
    queryFn: () => getLpDetail(lpId),
    enabled: !!lpId, 
    staleTime: 1000 * 60 * 5, 
  });
};
