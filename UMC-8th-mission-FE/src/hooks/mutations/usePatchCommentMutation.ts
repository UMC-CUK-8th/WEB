import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchComment } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";

type PatchCommentParams = {
  lpId: number;
  commentId: number;
  content: string;
};

export const usePatchCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lpId, commentId, content }: PatchCommentParams) =>
      patchComment(lpId, commentId, content),

    onSuccess: (updatedComment, variables) => {
      const queryKey = QUERY_KEY.lpComments(variables.lpId);
      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              data: page.data.data.map((comment: any) =>
                comment.id === variables.commentId
                  ? { ...comment, content: updatedComment.content, updatedAt: updatedComment.updatedAt }
                  : comment
              ),
            },
          })),
        };
      });
    },

    onError: (error) => {
      console.error("댓글 수정 실패:", error);
    },
  });
};
