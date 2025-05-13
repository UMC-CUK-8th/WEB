import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLike() {
    return useMutation({
        mutationFn: deleteLike,
        // retry: 3,
        // data -> API 성공 응답데이터
        // variables -> mutate에 전달한 값
        // context -> onMutate에서 반환한 값
        onSuccess: (data) => {
            queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEY.lps, data.data.lpId],
                exact: true, 
            });
        },
        // error -> 요청 실패시 발생한 에러
        // variables -> mutate에 전달한 값
        // context -> onMutate에서 반환한 값
        onError: () => {},

        // 요청 직전에 실행되는 함수
        // Optimistic Update를 구현할 때 유용하다.  
        onMutate: () => {
            return "hello";
        },

        // 요청이 끝난 후 항상 실행됨 (onSuccess, onError 후에 실행됨)
        // 로딩 상태를 초기화할 때 조금 유용하다. 
        onSettled: () => {}
    });
}

export default useDeleteLike;