import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { userEdit } from "../../apis/lp";

function usePatchUsers(){
    return useMutation({
        mutationFn:userEdit,
        onSuccess:()=>{ 
        queryClient.invalidateQueries({
        queryKey:[QUERY_KEY.info],
        exact:false,
                })
            }
    })
}

export default usePatchUsers;