import { useQuery } from '@tanstack/react-query';
import { PaginationDto } from '../../types/common';
import { getLpList } from '../../apis/lp';
import { QUERY_KEY } from '../../constants/key';

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps],
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),
    staleTime: 1000 * 60 * 5, // 5m
    gcTime: 1000 * 60 * 410, //10m
    //enabled: Booelan(search)
    //refreshInterval: 100 * 60
    //retry: 3
    //keepPreviousData:true
    select: (data) => data.data.data,
  });
}

export default useGetLpList;
