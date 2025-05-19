import { PropsWithChildren, useState, createContext, useContext } from "react";
import { useLoginMutation } from "../hooks/mutations/useLoginMutation"; // 추가
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RequestSigninDto } from "../types/auth";
import { useLogoutMutation } from "../hooks/mutations/useLogoutMutation";

type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  // 기존 로컬 스토리지 설정 유지
  const { getItem: getAccessTokenFromStorage, setItem: setAccessTokenInStorage, removeItem: removeAccessTokenFromStorage } =
    useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { getItem: getRefreshTokenFromStorage, setItem: setRefreshTokenInStorage, removeItem: removeRefreshTokenFromStorage } =
    useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(getAccessTokenFromStorage());
  const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshTokenFromStorage());

  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

  const login = async (signinData: RequestSigninDto) => {
    loginMutation.mutate(signinData, {
      onSuccess: (res) => {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;

        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        alert("로그인 성공");
        window.location.href = "/my";
      },
      onError: () => {
        alert("로그인 실패");
      },
    });
  };

  const logout = async () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        removeAccessTokenFromStorage();
        removeRefreshTokenFromStorage();
        setAccessToken(null);
        setRefreshToken(null);
        alert("로그아웃 성공");
      },
      onError: () => {
        alert("로그아웃 실패");
      },
    });
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext를 찾을 수 없습니다.");
    }


    return context;
}