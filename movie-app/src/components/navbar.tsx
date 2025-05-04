import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";

const navItems = [
    { to: '/', label: "홈" },
    { to: '/popular', label: "인기 영화" },
    { to: '/now-playing', label: "상영 중" },
    { to: '/top-rated', label: "평점 높은" },
    { to: '/upcoming', label: "개봉 예정" },
]

const navAccount = [
    { to: '/login', label: "로그인" },
    { to: '/signup', label: "회원가입" },
]

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <nav className="w-full py-4 px-6 bg-white flex justify-between items-center text-sm font-medium">
            <div className="flex space-x-6">
                {navItems.map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                        isActive ? "text-purple-600" : "text-gray-600 hover:text-blue-600"
                        }
                    >
                        {label}
                    </NavLink>
                ))}
            </div>
            <div className="flex space-x-4 items-center">
                {isAuthenticated ? (
                    <>
                        <span className="text-gray-700">{user?.nickname}님, 환영합니다.</span>
                        <NavLink
                        to="/mypage"
                        className="bg-purple-600 text-white px-4 py-1.5 rounded hover:bg-purple-700 transition"
                        >
                        마이페이지
                        </NavLink>
                        <button
                        onClick={logout}
                        className="px-4 py-1.5 text-gray-500 hover:text-gray-800 transition"
                        >
                        로그아웃
                        </button>
                    </>
                ) : (
                    navAccount.map(({ to, label }) =>
                        label === "회원가입" ? (
                            <NavLink
                                key={to}
                                to={to}
                                className="bg-purple-600 text-white px-4 py-1.5 rounded hover:bg-purple-700 transition"
                            >
                                {label}
                            </NavLink>
                        ) : (
                            <NavLink
                                key={to}
                                to={to}
                                className="px-4 py-1.5 text-gray-500 hover:text-gray-800 transition"
                            >
                                {label}
                            </NavLink>
                        )
                    )
                )}
            </div>
        </nav>
    );
};

export default Navbar;