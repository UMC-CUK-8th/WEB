import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { Sidebar } from "lucide-react";
import Footer from "../components/Footer";

const ProtectedLayout = () => {
    const { accessToken } = useAuth();

    if (!accessToken) {
        return <Navigate to={"/login"} replace />;
    }

    return (
        <div className="h-dvh flex flex-col">   
            <Navbar />
            <div className="flex flex-1 pt-14">
                <div className="w-52">
                    <Sidebar />
                </div>
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default ProtectedLayout;