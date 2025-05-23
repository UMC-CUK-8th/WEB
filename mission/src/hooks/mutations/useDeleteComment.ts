import { useMutation } from '@tanstack/react-query';
import { deleteComment } from '../../apis/lp';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';

function useDeleteComment() {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComment],
      });
      alert('삭제되었습니다.');
    },
  });
}

export default useDeleteComment;