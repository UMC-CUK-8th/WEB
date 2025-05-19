import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { Likes, ResponseLpDTO } from "../../types/lp";
import { ResponseMyInfoDTO } from "../../types/auth";

function usePostLike() {

  // return useMutation({
  //   mutationFn: postLike,
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries({
  //       queryKey: [QUERY_KEY.lps, data.data.lpId],
  //       exact: true,
  //     });
  //   },
  // });

  return useMutation({
    mutationFn: postLike,
    onMutate: async (lp) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpId],
      });

      const previousLpPost = queryClient.getQueryData<ResponseLpDTO>([
        QUERY_KEY.lps,
        lp.lpId,
      ]);

      const newLpPost = { ...previousLpPost };

      const me = queryClient.getQueryData<ResponseMyInfoDTO>([
        QUERY_KEY.myInfo,
      ]);
      const userId = Number(me?.data.id);

      const likedIndex = previousLpPost?.data.likes.findIndex(
        (like) => like.userId === userId,
      ) ?? -1;

      if (likedIndex >= 0) {
        previousLpPost?.data.likes.splice(likedIndex, 1);
      } else {
        const newLike = { userId, lpId: lp.lpId } as Likes;
        previousLpPost?.data.likes.push(newLike);
      }

      queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

      return { previousLpPost, newLpPost };
    },

    onError: (err, newLp, context) => {
      console.log(err, newLp);
      queryClient.setQueryData(
        [QUERY_KEY.lps, newLp.lpId],
        context?.previousLpPost?.data.id,
      );
    },

    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
      });
    },
  });
}

export default usePostLike;