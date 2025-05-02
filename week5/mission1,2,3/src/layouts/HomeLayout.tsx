import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const HomeLayout = () => {
    return (
        <>
        <div className="h-dvh flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet/>
            </main>
            <footer className="text-center pb-3">돌려돌려LP판</footer>
        </div>
        </>
    );
};

export default HomeLayout;