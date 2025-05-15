import { useMutation } from '@tanstack/react-query';
import { postLike } from '../../apis/lp';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';
import { Likes, ResponseLpDetailDto } from '../../types/lp';
import { ResponseMyTypeDto } from '../../types/auth';

function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    // onMutate -> API 요청 이전에 호출
    // UI에 바로 변경을 보여주기 위해 Cache 업데이트
    onMutate: async (lp) => {
      // 1. 게시글에 관련된 쿼리를 취소 (캐시된 데이터를 새로 불러오는 요청 취소)
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lpDetail, lp],
      });

      // 2. 현재 게시글의 데이터를 캐시에서 가져와야 함
      const previousLpPost = queryClient.getQueryData<ResponseLpDetailDto>([QUERY_KEY.lpDetail, lp]);

      // 3. 나중에 오류가 발생했을 때 이전 상태로 되돌리기 위해서, 게시글 데이터를 복사해서 NewLpPost라는 새로운 객체를 생성
      const newLpPost = { ...previousLpPost };

      // 4. 게시글에 저장된 좋아요 목록(배열)에서 현재 내가 눌렀던 좋아요의 위치(인덱스) 찾기
      const me = queryClient.getQueryData<ResponseMyTypeDto>([QUERY_KEY.myInfo]);
      const userId = Number(me?.data.id);

      const likeIndex = previousLpPost?.data.likes.findIndex((like) => like.userId === userId) ?? -1;

      if (likeIndex >= 0) {
        // splice: 배열에서 요소를 제거하고, 필요한 경우 해당 위치에 새 요소를 삽입하고 삭제된 요소를 반환
        previousLpPost?.data.likes.splice(likeIndex, 1);
      } else {
        const newLike = { userId, lpId: lp } as Likes;
        previousLpPost?.data.likes.push(newLike);
      }

      // 5. 업데이트된 게시글 데이터를 캐시에 저장하여 UI 즉각 업데이트 가능
      queryClient.setQueryData([QUERY_KEY.lpDetail, lp], newLpPost);

      return { previousLpPost, newLpPost };
    },
    onError: (error, newLp, context) => {
      console.log(error, newLp);
      queryClient.setQueryData([QUERY_KEY.lpDetail, newLp], context?.previousLpPost?.data.id);
    },
    onSettled: async (
      //data,
      //error,
      variables
      //context
    ) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpDetail, variables],
      });
    },

    // data -> API 성공 응답 데이터
    // variables -> mutate에 전달한 값
    // context -> onMutate에서 반환한 값
    // onSuccess: (data) => {
    //   // 특정 쿼리 캐시를 무효화(invalidate)해서 자동으로 다시 요청
    //   queryClient.invalidateQueries({
    //     queryKey: [QUERY_KEY.lpDetail, data.data.lpId],
    //     // 이 키와 정확히 일치하는 쿼리만 무효화하도록 설정
    //     exact: true,
    //   });
    // },
    // onError: (error, variables, context) => {},
    // 요청 직전에 실행되는 함수 -> Optimistic Update 구현 시 유용
    // onMutate: (variables) => {},
    // onSettled: (data, error, variables, context) => {},
  });
}

export default usePostLike;
