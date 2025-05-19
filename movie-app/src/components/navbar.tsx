import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import Sidebar from "./sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

const navAccount = [
    { to: '/login', label: "로그인" },
    { to: '/signup', label: "회원가입" },
]

const Navbar = () => {
    const { isAuthenticated, logout: contextLogout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { data: userData } = useQuery<{ name: string }>({
        queryKey: ["userProfile"],
        queryFn: async () => {
            const res = await api.get("/v1/users/me");
            return res.data.data;
        },
        enabled: isAuthenticated,
        staleTime: Infinity, // 다시 불러오지 않도록 함
    });
    const name = userData?.name;

    const logoutMutation = useMutation({
        mutationFn: async () => {
            await api.post("/v1/auth/signout");
            contextLogout();
        },
        onSuccess: () => {
            alert("정상적으로 로그아웃 되었습니다.");
            navigate("/");
        },
        onError: () => {
            alert("로그아웃에 실패했습니다.");
        },
    });

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <nav className="w-full py-4 px-6 bg-black flex justify-between items-center text-sm font-medium border-b border-red-500">
                {/* 왼쪽: 메뉴 + 로고 */}
                <div className="flex items-center gap-2">
                    {/* 메뉴 버튼 */}
                    <button
                        className="mr-2 p-2 focus:outline-none"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="메뉴 열기"
                    >
                        <GiHamburgerMenu size={16} className="text-gray-700 hover:text-red-600" />
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
                            <span className="text-gray-500">{name}님, 환영합니다.</span>
                            <button
                                onClick={() => logoutMutation.mutate()}
                                className="px-4 py-1.5 text-gray-500 hover:text-red-600 transition"
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