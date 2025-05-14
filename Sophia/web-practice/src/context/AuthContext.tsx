import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { RequestSigninDto } from '../types/auth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';
import { postLogout, postSignin } from '../apis/auth';
import { useMutation } from '@tanstack/react-query';

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { getItem: getAccessTokenFromStorage, setItem: setAccessTokenInStorage, removeItem: removeAccessTokenFromStorage } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { getItem: getRefreshTokenFromStorage, setItem: setRefreshTokenInStorage, removeItem: removeRefreshTokenFromStorage } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
  const { setItem: setUserNameInStorage, removeItem: removeUserNameFromStorage } = useLocalStorage(LOCAL_STORAGE_KEY.userName);

  const [accessToken, setAccessToken] = useState<string | null>(getAccessTokenFromStorage());
  const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshTokenFromStorage());

  // const _login = async (signinData: RequestSigninDto) => {
  //   try {
  //     const { data } = await postSignin(signinData);

  //     if (data) {
  //       const newAccessToken = data.accessToken;
  //       const newRefreshToken = data.refreshToken;
  //       const userName = data.name;

  //       setAccessTokenInStorage(newAccessToken);
  //       setRefreshTokenInStorage(newRefreshToken);
  //       setUserNameInStorage(userName);

  //       setAccessToken(newAccessToken);
  //       setRefreshToken(newRefreshToken);

  //       alert('로그인 성공');
  //       window.location.href = '/my';
  //     }
  //   } catch (error) {
  //     console.error('로그인 오류:', error);
  //     alert('로그인 실패');
  //   }
  // };

  const loginMutation = useMutation({
    mutationFn: (signinData: RequestSigninDto) => postSignin(signinData),
    onSuccess: (data) => {
      if (data) {
        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;
        const userName = data.data.name;

        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);
        setUserNameInStorage(userName);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        alert('로그인 성공');
        window.location.href = '/my';
      }
    },
    onError: (error) => {
      console.error('로그인 오류:', error);
      alert('로그인 실패');
    },
  });

  const login = async (signinData: RequestSigninDto) => {
    // loginMutation을 비동기 방식으로 실행 -> mutationFn이 실행될 때까지 대기
    await loginMutation.mutateAsync(signinData);
  };

  // const _logout = async () => {
  //   try {
  //     await postLogout();
  //     removeAccessTokenFromStorage();
  //     removeRefreshTokenFromStorage();
  //     removeUserNameFromStorage();

  //     setAccessToken(null);
  //     setRefreshToken(null);

  //     alert('로그아웃 성공');
  //   } catch (error) {
  //     console.error('로그아웃 오류:', error);
  //     alert('로그아웃 실패');
  //   }
  // };

  const logoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      removeUserNameFromStorage();

      setAccessToken(null);
      setRefreshToken(null);

      alert('로그아웃 성공');
    },
    onError: (error) => {
      console.error('로그아웃 오류:', error);
      alert('로그아웃 실패');
    },
  });

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  return <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthContext를 찾을 수 없습니다.');
  }

  return context;
};
