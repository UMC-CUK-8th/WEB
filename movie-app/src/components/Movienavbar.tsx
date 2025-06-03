import { NavLink, useNavigate } from "react-router-dom";

const movieNavLinks = [
    { to: '/movies/popular', label: "인기 영화" },
    { to: '/movies/now-playing', label: "현재 상영" },
    { to: '/movies/top-rated', label: "평점 높은" },
    { to: '/movies/upcoming', label: "개봉 예정" },
];

const MovieNavbar = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <nav className="w-full py-4 px-6 bg-black flex justify-between items-center text-sm font-medium border-b border-blue-500">
                <div className="flex items-center gap-2">
                    <span
                        className="text-lg font-bold text-blue-500 cursor-pointer select-none"
                        onClick={() => navigate('/movies')}
                    >
                        MovieBox
                    </span>
                    {/* 영화 네비게이션 */}
                    <div className="hidden md:flex items-center gap-2 ml-4">
                        {movieNavLinks.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `px-3 py-1.5 rounded transition ${
                                        isActive
                                            ? "bg-blue-600 text-white"
                                            : "text-white hover:text-blue-400"
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </div>
                    <button 
                        onClick={() => navigate('/movies/search')}
                        className="ml-2 px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
                            검색
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default MovieNavbar;
