import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBars } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

function Navbar({ isMenuOpen, setIsMenuOpen }: NavbarProps) {
  const { logout, accessToken } = useAuth();
  const navigate = useNavigate();
  const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.userName);
  const userName = getItem();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  return (
    <div className="flex">
      <nav className="flex items-center justify-between bg-[#1e1e1e] dark:bg-gray-900 shadow-md w-full text-white p-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer ">
            <FaBars size={20} />
          </button>
          <Link to="/" className="text-[#D0C1FF] dark:text-white font-bold text-2xl">돌려돌려 LP판</Link>
        </div>
        {!accessToken ? (
          <div className="flex items-center gap-2">
            <Link to="/login" className="w-20 bg-black  hover:bg-[#D0C1FF] p-2 rounded-md text-white text-center">로그인</Link>
            <Link to="/signup" className="w-20 bg-[#D0C1FF] hover:bg-gray-800 p-2 rounded-md text-black text-center">회원가입</Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/search" className=""><FaSearch size={18}/>
            </Link>
            <div className="text-white text-center">{userName}님 반갑습니다.</div>
            <button onClick={handleLogout}className="w-20 bg-black hover:bg-[#D0C1FF] p-2 rounded-md text-white text-center">로그아웃</button>
          </div>
        )}
      </nav>
    </div>
  );
}
export default Navbar;