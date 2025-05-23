import { useMutation } from '@tanstack/react-query';
import { addLp } from '../../apis/lp';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';

function useAddLp() {
  return useMutation({
    mutationFn: addLp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
      alert('LP가 추가되었습니다.');
      window.location.reload();
    },
    onError: () => {
      alert('LP 추가에 실패하였습니다..');
    },
  });
}

export default useAddLp;