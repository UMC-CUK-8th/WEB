import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ResponseMyInfoDTO } from "../types/auth";
import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";

const LINKS = [
    {to: '/login', label: '로그인'},
    {to: '/signup', label: '회원가입'},
];

const Navbar = () => {
    const { accessToken } = useAuth();
    const [data, setData] = useState<ResponseMyInfoDTO>();

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        };

        getData();
    }, []);

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
            <div className="flex gap-3 p-4 justify-end">
                {!accessToken && (
                    LINKS.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({isActive}) => {
                            return isActive ? 'text-white font-bold bg-black px-3 py-1 rounded-md' : 'text-gray-500 bg-gray-200 px-3 py-1 rounded-md'
                            }}>
                            {label}
                        </NavLink>
                    ))
                )}
                {accessToken && (
                    <>
                    <div className="flex items-center gap-3">
                        <h1 className="text-gray-500">{data?.data.name}님 반갑습니다.</h1>
                        <NavLink
                            key={'/signout'}
                            to="#"
                            className='text-gray-500 bg-gray-200 px-3 py-1 rounded-md'
                        >로그아웃</NavLink>
                    </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;