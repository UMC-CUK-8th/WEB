import { useMutation } from '@tanstack/react-query';
import { updateMyInfo } from '../../apis/lp';

function useUpdateMyInfo() {
  return useMutation({
    mutationFn: updateMyInfo,
    onSuccess: () => {
      window.location.reload();
    },
  });
}

export default useUpdateMyInfo;
