import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/comment";
import { ResponseCommentListDTO } from "../../types/lp";


export function useGetInfiniteCommentList(lpId: number, order: "asc" | "desc") {
  return useInfiniteQuery<ResponseCommentListDTO>({
    queryKey: ["comments", lpId, order],
    queryFn: ({ pageParam }: QueryFunctionContext) =>
    getComments(lpId, (pageParam as number) ?? 0, order),

    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
  lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
  });
}
