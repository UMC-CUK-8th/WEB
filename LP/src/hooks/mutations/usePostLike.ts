import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostLike(){
    return useMutation({
        mutationFn:postLike,
        //data -> API 성공 응답 데이터
        //variables -> mutate에 전달한 값
        //context -> onMutate에서 반환한 값 
        onSuccess:(data,variables,context)=>{ 
            console.log("invalidate 실행됨");
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.detail,data.data.lpId],
                exact:true,
            })
        },
        //error -> 요청 실패시 발생한 에러 
        //variables -> mutate에 전달한 값 
        //context -> onMutate에서 반환한 값 
        onError:(error, variables,context)=>{},
        //요청 직전에 (실행되기 직전에) 실행되는 함수 
        //optimistic update를 구현할 때 유용  
        onMutate:(variables)=>{},
        //요청이 끝난 후 항상 실행(onSuccess, onError 후에 실행됨)
        //로딩 상태를 초기화할 때 조금 유용하다. 
        onSettled:(data,error,variables,context)=>{},
        

    })
}

export default usePostLike;