import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const HomeLayout=()=>{

    return (
        <div className="h-screen flex flex-col">
            <Navbar/>
            
            <main className="flex h-screen">
                <Sidebar/>
                <div className="flex-1 overflow-auto">
                <Outlet />
                </div>
            </main>
        </div>
        
    )
}
export default HomeLayout;