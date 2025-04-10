import { NavLink } from "react-router-dom";

const navItems = [
    { to: '/', label: "홈" },
    { to: '/popular', label: "인기 영화" },
    { to: '/now-playing', label: "상영 중" },
    { to: '/top-rated', label: "평점 높은" },
    { to: '/upcoming', label: "개봉 예정" },
]

const Navbar = () => {
    return (
        <nav className="w-full py-4 px-6 bg-white flex space-x-6 text-sm font-medium">
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
        </nav>
    );
};

export default Navbar;