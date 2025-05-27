import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { updateMyInfo } from "../../apis/my";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseMyInfoDto } from "../../types/auth";

interface UpdateMyInfoParams {
  name?: string;
  bio?: string | null;
  avatar?: string | null;
}

interface MutationContext {
  previousData?: ResponseMyInfoDto;
}

function useUpdateMyInfo(): UseMutationResult<
  ResponseMyInfoDto,
  unknown,
  UpdateMyInfoParams,
  MutationContext
> {
  return useMutation<ResponseMyInfoDto, unknown, UpdateMyInfoParams, MutationContext>({
    mutationFn: (params: UpdateMyInfoParams) => updateMyInfo(params),

    onMutate: async (newData) => {
      // 현재 myInfo 쿼리 취소 및 백업
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });

      const previousData = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);

      // Optimistic Update: name, bio, avatar 모두 반영
      if (previousData) {
        queryClient.setQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo], {
          ...previousData,
          data: {
            ...previousData.data,
            ...newData,
          },
        });
      }

      return { previousData };
    },

    onError: (error, _newData, context) => {
      console.error("유저 정보 업데이트 실패:", error);
      if (context?.previousData) {
        queryClient.setQueryData([QUERY_KEY.myInfo], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
}

export default useUpdateMyInfo;
