import { useMutation } from '@tanstack/react-query';
import { deleteAuth } from '../../apis/auth';
import { useLocalStorage } from '../useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../../constants/key';

function useDeleteAuth() {
  const { removeItem: removeAccessTokenFromStorage } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { removeItem: removeRefreshTokenFromStorage } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
  const { removeItem: removeUserNameFromStorage } = useLocalStorage(LOCAL_STORAGE_KEY.userName);

  return useMutation({
    mutationFn: deleteAuth,
    onSuccess: () => {
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      removeUserNameFromStorage();
      alert('회원탈퇴 성공');
      window.location.reload();
    },
    onError: (error) => {
      console.error('회원탈퇴 오류:', error);
      alert('회원탈퇴 실패');
    },
  });
}

export default useDeleteAuth;
