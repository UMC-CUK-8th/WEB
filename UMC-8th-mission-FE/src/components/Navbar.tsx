import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  toggleSidebar: () => void; 
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { accessToken, logout } = useAuth();
  const [keyword, setKeyword] = useState('');
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      const name = localStorage.getItem('userName');
      if (name) {
        setUserName(name);
      }
    }
  }, [accessToken]);

  const handleSearch = () => {
    if (keyword.trim() !== '') {
      navigate(`/?search=${encodeURIComponent(keyword)}`);
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-[#141414] shadow-md fixed w-full z-10 h-20">
      <div className="flex items-center justify-between p-5">
        <Link
          to="/"
          className="text-lg font-bold text-gray-900 dark:text-pink-600 flex items-center space-x-2"
        >
          <button onClick={toggleSidebar} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span>돌려요말아요LP판</span>
        </Link>

        <div className="flex items-center space-x-4">
          {accessToken ? (
            <div className="flex items-center space-x-4">
              <span className="text-white dark:text-gray-300">
                {userName}님 안녕하세요!
              </span>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="앨범 검색"
                className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#1e1e1e] text-black dark:text-white"
              />
              <button
                onClick={handleSearch}
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
              >
                검색
              </button>
              <button
                onClick={handleLogout}
                className="bg-[#434343] text-white dark:text-gray-300 dark:bg-black hover:bg-pink-600 px-6 py-2 rounded"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="bg-[#434343] text-gray-700 dark:text-gray-300 dark:bg-black hover:bg-blue-600 px-5 py-2 rounded"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="bg-[#434343] text-gray-700 dark:text-gray-300 dark:bg-black hover:bg-pink-600 px-6 py-2 rounded"
              >
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
