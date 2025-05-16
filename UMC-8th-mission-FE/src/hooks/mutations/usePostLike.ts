import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { Likes, ResponseLpDetailDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";

function usePostLike() {
    return useMutation({
        mutationFn: postLike,
        // onMutate -> API 요청 이전에 호출되는 친구.
        // UI에 바로 변경을 보여주기 위해 Cache 업데이트
        onMutate: async (lp) => {
            // 1. 이 게시글에 관련된 쿼리를 취소 (캐시된 데이터를 새로 불러오는 요청-비동기로 처리)
            await queryClient.cancelQueries({
                queryKey: [QUERY_KEY.lps, lp.lpId],
            });

            // 2. 현재 게시글의 데이터를 캐시에서 가져와야 한다. 
            const previousLpPost = queryClient.getQueryData<ResponseLpDetailDto>([
                QUERY_KEY.lps,
                lp.lpId
            ]); // 이것을 건드려서 배열로 순회를 돌면서 내 userId가 있으면 좋아요가 있고, 없으면 없게 처리.
            // 내 유저아이디 기준으로 사용자가 눌렀던 좋아요의 위치를 찾을 것이다.

            // 게시글 데이터를 복사해서 NewLpPost라는 새로운 객체를 만들 것임.
            // 복사하는 가장 큰 이유는 나중에 오류가 발생했을 때 이전 상태로 되돌리기 위해서다 라고 생각하면 됩니다. 
            const newLpPost = { ...previousLpPost }; // onMutate의 반환값으로~

            // 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치를 찾아야 합니다. 
            const me = queryClient.getQueryData<ResponseMyInfoDto>([
                QUERY_KEY.myInfo
            ]);
            const userId = Number(me?.data.id);

            const likedIndex = 
                previousLpPost?.data.likes.findIndex(
                    (like) => like.userId === userId,
            ) ?? -1; // 내가 없는 경우는 -1

            if (likedIndex >= 0) {
                previousLpPost?.data.likes.splice(likedIndex, 1); // 좋아요 제거.
            } else {
                const newLike = { userId, lpId: lp.lpId } as Likes; // 난수도 괜찮지만 Likes라는 타입이라고 캐스팅을 해줌.
                previousLpPost?.data.likes.push(newLike); // 여기서 id를 어떻게 해줄 수 없어서 오류가 뜰 것이다. 
            }

            // 업데이트된 게시글 데이터를 캐시에 저장
            // 이렇게하면 UI가 바로 업데이트 됨. 사용자가 변화를 확인할 수 있다. 
            queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

            return {previousLpPost, newLpPost}; // 문제가 생겼을 때 리턴.  
        },

        onError: (err, newLp, context) => {
            console.log(err, newLp);
            queryClient.setQueryData(
                [QUERY_KEY.lps, newLp.lpId],
                context?.previousLpPost?.data.id,
            );
        },

        // 서버 상태 동기화
        // onSettled는 API 요청이 끝난 후 (성공하든 실패하든 실행)
        onSettled: async (_data, _error, variables, _context) => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, variables.lpId],
            });
        },
    });
}

export default usePostLike;