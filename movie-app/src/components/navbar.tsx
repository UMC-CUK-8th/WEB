import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import Sidebar from "./sidebar";
import { GiHamburgerMenu } from "react-icons/gi";

const navAccount = [
    { to: '/login', label: "로그인" },
    { to: '/signup', label: "회원가입" },
]

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="relative z-20">
            <nav className="w-full py-4 px-6 bg-black flex justify-between items-center text-sm font-medium border-b border-red-500">
                {/* 왼쪽: 햄버거 + 로고 */}
                <div className="flex items-center gap-2">
                    {/* 햄버거 버튼 (모바일에서만 보임) */}
                    <button
                        className="mr-2 p-2 rounded hover:bg-red-500 focus:outline-none"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="메뉴 열기"
                    >
                        <GiHamburgerMenu size={16} className="text-gray-700" />
                    </button>
                    {/* 로고/홈버튼 */}
                    <span
                        className="text-lg font-bold text-red-600 cursor-pointer select-none"
                        onClick={() => navigate('/')}
                    >
                        돌려돌려LP판
                    </span>
                </div>
                {/* 오른쪽: 계정 */}
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <>
                            <span className="text-gray-700">{user?.nickname}님, 환영합니다.</span>
                            <button
                                onClick={logout}
                                className="px-4 py-1.5 text-gray-500 hover:text-gray-800 transition"
                            >
                                로그아웃
                            </button>
                        </>
                    ) : (
                        navAccount.map(({ to, label }) =>
                            <NavLink
                                key={to}
                                to={to}
                                className={`px-4 py-1.5 rounded ${
                                    label === "회원가입"
                                    ? "bg-red-600 text-white hover:bg-red-700"
                                    : "text-white hover:text-red-600"
                                }`}
                            >
                                {label}
                            </NavLink>
                        )
                    )}
                </div>
            </nav>
            {/* 사이드바 (모바일) */}
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} breakpoint={768}/>
        </div>
    );
};

export default Navbar;