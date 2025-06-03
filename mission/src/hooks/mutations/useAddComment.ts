import { useMutation } from '@tanstack/react-query';
import { addComment } from '../../apis/lp';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';

function useAddComment() {
  return useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComment],
      });
    },
  });
}

export default useAddComment;