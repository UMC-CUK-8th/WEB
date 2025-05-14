import { useMutation } from '@tanstack/react-query';
import { createComment } from '../../apis/lp';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';

function useCreateComment() {
  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComment],
      });
    },
  });
}

export default useCreateComment;
