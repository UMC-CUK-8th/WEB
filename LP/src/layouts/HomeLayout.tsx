import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const HomeLayout=()=>{

    const[sidebarClick,setSidebarClick]=useState(true);

    const clickSidebar=()=>{
        setSidebarClick((click)=>!click);
    }
    return (
        <div className="flex flex-col h-screen">
            <Navbar clickSidebar={clickSidebar}/>
            
            <main className="flex flex-1 overflow-hidden">
                {!sidebarClick&&<Sidebar/>}
                <div className="flex-1 overflow-auto">
                <Outlet />
                </div>
            </main>
        </div>
        
    )
}
export default HomeLayout;