import { useMutation } from "@tanstack/react-query";
import { PatchLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePatchLp(){
    return useMutation({
        mutationFn:PatchLp,
        onSuccess:(data)=>{ 
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.detail,data.data.id],
                exact:true,
            })
        },
       
    })
}

export default usePatchLp;