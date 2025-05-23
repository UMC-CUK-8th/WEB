import { useQuery } from '@tanstack/react-query';
import { PaginationDto } from '../../types/common';
import { QUERY_KEY } from '../../constants/key';
import { getMyLpList } from '../../apis/lp';

function useGetMyLp({ order }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.myLps],
    queryFn: () =>
      getMyLpList({
        order,
      }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 410,
    select: (data) => data.data.data,
  });
}

export default useGetMyLp;