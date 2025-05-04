import { createContext, PropsWithChildren, useContext, useState } from "react";
import { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (signData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({children}:PropsWithChildren) => {
    const { 
        getItem: getAccessTokenFromStorage,
        setItem: setAccessTokenInStorage, 
        removeItem: removeAccessTokenFromStorage,
    } = useLocalStorage(
        LOCAL_STORAGE_KEY.accessToken
    );
    const { 
        getItem: getRefreshTokenFromStorage, 
        setItem: setRefreshTokenInStorage, 
        removeItem: removeRefreshTokenFromStorage 
    } = useLocalStorage(
        LOCAL_STORAGE_KEY.refreshToken
    );

    const [accessToken, setAccessToken] = useState<string | null>(
        getAccessTokenFromStorage(),
    );
    const [refreshToken, setRefreshToken] = useState<string | null>(
        getRefreshTokenFromStorage(),
    );

    const login = async (signinData: RequestSigninDto) => {
        try {
            const { data } = await postSignin(signinData); 

            if (data) {
            const newAccessToken = data.accessToken;
            const newRefreshToken = data.refreshToken;

            setAccessTokenInStorage(newAccessToken);
            setRefreshTokenInStorage(newRefreshToken);
            
            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);
            alert("로그인 성공");
            window.location.href = "/my"; 
            }
        } catch (error) {
            console.error("로그인 오류", error);
            alert("로그인 실패");
        }
    };

    const logout = async () => {
        try {
            await postLogout(); // 데이터를 받아와도 response로 넘어오는게 딱히 없기 때문에 실행만 시켜주고 response 값을 안 받아 올 것이다. 
            removeAccessTokenFromStorage(); // 비워주기
            removeRefreshTokenFromStorage(); // 비워주기

            setAccessToken(null); 
            setRefreshToken(null); 
            // localStorage.claer() // 큰 프로젝트에서는 문제 발생 가능.

            alert("로그아웃 성공");
        } catch (error) {
            console.error("로그아웃 오류", error);
            alert("로그아웃 실패");
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// const context = useContext(AuthContext); 이런 식으로 많이 활용했지만, 이 과정이 매번 일어나기 때문에 그냥 애초에
// 훅을 만들자! -> 
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext를 찾을 수 없습니다.");
    }

    return context;
}
// 이 컨텍스트가 없을 때 (우산을 안 씌웠을 때) context provider를 씌워주는데 그것을 안 씌워줬을 때 에러도 
// 알 수 있기 위해서 조건문을 달아준다. 