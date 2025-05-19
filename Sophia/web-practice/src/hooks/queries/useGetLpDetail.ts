import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants/key';
import { getLpDetail } from '../../apis/lp';

function useGetLpDetail(lpId: number | undefined) {
  return useQuery({
    queryKey: [QUERY_KEY.lpDetail, lpId],
    queryFn: () => getLpDetail(lpId),
    enabled: !!lpId,
    staleTime: 1000 * 60 * 5, // 5m
    gcTime: 1000 * 60 * 410, //10m,
    select: (data) => data.data,
  });
}

export default useGetLpDetail;
