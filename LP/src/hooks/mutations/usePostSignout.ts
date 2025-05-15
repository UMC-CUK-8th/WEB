import { useMutation } from "@tanstack/react-query";
import { signoutUser } from "../../apis/lp";

function usePostSignout(){
    return useMutation({
        mutationFn:signoutUser,
        onSuccess:()=>{ 
            console.log("로그아웃웃 실행됨");
            localStorage.removeItem("accessToken");
            window.location.reload();
        },
       
    })
}

export default usePostSignout;