import {Outlet} from "react-router-dom";
import Navbar from "../components/navbar";
import { FloatingAddButton } from "../components/floatingAddButton";

const RootLayout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <FloatingAddButton/>
        </>
    );
};

export default RootLayout;