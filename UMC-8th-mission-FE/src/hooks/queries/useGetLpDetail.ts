import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";
import { RequestLpDto, ResponseLpDetailDto } from "../../types/lp";
import { QUERY_KEY } from "../../constants/key";

export const useGetLpDetail = ({ lpId }: RequestLpDto ) => {
  return useQuery<ResponseLpDetailDto>({
    queryKey: [QUERY_KEY.lps, lpId],
    queryFn: () => getLpDetail(lpId),
    enabled: !!lpId, 
    staleTime: 1000 * 60 * 5, 
  });
};
