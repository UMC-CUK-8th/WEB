import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react";
import { ResponseMyInfoDTO } from "../types/auth";
import { getMyInfo } from "../apis/auth"; 

const Navbar = ()=>{

    const { logout, accessToken } = useAuth();
    const navigate=useNavigate();
    const [data, setData] = useState<ResponseMyInfoDTO>();
    const handleLogout = async () => {
        await logout();
        navigate("/");
            
        };
    
        useEffect(() => {
            const fetchUserInfo = async () => {
              if (accessToken) {
                try {
                  const userInfo = await getMyInfo(); 
                  setData(userInfo);
                } catch (error) {
                  console.error("사용자 정보 불러오기 실패", error);
                }
              }
            };
        
            fetchUserInfo();
          }, [accessToken]);


    return <nav className='bg-white dark:bg-gray-900 shadow-md fixed w-full z-10'>
        <div className = ' flex items-center justify-between p-4'>

            <Link 
            to="/"
            className = "text-xl font-bold text-gray-900 dark:text-white"
            >
            돌려돌려돌림판
            </Link>

            <Link
            to={"/search"}
            className = 'text-gray-700 dark:text-gray-300 hover:text-blue-800'
            >
            검색
            </Link>

            {!accessToken&&( //accessToken이 없는 경우에만 보이게
            <>
            <div className="space-x-6">

            <Link 
            to = {"/login"}
            className = 'text-gray-700 dark:text-gray-300 hover:text-blue-800'
            >
            로그인
            </Link>

            <Link 
            to = {"/signup"}
            className = 'text-gray-700 dark:text-gray-300 hover:text-blue-800'
            >
            회원가입
            </Link>

            </div>
            </>
            )}


            {accessToken && (
                <>
                
                {data?.data.name}님 환영합니다.
                <button 
                className="cursor-pointer bg-blue-300 rounded-sm  hover:scale-90"
                onClick={handleLogout}>로그아웃</button>
                </>
            )}
            
        
        

        </div>

        
    </nav>;
}

export default Navbar;