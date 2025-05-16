import { useMutation } from "@tanstack/react-query";
import { postComment } from "../../apis/comment";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { InfiniteData } from "@tanstack/react-query";
import type { LpComment } from "../../types/lp";

interface PostCommentParams {
  lpId: number;
  content: string;
  order: string;
}

interface MutationContext {
  previousData?: InfiniteData<{ data: { data: LpComment[] } }>;
}

function usePostComment() {
  return useMutation<LpComment, unknown, PostCommentParams, MutationContext>({
    mutationFn: ({ lpId, content }) => postComment(lpId, content),

    onMutate: async ({ lpId, content, order }) => {
      const queryKey = [QUERY_KEY.lpComments, lpId, order];

      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<InfiniteData<{ data: { data: LpComment[] } }>>(queryKey);

      if (previousData) {
        const optimisticComment: LpComment = {
          id: -Date.now(), 
          content,
          lpId,
          authorId: -1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          author: {
            id: -1,
            name: "나",
            email: "",
            bio: null,
            avatar: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        };

        const newData: InfiniteData<{ data: { data: LpComment[] } }> = {
          ...previousData,
          pages: [
            {
              ...previousData.pages[0],
              data: {
                ...previousData.pages[0].data,
                data: [optimisticComment, ...previousData.pages[0].data.data],
              },
            },
            ...previousData.pages.slice(1),
          ],
        };

        queryClient.setQueryData(queryKey, newData);
      }

      return { previousData };
    },

    onError: (_err, variables, context) => {
      if (context?.previousData) {
        const queryKey = [QUERY_KEY.lpComments, variables.lpId, variables.order];
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },

    onSettled: (_data, _error, variables) => {
      const queryKey = [QUERY_KEY.lpComments, variables.lpId, variables.order];
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

export default usePostComment;
