import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLike(){
    return useMutation({
        mutationFn:deleteLike,
        onSuccess:(data)=>{//응답을 하면 여기 data에 들어옴 
        queryClient.invalidateQueries({
        queryKey:[QUERY_KEY.detail,data.data.lpId],
        exact:true,
                })
            }
    })
}

export default useDeleteLike;