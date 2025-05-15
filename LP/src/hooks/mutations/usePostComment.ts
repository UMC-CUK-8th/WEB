import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { commentAdd } from "../../apis/lp";

function usePostComment(){
    return useMutation({
        mutationFn:commentAdd,
        onSuccess:(data)=>{//응답을 하면 여기 data에 들어옴 
        console.log("댓글등록응답확인:", data);
        queryClient.invalidateQueries({
        queryKey:[QUERY_KEY.comment],
        exact:false,
                })
            }
    })
}

export default usePostComment;