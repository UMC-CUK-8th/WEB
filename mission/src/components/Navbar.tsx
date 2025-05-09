import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {FaSearch, FaBars} from 'react-icons/fa';
import { ResponseMyInfoDto } from '../types/auth';
import { getMyInfo, postLogout } from '../apis/auth';
import Sidebar from './Sidebar';
const Navbar = () => {
    const { logout, accessToken } = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto>();
    const [sidebarOpen, setSidebarOpen] = useState(false);

        useEffect(() => {
            const getData = async () => {
                const response = await getMyInfo();
                console.log(response);
    
                setData(response);
            };
            getData();
        }, []);
    return (
        <div className="flex">
    <nav className="flex items-center justify-between bg-[#1e1e1e] dark:bg-gray-900 shadow-md w-full text-white p-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="cursor-pointer ">
            <FaBars size={20} />
          </button>
          <Link to="/" className="text-[#D0C1FF] dark:text-white font-bold text-2xl">돌려돌려 LP판</Link>
        </div>
        {!accessToken && (
            <div className="flex items-center gap-2">
            <Link to="/login" className="w-20 bg-black  hover:bg-[#D0C1FF] p-2 rounded-md text-white text-center">로그인</Link>
            <Link to="/signup" className="w-20 bg-[#D0C1FF] hover:bg-gray-800 p-2 rounded-md text-black text-center">회원가입</Link>
            </div>
        )}
        {accessToken && (
            <div className="flex items-center gap-2">
            <Link to="/search" className=""><FaSearch size={18}/>
            </Link>
            <div className="text-white text-center"> {data?.data.name}님 반갑습니다.</div>
            <Link to="/" onClick={async () => {
                await postLogout(); 
                logout();
            }}
            className="w-20 bg-black hover:bg-[#D0C1FF] p-2 rounded-md text-white text-center">로그아웃</Link>
            </div>
        )}    
    </nav>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
</div>
    );

}
export default Navbar;