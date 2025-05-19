import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar/SideBar";
import { useState } from "react";

const HomeLayout = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const handleSearchClick = () => {
        setIsSearchOpen((prev) => !prev);
    };

    return (
        <div className="h-dvh flex flex-col">   
            <Navbar />
            <div className="flex flex-1 pt-14">
                <div className="w-52">
                    <SideBar handleSearchClick={handleSearchClick} />
                </div>
                <main className="flex-1 p-4">
                    <Outlet context={{ isSearchOpen }} />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default HomeLayout;