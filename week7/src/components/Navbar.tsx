import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

const LINKS = [
    {to: '/login', label: '로그인'},
    {to: '/signup', label: '회원가입'},
];

const Navbar = () => {
    const navigate = useNavigate();
    const { accessToken, logout } = useAuth();
    const { data } = useGetMyInfo(accessToken);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

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
                {accessToken && data?.data && (
                    <>
                    <div className="flex items-center gap-3">
                        <h1 className="text-gray-500">{data.data.name}님 반갑습니다.</h1>
                        <button 
                        className="px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition cursor-pointer"
                        onClick={handleLogout}>로그아웃</button>
                    </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;