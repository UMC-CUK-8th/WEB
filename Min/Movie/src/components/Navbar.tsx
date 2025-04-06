import { NavLink } from "react-router-dom";

const LINKS = [
  { to: '/', label: '홈' },
  { to: '/movies/popular', label: '인기 영화' },
  { to: '/movies/now_playing', label: '상영 중' },
  { to: '/movies/top_rated', label: '평점 높은' },
  { to: '/movies/upcoming', label: '개봉 예정' },
];

export const Navbar = () => {
  return (
    <div className="flex gap-3 px-6 py-4 flex-wrap">
      {LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `px-4 py-2 rounded-full border transition-all duration-200 text-sm
            ${
              isActive
                ? 'bg-[#FF3D6E] text-white border-[#FF6699]'
                : 'text-[#FFFFFF] border-[#FF3D6E] hover:bg-[#FF3D6E] hover:text-white'
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
};
