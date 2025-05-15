import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { useNavigate } from "react-router-dom";

function useDeleteLp(){
    const navigate=useNavigate();
    return useMutation({
        mutationFn:deleteLp,
        onSuccess:()=>{
        navigate(`/`);
        queryClient.invalidateQueries({
        queryKey:[QUERY_KEY.lps],
        exact:true,
                })
            }
    })
}

export default useDeleteLp;