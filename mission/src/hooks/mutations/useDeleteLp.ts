import { useMutation } from '@tanstack/react-query';
import { deleteLp } from '../../apis/lp';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';
import { useNavigate } from 'react-router-dom';

function useDeleteLp() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteLp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
      alert('삭제 성공!');
      navigate('/');
    },
    onError: () => {
      alert('삭제 실패!');
    },
  });
}

export default useDeleteLp;