import {Outlet} from "react-router-dom";
import Navbar from "../components/LPnavbar";
import { FloatingAddButton } from "../components/floatingAddButton";

const LPLayout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <FloatingAddButton/>
        </>
    );
};

export default LPLayout;