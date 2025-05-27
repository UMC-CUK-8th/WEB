import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";
import type { InfiniteData } from "@tanstack/react-query";
import type { LpComment } from "../../types/lp";

type DeleteCommentParams = {
  lpId: number;
  commentId: number;
  order: string;
};

interface CommentPage {
  data: {
    data: LpComment[];
    hasNext: boolean;
    nextCursor: number | null;
  };
}

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lpId, commentId }: DeleteCommentParams) =>
      deleteComment(lpId, commentId),

    onMutate: async ({ lpId, commentId, order }) => {
      const queryKey = [QUERY_KEY.lpComments, lpId, order];

      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<InfiniteData<CommentPage>>(queryKey);

      if (previousData) {
        const newData: InfiniteData<CommentPage> = {
          ...previousData,
          pages: previousData.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              data: page.data.data.filter((comment) => comment.id !== commentId),
            },
          })),
        };

        queryClient.setQueryData(queryKey, newData);
      }

      return { previousData };
    },

    onError: (_error, variables, context) => {
      const queryKey = [QUERY_KEY.lpComments, variables.lpId, variables.order];
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },

    onSettled: (_data, _error, variables) => {
      const queryKey = [QUERY_KEY.lpComments, variables.lpId, variables.order];
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
