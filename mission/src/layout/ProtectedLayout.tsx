import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const ProtectedLayout = () => {
    const { accessToken } = useAuth();

    if(!accessToken) {
        return <Navigate to = {'/login'} replace/>
    }

    return (
    <div className="h-dvh flex flex-col">
        <Navbar/>
        {/* <Sidebar/> */}
        <main className="flex-1">
            <Outlet/>
        </main>
        <Footer/>    
    </div>
    );
    
}

export default ProtectedLayout;
