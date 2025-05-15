import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteUsers(){
    return useMutation({
        mutationFn:deleteUser,
        onSuccess:()=>{
        queryClient.invalidateQueries({
        queryKey:[QUERY_KEY.info],
        exact:true,
                })
            }
    })
}

export default useDeleteUsers;