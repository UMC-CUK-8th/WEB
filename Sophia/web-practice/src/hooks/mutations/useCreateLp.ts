import { useMutation } from '@tanstack/react-query';
import { createLp } from '../../apis/lp';
// import { queryClient } from '../../App';
// import { QUERY_KEY } from '../../constants/key';

function useCreateLp() {
  return useMutation({
    mutationFn: createLp,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: [QUERY_KEY.lps],
    //   });
    //   alert('LP 리스트에 추가되었습니다.');
    //   window.location.reload();
    // },
    onError: () => {
      alert('데이터 전송에 실패하였습니다..');
    },
  });
}

export default useCreateLp;
