import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";


const ProtectedLayout=({children}:{children:ReactNode})=>{ //토큰이 있으면 페이지 볼수 있게
    const {accessToken}=useAuth();

    if(!accessToken){
        return <Navigate to={'/login'} replace/>
    }
  
    return <>{children}</>  
};

export default ProtectedLayout;