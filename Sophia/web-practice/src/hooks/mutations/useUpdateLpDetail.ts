import { useMutation } from '@tanstack/react-query';
import { updateLpDetail } from '../../apis/lp';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';

function useUpdateLpDetail() {
  return useMutation({
    mutationFn: updateLpDetail,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpDetail, data.data.id],
        exact: true,
      });
      window.location.reload();
    },
  });
}

export default useUpdateLpDetail;
