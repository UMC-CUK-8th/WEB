import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { commentEdit } from "../../apis/lp";

function usePatchComment(){
    return useMutation({
        mutationFn:commentEdit,
        onSuccess:()=>{ 
        queryClient.invalidateQueries({
        queryKey:[QUERY_KEY.comment],
        exact:false,
                })
            }
    })
}

export default usePatchComment;