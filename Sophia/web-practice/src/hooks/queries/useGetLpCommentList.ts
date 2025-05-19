import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginationDto } from '../../types/common';
import { QUERY_KEY } from '../../constants/key';
import { getLpCommentList } from '../../apis/lp';

function useGetCommentList({ limit, order }: PaginationDto, lpId: string | undefined) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lpComment, order, lpId],
    queryFn: ({ pageParam }) => getLpCommentList({ cursor: pageParam, limit, order }, lpId),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      console.log(lastPage, allPages);
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetCommentList;
