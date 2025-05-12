import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to={"/login"} replace />; //replace 쓰면 히스토리에 남지 않음
  }

  return (
    <div className="h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1 met-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
