import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostLike() {
    return useMutation({
        mutationFn: postLike,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ // lps 앞부분("lps")만 맞아도 상관이 없음. 
                queryKey: [QUERY_KEY.lps, data.data.lpId],
                exact: true, // 정확히 매칭이 안 되도 앞에 것만 맞으면 invalidate 즉, 새로운 데이터를 받아와야 한다고 
                // tanstack-query한테 알려서 새로운 데이터를 패칭할 수 있게 해준다. 
            });
        },
    });
}

export default usePostLike;