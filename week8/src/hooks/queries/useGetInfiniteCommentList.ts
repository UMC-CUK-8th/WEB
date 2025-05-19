import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { PAGINATION_ORDER } from "../../enums/common";

function useGetInfiniteCommentList(
    lpId: number,
    limit: number,
    order: PAGINATION_ORDER,
) {
    return useInfiniteQuery({
        queryFn: ({ pageParam }) => 
            getCommentList(lpId, {cursor: pageParam, limit, order,}),
        queryKey: [QUERY_KEY.comments, lpId, order],
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.data.hasNext
                ? lastPage.data.nextCursor
                : undefined;
        }
    });
}

export default useGetInfiniteCommentList;