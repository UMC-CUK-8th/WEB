import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { Likes, ResponseLpDetailDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";

function useDeleteLike() {
    return useMutation({
        mutationFn: deleteLike,
        // onMute -> API 요청 이전에 호출

        onMutate: async (lp) => {
            // 1. 게시글에 관련된 쿼리 취소
            await queryClient.cancelQueries({
                queryKey:[QUERY_KEY.lps, lp],
            });

            // 2. 현재 게시글의 데이터를 캐시에서 가져와야 함
            const previousLpPost = queryClient.getQueryData<ResponseLpDetailDto>([QUERY_KEY.lps, lp]);

            // 3. 게시글 데이터를 복사해서 newLpPost라는 새로운 객체 생성, =) 오류 발생 시 이전 상태로 되돌리기 위해서..
            const newLpPost = {...previousLpPost};

            // 4. 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치 찾기
            const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
            const userId = Number(me?.data.id)

            const likeindex = previousLpPost?.data.likes.findIndex((like) => like.userId === userId) ?? -1;

            if(likeindex>=0) {
                previousLpPost?.data.likes.splice(likeindex, 1);
            } else {
                const newLike = {userId, lpId:lp} as Likes;
                previousLpPost?.data.likes.push(newLike);
            }

            // 5. 업데이트 된 게시글 데이터를 캐시에 저장 => 즉각 UI 업데이트 가능
            queryClient.setQueryData([QUERY_KEY.lps, lp], newLpPost);

            return {previousLpPost, newLpPost};
        },
        onError: (err, newLp, context) => {
            console.log(err, newLp);
            queryClient.setQueryData([QUERY_KEY.lps, newLp],
                context?.previousLpPost?.data.id,
            )
        },

        //onSettled는 api 요청이 끝난 후 성공하든 실패하든 실행
        onSettled: async (data, error, variables, context) => {
            await queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.lps, variables],
            })
        }
    });
}

export default useDeleteLike;
