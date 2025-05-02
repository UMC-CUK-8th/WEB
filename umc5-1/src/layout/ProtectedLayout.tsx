import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to={"/login"} replace />; //replace 쓰면 히스토리에 남지 않음
  }

  return <Outlet />;
};

export default ProtectedLayout;
