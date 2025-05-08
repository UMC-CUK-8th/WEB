import { useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../../constants/key';

export default function GoogleLoginRedirectPage() {
  const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
  const { setItem: setUserName } = useLocalStorage(LOCAL_STORAGE_KEY.userName);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);
    const userName = urlParams.get('name');

    if (accessToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUserName(userName);

      window.location.href = '/my';
    }
  }, [setAccessToken, setRefreshToken, setUserName]);

  return <div>구글 로그인 리다이렉트 화면</div>;
}
