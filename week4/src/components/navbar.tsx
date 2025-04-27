// navbar.tsx
import {Link, useLocation} from "react-router-dom";

const Navbar = () => {
    const now = useLocation();
    const nowpage = now.pathname;
    return (
        <nav className='text-base p-5 flex gap-x-4'>
            <Link to = {'/'} className = {nowpage ==='/'? 'text-[#b2dab1] font-bold' : 'text-gray-500'}>홈</Link>
            <Link to = '/movies/popular' className = {nowpage ==='/movies/popular'? 'text-[#b2dab1] font-bold' : 'text-gray-500'}>인기 영화</Link>
            <Link to = '/movies/now_playing' className = {nowpage ==='/movies/now_playing'? 'text-[#b2dab1] font-bold' : 'text-gray-500'}>상영 중</Link>
            <Link to = '/movies/top_rated' className = {nowpage ==='/movies/top_rated'? 'text-[#b2dab1] font-bold' : 'text-gray-500'}>평점 높은</Link>
            <Link to = '/movies/upcoming' className = {nowpage ==='/movies/upcoming'? 'text-[#b2dab1] font-bold' : 'text-gray-500'}>개봉 예정</Link>
        </nav>
    );
};

export default Navbar;
