import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const HomeLayout=()=>{

    return (
        <div className="flex flex-col h-screen">
            <Navbar/>
            
            <main className="flex flex-1 overflow-hidden">
                <Sidebar/>
                <div className="flex-1 overflow-auto">
                <Outlet />
                </div>
            </main>
        </div>
        
    )
}
export default HomeLayout;