import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const ProtectedLayout = () => {
    const { accessToken } = useAuth();

    if(!accessToken) {
        return <Navigate to = {'/login'} replace/> //replace : 뒤로가기 누르면 히스토리 안 남음
    }

    return <Outlet/>
}

export default ProtectedLayout;