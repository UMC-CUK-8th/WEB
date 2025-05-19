import { useMutation } from "@tanstack/react-query";
import { userEdit } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { ResponseMyInfoDto } from "../../types/auth";

function usePatchUsers(){
    return useMutation({
        mutationFn:userEdit,
        onMutate:async({name}:{name:string})=>{
            await queryClient.cancelQueries({
                queryKey:[QUERY_KEY.info]
            })
            const previousUserData=queryClient.getQueryData<ResponseMyInfoDto>([
                QUERY_KEY.info,
            ]);

            const newUserData={...previousUserData,data:{...previousUserData?.data, name:name}};
            
            newUserData!.data.name=name;
            

            //업데이트된 프로필 이름을 캐시에 저장
            queryClient.setQueryData([QUERY_KEY.info],newUserData);

            return{previousUserData,newUserData};
        },

        onError:(err,newUserData,context)=>{
            console.log(err,newUserData);
            queryClient.setQueryData(
                [QUERY_KEY.info],
                context?.previousUserData,
            )
        },
        onSettled:async(data,error,variables,context)=>{
            await queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.info],
            })
        }
    })
}

export default usePatchUsers;