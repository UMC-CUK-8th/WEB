import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '../../apis/auth';
import { QUERY_KEY } from '../../constants/key';

function useGetMyInfo(accessToken: string | null) {

    return useQuery({
        queryKey: [QUERY_KEY.myInfo],
        queryFn: getMyInfo,
        enabled: !!accessToken,
    });
}

export default useGetMyInfo;