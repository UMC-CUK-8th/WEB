import { createContext, PropsWithChildren, useContext, useState } from "react";
import { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";

interface AuthContextType{
    accessToken:string|null;//없을 수도 있으니까 null
    refreshToken:string|null;
    login:(signInData: RequestSigninDto)=>Promise<void>;
    logout:()=>Promise<void>;
}

export const AuthContext=createContext<AuthContextType>({
    accessToken:null,
    refreshToken:null,
    login:async()=>{},
    logout:async()=>{},
});
 
export const AuthProvider=({children}:PropsWithChildren)=>{
    const {
        getItem:getAccessTokenFromStorage,
        setItem:setAccessTokenInStorage,
        removeItem:removeAccessTokenFromStorage,
    }=useLocalStorage(
        LOCAL_STORAGE_KEY.accessToken,
    );
    const{
        getItem:getRefreshTokenFromStorage,
        setItem:setRefreshTokenInStorage,
        removeItem:removeRefreshTokenFromStorage,
    }=useLocalStorage(
        LOCAL_STORAGE_KEY.refreshToken,
    );
    const [accessToken,setAccessToken]=useState<string|null>(
        getAccessTokenFromStorage(),//지연초기화 
    )
    const [refreshToken,setRefreshToken]=useState<string|null>(
        getRefreshTokenFromStorage(),
    )

    const login=async(signinData:RequestSigninDto)=>{
        try{
            const {data}=await postSignin(signinData);

            if (data){
                const newAccessToken=data.accessToken;
                const newRefreshToken=data.refreshToken;

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);
                alert("로그인 성공");
                window.location.href="/my";
            }
        }catch(error){
            console.error("로그인 오류",error); //toast ui 
            alert("로그인 실패");
        }
    };

    const logout=async()=>{
        try{
            await postLogout();
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();

            //지금 사이트에서는 위에 두 코드 대신 localStorage.clear() 가 사용가능하지만 거대한 사이트에서는 문제가 생김
            
            setAccessToken(null);
            setRefreshToken(null);
            
            alert("로그아웃 성공");
            
        }catch(error){
            console.error("로그아웃 오류",error);
            alert("로그아웃 실패");
        }
    };

    return(
        <AuthContext.Provider value={{accessToken,refreshToken,login,logout}}>
            {children}
        </AuthContext.Provider>
        
    )
};

export const useAuth=()=>{
    const context=useContext(AuthContext);
    if (!context){
        throw new Error("AuthContext를 찾을 수 없습니다.");
    }

    return context;
}
