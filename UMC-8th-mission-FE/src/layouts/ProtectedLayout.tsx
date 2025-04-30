import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const location = useLocation();

  if (!accessToken) {
    return (
        <Navigate to="/login" state={{ location }} replace/> // replace를 해주면 히스토리가 안 남음.
    )
  }

  return <Outlet />;
};

export default ProtectedLayout;
