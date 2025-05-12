import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/comment";
import { ResponseCommentListDTO } from "../../types/lp";

export function useGetInfiniteCommentList(lpId: number, order: "asc" | "desc") {
  return useInfiniteQuery<ResponseCommentListDTO>({
    queryKey: ["comments", lpId, order],
    queryFn: ({ pageParam }: QueryFunctionContext) =>
      getComments(lpId, (pageParam as number) ?? 0, order), // 페이지 파라미터를 통해 데이터를 요청

    initialPageParam: 0, // 첫 페이지는 0부터 시작
    getNextPageParam: (
      lastPage // 다음 페이지 파라미터
    ) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
  });
}
