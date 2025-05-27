import { useMutation } from "@tanstack/react-query";
import { postLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { CreateLpRequest, ResponseLpDto } from "../../types/lp";

function usePostLp() {
  return useMutation<ResponseLpDto, unknown, CreateLpRequest>({
    mutationFn: postLp,
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.lps],
        });
    },
    onError: (error) => {
      console.error("LP 생성 실패:", error);
    },
  });
}

export default usePostLp;
