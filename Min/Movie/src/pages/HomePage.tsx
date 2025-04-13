import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const HomePage = () => {
    return (
        <>
            {/* <h2 className='text-white'>홈페이지</h2> */}
            <Navbar />
            <Outlet />
        </>
    )
}

export default HomePage;