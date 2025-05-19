import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const HomeLayout = () => {
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

export default HomeLayout;