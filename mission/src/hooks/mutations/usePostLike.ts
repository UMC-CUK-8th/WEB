import { useMutation } from '@tanstack/react-query';
import { postLike } from '../../apis/lp';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';

function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    // data -> API 성공 응답 데이터
    // variables -> mutate에 전달한 값
    // context -> onMutate에서 반환한 값
    onSuccess: (data) => {
      // 특정 쿼리 캐시를 무효화(invalidate)해서 자동으로 다시 요청
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpDetail, data.data.lpId],
        // 이 키와 정확히 일치하는 쿼리만 무효화하도록 설정
        exact: true,
      });
    },
    // onError: (error, variables, context) => {},
    // 요청 직전에 실행되는 함수 -> Optimistic Update 구현 시 유용
    // onMutate: (variables) => {},
    // onSettled: (data, error, variables, context) => {},
  });
}

export default usePostLike;