import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { ResponseMyInfoDTO } from "../../types/auth";
import { patchMyInfo } from "../../apis/auth";

function usePatchMyInfo() {

  return useMutation({
    mutationFn: patchMyInfo,
    onMutate: async (info) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.myInfo],
      });

      const previousInfo = queryClient.getQueryData<ResponseMyInfoDTO>([
        QUERY_KEY.lps,
      ]);

      if (previousInfo) {
        const newInfo = { 
          ...previousInfo,
          data: {
            ...previousInfo.data,
            info,
          },
        };
        queryClient.setQueryData([QUERY_KEY.myInfo], newInfo);
      }

      return { previousInfo };
    },

    onError: (err, newInfo, context) => {
      console.log(err, newInfo);

      if (context?.previousInfo) {
        queryClient.setQueryData(
          [QUERY_KEY.myInfo],
          context.previousInfo
        );
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
      });
    },
  });
}

export default usePatchMyInfo;